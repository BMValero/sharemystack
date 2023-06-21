create table
  picks (
    stack_id uuid references stacks,
    tool_id uuid references tools,
    category_id uuid references categories,
    primary key (stack_id, tool_id, category_id)
  );

alter table picks
  enable row level security;

create policy "Picks are viewable by everyone."
  on picks for select using ( true );

create policy "Users can insert picks for their own stack."
  on picks for insert
  with check ( 
    exists(
      select 1
      from stacks
      where stacks.user_id = auth.uid()
    )
  );
