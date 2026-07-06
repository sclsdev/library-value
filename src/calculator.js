/* Library Value Calculator */

/* Yearly Changes */
/* 1) Update the per capita expenditures in the incpercap variable for each library, found in function calculate().
 * Last updated 2024-04-02 (2023 service data)
 *
 * 2) Update the cost of materials & services in the materialsAndServices array, found in function prepareForm() at the bottom of the script
 * Last updated 2024-04-08 (2019 values from Maine Library Service)
 */

// Global variables used by multiple functions
var materialsAndServices = []; 
var validForm = true;
var errorstring = '';

// ULTRA-SIMPLE EVENT ADDING courtesy of Peter Paul Koch, http://www.quirksmode.org/js/eventSimple.html
// When the page loads, prepare the form to respond to input from the user
function addEventSimple(obj,evt,fn) {
	if (obj.addEventListener) {
		obj.addEventListener(evt,fn,false);
	}
	else if (obj.attachEvent) {
		obj.attachEvent('on'+evt,fn);
	}
}

function removeEventSimple(obj,evt,fn) {
	if (obj.removeEventListener) {
		obj.removeEventListener(evt,fn,false);
	}
	else if (obj.detachEvent) {
		obj.detachEvent('on'+evt,fn);
	}
}

// If the calculator is embedded on another site, get a parameter from the URL for library-specific theming
function getQueryVariable(variable)
{
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
}

// Set a dropdown menu item to be preselected based on its value
function selectItemByValue(elmnt, value){
    for(var i=0; i < elmnt.options.length; i++) {
      if(elmnt.options[i].value == value)
      	elmnt.selectedIndex = i;
    }
}

// Calculate the value
function calculate() {	  
// Figure out which library is selected and set the per capita expenditure for that library
	var library;
	library = document.calculator.library.value;
	var incpercap;
	var yourlib;
	var extramsg = "";
// Change this each year when there are new per capita expenditures OR when a new library is added
	switch(library) {
		//if no library is selected, use South Central Library System
		case 'none':
			incpercap = 62.56;
			yourlib = "SCLS LIBRARY SYSTEM";
			break;
		case 'acl':
			incpercap = 28.04;
			yourlib = 'ADAMS COUNTY LIBRARY';
			break;
		case 'alb':
			incpercap =  37.13;
			yourlib = 'ALBERTSON MEMORIAL LIBRARY';
			break;
		case 'amh':
			incpercap = 32.78;
			yourlib = 'LETTIE W. JENSEN LIBRARY';
			break;
		case 'arp':
			incpercap = 31.57;
			yourlib = 'LESTER PUBLIC LIBRARY OF ARPIN';
			break;
		case 'bar':
			incpercap = 43.94;
			yourlib = 'CARNEGIE-SCHADDE MEMORIAL PUBLIC LIBRARY';
			break;
		case 'ber':
			incpercap = 85.95;
			yourlib = 'BLACK EARTH PUBLIC LIBRARY';
			break;
		case 'blv':
			incpercap = 116.40;
			yourlib = 'BELLEVILLE PUBLIC LIBRARY';
			break;
		case 'brd':
			incpercap = 55.50;
			yourlib = 'BRODHEAD MEMORIAL PUBLIC LIBRARY';
			break;
		case 'cbr':
			incpercap = 61.30;
			yourlib = 'CAMBRIDGE COMMUNITY LIBRARY';
			break;
		case 'cia':
			incpercap = 81.93;
			yourlib = 'JANE MORGAN MEMORIAL LIBRARY';
			break;
		case 'col':
			incpercap = 52.88;
			yourlib = 'COLUMBUS PUBLIC LIBRARY';
			break;
		case 'csp':
			incpercap = 73.52;
			yourlib = 'ROSEMARY GARFOOT PUBLIC LIBRARY';
			break;
		case 'dee':
			incpercap = 67.39;
			yourlib = 'DEERFIELD PUBLIC LIBRARY';
			break;
		case 'dft':
			incpercap = 58.25;
			yourlib = 'DEFOREST AREA PUBLIC LIBRARY';
			break;
		case 'fch':
			incpercap = 63.81;
			yourlib = 'FITCHBURG PUBLIC LIBRARY';
			break;
		case 'lav':
			incpercap = 21.41;
			yourlib = 'LAVALLE PUBLIC LIBRARY';
			break;
		case 'ldi':
			incpercap = 41.36;
			yourlib = 'LODI PUBLIC LIBRARY';
			break;
		case 'mar':
			incpercap = 47.22;
			yourlib = 'MARSHALL COMMUNITY LIBRARY';
			break;
		case 'maz':
			incpercap = 52.81;
			yourlib = 'MAZOMANIE FREE LIBRARY';
			break;
		case 'mcf':
			incpercap = 76.16;
			yourlib = 'E.D. LOCKE PUBLIC LIBRARY';
			break;
		case 'mcm':
			incpercap = 63.77;
			yourlib = 'MCMILLAN MEMORIAL LIBRARY';
			break;
		case 'mfd':
			incpercap = 60.00;
			yourlib = 'EVERETT ROEHL MARSHFIELD PUBLIC LIBRARY';
			break;
		case 'mid':
			incpercap = 60.06;
			yourlib = 'MIDDLETON PUBLIC LIBRARY';
			break;
		case 'mnt':
			incpercap = 57.02;
			yourlib = 'MONTICELLO PUBLIC LIBRARY';
			break;	
		case 'moo':
			incpercap = 76.58;
			yourlib = 'MONONA PUBLIC LIBRARY';
			break;
		case 'mad':
			incpercap = 71.52;
			yourlib = 'MADISON PUBLIC LIBRARY';
			break;
		case 'mro':
			incpercap = 69.03;
			yourlib = 'MONROE PUBLIC LIBRARY';
			break;
		case 'mth':
			incpercap = 63.79;
			yourlib = 'MOUNT HOREB PUBLIC LIBRARY';
			break;
		case 'nek':
			incpercap = 57.54;
			yourlib = 'CHARLES & JOANN LESTER LIBRARY';
			break;
		case 'ngl':
			incpercap = 85.71;
			yourlib = 'NEW GLARUS PUBLIC LIBRARY';
			break;
		case 'nof':
			incpercap = 94.59;
			yourlib = 'NORTH FREEDOM PUBLIC LIBRARY';
			break;
		case 'ore':
			incpercap = 74.71;
			yourlib = 'OREGON PUBLIC LIBRARY';
			break;
		case 'par':
			incpercap = 42.56;
			yourlib = 'ANGIE W. COX PUBLIC LIBRARY';
			break;
		case 'stp':
			incpercap = 29.18;
			yourlib = 'PORTAGE COUNTY PUBLIC LIBRARY';
			break;
		case 'pds':
			incpercap = 92.06;
			yourlib = 'RUTH CULVER COMMUNITY LIBRARY';
			break;
		case 'pit':
			incpercap = 22.04;
			yourlib = 'PITTSVILLE COMMUNITY LIBRARY';
			break;	
		case 'pla':
			incpercap = 86.81;
			yourlib = 'KRAEMER LIBRARY & COMMUNITY CENTER';
			break;
		case 'por':
			incpercap = 60.37;
			yourlib = 'PORTAGE PUBLIC LIBRARY';
			break;
		case 'poy':
			incpercap = 58.46;
			yourlib = 'POYNETTE PUBLIC LIBRARY';
			break;
		case 'ran':
			incpercap = 102.24;
			yourlib = 'HUTCHINSON MEMORIAL LIBRARY';
			break;
		case 'ree':
			incpercap = 49.02;
			yourlib = 'REEDSBURG PUBLIC LIBRARY';
			break;
		case 'rio':
			incpercap = 94.01;
			yourlib = 'RIO COMMUNITY LIBRARY';
			break;
		case 'rks':
			incpercap = 62.50;
			yourlib = 'ROCK SPRINGS PUBLIC LIBRARY';
			break;
		case 'rom':
			incpercap = 85.30;
			yourlib = 'LESTER PUBLIC LIBRARY OF ROME';
			break;
		case 'sgr':
			incpercap = 65.95;
			yourlib = 'SPRING GREEN COMMUNITY LIBRARY';
			break;
		case 'skc':
			incpercap = 62.29;
			yourlib = 'GEORGE CULVER COMMUNITY LIBRARY';
			break;
		case 'sto':
			incpercap = 56.66;
			yourlib = 'STOUGHTON PUBLIC LIBRARY';
			break;
		case 'sun':
			incpercap = 50.65;
			yourlib = 'SUN PRAIRIE PUBLIC LIBRARY';
			break;
		case 'ver':
			incpercap = 75.67;
			yourlib = 'VERONA PUBLIC LIBRARY';
			break;
		case 'ves':
			incpercap = 38.13;
			yourlib = 'LESTER PUBLIC LIBRARY OF VESPER';
			break;
		case 'wau':
			incpercap = 84.26;
			yourlib = 'WAUNAKEE PUBLIC LIBRARY';
			break;
		case 'wid':
			incpercap = 89.82;
			yourlib = 'KILBOURN PUBLIC LIBRARY';
			break;
		case 'wyo':
			incpercap = 41.55;
			yourlib = 'WYOCENA PUBLIC LIBRARY';
			break;
	}
	
// Change the yearly per capita expenditure to monthly
	var monthinc = incpercap / 12;
	var totalresult = 0;
	for (var j=0; j<materialsAndServices.length; j++) {
		var serviceValue = materialsAndServices[j][0].value * materialsAndServices[j][1];
		materialsAndServices[j][2].value= serviceValue.toFixed(2);
		totalresult += serviceValue;
	}
	document.getElementById("totalResult").value = totalresult.toFixed(2);
	var personalvalue = totalresult / monthinc;
	document.getElementById("personalvalue").innerHTML = personalvalue.toFixed(2);	
	document.getElementById("yourresult").innerHTML = "<p>*Your personal return on investment is based on your responses and the typical annual tax contribution for <span class='boldthis'>"+yourlib+" patrons</span>. You see a returned value of <span class='boldthis'>$"+personalvalue.toFixed(2)+"</span> for every one dollar invested. " + extramsg + "</p>";	
}

// Form Validation courtesy of Peter Paul Koch
// Check to make sure only numbers are entered
var W3CDOM = (document.getElementsByTagName && document.createElement);

function removeError()
{
	this.className = this.className.substring(0,this.className.lastIndexOf(' '));
	this.parentNode.removeChild(this.hasError);
	this.hasError = null;
	this.onchange = null;
}

function writeError(obj,message) {
	validForm = false;
	if (obj.hasError) { return; }
	if (W3CDOM) {
		obj.className += ' errorMessage';
		obj.onchange = removeError;
		var labelElement = document.createElement('label');
		labelElement.className = 'errorMessage';
		labelElement.appendChild(document.createElement('br'));
		labelElement.appendChild(document.createTextNode(message));
		obj.parentNode.appendChild(labelElement);
		obj.hasError = labelElement;
		
	}
	else {
		errorstring += obj.name + ': ' + message + '\n';
		obj.hasError = true;
	}
}
function doChecks() {
	for (var i=0;i<materialsAndServices.length;i++) {
		if (isNaN(materialsAndServices[i][0].value)) {
			writeError(materialsAndServices[i][0],'Enter a number');
		}
	}
	if (!W3CDOM) { alert(errorstring); }
	return validForm;
}

function validate() {
	var validForm = true;
	validForm = doChecks();
	calculate();
}

// Helper function courtesty of Dustin Diaz, http://www.dustindiaz.com/getelementsbyclass/
function getElementsByClass(searchClass,node,tag) {
	var classElements = [];
	if ( node === null ) { node = document; }
	if ( tag === null ) { tag = '*'; }
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

// Override the reset button's normal default actions to remove error messages
function resetForm() {
	var preCalcValue = 0;
	for (var i=0;i<materialsAndServices.length;i++) { 
		materialsAndServices[i][0].value = '';
		if (materialsAndServices[i][0].className) {
			materialsAndServices[i][0].className = materialsAndServices[i][0].className.substring(0,materialsAndServices[i][0].className.lastIndexOf(' '));
			materialsAndServices[i][0].hasError = null;
			materialsAndServices[i][0].onchange = null;
		}
		materialsAndServices[i][2].value = preCalcValue.toFixed(2);
	}
	var errorMsgs = getElementsByClass('errorMessage', document, 'label');
	for (var j=0;j<errorMsgs.length;j++) {
		 errorMsgs[j].parentNode.removeChild(errorMsgs[j]);
	}
	document.calculator.library.value = 'none';
	document.getElementById("totalResult").value = preCalcValue.toFixed(2);
	document.getElementById("personalvalue").innerHTML = preCalcValue.toFixed(2);
	document.getElementById("yourresult").innerHTML = '';
	validForm = true;
	errorstring = '';
}

// Set up event listeners for all the stuff in the form that needs an event listener
function prepareForm() {	

// Process variables passed via URL for embedded calculator theming

// Pre-selected library
var lib = getQueryVariable("selectlib");
if (lib){
	selectItemByValue(document.getElementById("library"), lib);
}

// Font family class
var fontFamily = getQueryVariable("ffclass");
if (fontFamily) {
	var classSeparator = '';
	if (document.body.className) {
		classSeparator = ' ';
	}
	document.body.className = document.body.className + classSeparator + fontFamily;
}

// Identify the inputs for each material/service and the value of each 
// Change this if prices go up
// The format is  ['<input> element to get the quantity from', dollarValue, '<input> element to put the total value']
	materialsAndServices = [[document.getElementById('books'), 22, document.getElementById('booksResult')],
							[document.getElementById('movie'), 18, document.getElementById('movieResult')],
							[document.getElementById('cd'), 13, document.getElementById('cdResult')],
							[document.getElementById('audio'), 27, document.getElementById('audioResult')],
							[document.getElementById('download'), 10, document.getElementById('downloadResult')],
							[document.getElementById('magazine'), 5, document.getElementById('magazineResult')],
							[document.getElementById('libmag'), 9, document.getElementById('libmagResult')],
							[document.getElementById('meeting'), 50, document.getElementById('meetingResult')],
							[document.getElementById('computer'), 12, document.getElementById('computerResult')],
							[document.getElementById('database'), 10, document.getElementById('databaseResult')],
							[document.getElementById('reference'), 19, document.getElementById('referenceResult')],
							[document.getElementById('programAdult'), 12, document.getElementById('programAdultResult')],
							[document.getElementById('programChild'), 10, document.getElementById('programChildResult')]
							];
// A single onchange or onclick event on any input can trigger the validate function
	for (var i=0;i<materialsAndServices.length;i++) {
		if (materialsAndServices[i][0]) {
			addEventSimple(materialsAndServices[i][0], 'blur', validate);
		}
	}
	addEventSimple(document.getElementById('calcsubmit'), 'click', validate);
	addEventSimple(document.getElementById('reset'), 'click', resetForm);
}

addEventSimple(window,"load",prepareForm);