(function($) {
	function openForm($form, $layout, $speed, $button, callbacks)
	{
		var open = callbacks.beforeOpen.call($form, $layout, $button);
		if (open === false) {
			return false;
		}

		$speed = $speed / 2;
		$form.css('z-index', 10000);
		$layout.fadeIn($speed, function() {
			$form.fadeIn($speed, function() {
				callbacks.beforeOpen.call($form, $layout, $button);
			});
		});
	}
	
	function closeForm($form, $layout, $speed, $button, callbacks)
	{
		var close = callbacks.beforeClose.call($form, $layout, $button);
		if (close === false) {
			return false;
		}

		$speed = $speed / 2;
		$form.fadeOut($speed, function() {
			$layout.fadeOut($speed, function() {
				callbacks.afterClose.call($form, $layout, $button);
			});
		});
	}
	
	function createLayout()
	{
		var $layout = $('<div />');
		$layout.css({
			width: '100%', height: '100%',
			position: 'fixed', top: '0',
			left: '0', zIndex: '9999',
			background: 'rgba(0, 0, 0, .8)',
			display: 'none'
		});
		$('body').append($layout);
		
		return $layout;
	}
	
	$.fn.formPopup = function(params) {
		var $layout = createLayout();
		
		return this.each(function() {
			var settings = {
				buttonClick: undefined,
				closeButton: undefined,
				closeOnLayout: true,
				beforeOpen: function() {},
				beforeClose: function() {},
				afterOpen: function() {},
				afterClose: function() {},
				speed: 500
			};
			settings = $.extend(settings, params);
			
			var $button = $(settings.buttonClick);
			var $form = $(this);
			var $closeButton = $(settings.closeButton);
			
			if ($button == 'undefined') {
				return false;
			}
			$button.on('click', function(e) {
				e.preventDefault();
				openForm($form, $layout, settings.speed, $(this), {
					beforeOpen: settings.beforeClose,
					afterOpen: settings.afterClose
				});
			});
			
			if ($closeButton.length) {
				$closeButton.on('click', function(e) {
					e.preventDefault();
					closeThisForm();
				});
			}
			if (settings.closeOnLayout === true) {
				$layout.on('click', function() {
					closeThisForm();
				});
			}
			
			function closeThisForm()
			{
				closeForm($form, $layout, settings.speed, $(this), {
					beforeClose: settings.beforeClose,
					afterClose: settings.afterClose
				});
			}
		});
	};
})(jQuery);

app.addModule('form', function() {
	var $formAuth = $('.js-auth');
	
	if ($formAuth.length) {
		$formAuth.formPopup({
			buttonClick: '#auth-link',
			speed: 400
		});
	}
});