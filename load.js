const fs = require('fs');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'data_bobross',
};

async function loadData(filePath) {
