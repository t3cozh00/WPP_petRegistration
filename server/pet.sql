drop table if exists pet;

create table pet(
    id_pet serial primary key,
    pet_category varchar(100) not null,
    breed character varying(255) COLLATE pg_catalog."default" NOT NULL,
    colour character varying(50) COLLATE pg_catalog."default" NOT NULL,
    weight character varying(255) COLLATE pg_catalog."default" NOT NULL,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
);

-- 1. add age column to pet table, and set default age value as 0
ALTER TABLE pet
ADD COLUMN age character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT '0';

-- 2. add vaccination, vaccination_date, vaccination_hospital_name column to pet table, and set default value as No, null, null
ALTER TABLE pet
ADD COLUMN  vaccination character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT 'No';
ADD COLUMN  vaccination_date character varying(50) COLLATE pg_catalog."default"  DEFAULT 'null';
ADD COLUMN  vaccination_hospital_name character varying(100) COLLATE pg_catalog."default" DEFAULT 'null';

---- 3. add last_edit_date, post_expire_date column to pet table, and set default value as No, null, null
ALTER TABLE pet
ADD COLUMN  last_edit_date character varying(50) COLLATE pg_catalog."default" DEFAULT 'null';
ALTER TABLE pet
ADD COLUMN  post_expire_date character varying(50) COLLATE pg_catalog."default" DEFAULT 'null';

-- 4. add is_Active column to pet table
ALTER TABLE pet
ADD COLUMN is_Active boolean COLLATE pg_catalog."default" DEFAULT ture;


insert into pet (pet_category, breed, age, colour, weight) values ('cat', 'Persian', '2', 'white', '4');
insert into pet (pet_category, breed, age, colour, weight) values ('dog', 'Labrador', '1', 'Chocolate', '6');

-- 5. add email_address column to pet table
ALTER TABLE pet
ADD COLUMN  email_address character varying(50) COLLATE pg_catalog."default" DEFAULT 'null';

-- 6. add id_user column to pet table
ALTER TABLE pet
ADD COLUMN  id_user character varying(50) COLLATE pg_catalog."default" DEFAULT 'null';

-- 7. 
ALTER TABLE pet01
ADD COLUMN is_adopted boolean;
ALTER TABLE pet01
ADD COLUMN id_adopting_user integer;
ALTER TABLE pet01
ADD COLUMN adopted_on date;
ALTER TABLE pet01
ADD COLUMN adoption_remarks character varying(500);
ALTER TABLE pet01
DROP COLUMN email_address;


-- 8.
ALTER TABLE pet
ALTER COLUMN age DROP NOT NULL;

-- 9. change the name pet01, create a new table pet
drop table if exists pet;

create table pet(
    id_pet BIGSERIAL PRIMARY KEY,
    id_user integer REFERENCES tblUser(id_user) NOT NULL,
    id_pet_category integer REFERENCES pet_category(id_pet_category) NOT NULL,
    breed character varying(50) NOT NULL,
    age character varying(2) NOT NULL,
    colour character varying(50) NOT NULL,
    weight character varying(50) NOT NULL,
    description character varying(500) NOT NULL,
    vaccination character varying(500) NOT NULL,
    vaccination_date date NOT NULL,
    vaccination_hospital_name character varying(500) NOT NULL,
    special_remarks character varying(500),
    publishing_date date NOT NULL,
    post_expiry_date date NOT NULL,
);

-- 10. create pet_category table
CREATE TABLE pet_category
(
    id_pet_category BIGSERIAL PRIMARY KEY,
    description varchar(50) NOT NULL
);

insert into pet_category (description) values ('Dog');
insert into pet_category (description) values ('Cat');
insert into pet_category (description) values ('Bird');


ALTER TABLE pet01
ADD COLUMN image_name varchar(100);

ALTER TABLE pet01
DROP COLUMN id_adopting_user;

ALTER TABLE pet01
DROP COLUMN adopted_on;

ALTER TABLE pet01
DROP COLUMN adoption_remarks;

ALTER TABLE pet01
ADD COLUMN id_user integer REFERENCES tblUser(id_user) NOT NULL,

ALTER TABLE pet01
ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE pet01
ALTER COLUMN is_adopted SET DEFAULT false;
