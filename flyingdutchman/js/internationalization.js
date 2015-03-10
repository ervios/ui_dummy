$(document).ready(function(){


	$("#language-button").click(function() {

		if ($("#language-button").val() == 'sv') {
			i18n.init({ lng: "sv" }, function(data) {
  				$(".message").i18n();
			});
			$("#language-button").attr('src', 'images/en-flag.png');
			$("#language-button").val('en');
		} 
		else if ($("#language-button").val() == 'en') {
			i18n.init({ lng: "en" }, function(data) {
  				$(".message").i18n();
			});
			$("#language-button").attr('src', 'images/sv-flag.png');
			$("#language-button").val('sv');
		}
	});


	
});

	