// getting localized texts and messages

var mMm = allTexts(langCode).selectSingleNode('//group[@scope="waTree"]').selectSingleNode('text[@id="loadMessage"]');
var locScope = 'waTree'
// tekst koji se nalazi u neotvorenim menijima
var loadMessage = '<span class="loadError">' +  allTexts(langCode).selectSingleNode('//group[@scope="'+locScope+'"]').selectSingleNode('text[@id="loadMessage"]').text + '</span>';

// tekst koji se pojavljuje kad se ne moze ucitati XML fajl
var errorMessage = allTexts(langCode).selectSingleNode('//group[@scope="waTree"]').selectSingleNode('text[@id="errorMessage"]').text;

var xmlBase = 'tree/';

var treeXmlBase = 'tree/';				// osnovna staza do XML fajlova
var xslFile = 'xslt/watree.xslt';		// naziv i adresa fajla s XSL transformacijom
var iconLoc = 'styles/icons/';				// adresa foldera s ikonama
var dbXmlPrefix = 'db_';				// prefix for the SQLXML files

// ucitavanje XSL fajla koji se koristi pri kreiranju 
var treeXslFile = new ActiveXObject('Microsoft.XMLDOM')
	treeXslFile.async = true;
	treeXslFile.load(xslFile);

var dropTarget;
var draggedItem;

function loadBranch(menuDiv) {
	menuDiv.innerHTML = loadMessage;
	var xmlDataPath = treeXmlBase + menuDiv.subsrc;
	var xmlData = new ActiveXObject('Microsoft.XMLDOM');
	var loadDots = window.setInterval(function() {menuDiv.innerHTML += '.';},100);
	xmlData.onreadystatechange = function () {
		if(xmlData.readyState == 4) {
			menuDiv.setAttribute('loaded',true);
			//window.setTimeout(function() {
				xmlData.parseError.errorCode == 0 ? menuDiv.innerHTML = xmlData.transformNode(treeXslFile) : menuDiv.innerHTML = '<nobr class="loadError">'+errorMessage+'<br>\n('+xmlDataPath+')<br>\n('+xmlData.parseError.reason+')</nobr>\n';
			//},500);
			window.clearInterval(loadDots);
			openCloseBranch(menuDiv);
		}
	}
	xmlData.load(xmlDataPath);
}

function openCloseBranch(menuDiv) {
	if(menuDiv.subsrc && !menuDiv.loaded) {
		menuDiv.style.display = 'none';
		loadBranch(menuDiv);
		return;
	}
	else {
		switch (menuDiv.style.display) {
			case 'none' :
				menuDiv.style.display = 'block';
				var plusMinus = menuDiv.parentElement.firstChild.firstChild;
				if(plusMinus.className == 'plusMinus') plusMinus.src = iconLoc + 'minus.gif';
				break;
			case 'block' :
				menuDiv.style.display = 'none';
				var plusMinus = menuDiv.parentElement.firstChild.firstChild;
				if(plusMinus.className == 'plusMinus') plusMinus.src = iconLoc + 'plus.gif';
				break;
		}
	}
}

function closeBranch(menuDiv) {
	menuDiv.style.display = 'none';
}

function refreshBranch(menuDiv,newXmlData) {
	menuDiv.innerHTML = loadMessage;
	menuDiv.style.display = 'none';
	var loadDots = window.setInterval(function() {menuDiv.innerHTML += '.';},100);
	menuDiv.setAttribute('loaded',true);
	//window.setTimeout(function() {
		xmlData.parseError.errorCode == 0 ? menuDiv.innerHTML = newXmlData.transformNode(treeXslFile) : menuDiv.innerHTML = '<nobr class="loadError">'+errorMessage+'<br>\n('+newXmlData.parseError.reason+')</nobr>\n';
	//},500);
	window.clearInterval(loadDots);
	openCloseBranch(menuDiv);
}

/*

function ghostImage(draggedItem) {
	var ghost = draggedItem.cloneNode();
	ghost.style.position = 'absolute';
	ghost.style.filter = 'progid:DXImageTransform.Microsoft.Alpha( style=0,opacity=25)';
	document.body.appendChild(ghost);
}

*/