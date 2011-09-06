var langCode = 'en';

// disabling any browsers that are not IE5.5 or above
try { bTest = window.createPopup(); bTest = false; }
catch (errCode) { bTest = true; }
if (bTest) window.location.replace('error.htm');


// various texts and messages are located in a separate XML file for localization purposes
// this function loads that file and returns it as an XML object
function allTexts(langCode) {
	textLang = new ActiveXObject('Microsoft.XMLDOM');
	textLang.async = false;
	textLang.setProperty('SelectionLanguage', 'XPath');
	textLang.load('lang/'+langCode+'.xml');
	return textLang;
}

// function that takes the subset of the above XML depending on the defined scope
// it returns an <xml> element and appends it to the document's body
function createLangDataIsland(xmlId,scopeId) {
	var xmlData = scopeId ? allTexts(langCode).selectSingleNode('//group[@scope="'+scopeId+'"]').xml : allTexts(langCode).selectSingleNode('loc').xml;
	var dataIsland = document.createElement('xml');
		dataIsland.id = xmlId;
		dataIsland.innerHTML = xmlData;
	document.body.appendChild(dataIsland);
}



function getOriginalPosition() {
	var tTD = document.getElementById('treeBox');
	sW = parseInt(tTD.currentStyle.width);
	mX = event.clientX;
}

function resizeTreeView() {
	var tTD = document.getElementById('treeBox');
	var rW = sW - ( mX - event.clientX );
	if(rW < 100) rW = 100;
	/*if(rW > 400) rW = 400;*/
	tTD.runtimeStyle.width = rW + 'px';
	/*window.status = 'Tree width: '+rW+' pixels.';*/
}

function closeTreeView() {
	document.getElementById('treeBox').style.display='none';
	document.getElementById('treeHandle').style.display='block';
}

function openTreeView() {
	document.getElementById('treeHandle').style.display='none';
	document.getElementById('treeBox').style.display='block';
}

function overAllHeight() {
	return document.body.clientHeight - document.getElementById('overAll').offsetTop;
}

function treeBodyHeight() {
	return document.body.clientHeight - document.getElementById('overAll').offsetTop - document.getElementById('treeBody').offsetTop - 5
}

function contentOnLoad() {
	var contDoc = frames.contentHolder.document;
	var contWin = frames.contentHolder.window;
	document.recalc(true);
	document.title = contDoc.title;
	locateNode(contWin.location.pathname);
}

//this is a placeholder for a more advanced function which will locate nodes based on document and node id's
function locateNode(loadedId) {
	if(loadedId == '/about.htm' || loadedId == '/team.htm') loadedId = 'aboutus';
	else if(loadedId.substr(0,11) == '/jobs/jobs.') loadedId = 'positions';
	else if(loadedId.substr(0,6) == '/jobs/') loadedId = 'jobs';
	else loadedId = null;

	if(loadedId) {
		var syncNode = document.getElementById(loadedId);
		if (syncNode) {
			var syncBranch = syncNode.parentElement.parentElement;
			var syncSub = syncNode.nextSibling;
			if(syncSub && syncSub.scrollHeight == 0) openCloseBranch(syncSub);
		}
	}
}




window.onresize = document.recalc;
