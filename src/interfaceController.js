/**
 *  @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 *
 * Global Variables
 */
var COLUMN_WIDTH = '16px';
var ROW_HEIGHT = '32px';
var PRIMARY_COLOR = '#8B0000'; // Dark Red: (139,0,0)
var PRIMARY_FONT_COLOR = '#ffffff'; // White: (255,255,255)
var SECONDARY_FONT_COLOR = '#0000000';
var SECONDARY_COLOR = '#808080'; // Gray: (128,128,128)
var TERNARYARY_COLOR = '#C0C0C0'; // Silver: (192,192,192)
var SIDEDBAR_TITLE = 'Upload Data 2 Drive';
var SIDEBAR_HEIGTH = '600';
var SIDEBAR_WIDTH = '400';
var HEADER_TEXT_HORZ_ALIGNMENT = 'center';
var HEADER_TEXT_VERT_ALIGNMENT = 'middle';
var HEADER_FONT_SIZE = 14;
var HEADER_COMPONENT_PRIMARY_COLOR ='#e6b8af';
var HEADER_COMPONENT_SECONDARY_COLOR ='#e6b8af';
/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui 
  .createAddonMenu()
  .addItem('GetDriveData', 'showUpLoadBar')
  .addToUi();
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 */
function showUpLoadBar() {
  var ui = HtmlService.createTemplateFromFile('uploadBar')
  .evaluate()
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
var mimeTypes = {
  'audio': 'application/vnd.google-apps.audio',
  'document': 'application/vnd.google-apps.document',
  'drawing': 'application/vnd.google-apps.drawing',
  'file': 'application/vnd.google-apps.file',
  'folder': 'application/vnd.google-apps.folder',
  'form': 'application/vnd.google-apps.form',
  'fusiontable': 'application/vnd.google-apps.fusiontable',
  'map': 'application/vnd.google-apps.map',
  'photo': 'application/vnd.google-apps.photo',	
  'presentation': 'application/vnd.google-apps.presentation',
  'script': 'application/vnd.google-apps.script',
  'site': 'application/vnd.google-apps.site',
  'spreadsheet': 'application/vnd.google-apps.spreadsheet',
  'unknown': 'application/vnd.google-apps.unknown',	
  'video': 'application/vnd.google-apps.video',	
  'drive-sdk': 'application/vnd.google-apps.drive-sdk'
};

var mimeTypes_keys = Object.keys(mimeTypes);


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
  this.visible = true;
  
  this.ss = opts && opts.ss ? opts.ss : SpreadsheetApp.getActiveSpreadsheet();
  this.sheet = opts && opts.sheet ? opts.sheet: this.ss.getActiveSheet();
  this.row = opts && opts.start.row ? opts.start.row : 1;
  this.column = opts && opts.start.column ? opts.start.column : 1;
  this.width = opts && opts.width ? opts.width : 1; 
  
  this.updatedBy = this.ss.getEditors();
  this.updatedDate = Date.now();
  this.updatedNum = this.ss.getLastRow();
} 

Header.prototype.isEqualTo = function(obj){
  var self = this;
  var isSameHeader = true;
  if(typeof obj === typeof self){
    Object.keys(obj).reduce(function(acc, curr){return acc && (obj[curr] == self[curr]);}, isSameHeader);
  }
  return isSameHeaders;
};

/* Render new header on current active sheet */ 
Header.prototype.render = function(){ 
  var self = this;
  var headings = [self.index];
  var header_range = self.sheet.getRange(self.row, self.column, headings.length, self.index.length);
  var update_component_fields = SpreadsheetApp.getActiveSheet().getRange(self.row + 1, self.column + 1, 3, 1);
  var update_component_values = SpreadsheetApp.getActiveSheet().getRange(self.row + 1, self.column + 2, 3, 1);
  
  while(headings.length < self.width)headings.push(emptyStringArrayOfLength(self.index.length));
  
  headings.reverse();
  
  header_range
  .setBackground(PRIMARY_COLOR) 
  .setFontColor(PRIMARY_FONT_COLOR)
  .setHorizontalAlignment(HEADER_TEXT_HORZ_ALIGNMENT)// 'center'
  .setVerticalAlignment(HEADER_TEXT_VERT_ALIGNMENT)// 'middle'
  .setFontSize(HEADER_FONT_SIZE)// 14
  .setValues(headings);
  
  update_component_fields
  .setBackground(HEADER_COMPONENT_PRIMARY_COLOR)
  .setFontColor(PRIMARY_FONT_COLOR)
  .setHorizontalAlignment(HEADER_TEXT_HORZ_ALIGNMENT)// 'center'
  .setVerticalAlignment(HEADER_TEXT_VERT_ALIGNMENT)// 'middle'
  .setFontSize(HEADER_FONT_SIZE)// 14
  .setValues(['By:', 'Date:', '\#\{Entries\}']);

  update_component_values
  .setBackground(HEADER_COMPONENT_SECONDARY_COLOR)
  .setFontColor(SECONDARY_FONT_COLOR)
  .setHorizontalAlignment(HEADER_TEXT_HORZ_ALIGNMENT)// 'center'
  .setVerticalAlignment(HEADER_TEXT_VERT_ALIGNMENT)// 'middle'
  .setFontSize(HEADER_FONT_SIZE)// 14
  .setValues([self.updatedBy, self.updatedDate, self.updatedNum]);
};

/* Shift the header X units to the right */ 
Header.prototype.shift = function(amount, direction){
  var self = this;

  self.sheet.deleteRows(self.row, self.width);
  while(amount > 0){
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
    amount--;
  }
  self.render();
};


Header.prototype.hide = function(){
  var self = this;
  // self.sheet.
};

Header.prototype.update = function(){};


/**
 * Tester for 'makeHeader'
 */
function test_Header(){
  var ss =null;
  var sheet = null;
  var headers = [];
  var books = Columns(gVol, " ", 0);
  try{
    //before
    ss =  SpreadsheetApp.getActiveSpreadsheet();
    sheet = ss.getActiveSheet();
  }catch(e){
    Logger.log(e);
  }
  var tests = [
    { 
      opts:{
        ss: ss,
        sheet: sheet,
        start: {
          row: 3,
          column: 2
        },
        width: 3
      }
    },
    { 
      opts:{
        ss: " ",
        sheet: sheet,
        start: {
          row: 3,
          column: 2
        },
        width: 3
      }
    },
    { 
      opts:{
        ss: null,
        sheet: sheet,
        start: {
          row: 3,
          column: 2
        },
        width: 3
      }
    }
  ];
  
  function beforeEach(current_idx){
    sheet.getRange(row, column, numRows, numColumns).clearContent();
    headers.push(new Header(books, tests[current_idx].opts));
    Logger.log('test'+i);
  }
  function run(current_idx){
    // grab drive data and convert it to a header

  }
  function afterEach(current_idx){
    headers[current_idx].render();
  }

  (
    function Result(){
      for(var i = 0; i < tests.length; i++){
        var result = false;
        beforeEach(i);
        afterEach(i);
        return result;
      }
    }
    )();
  
}

function getAllDriveData(){
  
  // Log the name of every file in the user's Drive.
  var drive_root = DriveApp.getRootFolder();
  var drive_root_url = drive_root.getUrl();// => "https://drive.google.com/drive/folders/0AKQjGqGbfd08Uk9PVA"
  var allFiles = {};
  var allFolders = {};
  
  function walk(folder, sep){
    var folderName = folder.getName();
    var files = folder.getFiles();
    while(files.hasNext()){
      var file = files.next();
      var fileId = file.getId();
      var fileName = file.getName();
      var fileType = file.getMimeType();
      
      if(fileType != mimeTypes.folder){
        allFiles[fileId] = [folderName + sep + fileName, fileType]; 
      } else {
        allFolders[folder.getId()] = folderName;
        walk(file, sep);
      }
    }
  }
  walk(drive_root, ".");
  return [allFiles, allFolders];
}

function testGetAllDriveData(){
  var data = getAllDriveData();
  var allFiles = data[0];
  var allFolders = data[1];
  Logger.log(allFiles);
  Logger.log(allFolders);
}

function emptyStringArrayOfLength(num){
  var arr = [];
  while(arr.length < num) arr.push("");
  return arr;
}
