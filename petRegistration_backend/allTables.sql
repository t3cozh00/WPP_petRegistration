---
drop table if exists public."user";
CREATE TABLE "user"
(
    id_user SERIAL PRIMARY KEY,
    email_address character varying(50) NOT NULL,
    password character varying(50) NOT NULL      
);

insert into "user" (email_address, password) values ('aabbcc123@email.com', 'password123');



---
drop table if exists public.pet_category;
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
CREATE TABLE IF NOT EXISTS public.pet
(
    id_pet bigint NOT NULL DEFAULT nextval('pet_id_pet_seq'::regclass),
    id_user integer NOT NULL,
    id_pet_category integer NOT NULL,
    breed character varying(50) COLLATE pg_catalog."default" NOT NULL,
    colour character varying(50) COLLATE pg_catalog."default" NOT NULL,
    weight character varying(50) COLLATE pg_catalog."default" NOT NULL,
    ageyear character varying(10) COLLATE pg_catalog."default" NOT NULL,
    agemonth character varying(10) COLLATE pg_catalog."default" NOT NULL,
    vaccination character varying(10) NOT NULL,
    vaccination_date date,
    vaccination_hospital_name character varying(100) ,
    description character varying(500) COLLATE pg_catalog."default" NOT NULL,
    publishing_date date NOT NULL DEFAULT CURRENT_DATE,
    post_expiry_date date NOT NULL,
    is_active boolean NOT NULL DEFAULT true,
    is_adopted boolean NOT NULL DEFAULT false,
    id_adopting_user integer,
    adopted_on date,
    adoption_remarks character varying(500) COLLATE pg_catalog."default",
    likes integer NOT NULL DEFAULT 0,
    CONSTRAINT pet_pkey PRIMARY KEY (id_pet),
    CONSTRAINT pet_id_pet_category_fkey FOREIGN KEY (id_pet_category)
        REFERENCES public.pet_category (id_pet_category) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT pet_id_user_fkey FOREIGN KEY (id_user)
        REFERENCES public."user" (id_user) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)



---
drop table if exists public.pet_image;
CREATE TABLE pet_image
(
    id_pet_image SERIAL PRIMARY KEY,
    id_pet integer NOT NULL,
    image_name character varying(255),
    CONSTRAINT fk_pet FOREIGN KEY (id_pet) REFERENCES public.pet(id_pet)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
