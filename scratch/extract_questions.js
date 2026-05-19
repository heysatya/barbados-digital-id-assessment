/* eslint-disable @typescript-eslint/no-require-imports */
const xlsx = require('xlsx');

const workbook = xlsx.readFile('Digital_ID_Assessment_Framework.xlsx');
console.log("Sheets:", workbook.SheetNames);

workbook.SheetNames.forEach(sheetName => {
  const sheet = workbook.Sheets[sheetName];
  const json = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  console.log(`\nSheet: ${sheetName}`);
  console.log("First few rows:");
  console.log(json.slice(0, 5));
});
