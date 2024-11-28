const express = require('express');
const app = express();
const db = require('./db');

app.use(express.json());

const PORT = 3000;

// Route to filter
app.get('ep')


// Start server
app.listen(PORT, () => {
    console.log(`Server running ${PORT}`);
});