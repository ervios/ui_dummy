
function newUserButton() {
	 window.location.href = 'add_user.html';
}


function addNewUser(fname, lname, uname, pass, email, phone) {
	 	
 	var db_link = getDBData('user_edit');
 	
 	db_link += "&new_username="
 			+ uname
 			+ "&new_password="
 			+ pass
 			+ "&first_name="
 			+ fname
 			+ "&last_name="
 			+ lname
 			+ "&email="
 			+ email
 			+ "&phone="
 			+ phone;

 	alert(db_link);

 	$.ajax( db_link, 
 		{
    	dataType: 'json',
    	success: function(data) {
    		console.log(data);
    		$("ul").append(
    			"<li>ADDED USER!<br> " 
   				+ uname
   				+ "</li><li>First Name: "
   				+ fname
   				+ "</li><li>Last Name: "
   				+ lname
   				+ "</li><li>Password: "
   				+ pass
   				+ "<br>-------"
   			);
 		}
 	});
 	
}

function validateInput() {

	var check = 0;

	var fname 	= document.getElementById("firstname").value;
	var lname 	= document.getElementById("lastname").value;
	var uname 	= document.getElementById("username").value;
	var pass 	= document.getElementById("password").value;
	var email 	= document.getElementById("email").value;
	var phone 	= document.getElementById("phone").value;

	if(fname !== "" && fname!== 0) {
		check += 1;
	}
	if(lname !== "" && lname!== 0) {
		check += 1;
	}
	if(uname !== "" && uname!== 0) {
		check += 1;
	}
	if(pass !== "" && pass!== 0) {
		check += 1;
	}
	if(email !== "" && email!== 0) {
		check += 1;
	}
	if(phone !== "" && phone!== 0) {
		check += 1;
	}
	else {
		alert("smthing empty");
	}

	if(check == 6) {
		alert(check);
		addNewUser(fname, lname, uname, pass, email, phone);
	}
	
}

function updateNewUser() {
}



function getAllUsers() {

	var db_link = getDBData('iou_get_all');
	
	$.getJSON(db_link, function(data) {
   		console.log(data);
   		$.each(data.payload, function() {
   			$("ul").append("<li>assets: " 
   							+ this['assets']
   							+ "</li><li>First Name: "
   							+ this['first_name']
   							+ "</li><li>Last Name: "
   							+ this['last_name']
   							+ "</li><li>User Name: "
   							+ this['username']
   							+ "<br>-------"
   							);
   		});
	});
}

