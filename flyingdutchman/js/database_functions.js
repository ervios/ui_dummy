
function getDBData(tmp_function) {

	var http_link  = "http://pub.jamaica-inn.net/fpdb/api.php?";
	var uname = "username="+getUser();
	var pass = "&password="+getPass();
	var db_function = "";

	var url_link = http_link+uname+pass+"&action=";

	switch(tmp_function) {

		case 'inventory_get':
			url_link += "inventory_get";
			break;
		case 'purchases_get':
			url_link += "purchases_get";
			break;
		case 'purchases_get_all':
			url_link += "purchases_get_all";
			break;
		case 'purchases_append':
			url_link += "purchases_append";
			break;
		case 'payments_get':
			url_link += "payments_get";
			break;
		case 'payments_get_all':
			url_link += "payments_get_all";
			break;
		case 'iou_get':
			url_link += "iou_get";
			break;
		case 'iou_get_all':
			url_link += "iou_get_all";
			break;
		case 'beer_data_get':
			url_link += "beer_data_get";
			break;
		case 'user_edit':
			url_link += "user_edit";
			break;
		case 'inventory_append':
			url_link += "inventory_append";
			break;
		case '':
			alert("Forgot to add the name of the function :-]");
	}

	return url_link;
}

function getUser() {
	return sessionStorage.getItem("username");
}

function getPass() {
	return sessionStorage.getItem("password");
}
