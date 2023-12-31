create table tools (
  id uuid not null default gen_random_uuid(),
  primary key (id),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  deleted_at timestamp with time zone default null,
  server_created_at timestamp with time zone not null default now(),
  last_modified_at timestamp with time zone not null default now(),
  name character varying not null,
  slug character varying not null,
  unique (slug),
  tool_icon_id uuid references tool_icons null,
  color character varying null,
  affiliate_link character varying null,
  app_store character varying null,
  website character varying null,
  twitter character varying null
);
alter table tools enable row level security;
create policy "tools are viewable by everyone." on tools for
select using (true);