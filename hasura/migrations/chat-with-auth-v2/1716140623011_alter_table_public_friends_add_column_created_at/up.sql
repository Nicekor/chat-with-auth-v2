alter table "public"."friends" add column "created_at" timestamptz
 not null default now();
