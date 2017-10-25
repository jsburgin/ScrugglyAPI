begin;

create schema scruggly;
create schema scruggly_private;

create table scruggly.user (
    id          serial primary key,
    name        text not null,
    created_at  timestamp default now()
);

comment on table scruggly.user is 'A user of Scruggly.';
comment on column scruggly.user.name is 'The name of a Scruggly user.';
comment on column scruggly.user.created_at is 'The time this user was created.';

create table scruggly.note (
    id          serial primary key,
    author_id   integer not null references scruggly.user(id),
    body        text,
    created_at  timestamp default now()
);

comment on table scruggly.note is 'A user created note.';
comment on column scruggly.note.author_id is 'The ID of the author who created the note.';
comment on column scruggly.note.body is 'The body text of the note.';
comment on column scruggly.note.created_at is 'The time the note was created.';

commit;
