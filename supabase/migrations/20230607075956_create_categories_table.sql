create table
  categories (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    name character varying not null,
    slug character varying not null,
    constraint categories_pkey primary key (id),
    constraint categories_slug_key unique (slug)
  );

alter table categories
  enable row level security;

create policy "Categories are viewable by everyone."
  on categories for select using ( true );