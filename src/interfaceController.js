/**
 *  @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

/**
 * Adds a custom menu with items to show the sidebar and dialog.
 *
 * @param {Object} e The event parameter for a simple onOpen trigger.
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
<<<<<<< HEAD
  ui
  .createMenu()
=======

  ui
  .createAddonMenu()
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
  .addItem('GetDriveData', 'showUpLoadBar')
  .addToUi();

  showUploadBar();
}

/**
 * Opens a sidebar. The sidebar structure is described in the Sidebar.html
 * project file.
 
 * For example,
 
 function doGet(request) {
  return HtmlService.createTemplateFromFile('Page')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

 */
function showUpLoadBar() {
  var ui = HtmlService.createTemplateFromFile('uploadBar')
  .evaluate()
  .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showSidebar(ui);
}

<<<<<<< HEAD
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
 * Global Variables
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
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class

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
function testColumns(){
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
  this.ss = null;
  this.sheet =null;
  this.row = opts && opts.start.row ? opts.start.row : 1;
  this.column = opts && opts.start.column ? opts.start.column : 1;
  this.width = opts && opts.width ? opts.width : 1;
<<<<<<< HEAD
  this.updatedBy = "";
  this.updatedDate = Date.now();
  this.updatedNum = "";
=======
  this.update = { by: "", data: null, num: 0};
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
}

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

/* Render new header on current active sheet */
Header.prototype.render = function(opts){
  var self = this;
  self.ss =  opts && opts.ss ? opts.ss : SpreadsheetApp.getActiveSpreadsheet();
<<<<<<< HEAD
  self.sheet = opts && opts.sheet ? opts.sheet: self.ss.getActiveSheet();
=======
  self.sheet = opts && opts.sheet ? opts.sheet : self.ss.getActiveSheet();

  function _render(type, range, values, background, fColor, fHorz, fVert, fSize){
    range
    .setBackground(background)
    .setFontColor(fColor)
    .setHorizontalAlignment(fHorz)
    .setVerticalAlignment(fVert)
    .setFontSize(fSize)
    .setValues(values);
  }
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class

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

  var components = [{
    name: "main",
    range: (function (){ return self.sheet.getRange(self.row, self.column, self.width, self.index.length); })(),
    values: _header_rows,
    background: PRIMARY_COLOR,
    fColor: PRIMARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  },
  {
<<<<<<< HEAD
    name: "componentFields",
    range: self.sheet.getRange(self.row + 1, self.column + 1, 3, 1),
=======
    name: "updateFields",
    range: (function (){return self.sheet.getRange(self.row + 1, self.column + 1, 3, 1); })(),
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
    values: [['By:'], ['Date:'], ['\#\{Entries\}']],
    background: HEADER_COMPONENT_PRIMARY_COLOR,
    fColor: PRIMARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  },
  {
<<<<<<< HEAD
    name: "compoenentValues",
    range: self.sheet.getRange(self.row + 1, self.column + 2, 3, 1),
    values: [[self.updatedBy], [self.updatedDate], [self.updatedNum]],
=======
    name: "updateValues",
    range: (function (){ return self.sheet.getRange(self.row + 1, self.column + 2, 3, 1); })(),
    values: [[self.updated.by], [self.updated.date], [self.updated.num]],
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
    background: HEADER_COMPONENT_SECONDARY_COLOR,
    fColor: SECONDARY_FONT_COLOR,
    fHorz: HEADER_TEXT_HORZ_ALIGNMENT,
    fVert: HEADER_TEXT_VERT_ALIGNMENT,
    fSize: HEADER_FONT_SIZE
  }];

<<<<<<< HEAD
  function _render(type, range, values, background, fColor, fHorz, fVert, fSize){
    range()
    .setBackground(background)
    .setFontColor(fColor)
    .setHorizontalAlignment(fHorz)// 'center'
    .setVerticalAlignment(fVert)// 'middle'
    .setFontSize(fSize)// 14
    .setValues(values);
  }

  for( var i = 0; i < components.length ){
   _render(components[i].name,
	  components[i].range(),
=======
  for( var i = 0; i < components.length ){
   _render(components[i].name,
	  components[i].range,
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
	  components[i].values,
	  components[i].background,
	  components[i].fColor,
	  components[i].fHorz,
	  components[i].fVert,
	  components[i].fSize );
  }
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


/**
 * Test for 'makeHeader'
 */
function testHeader(){
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

  var dice = {};
  var tests = {};
  var candidates = [];
  var tests = [];
  var fails = [];
=======
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
  var dice = {};
  var tests = {}; 
  var candidates = [];
  var fails = []; 
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======
  var tests = {};
  var candidates = [];
  var fails = [];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class

  function getFuncName() {
    return getFuncName.caller.name;
  }
<<<<<<< HEAD
<<<<<<< HEAD

  function getTest(testId){
    var defaultTestId = [4, 4, 5, 0, 0];
=======
  
<<<<<<< HEAD
<<<<<<< HEAD
  function getTest(params){
    var testId = !!params? params: [];
>>>>>>> [WIP] Building Testing Framework: TestApi Endpoints
=======
  function getTest(testId){
    var defaultTestIds = [4, 4, 5, 0, 0];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======

  function getTest(testId){
    var defaultTestIds = [4, 4, 5, 5, 5];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
=======
  function getTest(testId){
    var defaultTestIds = [4, 4, 5, 0, 0];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll

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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    var idx = {};
    idx.vol = 0;
    idx.ss = 1;
    idx.sheet = 2;
    idx.row = 3;
    idx.col = 4;
    idx.width = 5;

<<<<<<< HEAD
<<<<<<< HEAD
    // Given an arbitrary natuaral number, N, this function will return a 'random' second natuaral number in the interval [0,N) 
    var randNat = function(maxSize) { return Math.floor(maxSize*Math.random()); };
<<<<<<< HEAD

=======
    // Given an arbitrary positive integer, N, this function will return and randon integer in the interval [0,N) 
    var randInt = function(N) { return Math.floor(N*Math.random()); };
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======
    // Given an arbitrary natuaral number, N, this function will return a 'random' second natuaral number in the interval [0,N) 
    var randNat = function(maxSize) { return Math.floor(maxSize*Math.random()); };
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    
>>>>>>> [WIP] Building Testing Framework: TestApi Endpoints
    // Common initialization values
    var Opts = [null, "", [], {} ];
=======
    function getDice(opts){
      var dice = {};
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class

      // Given an arbitrary natuaral number, N, this function will return a 'random' second natuaral number in the interval [0,N) 
      var randNat = function(maxSize) { return Math.floor(maxSize*Math.random()); };

<<<<<<< HEAD
<<<<<<< HEAD
    /** [DEP] Keep until we confirm the corresponding section is confirmed to have worked as intended*/ 
=======
    try{
      dice.sheet = Opts.concat([dice.ss[4].getActiveSheet(), SpreadsheetApp.getActiveSheet()]);
    }catch(e){
      fails.push(e);
      // Logger.log(e);
    }
    dice.row = Opts.concat([NaN, 0, randNat(10), -1*randNat(8)]);
    dice.col = Opts.concat([NaN, 0, randNat(9), -1*randNat(11)]);
    dice.width = Opts.concat([NaN, 0, randNat(3), -1*randNat(5)]);
=======
      // Common initialization values
      var Opts = [null, "", [], {} ];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class

      // Create a die
      dice.vol = Opts.concat([gVol]);
      try{
        dice.ss = Opts.concat([SpreadsheetApp.getActiveSpreadsheet()]);
      }catch(e){
        fails.push(e);
        // Logger.log(e);
      }

<<<<<<< HEAD
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
=======
    // Create a die
    dice.vol = Opts.concat([gVol]);
    try{
      dice.ss = Opts.concat([SpreadsheetApp.getActiveSpreadsheet()]);
    }catch(e){
      fails.push(e);
      Logger.log(e);
    }

    try{
      dice.sheet = Opts.concat([dice.ss[4].getActiveSheet(), SpreadsheetApp.getActiveSheet()]);
    }catch(e){
      fails.push(e);
      Logger.log(e);
    }
    dice.row = Opts.concat([NaN, 0, randNat(10), -1*randNat(8)]);
    dice.col = Opts.concat([NaN, 0, randNat(9), -1*randNat(11)]);
    dice.width = Opts.concat([NaN, 0, randNat(3), -1*randNat(5)]);

>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    // Set the index based on 'testId' parameters
    var isValidTestId = testId.constructor.name != "Array" || testId === null;
    var Idx = Object.keys(idx);
    Idx.forEach(function(VAL){
<<<<<<< HEAD
      Logger.log(VAL);

      var testIdx = Idx.indexOf(VAL, 0)
      idx[VAL] = !isValidTestId ? randNat( dice[VAL].length ) : !!tesId[testIdx] && typeof testId[testIdx] == "number" ? testId[testIdx] : defaultTestIds[testIdx];
      Logger.log(idx[VAL]);
    });

<<<<<<< HEAD
    /** [DEP] Keep until we confirm the corresponding section is confirmed to work */ 
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======
    /** [DEP] Keep until we confirm the corresponding section is confirmed to have worked as intended*/ 
>>>>>>> [WIP] Building Testing Framework: Collecting Errors instead of Logging Them
=======
      var testIdx = Idx.indexof(VAL);
      idx[VAL] = !isValidTestId ? randNat( dice[VAL].length ) : !!tesId[testIdx] && typeof testId[testIdx] == "number" ? testId[testIdx] : defaultTestIds[testIdx];
    });

    /** [DEP] Keep until we confirm the corresponding section is confirmed to work */ 
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll

    // // Set the index based on 'testId' parameters
    // vols_Idx = !isValidTestId ? randNat( dice.vol.length ) : !!tesId[0] && typeof testId[0] == "number" ? testId[0] : 4;
    // ss_Idx = !isValidTestId ? randNat( dice.ss.length ) : !!tesId[1]  && typeof testId[1] == "number" ? testId[1] : 4 ;
    // sheet_Idx = !isValidTestId ? randNat( dice.sheet.length ) : !!tesId[2]  && typeof testId[2] == "number" ? testId[2] : 5;
    // row_Idx = !isValidTestId ? randNat( dice.row.length ) : !!tesId[3]  && typeof testId[3] == "number" ? testId[3] : 0;
    // col_Idx = !isValidTestId ? randNat( dice.col.length ) : !!tesId[4]  && typeof testId[4] == "number" ? testId[4] : 0;
    // width_Idx = !isValidTestId ? randNat( dice.width.length ) : !!tesId[5]  && typeof testId[5] == "number" ? testId[5] : 0;

<<<<<<< HEAD

    // Accept correct params or Set 'safe' defaults
    testModel.vol = dice.vol[ idx.vol ];
=======
    // Accept correct params or Set 'safe' defaults
    testModel.vols = dice.vol[ idx.vol ];
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    testModel.opts.ss = dice.ss[ idx.ss ];
    testModel.opts.sheet = dice.sheet[ idx.sheet ];
    testModel.opts.start.row = dice.row[ idx.row ];
    testModel.opts.start.col = dice.col[ idx.col ];
    testModel.opts.width = dice.width[ idx.width ];
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
    
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
=======
    
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    return testModel;
  }

  function before(){
<<<<<<< HEAD
      /**
       * [TODO] Create a sheet in which to run the tests
       *
       * "Before I begin runnning the tests, I will create "
       * */
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
    try{
      // Getting the Active SpreadSheet
<<<<<<< HEAD
      Logger.log("In 'before' but it doesn't do anything just yet")
      tests[i] = getTest([null, null, null, 4, 5, 6]);
      // Create a new sheet

=======
      SpreadsheetApp.getActiveSpreadsheet();

      // Create a new sheet

      // Create 
    tests[current_idx] = getTest([null, null, null, ]);
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll
    }catch(e){
       Logger.log("There was an error in the before function. The following error was thrown: "+e);
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  /**
   * [TODO]
   *
   *
=======
  /** 
   * [TODO] 
   * 
   * 
>>>>>>> [WIP] Building Testing Framework: TestApi Endpoints
   * */
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
  function beforeEach(current_idx){
<<<<<<< HEAD

    tests[current_idx] = getTest([null, null, null, ]);
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice Roll

    try{
      headings = Columns(tests[current_idx].vols, "__t ${ current_idx } t__", 0);
      options = tests[current_idx].opts;
      candidates.push(new Header(headings, options));
    }catch(e){
      fails.push("Failed " + getFuncName() + " @ index " + current_idx  + " with error: " + e);
      // Logger.log(e)
    }
  }

<<<<<<< HEAD
  /**
   * [TODO] Run the test
   *
   * "For the candidate at position @current_idx , "
   * */
=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
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

<<<<<<< HEAD
=======
  function testingShift(current_idx){
    var testResults = true;
    return testResults;
 }

>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
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
<<<<<<< HEAD

=======
>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
  return RunTheTests();
}

function TestingSuite(opts){
  this.opts = !!opts ? opts : {};
  this.ss = null;
  this.sheet = null;
  this.lastRun = !!opts.lastRun ? opts.lastRun : {};
  this.lastRun.date = !!opts.lastRun.date ? opts.lastRun.data : new Date();
  this.lastRun.results = !!opts.lastRun.results ? opts.lastRun.results : true;
}

function getAllDriveData(){

  // Log the name of every file in the user's Drive.
  var allFiles = {};
  var allFolders = {};
<<<<<<< HEAD
  var drive_root;
  try{
    drive_root = DriveApp.getRootFolder();
  }catch(e){
    Logger.log(e);
  }
  
=======

>>>>>>> [WIP] Building Testing Framework: Refactoring the Dice into a class
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
  return { allFiles, allFolders };
}

function testGetAllDriveData(){
  var { allFiles, allFolders }  = getAllDriveData();
  Logger.log(allFiles);
  Logger.log(allFolders);
}
