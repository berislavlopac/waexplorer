// function that modifies a tree view item
// 'action' can legally be : 0 (delete item), 1 (edit item) or 2 (insert item);
// selItem is a reference to the <link> tag of the selected branch
// this function deletes a whole branch!

// language code taken from parent window
var langCode = top.window.langCode;

var locScope = 'modTree';
var caption1 = 'Edit item';
var caption2 = 'Insert item';
var delConfirm = 'Do you really want to delete this item and all its sub-items?';


function modifyTreeItem(action,selItem) {
	var selBranch = selItem.tagName == 'IMG' ? selItem.parentElement.parentElement.parentElement : selItem.parentElement.parentElement;
	switch (action) {
		case 2 :
			var newBranch = selBranch.cloneNode(true);
			if(newBranch.childNodes.length > 1) newBranch.removeChild(newBranch.lastChild);
			newBranch.firstChild.firstChild.src = newBranch.firstChild.firstChild.src.substr(0,newBranch.firstChild.firstChild.src.lastIndexOf('/')+1)+'x.gif';
			var dialogArguments = new Object();
				dialogArguments.action = action;
				dialogArguments.caption = caption2;
				dialogArguments.selBranch = selBranch;
				dialogArguments.newBranch = newBranch;
				dialogArguments.newLink = newBranch.firstChild.firstChild.nextSibling;
			window.showModalDialog("dialogs/modtree.htm",dialogArguments,"dialogHeight: 250px; dialogWidth: 400px; edge: raised; center: 1; help: 0; resizable: 0; status: 0; unadorned: 1;");
			break;
		case 1 :
			var dialogArguments = new Object();
				dialogArguments.action = action;
				dialogArguments.caption = caption1;
				dialogArguments.selBranch = selBranch;
				dialogArguments.selLink = selBranch.firstChild.firstChild.nextSibling;
			window.showModalDialog("dialogs/modtree.htm",dialogArguments,"dialogHeight: 250px; dialogWidth: 400px; edge: raised; center: 1; help: 0; resizable: 0; status: 0; unadorned: 1;");
			break;
		case 0 :
			if(confirm(delConfirm)) selBranch.parentElement.removeChild(selBranch);
			break;
	}
}
