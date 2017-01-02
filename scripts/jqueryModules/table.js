/**
 * Таблица
 */
;(function ($) {
	var settings = {
		adaptiveWidth: 768
	};
	
	$.fn.stacktable = function (param) {
		return this.each(function () {
			var made = false;
			var $this = $(this);
			
			settings = $.extend(settings, param);
			
			check();
			
			$(window).on('resize', function () {
				check();
			});
			
			function check() {
				var windowWidth = $(window).width();
				
				if (windowWidth < settings.adaptiveWidth) {
					if (!made) {
						make();
						made = true;
					}
				} else {
					if (made) {
						clear();
						made = false;
					}
				}
			}
			
			function make() {
				var td = $this.find('tbody td');
				var th = $this.find('thead th');
				
				td.each(function () {
					var $div = $('<div />', {
						'class': 'table_heading'
					}).html( th.eq( $(this).index() ).html() );
					
					
					$(this).wrapInner('<div class="table_content"></div>');
					$(this).prepend($div);
				});
			}
			
			function clear() {
				var td = $this.find('tbody td');
				var th = $this.find('thead th');
				
				td.each(function () {
					var $div = $(this).find('.table_heading').detach();
					$(this).html( $(this).find('.table_content').html() );
				});
			}
		});
	};
})(jQuery);


app.addModule('table', function () {
	var $table = $('.table');
	
	if (!$table.length) {
		return false;
	}
	
	$table.stacktable({
		adaptiveWidth: app.data.media.desktop
	});
});