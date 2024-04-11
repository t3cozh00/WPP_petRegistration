CREATE TABLE pet_image
(
    id_pet_image SERIAL PRIMARY KEY,
    id_pet integer REFERENCES pet01(id_pet) NOT NULL,
    image_name character varying(255) 
);


ALTER TABLE pet_image
ALTER COLUMN id_pet DROP NOT NULL;