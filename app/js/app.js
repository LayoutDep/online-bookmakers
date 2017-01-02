;(function (window, undefined) {
	var data = {
		modules: {}
	};

	/**
	 * Конструктор
	 * @constructor
	 */
	function App() {
		this.length = 0;
		this.data = {};
	}

	/**
	 * Добавление модулей
	 * @param name - название модуля
	 * @param fn - функция обработчик модуля
	 * @param call (bool) - вызов модуля сразу после объявления
	 * 						по умолчанию - false
	 */
	App.prototype.addModule = function (name, fn, call) {
		if (typeof data.modules[name] == 'function') {
			throw {
				message: 'Модуль уже существует'
			};
		}
		call = call == undefined ? false : call;
		data.modules[name] = fn;
		if (call == true) {
			fn.call(this);
		}
		this.length++;
	};

	/**
	 * Вызов модуля
	 * @param moduleName
	 */
	App.prototype.callModule = function (moduleName) {
		data.modules[moduleName].apply(this, [].slice.call(arguments, 1));
	};

	/**
	 * Удаление модуля
	 * @param moduleName
	 */
	App.prototype.removeModule = function (moduleName) {
		delete data.modules[moduleName];
		this.length--;
	};

	/**
	 * Возвращает все модули в виде объекта
	 * @returns {data.modules|{}}
	 */
	App.prototype.getModules = function () {
		return data.modules;
	};

	window.App = App;
	window.app = new App();
})(window, undefined);

app.data.media = {
	desktop: 1200
};

app.data.swipe = function (params) {
	var left = isFunction( params.left ) ? params.left : undefined;
	var right = isFunction( params.right ) ? params.right : undefined;
	var top = isFunction( params.top ) ? params.top : undefined;
	var bottom = isFunction( params.bottom ) ? params.bottom : undefined;
	
	var initialPoint;
	var finalPoint;
	document.addEventListener('touchstart', function(event) {
		initialPoint=event.changedTouches[0];
	}, false);
	document.addEventListener('touchend', function(event) {
		finalPoint=event.changedTouches[0];
		var xAbs = Math.abs(initialPoint.pageX - finalPoint.pageX);
		var yAbs = Math.abs(initialPoint.pageY - finalPoint.pageY);
		
		if ( xAbs > 20 || yAbs > 20 ) {
			if ( xAbs > yAbs ) {
				if (finalPoint.pageX < initialPoint.pageX && left){
					/*СВАЙП ВЛЕВО*/
						left();
				}
				else {
					/*СВАЙП ВПРАВО*/
					if ( xAbs > 70 && right)
						right();
				}
			}
			else {
				if (finalPoint.pageY < initialPoint.pageY && top) {
					/*СВАЙП ВВЕРХ*/
					top();
				}
				else if (bottom) {
					/*СВАЙП ВНИЗ*/
					bottom();
				}
			}
		}
	}, false);
};

function isFunction(object) {
	return typeof object == 'function';
}

app.addModule('left-bar', function () {
	var $leftBar = $('.left-bar');
	
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
	
	$listItem.on('click', function (e) {
		var $innerListActive = $(this).find($innerList);
		
		if ($innerListActive.length) {
			if ($innerListActive.is(':visible')) {
				$innerListActive.slideUp(300);
			} else {
				$innerListActive.slideDown(300);
			}
			return false;
		}
	});
	
	$openBtn.on('click', function () {
		toggleMenu();
	});
	
	$overlay.on('click', function () {
		hideMenu();
	});
	
	app.data.swipe({
		left: function () {
			if (isVisible) {
				hideMenu();
			}
		},
		right: function () {
			if (!isVisible) {
				showMenu();
			}
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
/**
 * Навигация
 */
app.addModule('nav', function () {
	var $nav = $('.nav');
	var $menuList = $nav.find('.nav_list');
	var $dropDownOpenLinks = $nav.find('.nav_dropdown > a');
	var $dropDownList = $nav.find('.nav_inner-list');
	var $openMenuBtn = $nav.find('.nav_open-menu');
	
	$dropDownOpenLinks.on('click', function () {
		var windowWidth = $(window).width();
		if (windowWidth <= app.data.media.desktop) {
			$(this).closest('.nav_dropdown').find($dropDownList).fadeToggle(200);
		}
		return false;
	});
	
	$openMenuBtn.on('click', function () {
		$menuList.fadeToggle(200);
		return false;
	});
	
	$(window).on('resize', function () {
		var windowWidth = $(window).width();
		if (windowWidth > app.data.media.desktop) {
			$dropDownList.removeAttr('style');
			$menuList.removeAttr('style');
		}
	});
});
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
jQuery(document).ready(function ($) {
	
	var modules = app.getModules();
	
	for (var module in modules) {
		app.callModule(module);
	}
	
});