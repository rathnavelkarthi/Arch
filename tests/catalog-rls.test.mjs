import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

const owner = '11111111-1111-4111-8111-111111111111';
const other = '22222222-2222-4222-8222-222222222222';

test('catalog migration enforces visibility, ownership and moderation in PostgreSQL', async t => {
  const db = new PGlite();
  try {
    // Model Supabase roles and auth.uid locally; this does not test GoTrue,
    // PostgREST, hosted default grants or Storage, which need staging tests.
    await db.exec(`
      create role anon; create role authenticated; create role service_role bypassrls;
      create schema auth;
      create table auth.users(id uuid primary key);
      create function auth.uid() returns uuid language sql stable as
        $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
      grant usage on schema auth, public to anon, authenticated, service_role;
      insert into auth.users values ('${owner}'), ('${other}');
    `);
    await db.exec(await readFile(new URL('../supabase/migrations/202609230001_catalog.sql', import.meta.url), 'utf8'));
    async function as(role, user = '') {
      await db.exec(`reset role; set role ${role};`);
      await db.query("select set_config('request.jwt.claim.sub', $1, false)", [user]);
    }
    const fixtures = [
      { table: 'properties', column: 'title', create: `insert into public.properties(title,description,city,state,kind,purpose,price_inr,area_sqft,land_classification) values ('Test home','A fixture description for access policy tests.','Chennai','Tamil Nadu','house','sale',1000000,1200,'residential') returning id` },
      { table: 'architect_profiles', column: 'display_name', create: `insert into public.architect_profiles(display_name,bio,city,state) values ('Test architect','A fixture biography for access policy tests.','Chennai','Tamil Nadu') returning id` },
    ];
    for (const fixture of fixtures) {
      await t.test(`${fixture.table}: drafts private; owners cannot impersonate or self-publish`, async () => {
        await as('authenticated', owner);
        const created = await db.query(fixture.create);
        const id = created.rows[0].id;
        assert.equal((await db.query(`select status from public.${fixture.table} where id = $1`, [id])).rows[0].status, 'draft');
        assert.equal((await db.query(`update public.${fixture.table} set ${fixture.column} = 'Updated fixture' where id = $1 returning id`, [id])).rows.length, 1);
        await assert.rejects(db.query(`update public.${fixture.table} set status = 'published' where id = $1`, [id]), { code: '42501' });
        await assert.rejects(db.query(`update public.${fixture.table} set owner_id = $1 where id = $2`, [other, id]), { code: '42501' });
        await as('authenticated', other);
        assert.equal((await db.query(`select id from public.${fixture.table} where id = $1`, [id])).rows.length, 0);
        assert.equal((await db.query(`update public.${fixture.table} set ${fixture.column} = 'Unauthorized edit' where id = $1 returning id`, [id])).rows.length, 0);
        assert.equal((await db.query(`delete from public.${fixture.table} where id = $1 returning id`, [id])).rows.length, 0);
        await as('anon');
        assert.equal((await db.query(`select id from public.${fixture.table} where id = $1`, [id])).rows.length, 0);
        await assert.rejects(db.query(fixture.create), { code: '42501' });
        await as('service_role');
        await db.query(`update public.${fixture.table} set status = 'published' where id = $1`, [id]);
        await as('anon');
        assert.equal((await db.query(`select id from public.${fixture.table} where id = $1`, [id])).rows.length, 1);
        await assert.rejects(db.query(`delete from public.${fixture.table} where id = $1`, [id]), { code: '42501' });
        await as('authenticated', owner);
        assert.equal((await db.query(`update public.${fixture.table} set ${fixture.column} = 'Bypass review' where id = $1 returning id`, [id])).rows.length, 0);
        assert.equal((await db.query(`delete from public.${fixture.table} where id = $1 returning id`, [id])).rows.length, 1);
      });
    }
    await t.test('private photo storage rejects other owners and edits after publication', async () => {
      await db.exec(`reset role; create schema storage;
        create table storage.buckets(id text primary key, name text, public boolean, file_size_limit bigint, allowed_mime_types text[]);
        create table storage.objects(id uuid default gen_random_uuid(), bucket_id text, name text);
        create function storage.foldername(text) returns text[] language sql immutable as $$ select string_to_array($1, '/') $$;
        alter table storage.objects enable row level security;
        grant usage on schema storage to anon, authenticated;
        grant select,insert,update on storage.objects to authenticated;
        grant select on storage.objects to anon;`);
      await db.exec(await readFile(new URL('../supabase/migrations/202609230002_property_photos.sql', import.meta.url), 'utf8'));
      await as('authenticated', owner);
      const id = (await db.query(fixtures[0].create)).rows[0].id;
      const name = `${owner}/${id}/0`;
      await db.query("insert into storage.objects(bucket_id,name) values ('property-photos',$1)", [name]);
      assert.equal((await db.query('select * from storage.objects')).rows.length, 1);
      await as('authenticated', other);
      assert.equal((await db.query('select * from storage.objects')).rows.length, 0);
      await assert.rejects(db.query("insert into storage.objects(bucket_id,name) values ('property-photos',$1)", [name]), {code:'42501'});
      await assert.rejects(db.query("insert into storage.objects(bucket_id,name) values ('property-photos',$1)", [`${other}/${id}/1`]), {code:'42501'});
      await as('anon');
      assert.equal((await db.query('select * from storage.objects')).rows.length, 0);
      await as('service_role');
      await db.query("update public.properties set status='published' where id=$1", [id]);
      await as('authenticated', owner);
      assert.equal((await db.query('update storage.objects set name=name returning id')).rows.length, 0);
    });
  } finally { await db.close(); }
});
