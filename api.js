const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

const PORT = 3000;

// Route to filter
app.get('/episode', async (req, res) => {
    const { month, subjects, colors, matchType = 'any' } = req.query;

    try {
        const filters = {
            month: month ? parseInt(month, 10) : null,
            subjects: subjects ? subjects.split(',') : [],
            colors: colors ? colors.split(',') : [],
        };

        const { query, params } = buildingQuery(filters, matchType);
        const [results] = await db.execute(query, params);

        res.json(results);
    } catch (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
});