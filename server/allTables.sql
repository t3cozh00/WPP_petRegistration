---
drop table if exists account;
CREATE TABLE account
(
    id_user SERIAL PRIMARY KEY,
    email_address character varying(50) NOT NULL,
    password character varying(50) NOT NULL      
);

insert into account (email_address, password) values ('aabbcc123@email.com', 'password123');
insert into account (email_address, password) values ('xxxyyy456@email.com', 'pass456');
insert into account (email_address, password) values ('qwert777@email.com', 'passcode777');
insert into account (email_address, password) values ('zxcvb888@email.com', 'password009');


---
drop table if exists pet_category;
CREATE TABLE pet_category
(
    id_pet_category BIGSERIAL PRIMARY KEY,
    description varchar(50) NOT NULL
);

insert into pet_category (description) values ('Dog');
insert into pet_category (description) values ('Cat');
insert into pet_category (description) values ('Bird');
insert into pet_category (description) values ('Others');


---
drop table if exists pet;
create table pet(
    id_pet BIGSERIAL PRIMARY KEY,
    id_user integer NOT NULL,  
    id_pet_category integer NOT NULL,
    breed character varying(50) NOT NULL,
    colour character varying(50) NOT NULL,
    weight character varying(50) NOT NULL,
    age character varying(50) NOT NULL,
    vaccination character varying(50) NOT NULL,
    vaccination_date character varying(50) ,
    vaccination_hospital_name character varying(500) ,
    description character varying(500) NOT NULL,
    CONSTRAINT fk_account FOREIGN KEY (id_user) REFERENCES account(id_user),
    CONSTRAINT fk_pet_category FOREIGN KEY (id_pet_category) REFERENCES pet_category(id_pet_category)
);
    last_edit_date date NOT NULL,
    post_expire_date date NOT NULL,

ALTER TABLE pet
ADD COLUMN is_active BOOLEAN DEFAULT true;
ALTER TABLE pet
ADD COLUMN is_adopted BOOLEAN DEFAULT false;

ALTER TABLE pet
ADD COLUMN last_edit_date character varying(50) NOT NULL;
ALTER TABLE pet
ADD COLUMN post_expire_date character varying(50) NOT NULL,


---
drop table if exists pet_image;
CREATE TABLE pet_image
(
    id_pet_image SERIAL PRIMARY KEY,
    id_pet integer NOT NULL,
    image_name character varying(255),
    CONSTRAINT fk_pet FOREIGN KEY (id_pet) REFERENCES pet(id_pet)
);


