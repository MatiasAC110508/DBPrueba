# LogiTech - Hybrid Database Architecture System

## 1. Project Overview
LogiTech is a backend system designed to demonstrate a Hybrid Database Architecture. It integrates a relational database (MySQl) for structured entity management and a document-based database (MongoDB) for flexible, read-optimized clinical histories. The system includes an ETL (Extract, Transform, Load) pipeline to process CSV data and distribute it across both databases simultaneously.

## 2. System Architecture
The architecture is built on a Node.js and Express.js backend, utilizing the MVC (Model-View-Controller) design pattern to cleanly separate database operations.



* **Client Layer:** Frontend interface rendering dynamic data via asynchronous Fetch API calls.
* **Application Layer (Node.js/Express):** Handles routing, request processing, and file upload middleware using Multer.
* **Relational Data Layer (MySQL):** Stores strictly structured data (ID Transacción, Fecha, Nombre Cliente, Email Cliente, Dirección, Categoría
Producto, SKU, Nombre Producto, Precio Unitario, Cantidad, Nombre
Proveedor, Contacto Proveedor.). It ensures ACID compliance and data integrity through primary and foreign key constraints.
* **Document Data Layer (MySQL):** Stores denormalized, nested patient clinical histories. Optimized for fast retrieval of complex, array-based patient records without the computational overhead of SQL JOIN operations.

## 3. Prerequisites
Before installing, ensure the following software is installed on your local machine:
* Node.js (v18.x or higher)
* MySQL Server
* MongoDB Server (Local or Atlas instance)
* Git

## 4. Installation and Setup

### Step 1: Clone the Repository
Execute the following commands in your terminal to clone the project and navigate into the directory:

bash:

git clone [https://github.com/MatiasAC110508/logiTech-DB.git](https://github.com/MatiasAC110508/logiTech-DB.git)
cd logiTech-DB

Step 2: Install DependenciesInstall all required Node.js packages:Bashnpm install
Step 3: Database PreparationMariaDB SetupAccess your MySQL shell or a client tool (such as DBeaver) and execute the following SQL script to create the database and the necessary relational 

mysql bash:

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

MongoDB SetupEnsure your MongoDB instance is running on localhost:27017. The Mongoose ODM will automatically create the salud_plus database and the patients_history collection upon the first insertion during the migration process.Step 4: Environment Variables ConfigurationCreate a file named .env in the root directory of the project and define the connection parameters exactly as follows:

# MariaDB Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password or empty if !password
DB_NAME=logiTrch
DB_PORT=3306

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/logiTech
PORT=5000

Step 5: Start the ServerStart the development server:Bashnpm run dev
The console will output successful connection messages for both databases.

logiTech-DB/
├── config/
│   └
├── controllers/
│ 
├── models/
│ 
├── public/
│   |
│   └── js/
├── routes/
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── index.js                  # Application entry point and server setup
└── package.json              # Dependencies and scripts
# DBPrueba
