
create table users (
    id int(11) not null auto_increment primary key,
	name varchar(16) not null,
    password varchar(60) not null,
    session boolean );

create table notes (
    id int not null auto_increment primary key,
    title varchar(150) not null,
    description text,
    user_id int,
    created_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id) );

INSERT INTO users (name,password,session)
VALUES
  ('Gray Hickman','CPK34RHO1RT',true),
  ('Glenna Sampson','KOO36ABC8MO',false),
  ('Michael Baxter','EMH67GJD6TY',false),
  ('Fredericka Cain','CIB85AJG8ST',true),
  ('Bert Harper','NCM08BDI3KM',true);

