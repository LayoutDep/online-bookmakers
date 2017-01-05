app.addModule('stars', function () {
	var $stars = $('.js-stars');
	
	if (!$stars.length) {
		return false;
	}
	
	var $items = $stars.find('.stars_item');
	
	$items.on('click', function () {
		var $this = $(this);
		var index = $(this).index() + 1;
		var $parent = $this.closest($stars);
		$parent.removeClass('__editable js-stars');
		$parent.find($items).off('mouseenter').off('mouseleave');
		
		$.ajax({
			url: 'test.php',
			type: 'POST',
			data: { star: index },
			success: function (value) {
				console.log(value);
				value = +value;
				value = Math.round( value );
				
				if (value > 0) {
					$parent.find($items).each(function () {
						var i = $(this).index() + 1;
						
						if (i <= value) {
							$(this).removeClass('__empty');
						} else {
							$(this).addClass('__empty');
						}
					});
				}
			}
		});
	});
	
	
	$stars.each(function () {
		var $this = $(this);
		
		var $empty = $this.find('.__empty');
	
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
			console.log(1);
		});
	});
});