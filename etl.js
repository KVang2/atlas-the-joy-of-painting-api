const { processFiles } = require('./extract');
const { transformData } = require('./transform');
const { loadData } = require('./load');

(async () => {
    const fileToMap = {
        'Episode.csv': 'episode',
        'Colors.csv': 'colors',
        'Subject.csv': 'subject',
    };

    try {
        // Extract raw data
        const extractedData = await processFiles(Object.keys(fileToMap));

        // Transform and load data for each file
        for (const [filePath, tableName] of Object.entries(fileToMap)) {
            console.log(`Processing file: ${filePath} for table: ${tableName}`);

            // Transform data
            const fileData = extractedData[filePath];
            const transformedData = fileData.map((row) =>
                require('./transform').transformData(row, filePath)
            );

            // Loading data into database
            await loadData(tableName, transformedData);
        }

        console.log('ETl process completed');
    } catch (err) {
        console.log('ETL process failed:', err);
    }
})();