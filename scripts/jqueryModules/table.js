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
				var windowWidth = $(window).outerWidth();
				
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
	var $table = $('.js-table');
	var $tableWrapper = $table.closest('.js-table-wrapper');
	var $button = $tableWrapper.find('.table_show-all');

	if (!$table.length) {
		return false;
	}
	
	$table.stacktable({
		adaptiveWidth: app.data.media.desktop
	});
	
	$button.on('click', function (e) {
		var $thisTableWrapper = $(this).closest($tableWrapper)
		var $thisTable = $thisTableWrapper.find($table);
		var $tr = $thisTable.find('tbody tr[hidden]');
		$tr.slice(0, 9).removeAttr('hidden');
		$tr = $thisTable.find('tbody tr[hidden]');
		
		$thisTableWrapper.find('.table-wrapper_count').html( $thisTable.find('tbody tr:not(hidden)').length );
		
		
		if (!$tr.length) {
			$(this).remove();
		}
		
		return false;
	});
});