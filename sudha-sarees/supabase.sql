-- Run in Supabase SQL editor
create table types(id uuid primary key default gen_random_uuid(),name text not null,cover_url text,created_at timestamptz default now());
create table sarees(id uuid primary key default gen_random_uuid(),type_id uuid references types(id) on delete set null,name text not null,fabric text,colour text,price numeric,description text,in_stock boolean default true,featured boolean default false,images text[] default '{}',created_at timestamptz default now());
create table prebookings(id uuid primary key default gen_random_uuid(),saree_id uuid references sarees(id) on delete set null,saree_name text,saree_image_url text,name text not null,phone text not null,email text,city text,preferred_date date,message text,reference_image_url text,status text default 'new' check(status in('new','contacted','confirmed','cancelled')),created_at timestamptz default now());
create table wishlists(device_id text not null,saree_id uuid references sarees(id) on delete cascade,primary key(device_id,saree_id));
create table admins(user_id uuid primary key references auth.users(id) on delete cascade);
create function is_admin() returns boolean language sql security definer stable as $$select exists(select 1 from admins where user_id=auth.uid())$$;
alter table types enable row level security;alter table sarees enable row level security;alter table prebookings enable row level security;alter table wishlists enable row level security;alter table admins enable row level security;
create policy "read types" on types for select using(true);create policy "admin types" on types for all using(is_admin()) with check(is_admin());
create policy "read sarees" on sarees for select using(true);create policy "admin sarees" on sarees for all using(is_admin()) with check(is_admin());
create policy "public prebook" on prebookings for insert with check(true);create policy "admin prebook" on prebookings for all using(is_admin()) with check(is_admin());
create policy "wish all" on wishlists for all using(true) with check(true);
create policy "self admin check" on admins for select using(user_id=auth.uid());
insert into storage.buckets(id,name,public) values('saree-images','saree-images',true),('prebook-refs','prebook-refs',true) on conflict do nothing;
create policy "img read" on storage.objects for select using(bucket_id in('saree-images','prebook-refs'));
create policy "img admin write" on storage.objects for all using(bucket_id='saree-images' and is_admin()) with check(bucket_id='saree-images' and is_admin());
create policy "ref upload" on storage.objects for insert with check(bucket_id='prebook-refs');
-- After creating your admin user in Authentication > Users:
-- insert into admins(user_id) select id from auth.users where email='YOUR_EMAIL';
-- Sample data
insert into types(name) values('Kanchipuram Silk'),('Pochampally'),('Banarasi'),('Bridal'),('Cotton'),('Georgette');
