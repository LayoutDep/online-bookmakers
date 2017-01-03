/**
 * Навигация
 */
app.addModule('nav', function () {
	var $nav = $('.js-nav');
	var $menuList = $nav.find('.nav_list');
	var $dropDownOpenLinks = $nav.find('.nav_dropdown > a');
	var $dropDownList = $nav.find('.nav_inner-list');
	var $openMenuBtn = $nav.find('.nav_open-menu');
	
	$dropDownOpenLinks.on('click', function () {
		var windowWidth = $(window).width();
		if (windowWidth <= app.data.media.desktop) {
			$(this).closest('.nav_dropdown').find($dropDownList).fadeToggle(200);
		}
		return false;
	});
	
	$openMenuBtn.on('click', function () {
		$menuList.fadeToggle(200);
		return false;
	});
	
	$(window).on('resize', function () {
		var windowWidth = $(window).width();
		if (windowWidth > app.data.media.desktop) {
			$dropDownList.removeAttr('style');
			$menuList.removeAttr('style');
		}
	});
});