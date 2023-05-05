DROP DATABASE IF EXISTS bookstore_db;
CREATE DATABASE bookstore_db;

USE bookstore_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30)
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    CONSTRAINT Fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES departments (id)
    ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT NULL,
    CONSTRAINT Fk_role_id
    FOREIGN KEY (role_id)
    REFERENCES roles (id)
    ON DELETE SET NULL
);