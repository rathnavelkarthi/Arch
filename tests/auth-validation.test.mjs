import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';
import { Buffer } from 'node:buffer';

const source = await readFile(new URL('../lib/auth-validation.ts', import.meta.url), 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } });
const { isPublicSupabaseConfiguration: configured, validateCredentials: validate } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const project = 'https://example.supabase.co';
const publicKey = 'sb_publishable_example_public_key';
const jwt = role => `header.${Buffer.from(JSON.stringify({ role })).toString('base64url')}.signature`;

test('only HTTPS public credentials can configure the client', () => {
  assert.equal(configured(project, publicKey), true);
  assert.equal(configured(project, jwt('anon')), true);
  for (const key of [undefined, '', 'sb_secret_private_key', jwt('service_role'), jwt('authenticated'), 'broken.jwt.value']) {
    assert.equal(configured(project, key), false);
  }
  for (const url of [undefined, '', 'not-a-url', 'http://example.supabase.co', 'https://user:secret@example.supabase.co', `${project}?secret=value`]) {
    assert.equal(configured(url, publicKey), false);
  }
});

test('signup rejects missing names, invalid addresses and short passwords', () => {
  assert.ok(validate('bad-email', 'a-long-password', 'Anu'));
  assert.ok(validate('anu@example.com', 'short', 'Anu'));
  assert.ok(validate('anu@example.com', 'a-long-password', ' '));
  assert.equal(validate(' anu@example.com ', 'a-long-password', 'Anu'), null);
});

test('existing accounts are not prevented from signing in by new password rules', () => {
  assert.equal(validate('anu@example.com', 'existing'), null);
  assert.ok(validate('anu@example.com', ''));
});
