-- Drops the animals_db if it exists currently --
DROP DATABASE IF EXISTS bamazon_db;
-- Creates the "animals_db" database --
CREATE DATABASE bamazon_db;

-- Makes it so all of the following code will affect animals_db --
USE bamazon_db;

-- Creates the table "people" within animals_db --
CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  department_name varchar(30),
  product_name varchar(20),
  price decimal(10,4),
  stock_quantity integer(10),
  -- Sets id as this table's primary key which means all data contained within it will be unique --
  PRIMARY KEY (id)
);

-- Creates new rows containing data in all named columns --
INSERT INTO products ( department_name, product_name, price, stock_quantity)
VALUES ( "electronics", "headphone", 15.50, 11);
INSERT INTO products ( department_name, product_name, price, stock_quantity)
VALUES ( "electronics", "mouse", 15, 9);
INSERT INTO products ( department_name, product_name, price, stock_quantity)
VALUES ( "electronics", "alarm clock", 5.50, 5);
INSERT INTO products ( department_name, product_name, price, stock_quantity)
VALUES ( "electronics", "speaker", 150, 2);
INSERT INTO products ( department_name, product_name, price, stock_quantity)
VALUES ( "electronics", "phone charger", 25, 4);

USE bamazon_db;
SELECT * FROM products;