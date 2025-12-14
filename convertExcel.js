const xlsx = require('xlsx');
const fs = require('fs');

// --- Configuration ---

// Define the source Excel file path and the destination JSON file path
const excelFilePath = './cypress/fixtures/dataCheckout.xlsx';
const jsonFilePath = './cypress/fixtures/dataCheckout.json';

try {
    // 1. Read the Excel file from the specified path
    const workbook = xlsx.readFile(excelFilePath);
    
    // 2. Get the name of the first sheet in the workbook (assuming data is here)
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // 3. Convert the sheet content into a standard JSON array of objects
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // 4. Write the JSON data to the output file
    // 'null, 2' is used to format the JSON nicely (indentation of 2 spaces)
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

    // --- Success Messages ---
    console.log('Success! The Excel file has been converted to JSON.');
    console.log('Location:', jsonFilePath);
    
} catch (error) {
    // --- Error Handling ---
    console.error('Conversion failed:', error);
}