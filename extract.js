const fs = require('fs');
const csv = require('csv-parser');

const filePaths = ['Episode.csv', 'Colors.csv', 'Subject.csv'];

function parseFile(filePath, callback) {
    const results = [];
    fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' }))
        .on('data', (row) => results.push(row))
        .on('end', () => {
            console.log(`${filePath};`, results);
            callback(null, results);
        })
        .on('error', (err) => {
            console.error(`Error ${filePath}:`, err);
            callback(err);
        });
    }

    filePaths.forEach((filePath) => {
        parseFile(filePath, (err, data) => {
            if (err) {
                console.error('Error processing file:', err);
            } else {
                console.log(`${filePath}`);
            }
        });
    });