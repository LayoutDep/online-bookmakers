app.addModule('content-list-preview', function () {
	var $list = $('.content-list-preview');
	
	if (!$list.length) {
		return false;
	}
	
	var $links = $list.find('a');
	
	$links.on('click', function (e) {
		e.preventDefault();
		
		$block = $ ( $(this).attr('href') );
		
		if ($block.length) {
			$('html, body').animate({scrollTop: $block.offset().top})
		}
	});
});