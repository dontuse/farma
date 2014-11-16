(function ($) {

	$.fn.simpleCart = function (options) {
		this.each(function () {
			var object = new Cart();
			return object.init(this, options);
		});
	};

	var Cart = (function () {
		var self;

		return {
			container: false,
			options: {
				itemWrapClass: 'cartItemWrap',
				addItemClass: 'cartItemAdd',
				removeItemClass: 'cartItemRemove',
				itemQuantityClass: 'cartItemQuantity',
				itemQuantityUpClass: 'cartItemQuantityUp',
				itemQuantityDownClass: 'cartItemQuantityDown',
				itemQuantityUpdateUpClass: 'cartItemQuantityUpdateUp',
				itemQuantityUpdateDownClass: 'cartItemQuantityUpdateDown',
				basketId: 'basket',
				basketCostId: 'basketCost',
				orderContainerId: 'orderContainer',
				emptyOrderContainerId: 'emptyOrderContainer',
				addressInputClass: 'addressInput',
				templates: {}
			},

			init: function (element, options) {
				self = this;

				this.container = $(element);

				this.options = $.extend(this.options, options);

				this.container.delegate('.' + this.options.itemQuantityUpClass + ', .' + this.options.itemQuantityDownClass, 'click', this.quantityIncrement);
				this.container.delegate('.' + this.options.itemQuantityUpdateUpClass + ', .' + this.options.itemQuantityUpdateDownClass, 'click', this.quantityUpdate);
				this.container.delegate('.' + this.options.addItemClass, 'click', this.addItem);
				this.container.delegate('.' + this.options.removeItemClass, 'click', this.removeItem);
			},

			quantityIncrement: function (e) {

				e.preventDefault();

				var target = $(e.currentTarget);
				var quantityElement = self.container.find('.' + self.options.itemQuantityClass);

				if (target.hasClass(self.options.itemQuantityUpClass))
					self._incrementValue(quantityElement, 1);

				if (target.hasClass(self.options.itemQuantityDownClass))
					self._incrementValue(quantityElement, -1);
			},

			_incrementValue: function (valueElement, incrementValue) {
				valueElement.val(Math.max(parseInt(valueElement.val()) + incrementValue, 0));
			},

			addItem: function (e) {
				e.preventDefault();

				var target = $(e.currentTarget);
				var quantityElement = self.container.find('.' + self.options.itemQuantityClass);
				var quantity = parseInt(quantityElement.val());
				if (isNaN(quantity))
					quantity = 1;


				$.getJSON(target.attr('href'), {quantity: quantity},function (data) {
					if (data.success) {
						if (data.cart) {
							self.updateBasket(data);
						}
					}
					else alert('Во время операции произошла ошибка, повторите действие еще раз');
				}).error(function () {
							alert('Во время операции произошла ошибка, повторите действие еще раз');
						});
			},

			removeItem: function (e) {
				e.preventDefault();

				var target = $(e.currentTarget);

				$.getJSON(target.attr('href'),function (data) {
					if (data.success) {
						if (data.cart) {
							if (data.cart.items.length == 0)
								self.clearBasket();
							else
								self.updateBasket(data);
						}
					}
					else alert('Во время операции произошла ошибка, повторите действие еще раз');
				}).error(function () {
							alert('Во время операции произошла ошибка, повторите действие еще раз');
						});
			},

			quantityUpdate: function (e) {
				e.preventDefault();

				var target = $(e.currentTarget);

				var quantityElement = self.container.find('.' + self.options.itemQuantityClass);

				if (target.hasClass(self.options.itemQuantityUpdateUpClass))
					self._incrementValue(quantityElement, 1);

				if (target.hasClass(self.options.itemQuantityUpdateDownClass))
					self._incrementValue(quantityElement, -1);

				$.getJSON(quantityElement.attr('data-link'), {quantity: parseInt(quantityElement.val())},function (data) {
					if (data.success) {
						self.updateBasket(data);
					}
					else alert('Во время операции произошла ошибка, повторите действие еще раз');
				}).error(function () {
							alert('Во время операции произошла ошибка, повторите действие еще раз');
						});
			},

			updateBasket: function (data) {

				$.each(self.options.templates, function (i, e) {
					var html = $.templates("#" + e.name).render(data);
					$('#' + e.id).html(html).parents('div').removeClass('b-widget_empty');
					$('.' + e.containerClass).simpleCart({templates: self.options.templates});
				});
			},

			clearBasket: function () {
				$('#' + self.options.orderContainerId).hide();
				$('#' + self.options.emptyOrderContainerId).show();
			}

		}
	});
})(jQuery);

