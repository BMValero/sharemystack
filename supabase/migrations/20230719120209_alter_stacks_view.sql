drop view if exists stacks_view;
create view stacks_view as
select stacks.*,
    COUNT(all_stars.stack_id) as stars,
    COUNT(user_stars.stack_id) > 0 as starred
from stacks
    left join stars as all_stars on (all_stars.stack_id = stacks.id)
    left join stars as user_stars on (
        user_stars.stack_id = stacks.id
        and user_stars.user_id = auth.uid()
    )
group by stacks.id;