jQuery(document).ready(function ($) {
	
	var modules = app.getModules();
	
	for (var module in modules) {
		app.callModule(module);
	}
	
});