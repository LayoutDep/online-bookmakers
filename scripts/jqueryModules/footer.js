app.addModule('footer', function () {
	var $footer = $('.js-footer');
	var $container = $('.container');
	
	setFooterHeight();
	
	$(window).on('resize', function () {
		setFooterHeight();
	});
	
	function setFooterHeight() {
		$container.css({
			'paddingBottom' : $footer.innerHeight()
		});
	}
});