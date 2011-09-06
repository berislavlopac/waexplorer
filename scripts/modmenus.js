// API FUNCTIONS FOR MODIFYING ITEMS

// basic function to define the modMenu object
function modMenu(langCode) {
	this.xml = new ActiveXObject('Microsoft.XMLDOM');
	this.xml.async = false;
	this.xml.setProperty('SelectionLanguage', 'XPath');
	this.selNode = null;
	
	// getting localized texts and messages
	var mMm = allTexts(langCode).selectSingleNode('//group[@scope="modMenus"]').childNodes;
	this.messages = new Object();
	for(var i=0;i<mMm.length;i++) this.messages[mMm.item(i).getAttribute('id')] = mMm.item(i).text;
	
	// methods
	this.loadMenu = modMenu_loadMenu;
	this.selectItem = modMenu_selectItem;
	this.editItem = modMenu_editItem;
	this.deleteItem = modMenu_deleteItem;
	this.addItem = modMenu_addItem;
}

// method for loading the XML file into memory
function modMenu_loadMenu(xmlFile) {
	if(xmlFile) {
		this.xml.load(xmlFile);
		this.type = this.xml.selectSingleNode('/menu').getAttribute('type');
		return this.xml.parseError.errorCode == 0;
	}
	else return false;
}

// method that selects an appropriate item inside the XML
// the parameters are 1-based indexes of this item's itemsgroup in the menu and itself in the itemsgroup, respectively
// perform this function before any other below
function modMenu_selectItem(g,i) {
	var itemPath = "/menu/itemsgroup["+g+"]/item["+i+"]";
	this.selNode = this.xml.selectSingleNode(itemPath);
	return (!!selNode);
}


// method that edits the item
function modMenu_editItem(title,action,actionType,icon) {
	if (this.selNode) {
		if(this.type == 'menu' && !actionType) {
			alert(this.messages.alert1);
			return false;
		}
		if(this.type == 'toolbar' && !icon) {
			alert(this.messages.alert2);
			return false;
		}
		if(title && action) {
			this.selNode.selectSingleNode('title').text = title;
			this.selNode.selectSingleNode('action').text = action;
			if(actionType) this.selNode.selectSingleNode('action').setAttribute('type',actionType);
			if(icon) {
				if(this.selNode.selectSingleNode('icon')) this.selNode.selectSingleNode('icon').text = icon;
				else {
					var newIcon = this.xml.createElement('icon');
					newIcon.text = icon;
					this.selNode.appendChild(newIcon);
				}
			}
			return true;
		}
		else alert(this.messages.alert3);
		return false;
	}
	else {
		alert(this.messages.alert4);
		return false;
	}
}

// method that deletes the item
function modMenu_deleteItem() {
	if (this.selNode) {
		var parNode = this.selNode.parentNode;
		var deleteConfirmation = this.messages.confirm1;
		if(parNode.childNodes.length == 1) deleteConfirmation += '\n' + this.messages.confirm1a;
		if(confirm(deleteConfirmation)) {
			parNode.removeChild(this.selNode);
			if(!parNode.hasChildNodes) parNode.parentNode.removeChild(parNode);
		}
		this.selNode = null;
		return true;
	}
	else {
		alert(this.messages.alert5);
		return false;
	}
}

// method that creates a new item and inserts it after the selected one
function modMenu_addItem(title,action,actionType,icon) {
	if (this.selNode) {
		if(this.type == 'menu' && !actionType) {
			alert(this.messages.alert1);
			return false;
		}
		if(this.type == 'toolbar' && !icon) {
			alert(this.messages.alert2);
			return false;
		}
		if(title && action) {
			var parNode = this.selNode.parentNode;
			var newItem = this.xml.createElement('item');
			var newTitle = this.xml.createElement('title');
			newTitle.text = title;
			newItem.appendChild(newTitle);
			var newAction = this.xml.createElement('action');
			newAction.text = action;
			if (actionType) {
				newAction.setAttribute('type',actionType);
				newItem.appendChild(newAction);
			}
			if (icon) {
				var newIcon = this.xml.createElement('icon');
				newIcon.text = icon;
				newItem.appendChild(newIcon);
			}
			parNode.lastChild == this.selNode ? parNode.appendChild(newItem) : parNode.insertBefore(newItem,this.selNode.nextSibling);
			return true;
		}
		else {
			alert(this.messages.alert3);
			return false;
		}
	}
	else {
		alert(this.messages.alert6);
		return false;
	}
}