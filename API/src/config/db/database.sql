CREATE DATABASE api_nodejs;
/*IF NOT EXISTS*/
USE api_nodejs;

CREATE TABLE document_type (
    Document_type_id int(11) NOT NULL,
    Document_type_name varchar(20) NOT NULL,
    Document_type_description varchar(80) NOT NULL
)

CREATE TABLE profile (
    Profile_id int(11) NOT NULL,
    Profile_name varchar(20) NOT NULL,
    Profile_last_name varchar(20) NOT NULL,
    Profile_document varchar(11) NOT NULL,
    Profile_email varchar(30) NOT NULL,
    Profile_phone varchar(11) NOT NULL,
    Profile_photo varchar(100) NOT NULL,
    Profile_address int(11) NOT NULL,
    Document_type_fk int(11) NOT NULL,
    FOREIGN KEY (Document_type_fk) REFERENCES document_type(Document_type_id)
)

CREATE TABLE users (
    User_id int(11) NOT NULL,
    User_user VARCHAR(60) NOT NULL,
    User_password VARCHAR(255) NOT NULL,
    User_status int(11) NOT NULL,
    User_status_fk int(11) NOT NULL,
    Role_fk int(11) NOT NULL,
    FOREIGN KEY (Role_fk) REFERENCES roles (Role_id)
    -- FOREIGN KEY 'User_status_fk' REFERENCES user_status 'User_status_id'
)

CREATE TABLE User_status_fk (
    User_status_id int(11) NOT NULL,
    User_status_name VARCHAR(60) NOT NULL,
    User_status_description VARCHAR(80) NOT NULL,
)

CREATE TABLE roles(
    Role_id int(11) NOT NULL,
    Role_name VARCHAR(20) NOT NULL,
    Role_description VARCHAR(80) NOT NULL,
)