-- Private property photos. Publication requires a later moderation workflow.
begin;
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('property-photos', 'property-photos', false, 10485760,
  array['image/jpeg','image/png','image/webp','image/heic','image/heif']);
create policy property_photo_owner_read on storage.objects for select to authenticated
using (bucket_id = 'property-photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy property_photo_owner_insert on storage.objects for insert to authenticated
with check (bucket_id = 'property-photos' and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (select 1 from public.properties p where p.id::text = (storage.foldername(name))[2] and p.owner_id = (select auth.uid()) and p.status = 'draft'));
create policy property_photo_owner_update on storage.objects for update to authenticated
using (bucket_id = 'property-photos' and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (select 1 from public.properties p where p.id::text = (storage.foldername(name))[2] and p.owner_id = (select auth.uid()) and p.status = 'draft'))
with check (bucket_id = 'property-photos' and (storage.foldername(name))[1] = (select auth.uid())::text
  and exists (select 1 from public.properties p where p.id::text = (storage.foldername(name))[2] and p.owner_id = (select auth.uid()) and p.status = 'draft'));
commit;
