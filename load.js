const mysql = require('mysql2/promise')
const dbConfig = require('./db');


async function loadData(tableName, data) {
    const connection = await mysql.createConnection(dbConfig);

    try {
        console.log(`Loading data: ${tableName}...`);

        for (const row of data) {
            const columns = Object.keys(row).join(', ');
            const placeholders = Object.keys(row).map(() => '?').join(', ');
            const values = Object.values(row);
        
            const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
            await connection.execute(query, values);
        }

        console.log(`Loaded data successfully: ${tableName}.`);
    } catch (err) {
        console.log(`Error: ${tableName}`, err);
    } finally {
        await connection.end();
    }
}

module.exports = { loadData };