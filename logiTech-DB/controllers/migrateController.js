/* const xlsx = require('xlsx');
const fs = require('fs');
const db = require('../config/db');      // FIXED: Added /
const DeletedProductSchema = require('../models/DeletedProducts'); 

const migrateData = async (req, res) => {
    if (!req.file) return res.status(400).json({error: 'No file uploaded'});

    try {
        const workBook = xlsx.readFile(req.file.path);
        const sheetName = workBook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);

        for (const row of data) {
            const {
                transaction_id, date, customer_name, customer_email, customer_address, customer_phone,
                product_category, product_sku, product_name, product_unit_price, quantity, total_line_value,
                supplier_name, supplier_email
            } = row;

            // 1. SQL MIGRATION (MariaDB)
            
            // Customers (Fixed: correct variables)
            await db.query(
                'INSERT IGNORE INTO customers (customer_name, customer_email, customer_phone, customer_address) VALUES (?, ?, ?, ?)',
                [customer_name, customer_email, customer_phone, customer_address]
            );
            
            // suppliers
            await db.query(
                'INSERT IGNORE INTO suppliers (suppliers_name, suppliers_email) VALUES (?, ?)',
                [supplier_name, supplier_email]
            );

            // Get IDs (SQL requires these to link the appointment)
            
            let supplierId = null;
            if (supplier_name) {
                const [[supplier]] = await db.query('SELECT supplier_id FROM suppliers WHERE supplier_name = ?', [supplier_name]);
                supplierId = supplier ? supplier.id : null;
            }
            
            let customerId = null;
            if (customer_name) {
                const [[customer]] = await db.query('SELECT customer_id FROM customer WHERE customer_name = ?', [customer_name]);
                customerId = customer ? customer.id : null;
            }

            let productId = null;
            if (product_name) {
                const [[product]] = await db.query('SELECT product_id FROM product WHERE product_name = ?', [product_name]);
                productId = product ? product.id : null;
            }

            // products
            await db.query(
                'INSERT IGNORE INTO products (product_category, product_sku, product_name, product_unit_price, supplier_id) VALUES (?, ?, ?, ?, ?)',
                [product_category, product_sku, product_name, product_unit_price, supplier.id]
            );

            
            // payments
            await db.query(
                `INSERT IGNORE INTO payments(transaction_id, date, customer_id, product_id, quantity, total_line_value) VALUES (?, ?, ?, ?, ?, ?)`, 
                [transaction_id, date, customer.id, product.id, quantity, total_line_value]
            );
        }
    } catch (error) {
        if (fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
        console.error(error);
        res.status(500).json({error: 'Error during migration'});
    } 
}

module.exports = { migrateData };  */