function Builder() {
	// Перебор коллекции NodeList
	this.__proto__.each = function (items, callback) {
		// return Object.keys(items).map(callback)
		return Array.prototype.map.call(items, callback)
	}
	// Преобразование коллекции NodeList в настоящий массив
	this.__proto__.trueArray = function (items) {
		return Array.prototype.slice.call(items, 0);
	}
	// Хранилище
	this.store = {}
	// Позиция эллемента
	Element.prototype.offset =  function() {
		let bodyRect = document.body.getBoundingClientRect(),
			elemRect = this.getBoundingClientRect()

		return {
			top: elemRect.top - bodyRect.top,
			left: elemRect.left - bodyRect.left
		}
	}
}

const builder = new Builder()
