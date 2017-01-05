app.addModule('content-list-preview', function () {
	var $list = $('.content-list-preview');
	
	if (!$list.length) {
		return false;
	}
	
	var $links = $list.find('a');
	
	$links.on('click', function (e) {
		e.preventDefault();
		
		var $block = $ ( $(this).attr('href') );
		
		if ($block.length) {
			if ($block.hasClass('bookmaker-review_menu')) {
				$block.addClass('__active');
				$block.find('.bookmaker-review_head').addClass('bookmaker-review_head_active');
			}
			
			$('html, body').animate({scrollTop: $block.offset().top});
		}
	});
});