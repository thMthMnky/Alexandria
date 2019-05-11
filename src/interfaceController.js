/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 *
 * Global Variables
 */
var COLUMN_WIDTH = '16px';
var ROW_HEIGHT = '32px';
var PRIMARY_COLOR = '#8B0000'; // Dark Red: (139,0,0)
var PRIMARY_FONT_COLOR = '#ffffff'; // White: (255,255,255)
var SECONDARY_FONT_COLOR = '#0000000'
var SECONDARY_COLOR = '#808080'; // Gray: (128,128,128)
var TERNARYARY_COLOR = '#C0C0C0'; // Silver: (192,192,192)
var SIDEDBAR_TITLE = 'Upload Data 2 Drive';
var SIDEBAR_HEIGTH = '600';
var SIDEBAR_WIDTH = '400';

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
/*function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui 
  .createAddonMenu()
  .addItem('GetDriveData', 'showUpLoadBar')
  .addToUi();
}*/

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showUpLoadBar() {
  var ui = HtmlService.createTemplateFromFile('uploadBar')
  .evaluate()
  .setWidth(SIDEBAR_WIDTH)
  .setHeight(SIDEBAR_HEIGTH)
  .setTitle(SIDEBAR_TITLE)
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
}

/**
 * Google book search volume model
 *
 * See https://developers.google.com/books/docs/v1/reference/volumes#method_books_volumes_list
 */
var gVol = {
  "kind": "books#volume",
  "id": "string",
  "etag": "string",
  "selfLink": "string",
  "volumeInfo": {
    "title": "string",
    "subtitle": "string",
    "authors": [
      "string"
    ],
    "publisher": "string",
    "publishedDate": "string",
    "description": "string",
    "industryIdentifiers": [
      {
        "type": "string",
        "identifier": "string"
      }
    ],
    "pageCount": "integer",
    "dimensions": {
      "height": "string",
      "width": "string",
      "thickness": "string"
    },
    "printType": "string",
    "mainCategory": "string",
    "categories": [
      "string"
    ],
    "averageRating": "double",
    "ratingsCount": "integer",
    "contentVersion": "string",
    "imageLinks": {
      "smallThumbnail": "string",
      "thumbnail": "string",
      "small": "string",
      "medium": "string",
      "large": "string",
      "extraLarge": "string"
    },
    "language": "string",
    "previewLink": "string",
    "infoLink": "string",
    "canonicalVolumeLink": "string"
  },
  "userInfo": {
    "review": "mylibrary.reviews Resource",
    "readingPosition": "mylibrary.readingpositions Resource",
    "isPurchased": "boolean",
    "isPreordered": "boolean",
    "updated": "datetime"
  },
  "saleInfo": {
    "country": "string",
    "saleability": "string",
    "onSaleDate": "datetime",
    "isEbook": "boolean",
    "listPrice": {
      "amount": "double",
      "currencyCode": "string"
    },
    "retailPrice": {
      "amount": "double",
      "currencyCode": "string"
    },
    "buyLink": "string"
  },
  "accessInfo": {
    "country": "string",
    "viewability": "string",
    "embeddable": "boolean",
    "publicDomain": "boolean",
    "textToSpeechPermission": "string",
    "epub": {
      "isAvailable": "boolean",
      "downloadLink": "string",
      "acsTokenLink": "string"
    },
    "pdf": {
      "isAvailable": "boolean",
      "downloadLink": "string",
      "acsTokenLink": "string"
    },
    "webReaderLink": "string",
    "accessViewStatus": "string",
    "downloadAccess": {
      "kind": "books#downloadAccessRestriction",
      "volumeId": "string",
      "restricted": "boolean",
      "deviceAllowed": "boolean",
      "justAcquired": "boolean",
      "maxDownloadDevices": "integer",
      "downloadsAcquired": "integer",
      "nonce": "string",
      "source": "string",
      "reasonCode": "string",
      "message": "string",
      "signature": "string"
    }
  },
  "searchInfo": {
    "textSnippet": "string"
  }
};

/* Google mimeTypes */
  var mimeTypes = [
    'application/vnd.google-apps.audio',
    'application/vnd.google-apps.document',
    'application/vnd.google-apps.drawing',
    'application/vnd.google-apps.file',
    'application/vnd.google-apps.folder',
    'application/vnd.google-apps.form',
    'application/vnd.google-apps.fusiontable',
    'application/vnd.google-apps.map',
    'application/vnd.google-apps.photo',	
    'application/vnd.google-apps.presentation',
    'application/vnd.google-apps.script',
    'application/vnd.google-apps.site',
    'application/vnd.google-apps.spreadsheet',
    'application/vnd.google-apps.unknown',	
    'application/vnd.google-apps.video',	
    'application/vnd.google-apps.drive-sdk'
  ];


/**
 * Creates a column object whose keys are the column header names and corresponding 
 * values are their respective column number  Note, by default, we give each column  
 * its natural index as its initial value.
 *
 * @param {Object} obj The object from which we derive the column names
 * @param {String} sep The type of separator to be used in setting heading titles. By default, sep="."
 * 
 */
function Columns(obj, sep, idx){
  sep = sep ? sep : " ";
  idx = idx ? idx : 0;
  var list = {};
  Object.keys(obj).forEach( function(key){
    var value = this[key];
    if(value.constructor.name !== "Object" && value.constructor.name !== "Array")list[key] = idx++;
    if(value.constructor.name === "Object"){
      Object.keys(Columns(value, sep, idx)).forEach(function(subKey){
        list[key+sep+subKey] = idx++;
      });
    }
    if(value.constructor.name === "Array"){
      value.forEach(function(el){
        if(typeof el === "object"){
          Object.keys(Columns(el, sep, idx)).forEach(function(sK){
            list[key+sep+sK] = idx++;
          });
        } 
      });
    }
  }, obj);
  return list;
}

/**
 * This tests the function, @makeCoumn by providing an object representing a database document model.   
 *    
 * @test
 */
function test_Columns(){
  var columns = Columns(gVol, "_", 0);
  Object.keys(columns).forEach(function(col){
    Logger.log([col, columns[col]]);
  });
}

/**
 * Creates the header
 */
function Header(columns, opts){
  this.columns = columns;
  this.index =  Object.keys(this.columns);
  this.visible = true
  
  this.ss = opts && opts.ss ? opts.ss : SpreadsheetApp.getActiveSpreadsheet();
  this.sheet = opts && opts.sheet ? opts.sheet: this.ss.getActiveSheet();
  this.row = opts && opts.start.row ? opts.start.row : 1;
  this.column = opts && opts.start.column ? opts.start.column : 1;
  this.width = opts && opts.width ? opts.width : 1; 
} 

/* Render new header on current active sheet */ 
Header.prototype.render = function(){ 
  var self = this;
  var headings = [self.index];
  while(headings.length < self.width)headings.push(emptyStringArrayOfLength(self.index.length))
  headings.reverse();
  self.sheet.getRange(self.row, self.column, headings.length, self.index.length)
  .setBackground(PRIMARY_COLOR)
  .setFontColor(PRIMARY_FONT_COLOR)
  .setHorizontalAlignment('center')
  .setVerticalAlignment('middle')
  .setFontSize(14)
  .setValues(headings);
};

/* Shift the header X units to the right */ 
Header.prototype.shift = function(direction){
  var self = this
  var headings = [self.index];
  self.sheet.deleteRow(self.row);
  
  switch(direction){
    case 'right':
      self.column++;
      break;
    case 'left':
      self.column--;
      break;
    case 'up':
      self.row--;
      break;
    case 'down':
      self.row++;
      break;
  }
  
  while(headings.length < self.width)headings.push(emptyStringArrayOfLength(self.index.length))
  headings.reverse();
  self.sheet.getRange(self.row, self.column, headings.length, self.index.length)
  .setBackground(PRIMARY_COLOR) 
  .setFontColor(SECONDARY_FONT_COLOR)
  .setHorizontalAlignment('center')
  .setVerticalAlignment('middle')
  .setFontSize(14)
  .setValues(headings)
  .protect();
};


Header.prototype.hide = function(){
  var self = this;
  self.sheet.clear();
};

Header.prototype.update = function(){};


/**
 * Tester for 'makeHeader'
 */
function testAllTheThings() {
  function beforeEach () {
    var params = {};
    params["sheet"] = SpreadsheetApp.getActiveSheet();
    params["header"] = getCurrentHeader
    return params;
  }
  
  (function testHeaderOpts(){
    beforeEach();
    Logger.log('test1');
    var books = Columns(gVol, " ", 0);
    var opts = {
      start: {
        row: 3, 
        column: 2
      }, 
      width: 3
    }
    var header = new Header(books, opts);
    header.render(); 
  })();
  
  (function testHeaderShifter(){
    beforeEach();
    Logger.log('test2');
    var books = Columns(gVol, " ", 0);
    var opts = {
      start: {
        row: null, 
        column: 2
      }, 
      width: 3
    }
    var header = new Header(books, opts);
    header.render(); 
    header.shift('down'); 
  })();
}

function getDriveData(){
  
  // Log the name of every file in the user's Drive.
  var drive_root = DriveApp.getRootFolder();
  var drive_root_url = drive_root.getUrl();// => "https://drive.google.com/drive/folders/0AKQjGqGbfd08Uk9PVA"
  var drive_root_files = drive_root.getFiles();
  var drive_root_folders = drive_root.getFolders();
  var allFiles = {};
  
  while(drive_root_files.hasNext()){
    var file = drive_root_files.next();
    allFiles[file.getId()] = [file.getName(), file.getMimeType()];
  }
  while(drive_root_folders.hasNext()){
    var folder = drive_root_folders.next();
    allFiles[folder.getId()] = [folder.getName()];
  }
  return allFiles;
}

function testGetDriveData(){
  var files = getDriveData();
  Object.keys(files).forEach(function(file){
    Logger.log(files[file]);
  });
}
/**
* Return a list of book volumes matching a give query string
* @see https://developers.google.com/books/docs/v1/reference/volumes/list 
*/
/*
function match(str, opts, callback){
  var volume_name = str;
  // var {version, author, tag} = opTs;
  var cbFunction = callback;
  
  var query = '"root" in parents and trashed = false and mimeType = "application/vnd.google-apps.folder"';
  var pageToken;
  var folders = Drive.Files.list({
    q: query,
    maxResults: 100,
    pageToken: pageToken
  });
  Logger.log(folders);
}
*/

/**
 * Executes the specified action (create a new sheet, copy the active sheet, or
 * clear the current sheet).
 *
 * @param {String} action An identifier for the action to take.
 */
function modifySheets(action) {
  // Use data collected from dialog to manipulate the spreadsheet.
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var currentSheet = ss.getActiveSheet();
  if (action == "create") {
    ss.insertSheet();
  } else if (action == "copy") {
    currentSheet.copyTo(ss);
  } else if (action == "clear") {
    currentSheet.clear();
  }
}

/* */
function emptyStringArrayOfLength(num){
  var arr = [];
  while(arr.length < num) arr.push("");
  return arr;
}