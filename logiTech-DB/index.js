require('dotenv').config();
const express = require('express');
const cors = require('cors');

// 1. Import connections
const pool = require('./config/db');  // Pool for MariaDB (myslq2)
const connectMongo = require('./config/mongo');   // Mongoose function
const deletedRoutes = require('./routes/deletedRoutes');
/* const migrateRoutes =  require('./routes/migrateRoutes');   // Needed to Excel */

const app = express();

// 2. Middlewares
app.use(cors());
app.use(express.json());

// Static files (for the index.html and Multer uploads)
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Initialize the DB
const startApp = async () => {
    try {
        // Connect to MongoDB
        await connectMongo();

        // Test the connection with MySQL
        await pool.query('SELECT 1');
        console.log('MySQL connected!')

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`logiTech Server in: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error initializing: ', error)
    }
};

 // 4. Rutas (Ajustadas al simulacro)


/* app.use('/api/migrate', migrateRoutes);    // Route to migration */
app.use('/api/deleted', deletedRoutes);

// Test root
app.get('/', (req, res) => {
    res.send('LogiTech hibrid API running...')
});



startApp()