// (c) hartmannjr 2023
// run method triggered daily
function run()
{
  getAssetSheet();
  getLiabilitySheet();
}

function getAssetSheet()
{
  var type = "Asset";
  main(type);
}

function getLiabilitySheet()
{
  var type = "Liability";
  main(type);
}

// main method determines file and sheet to use, parses the CSV into an array, and imports the data.
function main(_type)
{
  var file = DriveApp.getFoldersByName(_type+"Import").next().getFilesByName("trends.csv").next();
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(_type+"Import");
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());
  
  var fileLastUpdated = getFileLastUpdated(file);
  var sheetLastUpdated = getSheetLastUpdated(sheet);
  
  // doesn't run if the last date in the sheet and the file modify date are the same, meaning the data for that day has already been uploaded.
  if(fileLastUpdated != sheetLastUpdated)
  {
    modifyCSV(csvData,file);

    sheet.getRange(sheet.getLastRow()+1,1,csvData.length, csvData[0].length).setValues(csvData);
  }

}

// finds when the file in question was last updated
function getFileLastUpdated(_file)
{
  var fileLastUpdated = Utilities.formatDate(_file.getLastUpdated(), "GMT-5", "MM/dd/yyyy");
  return fileLastUpdated;
}

// finds the most recent date at the bottom of the sheet
function getSheetLastUpdated(_sheet)
{
  var lastRow = _sheet.getLastRow();
  var rowValue = _sheet.getRange(lastRow,1).getValue();
  if (rowValue != "Account")
  {
    var sheetLastUpdated = Utilities.formatDate(rowValue,"GMT-5", "MM/dd/yyyy");
  }
  
  return sheetLastUpdated;
}

// trims the header and footer off of mints csv files, then injects the files last modified date into each line
// this because this code is triggered daily, and will append any new data to the bottom of the list, with the modified date
function modifyCSV(_csvData,_file)
{
  var csvDataNoHeader = _csvData.splice(0,1);
  var csvDataNoFooter = _csvData.splice(-1,1);
  var date = Utilities.formatDate(_file.getLastUpdated(), "GMT-5","MM/dd/yyyy");
  _csvData.forEach(row => row.unshift(date));
  return _csvData;
}
