/*function getAllUsers() {

	var db_link = getDBData('iou_get_all');
	
	$.getJSON(db_link, function(data) {
   		console.log(data);
   		$.each(data.payload, function() {
   			$("ul").append(
   				"<li>assets: " 
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

*/

function validateLogin() {

   var errors = "";
   sessionStorage.setItem("username", "");
   sessionStorage.setItem("password", "");

   var username = document.getElementById("username").value;
   var password = document.getElementById("password").value;

   if (username == "" || password == "") {
      errors = "Please enter all fields";
      $("#error-messages").html(errors);
   } 
   else if (username == password)  {

      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password", password);

      var db_link = getDBData('iou_get');

      $.ajax(db_link, 
         {
            dataType: 'json',
            success: function(data) {
               if (data.type[0] == 'e') {
                  errors = "No such user found :-[";
                  $("#error-messages").html(errors);
               } else if (data.type[0] == 'i') {
                  window.location = "mainview.html";
               }
         }
      });
   } 
   else {
      errors = "Couldn't match input :-[";
      $("#error-messages").html(errors);
   }
}

