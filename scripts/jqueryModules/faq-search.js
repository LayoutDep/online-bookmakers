app.addModule('faq-search', function () {
	var $faqSearch = $('#faq-search');
	
	if ($faqSearch.length) {
		var $faqErr = $('.faq-search_none');
		
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
			$faqSearch.autocomplete({
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
						$faqErr.addClass('__visible');
					}
					
					if ( suggestions.length || $faqSearch.val() == '' ) {
						$faqErr.removeClass('__visible');
					}
				}
			});
		} catch(e) {}
	}
});