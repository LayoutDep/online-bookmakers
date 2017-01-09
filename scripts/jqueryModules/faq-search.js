app.addModule('faq-search', function () {
	/**
	 * Используется плагин - https://github.com/devbridge/jQuery-Autocomplete
	 * Данные должны быть отправлены в виде массива (см. переменную countries)
	 */
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
				lookup: countries, // параметр - убрать, переменную countries - удалить
				onSelect: function (suggestion) {
					$('<a>', {'href': suggestion.data,'target': '_blank'})[0].click();
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