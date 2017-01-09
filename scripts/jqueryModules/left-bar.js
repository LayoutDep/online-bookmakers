app.addModule('left-bar', function () {
	var $leftBar = $('.js-left-bar');
	
	if (!$leftBar.length) {
		return false;
	}
	
	var list = $leftBar.find('.left-bar_list');
	var $listItem = $leftBar.find('.left-bar_list > li');
	var $innerList = $leftBar.find('.left-bar_inner-list');
	var $openBtn, $overlay;
	var isVisible = false;
	
	if ($leftBar.length) {
		responsiveButton();
		responsiveOverlay();
	}
	
	/*$listItem.on('click', function (e) {
		var $innerListActive = $(this).find($innerList);
		
		if ($innerListActive.length) {
			if ($innerListActive.is(':visible')) {
				$innerListActive.slideUp(300);
			} else {
				$innerListActive.slideDown(300);
			}
			return false;
		}
	});*/
	
	$openBtn.on('click', function () {
		toggleMenu();
	});
	
	$overlay.on('click', function () {
		hideMenu();
	});
	
	app.data.swipe({
		left: function () {
			if ($(window).width() < app.data.media.desktop) {
				if (isVisible) {
					hideMenu();
				}
			}
		},
		right: function () {
			if ($(window).width() < app.data.media.desktop) {
				if (!isVisible) {
					showMenu();
				}
			}
		}
	});
	
	$(window).on('resize', function () {
		if ($(window).width() > app.data.media.desktop) {
			hideMenu();
		}
	});
	
	function toggleMenu() {
		$leftBar.toggleClass('__active');
		$overlay.toggleClass('__active');
		$openBtn.toggleClass('__active');
		$('html').toggleClass('__no-scroll');
		isVisible = !isVisible;
	}
	
	function showMenu() {
		$leftBar.addClass('__active');
		$overlay.addClass('__active');
		$openBtn.addClass('__active');
		$('html').addClass('__no-scroll');
		isVisible = true;
	}
	
	function hideMenu() {
		$leftBar.removeClass('__active');
		$overlay.removeClass('__active');
		$openBtn.removeClass('__active');
		$('html').removeClass('__no-scroll');
		isVisible = false;
	}
	
	function responsiveButton() {
		$openBtn = $('<button>', {
			'class': 'left-bar__open'
		});
		$leftBar.append($openBtn);
	}
	
	function responsiveOverlay() {
		$overlay = $('<div>', {
			'class': 'left-bar_overlay'
		});
		$leftBar.append($overlay);
	}
});