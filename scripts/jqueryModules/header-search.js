app.addModule('header-search', function () {
	var $headerSearch = $('#header-search');
	
	if ($headerSearch.length) {
		var $headerErr = $('.header_search-none');
		
		var countries = [
			{
				value: 'Москва',
				data: 'http://yandex.ru'
			},
			{
				value: 'Волгоград',
				data: 'http://google.ru'
			}
		];
		
		try {
			$headerSearch.autocomplete({
				//serviceUrl: '/autocomplete/countries',
				lookup: countries,
				onSelect: function (suggestion) {
					$('<a>', {
						'href': suggestion.data,
						'target': '_blank'
					})[0].click();
				},
				onSearchComplete: function (query, suggestions) {
					if (!suggestions.length) {
						$headerErr.addClass('__visible');
					}
					
					if ( suggestions.length || $headerSearch.val() == '' ) {
						$headerErr.removeClass('__visible');
					}
				}
			});
		} catch(e) {}
	}
});