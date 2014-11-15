$(function () {

    var $block = $('.js-suggest');

    if($block.length === 0) {
        //console.log('non');
        return;
    }

    //разрешение //

    var source = $block.data('source');
    //console.log(source);

    //console.log('inited');

    $(".b-search__inp").autocomplete({
        minLength: 2,
        source: source,
        focus: function (event, ui) {
            $block.val(ui.item.name);
            return false;
        },
        select: function (event, ui) {
            $block.val(ui.item.name);
            return false;
        },
        open: function (event, ui) {
			$('.b-auto-basket').simpleCart(
					{
						templates: {
							t1: {name: 'basketTmpl', id:'basket', containerClass: 'b-auto-basket'}
						}
				}
			);
        }
    })
        .data("ui-autocomplete")._renderItem = function (ul, item) {

        var button = !item.cat ?
            ' <div style="display: none;" class="b-auto-basket"><span class="b-auto-basket__price">' + item.price + '</span><a class="b-button b-auto-basket__btn cartItemAdd" href="' + item.addToCartUrl + '">в корзину</a></div>' : ' ';

		var itemBlock = !item.url ?
			'<a class="b-compl-item__name">' + item.name + '</a>' :
			'<a href="' + item.url +'" title="Перейти на страницу' + (!item.cat ? ' товара' : ' категории')  + '" class="b-compl-item__name">' + item.name + '</a>' ;

        return $("<li class='b-compl-item'>")
            .append(button)
            .append(itemBlock)
            .appendTo(ul);
    };


    $('body')
        .on('mouseenter', '.b-compl-item', function () {
            $('.b-auto-basket', this).show();
        })
        .on('mouseleave', '.b-compl-item', function () {
            $('.b-auto-basket', this).hide();
        });

});