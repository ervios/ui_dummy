function welcomeMessage() {

	var wmessage = "";
	i18n.init({ lng: "en" }, function(data) {
  		$(".message").i18n();
  			wmessage = data("message.welcome");
		});

	var db_url = getDBData('iou_get');
	
	$.getJSON(db_url, function(data){
    	console.log(data);
   		$.each(data.payload, function() {
   			$("#fname").append(this['first_name']+ "!" + "&#160;");
   		});
	});

}

function getUserCredit() {

	var db_url = getDBData('iou_get');
	
	$.getJSON(db_url, function(data){
    	console.log(data);
   		$.each(data.payload, function() {
   			$("#credit").append(this['assets']);
   		});
	});

}

function logout() {
	sessionStorage.setItem("username", "");
	sessionStorage.setItem("password", "");
	window.location.href = "login.html";
}

var name = "26";
var age = 26;



//admin or not - credit image - payments