// script &copy; Berislav Lopac 2002
// succesfully tested on: IE6

// SETTINGS ------------------------------------------------------------\\
// definitions of various common variables
// these can be altered to modify the menus

// width of the menu
var waMenuWidth = 212;

// urls of various files required by the menus
var waMenuXslFile = 'xslt/wamenu.xslt';
var waBarXslFile = 'xslt/wabar.xslt';
var cssFile = 'styles/wamenu.css';
var waMenuScriptFile = 'scripts/wamenu.js';
var modifyTreeScriptFile = 'scripts/modtree.js';

// path to the folder with XML files containing the menu definitions
var waMenusLoc = 'menus/';
var waBarsLoc = 'bars/';

// name of the generic context menu XML file (sans extension)
var genericContext = 'generic';


// waMENU OBJECT DEFINITION --------------------------------------------\\

// load the xsl file for transformation of selected menu
var waMenuXsl = new ActiveXObject('Microsoft.XMLDOM');
	waMenuXsl.async = true;
	waMenuXsl.load(waMenuXslFile);

// definition of the waMenu object type
function waMenu(item,context) {
	item.menu ? this.menu = item.menu : this.menu = 'context';
	this.context = context ? context : (item.getAttribute('context') ? item.getAttribute('context') : genericContext);
	this.popup = window.createPopup();
	this.popBody = this.popup.document.body;
	this.xml = new ActiveXObject('Microsoft.XMLDOM');
	this.xml.async = false;
	this.xml.load(waMenusLoc+this.context+'.xml');
	if (this.xml.parseError.errorCode != 0) this.xml.load(waMenusLoc+'generic.xml');
	this.opener = item;

	// methods
	this.open = waMenu_open;
	this.close = waMenu_close;
	this.isOpen = false;
}

// method for loading and opening a waMenu
function waMenu_open(positionReference) {
	this.popBody.innerHTML = this.xml.transformNode(waMenuXsl);
	var scriptTag = this.popup.document.createElement('script');
		scriptTag.setAttribute('type','text/javascript');
		scriptTag.setAttribute('src',waMenuScriptFile);
	this.popBody.appendChild(scriptTag);
	var scriptTag = this.popup.document.createElement('script');
		scriptTag.setAttribute('type','text/javascript');
		scriptTag.setAttribute('src',modifyTreeScriptFile);
	this.popBody.appendChild(scriptTag);
	var cssDefinition = this.popup.document.createElement('link');
		cssDefinition.setAttribute('href',cssFile);
		cssDefinition.setAttribute('rel','stylesheet');
		cssDefinition.setAttribute('type','text/css');
	this.popBody.appendChild(cssDefinition);
	
	switch (this.menu) {
		case 'bar' :
			if(positionReference) {
				this.x = 0;
				this.y = positionReference.offsetHeight-1;
			}
			else {
				this.x = window.event.screenX;
				this.y = window.event.screenY;
			}
			break;
		default :	
			if(positionReference) {
				this.x = positionReference.offsetWidth;
				this.y = 0;
			}
			else {
				this.x = window.event.screenX;
				this.y = window.event.screenY;
			}
			break;
	}
	
	this.width = waMenuWidth;
	this.popup.show(0,0,this.width,0);
    this.height = this.popBody.scrollHeight;
    this.popup.hide();
	this.popup.show(this.x,this.y,this.width,this.height,positionReference);
	this.isOpen = true;
}

//method for closing a waMenu
function waMenu_close() {
	if(this.isOpen) {
		this.popup.hide();
		this.isOpen = false;
	}
}


// waBAR OBJECT DEFINITION ---------------------------------------------\\

// load the xsl file for transformation of selected menu
var waBarXsl = new ActiveXObject('Microsoft.XMLDOM');
	waBarXsl.async = true;
	waBarXsl.load(waBarXslFile);

function waBar(id,type) {
	this.holder = document.createElement('div');
	this.holder.id = id;
	type ? this.type = type : this.type = 'default';
	this.holder.className = 'waBar';
	this.holder.setAttribute('menu','none');

	//methods
	this.insert = waBar_insert;
}


// method for inserting the bar
function waBar_insert(elemId) {
	this.xml = new ActiveXObject('Microsoft.XMLDOM');
	this.xml.async = false;
	this.xml.load(waBarsLoc+this.type+'.xml');
	if (this.xml.parseError.errorCode != 0) this.xml.load(waBarsLoc+'default.xml');
	this.holder.innerHTML = this.xml.transformNode(waBarXsl);
	document.getElementById(elemId) ? document.getElementById(elemId).appendChild(this.holder) : document.body.insertBefore(this.holder,document.body.firstChild) ;
}

// event functions for waBar menu titles
function barMenu_onClick(thisMenu) {
	if(window.waMenuInstance && window.waMenuInstance.isOpen && window.waMenuInstance.opener == thisMenu) waMenuInstance.close();
	else {
		if(window.waMenuInstance) waMenuInstance.opener.className = 'barMenu';
		if(thisMenu.className == 'barMenu') thisMenu.className = 'barMenuOver';
		waMenuInstance = new waMenu(thisMenu);
		waMenuInstance.open(thisMenu);
	}
	return;
}

function barMenu_onMouseEnter(thisMenu) {
	if(window.waMenuInstance && window.waMenuInstance.isOpen && window.waMenuInstance.opener != thisMenu && thisMenu.menu!='none') barMenu_onClick(event.toElement);
	else thisMenu.className = 'barMenuOver';
}

function barMenu_onMouseLeave(thisMenu) {
	if(event.toElement) {
		if(window.waMenuInstance && window.waMenuInstance.isOpen) {
			waMenuInstance.close();
			if(event.toElement.menu=='bar') barMenu_onClick(event.toElement);
		}
		thisMenu.className='barMenu';
	}
}

// function for dynamically insertion of waBars
function createNewBar(barId, barType, elemId) {
	window[barId] = new waBar(barId, barType);
	window[barId].insert(elemId);
}


// COMMON FUNCTIONS AND EVENT HANDLERS ---------------------------------\\
// definitions of common functions

// actions invoked on a call for the context menu (right click)
function onContextMenuActions() {
	//alert(event.srcElement.id);return;
	switch (event.srcElement.menu) {
		case 'bar' :
		case 'none' :
			event.returnValue = false;
			break;
		default :
			waMenuInstance = new waMenu(event.srcElement);
			waMenuInstance.open();
			return false;
	}
}

// actions invoked on a doubleclick
function onDoubleClickActions() {
	event.returnValue = false;
	return false;
}

// actions invoked when the window is loaded
function onLoadActions() {
}

//definitions of document-wide events
document.oncontextmenu = onContextMenuActions;
