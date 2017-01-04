app.addModule('content-list-preview', function () {
	var $list = $('.content-list-preview');
	var $links = $list.find('a');
	
	$links.on('click', function (e) {
		e.preventDefault();
		
		$block = $ ( $(this).attr('href') );
		$('html, body').animate({scrollTop: $block.offset().top})
	});
});