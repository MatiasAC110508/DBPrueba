CREATE DATABASE logiTech;
USE logiTech;
CREATE TABLE suppliers (
    -> id SERIAL PRIMARY KEY,
    -> supplier_name VARCHAR(150) NOT NULL,
    -> supplier_email VARCHAR(150) UNIQUE NOT NULL
    -> );
CREATE TABLE customers (
    -> customer_id SERIAL PRIMARY KEY, 
    -> customer_name VARCHAR(150) NOT NULL,
    -> customer_email VARCHAR(150) UNIQUE NOT NULL,
    -> customer_phone VARCHAR(20) UNIQUE NOT NULL,
    -> customer_address TEXT
    -> );
CREATE TABLE products ( 
    -> product_id SERIAL PRIMARY KEY,  
    -> product_category VARCHAR(100) NOT NULL,
    -> product_sku VARCHAR(50) NOT NULL,
    -> product_name VARCHAR(150) NOT NULL,
    -> product_unit_price DECIMAL(50, 2) DEFAULT 0.00,  
    -> supplier_id BIGINT UNSIGNED, 
    -> CONSTRAINT fk_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(supplier_id) ON DELETE SET NULL 
    -> );
CREATE TABLE payments (
    -> transaction_id SERIAL PRIMARY KEY,
    -> date DATE NOT NULL,
    -> customer_id BIGINT UNSIGNED NOT NULL,
    -> product_id BIGINT UNSIGNED,
    -> quantity SMALLINT UNSIGNED NOT NULL,
    -> total_line_value DECIMAL(50, 2) DEFAULT 00.0,
    -> CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    ->CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
    -> );

