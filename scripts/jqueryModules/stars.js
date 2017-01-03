app.addModule('stars', function () {
	var $stars = $('.js-stars');
	
	if (!$stars.length) {
		return false;
	}
	
	var $empty = $stars.find('.__empty');
	
	$empty.hover(function () {
		var index = $(this).index();
		
		$empty.each(function () {
			var thIndex = $(this).index();
			
			if (thIndex <= index) {
				$(this).removeClass('__empty');
			}
		});
	}, function () {
		$empty.addClass('__empty');
	});
});