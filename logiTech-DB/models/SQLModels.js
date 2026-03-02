// Definitions of constants to avoid typing errors in querys
const SQL_TABLES = {
    CUSTOMERS: 'customers',
    PAYMENTS: 'payments',
    PRODUCTS: 'products',
    SUPPLIERS: 'suppliers'
};

const SQL_FIELDS = {
    CUSTOMERS: ['customer_id', 'customer_name', 'customer_email', 'customer_phone', 'customer_address'],
    PAYMENTS: ['transaction_id', 'date', 'customer_id', 'product_id', 'quantity', 'total_line_value'],
    PRODUCTS: ['supplier_id', 'supplier_name', 'supplier_email']
};

module.exports = {SQL_TABLES, SQL_FIELDS}; 