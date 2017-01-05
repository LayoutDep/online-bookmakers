app.addModule('bookmaker-review_menu', function () {
	var $block = $('.bookmaker-review_menu');
	
	if (!$block.length) {
		return false;
	}
	
	var $head = $block.find('.bookmaker-review_head');
	
	$head.on('click', function () {
		var $thsBlock = $(this).closest('.bookmaker-review_menu');
		
		$thsBlock.toggleClass('__active');
		$(this).toggleClass('bookmaker-review_head_active');
	});
});