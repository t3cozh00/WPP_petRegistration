CREATE TABLE tblUser
(
    id_user SERIAL PRIMARY KEY,
    email_address character varying(50) NOT NULL,
    password character varying(50) NOT NULL
       
);


insert into tblUser (email_address, password) values ('aabbcc123@email.com', 'password123');

insert into tblUser (email_address, password) values ('xxxyyy456@email.com', 'pass456');

insert into tblUser (email_address, password) values ('qwert777@email.com', 'passcode777');

insert into tblUser (email_address, password) values ('zxcvb888@email.com', 'password009');