-- Projects table
create table public.projects (
  code        text primary key,
  name        text not null,
  created_at  timestamptz default now() not null
);

-- Tasks table
create table public.tasks (
  id           uuid primary key default gen_random_uuid(),
  project_code text not null references public.projects(code) on delete cascade,
  member_name  text not null,
  description  text not null,
  status       text not null default 'in-progress' check (status in ('in-progress', 'blocked', 'done')),
  created_at   timestamptz default now() not null
);

-- Indexes
create index tasks_project_code_idx on public.tasks(project_code);
create index tasks_created_at_idx on public.tasks(created_at desc);

-- Enable Row Level Security
alter table public.projects enable row level security;
alter table public.tasks enable row level security;

-- Open policies (no auth yet — anyone with the project code can read/write)
create policy "public read projects"  on public.projects for select using (true);
create policy "public insert projects" on public.projects for insert with check (true);

create policy "public read tasks"    on public.tasks for select using (true);
create policy "public insert tasks"  on public.tasks for insert with check (true);
create policy "public update tasks"  on public.tasks for update using (true);
create policy "public delete tasks"  on public.tasks for delete using (true);
