const fs = require('fs');
const csv = require('csv-parser'); // CSV parsing library
const { v4: uuidv4 } = require('uuid'); // Library to generate UUIDs

// List of file paths for csv to be processed
const filePaths = ['Episode.csv', 'Colors.csv', 'Subject.csv'];

function transformData(row, sourceFile) {
    let transformedData= {};

    if (sourceFile === 'Episode.csv') {
        // Transformation for 'Episode.csv'
        transformedData = {
            id: uuidv4(),
            title: row.title.trim() || 'Unknown Title', // Default if title is missing
            episode: parseInt(row.episode, 10) || 0, // Default to 0 if invalid
            season: parseInt(row.season, 10) || 0, // Default if invalid
            broadcast_date: new Date(row.broadcast_date).toISOString(),
        };
    } else if (sourceFile === 'Colors.csv') {
        // Transformation for 'Colors.csv'
        transformedData = {
            id: uuidv4(),
            name: row.name.trim() || 'Unknown Color',
            hex_code: row.hex_code.trim() || '#000000', // default
        };
    } else if (sourceFile === 'Subject.csv') {
        transformedData = {
            // Trasformation for 'Subject.csv'
            id: uuidv4(),
            episode_id: row.episode_id.trim() || 'Unknown Episode',
            obj: row.obj.trim() || 'Unknown Object', // Default value
        };
    }

    return transformedData;
}

// Function to process a file
function processTransformedFile(filePath) {
    return new Promise((resolve, reject) => {
        // Array to store transformed rows
        const transformedArray = [];

        // Read CSV file
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                // Transform each row of data
                const transformedData = transformData(row, filePath);
                // Add transform data to array
                transformedArray.push(transformedData);
            })
            .on('end', () => {
                console.log(`Finished ${filePath}`);
                resolve(transformedArray);
            })
            .on('error', (err) => {
                console.log(`Error ${filePath}:`, err);
                reject(err);
            });
    });
}

async function csvProcess() {
    try {
        const transformedData = {};
        for (const filePath of filePaths) {
            const transformedArray = await processTransformedFile(filePath);
            transformedData[filePath] = transformedArray;
        }
        return transformedData;
    } catch (err) {
        console.log('Error', err);
    }
}

// Export function for use in other modules
module.exports = { csvProcess, processTransformedFile, transformData };