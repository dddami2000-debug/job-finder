-- 공개 수업용 앱은 공고를 읽고 스크랩을 추가하는 동작만 허용한다.
-- 수정과 삭제는 service_role 등 관리 권한으로만 수행한다.

alter table public.jobs enable row level security;

revoke all privileges on table public.jobs from anon, authenticated;
grant select on table public.jobs to anon, authenticated;

drop policy if exists "Public jobs are readable" on public.jobs;
create policy "Public jobs are readable"
on public.jobs
for select
to anon, authenticated
using (true);

create table if not exists public.scraps (
  job_id bigint primary key references public.jobs(id),
  scrapped_at timestamptz not null default now()
);

alter table public.scraps enable row level security;

revoke all privileges on table public.scraps from anon, authenticated;
grant select, insert on table public.scraps to anon, authenticated;

drop policy if exists "Public scraps are readable" on public.scraps;
create policy "Public scraps are readable"
on public.scraps
for select
to anon, authenticated
using (true);

drop policy if exists "Public scraps are insertable" on public.scraps;
create policy "Public scraps are insertable"
on public.scraps
for insert
to anon, authenticated
with check (true);
