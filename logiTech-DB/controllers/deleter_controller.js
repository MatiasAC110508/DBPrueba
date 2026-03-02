const DeletedProductSchema = require('../models/DeletedProduct');

// (READ) Get data by id (used by your frontend search bar)
const getDeletedProduct = async (req, res) => {
    try {
        const { name } = req.params;
        const history = await DeletedProductSchema.findOne({ DeletedProduct: name });

        if (!history) {
            return res.status(404).json({ message: 'History not found' });
        }
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getDeletedProduct,
    /* createPatientHistory */
};