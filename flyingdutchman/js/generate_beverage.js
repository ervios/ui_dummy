

function getBeerName(beerID) {
	var db_link = getDBData('beer_data_get');
	db_link += "&beer_id=";

	var reqAdress = db_link;
	
	//var reqAdress ="http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=";

	reqAdress = reqAdress.concat(beerID);

	var rawStr = httpGet(reqAdress);

	var loc = rawStr.indexOf("\"namn\" : ");
	loc = loc + 9;
	loc2 = loc;
	while (rawStr.charAt(loc2) != ",")
		loc2 ++;
	var name = rawStr.substring(loc, loc2);
	name = name.slice(1, name.lastIndexOf("\""));
	var loc3 = rawStr.indexOf("\"namn2\" : ");
	loc3 = loc3 + 10;
	loc4 = loc3;
	while (rawStr.charAt(loc4) != ",")
		loc4 ++;
	var name2 = rawStr.substring(loc3, loc4);
	name2 = name2.slice(1, name.lastIndexOf("\""));
	name = name.concat(" ");
	name = name.concat(name2);
	return name; 
}

function getBeerPrice(beerID) {

	var db_link = getDBData('beer_data_get');
	db_link += "&beer_id=";

	var reqAdress = db_link;

	//var reqAdress ="http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=";

	reqAdress = reqAdress.concat(beerID);

	var rawStr = httpGet(reqAdress);

	var loc = rawStr.indexOf("\"prisinklmoms\" : ");
	loc = loc + 17;
	loc2 = loc;
	while (rawStr.charAt(loc2) != ",")
		loc2 ++;
	var price = rawStr.substring(loc, loc2);
	price = price.slice(1, price.lastIndexOf("\""));
	price = price.concat("kr");
	return price; 
}

function getBeerAlcoholRate(beerID) {

	var db_link = getDBData('beer_data_get');
	db_link += "&beer_id=";

	var reqAdress = db_link;

	//var reqAdress ="http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=beer_data_get&beer_id=";

	reqAdress = reqAdress.concat(beerID);

	var rawStr = httpGet(reqAdress);

	var loc = rawStr.indexOf("\"alkoholhalt\" : ");
	loc = loc + 16;
	loc2 = loc;
	while (rawStr.charAt(loc2) != ",")
		loc2 ++;
	var rate = rawStr.substring(loc, loc2);
	rate = rate.slice(1, rate.lastIndexOf("\""));
	return rate; 
}

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var count1 = 1;
var count2 = 1;

function createDiv(beerID)
{
	var str1 = "fav";
	str1 = str1.concat(count1);
	count1 ++;
	var div = document.createElement('div');
	div.id = str1;
	div.className = 'elements';
	div.innerText = getBeerName(beerID) + "\n" + getBeerAlcoholRate(beerID) 
					+ "\n" + getBeerPrice(beerID);
	console.log(div.id);

	var DOM_img = document.createElement("img");
	var alcRate = getBeerAlcoholRate(beerID);
	var pureRate = getPureRate(beerID);
	if (alcRate == "0\%")
	{
		DOM_img.src = "images/alcoholfree.jpg";
		DOM_img.className = 'beerimage';
	}
	else
	{
		DOM_img.src = "images/beer.jpg";
		DOM_img.className = 'beerimage';
	}

	DOM_img.className = 'beerimage';
	div.appendChild(DOM_img);	
	
	document.getElementById("favbeers").appendChild(div);
}

function getPureRate(beerID)
{
	var rate = getBeerAlcoholRate(beerID);
	rate = rate.substring(0, rate.lastIndexOf("\%"));
	return rate;
}

function createDivB(beerID)
{
	var str2 = "drink";
	str2 = str2.concat(count2);
	count2 ++;
	var div = document.createElement('div');
	div.id = str2;
	div.className = 'elements';
	div.innerText = getBeerName(beerID) + "\n" + getBeerAlcoholRate(beerID) 
					+ "\n" + getBeerPrice(beerID);
	console.log(div.id);

	var DOM_img = document.createElement("img");
	var alcRate = getBeerAlcoholRate(beerID);
	var pureRate = getPureRate(beerID);
	if (alcRate == "0\%")
	{
		DOM_img.src = "images/alcoholfree.jpg";
		DOM_img.className = 'beerimage';
	}
	else
	{
		DOM_img.src = "images/beer.jpg";
		DOM_img.className = 'beerimage';
	}

	div.appendChild(DOM_img);	

	document.getElementById("beerblock").appendChild(div);
	div.draggable= "true";
	div.addEventListener('dragstart', function() {drag(event)}, false);
}

function getAllDrinkIds() 
{
    var beerIDs = [];
	var db_link = getDBData('inventory_get');
    var allInfo = httpGet(db_link);
    //var allInfo = httpGet("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get"),
    obj = JSON.parse(allInfo);
    var beerIDs = [];
    for(i = 0; i < obj.payload.length; i++) 
    {
        if(obj.payload[i].beer_id) 
        {
            beerIDs.unshift(obj.payload[i].beer_id);
        }
    }
    return beerIDs;
}

function getAllUsers() 
{
    var users = [];
    var db_link = getDBData('iou_get_all');
    var allInfo = httpGet(db_link);
    //var allInfo = httpGet("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=iou_get_all"),
    obj = JSON.parse(allInfo);
    var users = [];
    for(i = 0; i < obj.payload.length; i++) 
    {
        if(obj.payload[i].username) 
        {
            console.log(obj.payload[i].username);
            users.unshift(obj.payload[i].username);
        }
    }
    return users;
}

function createBeerView()
{
	var beers = [];
	beers = getAllDrinkIds();
	
	for(i = beers.length - 1; i >= 0; i--)
	{
		if(getBeerName(beers[i]).charAt(0) != "\"")
			createDivB(beers[i]);
	}
}

function allowDrop(event)
{
  event.preventDefault();
}

function drag(event) 
{
  if(event.target.tagName == "IMG")
  	event.dataTransfer.setData("text", event.target.parentNode.id);
  else
  	event.dataTransfer.setData("text", event.target.id);
}

var favcount = 1;
function drop(event)
{
	if(favcount < 6)
	{
		event.preventDefault();
		var data=event.dataTransfer.getData("text");
		var nodeCopy = document.getElementById(data).cloneNode(true);
		/*var favstr = "fav";
		favstr = favstr.concat(favcount);
		console.log(favcount);
		favcount ++;
		nodeCopy.id = favstr;*/
		event.target.appendChild(nodeCopy);
		favcount ++;
		document.getElementById(nodeCopy.id).addEventListener('dblclick', function()
			{ 
				event.target.removeChild(document.getElementById(nodeCopy.id));
				favcount --;
			}, false);	
	}
}

function loadFav(user)
{
	/*for (var i = 0; i < users.length; i++) 
	{
	    if(users[i] == getCurrentUserId())
	    {
	    	for (var j = 0; j < 5; j++)
	    	{
	    		if(users[i][j] == 0)
	    			users [i][j] = data;
	    	}
	    }	 
	}

	var users = getAllUsers();
	for (var i = 0; i < users.length; i++) 
	{
	    users[i] = new Array(5);  
	}

	localStorage["users"] = JSON.stringify(getAllUsers());
    var storedUsers = JSON.parse(localStorage["users"]);*/
}

$(document).ready(function(){
    $("#hide-show").click(function(){
    	if ($("#hide-show").val() == "Hide") {
    		$("#favbeers").hide();
       		$("#beerblock").css("height", 620);
       		$("#hide-show").val("Show").html("Show");
    	} else {
    		$("#favbeers").show();
        	$("#beerblock").css("height", 310);
        	$("#hide-show").val("Hide").html("Hide");
    	}
    });
   
});