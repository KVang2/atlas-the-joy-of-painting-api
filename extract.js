const fs = require('fs');
const csv = require('csv-parser');

const filePaths = ['Episode.csv', 'Colors.csv', 'Subject.csv'];

function parseFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
    fs.createReadStream(filePath)
        .pipe(csv({ separator: ',' }))
        .on('data', (row) => results.push(row))
        .on('end', () => {
            console.log(`${filePath};`, results);
            resolve({ filePath, results });
        })
        .on('error', (err) => {
            console.error(`Error ${filePath}:`, err);
            reject(err);
        });
    });
}


async function processFiles(filePaths) {
    try {
        const allFiles = {};
        for (const filePath of filePaths) {
            const { filePath: name, results } = await parseFile(filePath);
            allFiles[name] = results;
        }
        console.log('files parse successfully.');
        return allFiles;
    } catch (err) {
        console.error('Error', err);
    }
}

processFiles(filePaths).then((allFiles) => {
    if (allFiles) {
        console.log('Extraction:', Object.keys(allFiles));
    }
});