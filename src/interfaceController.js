/**
 *  @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

/** 
 * Global UI Variables
 *
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
var HEADER_FONT_SIZE = 14;


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

/** 
* Google mimeTypes 
*
*
* [TODO] Find the reference for this
*/
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

/*************************************************************
*                     * Utility Functions *                  *
**************************************************************/

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
};

/*************************************************************
*                   * UI Display Functions *                 *
**************************************************************/
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

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

// Prevent forms from submitting.
function preventFormSubmit() {
  var forms = document.querySelectorAll('form');
  for (var i = 0; i < forms.length; i++) {
    forms[i].addEventListener('submit', function(event) {
      event.preventDefault();
    });
  }
}

/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('filePickerExample.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select Folder');
}

/*************************************************************
*                       * Main Functions *                   *
**************************************************************/

/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile('filePickerExample.html')
      .setWidth(600)
      .setHeight(425)
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(html, 'Select Folder');
}

/*************************************************************
*                       * Main Functions *                   *
**************************************************************/

/**
 * Initialize the header object
 */
function Header(columns, opts){
  this.columns = columns;
  this.index =  Object.keys(this.columns);
  this.visible = true;
  this.ss = null;
  this.sheet =null;
  this.row = opts && opts.start.row ? opts.start.row : 1;
  this.column = opts && opts.start.column ? opts.start.column : 1;
  this.width = opts && opts.width ? opts.width : 1;
  this.update = { by: "", data: null, num: 0};
}

// Compare two header objects
Header.prototype.isEqualTo = function(obj){
  var self = this;
  var isSameHeader = true;
  if(typeof obj === typeof self){
    Object.keys(obj).reduce(function(acc, curr){
      return acc && (obj[curr] == self[curr]);
    }, isSameHeader);
  }
  return isSameHeader;
};

/* Render a header object on current active sheet */ 
Header.prototype.render = function(opts){ 
  var self = this;
  self.ss =  opts && opts.ss ? opts.ss : SpreadsheetApp.getActiveSpreadsheet();
  self.sheet = opts && opts.sheet ? opts.sheet: self.ss.getActiveSheet();
    
  function emptyStringArrayOfLength(num){
    var arr = [];
    while(arr.length < num) arr.push("");
    return arr;
  }

  var _header_rows = [self.index];
  
  while(_header_rows.length < self.width){
    _header_rows.push(emptyStringArrayOfLength(self.index.length));
  }
  _header_rows.reverse();
  
  var _header_metadata = {};
  var components = [{
    name: "main",
    range: function (){ return self.sheet.getRange(self.row, self.column, self.width, self.index.length); },
    values: _header_rows,
    background: PRIMARY_COLOR,
    fColor: PRIMARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  },
  {
    name: "componentFields",
    range: self.sheet.getRange(self.row + 1, self.column + 1, 3, 1),
    values: [['By:'], ['Date:'], ['\#\{Entries\}']],
    background: HEADER_COMPONENT_PRIMARY_COLOR,
    fColor: PRIMARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  },
  {
    name: "compoenentValues",
    range: self.sheet.getRange(self.row + 1, self.column + 2, 3, 1),
    values: [[self.updatedBy], [self.updatedDate], [self.updatedNum]],
    background: HEADER_COMPONENT_SECONDARY_COLOR,
    fColor: SECONDARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  }];
  
  function _render(type, range, values, background, fColor, fHorz, fVert, fSize){
    range
    .setBackground(background) 
    .setFontColor(fColor)
    .setHorizontalAlignment(fHorz)// 'center'
    .setVerticalAlignment(fVert)// 'middle'
    .setFontSize(fSize)// 14
    .setValues(values);
  }

  _render(components[0].name, 
    components[0].range(), 
    components[0].values, 
    components[0].background, 
    components[0].fColor, 
    components[0].fHorz, 
    components[0].fVert, 
    components[0].fSize );
};

/* Shift the header X units to the right */
Header.prototype.shift = function(amount, direction){
  var self = this;
 var amount = amount ? amount : 0;
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
  self.sheet.getRange(self.row, self.column, self.width, self.index.length).hideRange();
};

Header.prototype.update = function(){};


function getAllDriveData(){

  // Log the name of every file in the user's Drive.
  var drive_root = DriveApp.getRootFolder();
  var allFiles = {};
  var allFolders = {};
  
  function walk(folder, sep){
     // Get folder data
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

/**
* returns an authentication token needed in order to use the file picker
*
*/
function getOAuthToken() {
  DriveApp.getRootFolder();
  return DriveApp.getOAuthToken();;
}
/*************************************************************
*                  * Testing Suite Functions *               *
**************************************************************/

/**
* This tests the function, @makeCoumn by providing an object 
* representing a database document model.   
*    
* @test
*/
function testColumns(){
  var columns = Columns(gVol, "_", 0);
  Object.keys(columns).forEach(function(col){
    Logger.log([col, columns[col]]);
  });
}

/**
* Test for 'makeHeader'
*/
function testHeader(){
  var dice = {};
  var tests = {}; 
  var candidates = [];
  var fails = []; 

  function getFuncName() {
    return getFuncName.caller.name;
  }

  function getTest(testId){
    var defaultTestIds = [4, 4, 5, 5, 5];

    // Test-object model
    var testModel = {
      vol: null,
      opts: {
        ss: null,
        sheet: null,
        start:{
          row: null,
          col: null,
        },
        width: null
      }
    };

    var idx = {};
    idx.vol = 0;
    idx.ss = 1;
    idx.sheet = 2;
    idx.row = 3;
    idx.col = 4;
    idx.width = 5;

    function getDice(opts){
      var dice = {};

      // Given an arbitrary natuaral number, N, this function will return a 'random' second natuaral number in the interval [0,N) 
      var randNat = function(maxSize) { return Math.floor(maxSize*Math.random()); };

      // Common initialization values
      var Opts = [null, "", [], {} ];

      // Create a die
      dice.vol = Opts.concat([gVol]);
      try{
        dice.ss = Opts.concat([SpreadsheetApp.getActiveSpreadsheet()]);
      }catch(e){
        fails.push(e);
        // Logger.log(e);
      }

      try{
        dice.sheet = Opts.concat([dice.ss[4].getActiveSheet(), SpreadsheetApp.getActiveSheet()]);
      }catch(e){
        fails.push(e);
        // Logger.log(e);
      }
      dice.row = Opts.concat([NaN, 0, randNat(10), -1*randNat(8)]);
      dice.col = Opts.concat([NaN, 0, randNat(9), -1*randNat(11)]);
      dice.width = Opts.concat([NaN, 0, randNat(3), -1*randNat(5)]);
    }
    // Set the index based on 'testId' parameters
    var isValidTestId = testId.constructor.name != "Array" || testId === null;
    var Idx = Object.keys(idx);
    Idx.forEach(function(VAL){
      Logger.log(VAL);
      var testIdx = Idx.indexOf(VAL, 0)
      idx[VAL] = !isValidTestId ? randNat( dice[VAL].length ) : !!tesId[testIdx] && typeof testId[testIdx] == "number" ? testId[testIdx] : defaultTestIds[testIdx];
      Logger.log(idx[VAL]);
    });

    /** [DEP] Keep until we confirm the corresponding section is confirmed to have worked as intended*/ 

    // // Set the index based on 'testId' parameters
    // vols_Idx = !isValidTestId ? randNat( dice.vol.length ) : !!tesId[0] && typeof testId[0] == "number" ? testId[0] : 4;
    // ss_Idx = !isValidTestId ? randNat( dice.ss.length ) : !!tesId[1]  && typeof testId[1] == "number" ? testId[1] : 4 ;
    // sheet_Idx = !isValidTestId ? randNat( dice.sheet.length ) : !!tesId[2]  && typeof testId[2] == "number" ? testId[2] : 5;
    // row_Idx = !isValidTestId ? randNat( dice.row.length ) : !!tesId[3]  && typeof testId[3] == "number" ? testId[3] : 0;
    // col_Idx = !isValidTestId ? randNat( dice.col.length ) : !!tesId[4]  && typeof testId[4] == "number" ? testId[4] : 0;
    // width_Idx = !isValidTestId ? randNat( dice.width.length ) : !!tesId[5]  && typeof testId[5] == "number" ? testId[5] : 0;


    // Accept correct params or Set 'safe' defaults
    testModel.vol = dice.vol[ idx.vol ];
    testModel.opts.ss = dice.ss[ idx.ss ];
    testModel.opts.sheet = dice.sheet[ idx.sheet ];
    testModel.opts.start.row = dice.row[ idx.row ];
    testModel.opts.start.col = dice.col[ idx.col ];
    testModel.opts.width = dice.width[ idx.width ];
    
    return testModel;
  }
  
  /** 
  * [TODO] Create a sheet in which to run the tests 
  * 
  * "Before I begin runnning the tests, I will create "
  * */ 
  function before(){
    try{
      // Getting the Active SpreadSheet
      SpreadsheetApp.getActiveSpreadsheet();

      // Create a new sheet

    }catch(e){
      // Logger.log(e);
    }
  }

  /** 
  * [TODO] 
  * 
  * 
  * */
  function beforeEach(current_idx){
    tests[current_idx] = getTest([null, null, null, ]);
    try{
      headings = Columns(tests[current_idx].vols, "__t ${ current_idx } t__", 0);
      options = tests[current_idx].opts;
      candidates.push(new Header(headings, options));
    }catch(e){
      fails.push("Failed " + getFuncName() + " @ index " + current_idx  + " with error: " + e);
      // Logger.log(e)
    }
  }

  /**
  * [TODO] Run the test 
  * 
  * "For the candidate at position @current_idx , "
  */
  function testingRender(current_idx){
    var testResults = true;
    try{
     testResults = candidates[current_idx].render();
	// this shoud simply test if the test was rendered
    }catch(e){
      fails.push("Failed " + getFuncName() + " @ index " + current_idx  + " with error: " + e);

      // Logger.log(e);
    }
    Logger.log(testResults);
    return testResults;
  }

  /**
  * [TODO] Run the test 
  * 
  * "For the candidate at position @current_idx , "
  */
  function afterEach(current_idx){
    try{
      candidates[current_idx].render();
    }catch(e){
      fails.push("Failed " + getFuncName() + " @ index " + current_idx  + " with error: " + e);
      // Logger.log(e);
    }
  }

  function after(){}

  function RunTheTests(){
    var passedAll = true;
    before();
    for(var i = 0; i < Object.keys(tests).length; i++){
      beforeEach(i);
      passedAll = passedAll && testingRender(i);
      // passedAll = passedAll && testingShift(i);
      // passedAll = passedAll && testingHide(i);
      // passedAll = passedAll && testingDestroy(i);
      afterEach(i);
    }
    after();
    return passedAll;
  }
  return RunTheTests();
}

function testGetAllDriveData(){
  var data = getAllDriveData();
  var allFiles = data[0];
  var allFolders = data[1];
  Logger.log(allFiles);
  Logger.log(allFolders);
}
