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