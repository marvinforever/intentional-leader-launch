create table public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  visitor_id text not null,
  session_id text not null,
  event_type text not null,
  event_name text not null,
  page_path text not null,
  section text,
  value numeric,
  metadata jsonb not null default '{}'::jsonb,
  user_agent text,
  referrer text,
  created_at timestamptz not null default now()
);

create index analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index analytics_events_event_idx on public.analytics_events (event_type, event_name);
create index analytics_events_visitor_idx on public.analytics_events (visitor_id);
create index analytics_events_page_idx on public.analytics_events (page_path);

alter table public.analytics_events enable row level security;

create policy "anyone can insert analytics events"
  on public.analytics_events
  for insert
  to anon, authenticated
  with check (true);
