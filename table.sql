
-- create table user query--

CREATE TABLE user(
    id int primary key AUTO_INCREMENT,
    name VARCHAR(250),
    contactNumber VARCHAR(20),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(250),
    role VARCHAR(20),
    status ENUM('ACTIVE','INACTIVE')DEFAULT 'ACTIVE'
);


INSERT INTO user(name,contactNumber,email,password,role)value ('Anant Yadav','9795897359','anantkumary9@gmail.com','12345','ADMIN')