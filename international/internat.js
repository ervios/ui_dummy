$(document).ready(function(){

	$("#btn-lang-en").click(function() {
				
		i18n.init({ lng: "en" }, function(language) {
  			$(".message").i18n();
  			var appName = language("lang.type");
  			alert(appName);
		});
	});

	$("#btn-lang-sv").click(function() {
				
		i18n.init({ lng: "sv" }, function(t) {
  			$(".message").i18n();
  			var appName = t("lang.type");
  			alert(appName);
		});
	});
	
});