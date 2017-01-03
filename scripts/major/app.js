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
	desktop: 1201
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
