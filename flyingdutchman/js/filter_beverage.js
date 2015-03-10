/*
	This is the javascript area, you can add javascript directly into html but it's a good practice to keep it
	seperated just as we want to keep CSS seperated from HTML. This file is loaded into the page in the <head></head>
	section <script src="js/javascript_file.js"></script>, just like we did with the css file. Its states we have a 
	javascript file inside the folder "js" with the name javascript_file.js, and of course this can be named whatever.
*/

/* 
	This is a silly function that just opens up an alert or a small popup window. Alerts are great to use when
	trying to see if a button works or if you want to see that something actually is working.
*/

var beerIDs = [];
var latestSearch = [];
initLists(beerIDs);
storeBeerInfo();



function getSessionsItems() {
	var list = [];
	for(i = 0; i < sessionStorage.length; i++) {
		var item = sessionStorage.getItem(beerIDs[i]);
		if(item != null)
			list.push(item);
	}
	return list; 
}

function storeBeerInfo() {
	var baseString = "http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=";
 	var returnObj = [];	

 	for(i = 0; i < 2; i++) { //beerIDs.length - 26
 		var tempID = beerIDs[i];
 		var tempIDstring = tempID.toString();
 		var completeAddress = baseString.concat(tempIDstring);
 		var drinkInfo = httpGet(completeAddress);
 		sessionStorage.setItem(tempID, drinkInfo);
 	}
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function initLists(beerIDs) {
	var allInfo = httpGet("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get"),
	obj = JSON.parse(allInfo);
	for(i = 0; i < obj.payload.length; i++) {
		if(obj.payload[i].beer_id) {
			beerIDs.unshift(obj.payload[i].beer_id);
		}
	}
}

function sortList(list) {
	return list.sort();
}

function sort() {
	var unsorted = beerNames;
	var sorted = sortList(unsorted);
	display(sorted, "demo");
}

function display(text, id) {
	window.document.getElementById(id).innerHTML = text.join(", ");
}

function isRadioChecked(id) {
	return document.getElementById(id).checked
}

function showDiv(id) {
	document.getElementById(id).style.display = "inline-block";
}

function hideDiv(id) {
	document.getElementById(id).style.display = "none";	
}

function getAllBeers() {
	list = [];
	for(i = 0; i < sessionStorage.length; i++) {
		var JSONbeer = sessionStorage.getItem(beerIDs[i]);
		if(JSONbeer != null) {
			var obj = JSON.parse(JSONbeer);
			var beerNr = obj.payload[0].nr;
			list.push(beerNr);
		}		
	}
	return list;
}

function getBeerByAlcoRange(lowerBound, higherBound) {
	var matchArray = [];

	for(i = 0; i < sessionStorage.length; i++) {
		var item = sessionStorage.getItem(beerIDs[i]);
		if(item != null){
			var obj = JSON.parse(item);
			var currentAlcoLevel = obj.payload[0].alkoholhalt;
			var sizeOfString = currentAlcoLevel.length;
			var currentAlcoLevelFloat = parseFloat(currentAlcoLevel.slice(0, sizeOfString-1));
			if(currentAlcoLevelFloat >= lowerBound && currentAlcoLevelFloat <= higherBound)
				matchArray.push(obj.payload[0].nr);
		}
	}
	return matchArray;
}

function getBeerByPriceRange(lowerBound, higherBound) {
	var matchArray = [];

	for(i = 0; i < sessionStorage.length; i++) {
		var item = sessionStorage.getItem(beerIDs[i]);
		if(item != null) {
			var obj = JSON.parse(item);
			var currentPrice = obj.payload[0].prisinklmoms;
			var currentPriceFloat = parseFloat(currentPrice);
			if(currentPriceFloat >= lowerBound && currentPriceFloat < higherBound)
				matchArray.push(obj.payload[0].nr);
		}
	}
	return matchArray;
}

function stringSearch() {
	var inputString = document.getElementById("searchTxt").value;
	var tempArray = smartSearch();
	var matchArray = [];
	console.log(tempArray);

	for(i = 0; i < sessionStorage.length; i++) {
		var currentBeer = sessionStorage.getItem(tempArray[i]);
		if(currentBeer != null) {
			var obj = JSON.parse(currentBeer);
			var name = obj.payload[0].namn.toLowerCase(); 
			if(name.indexOf(inputString.toLowerCase()) > -1)
				matchArray.push(obj.payload[0].nr);
		}
	}
	console.log(matchArray);
	display(matchArray, "demo3");
}

function smartSearch() {
	var matchArray = [];
	var default_checked = isRadioChecked("search_default");
	var alcohol_checked = isRadioChecked("search_alcohol")
	var price_checked = isRadioChecked("search_price")

	if(alcohol_checked) {
		showDiv("alcohol_options");
		var zeroPointZero_checked = isRadioChecked("zeroPointZero");
		var threePointOne_checked = isRadioChecked("threePointOne");
		var sixPointFive_checked = isRadioChecked("sixPointFive");
		if(zeroPointZero_checked)
			matchArray = getBeerByAlcoRange(0.0, 3.0);
		else if(threePointOne_checked)
			matchArray = getBeerByAlcoRange(3.1, 6.5);
		else
			matchArray = getBeerByAlcoRange(6.5, 100.0);
	} else {
		hideDiv("alcohol_options");
	}
	
	if(price_checked) {
		showDiv("price_options");
		var price_zeroTo16 = isRadioChecked("lessThan16");
		var price_16to30 = isRadioChecked("16to30");
		var price_moreThan30 = isRadioChecked("moreThan30");
		if(price_zeroTo16)
			matchArray = getBeerByPriceRange(0.0, 16.0);
		else if(price_16to30) 
			matchArray = getBeerByPriceRange(16.0, 30.0);
		else
			matchArray = getBeerByPriceRange(30.0, 10000.0);
	} else {
		hideDiv("price_options");
	}

	if(default_checked)
		matchArray = getAllBeers();

	display(matchArray, "demo3");

	return matchArray;
}

var sessionList = getSessionsItems();
display(sessionList, "demo");
//getBeerVol();
// display(data, "demo2");
//getBeerVol();
//sessStor();