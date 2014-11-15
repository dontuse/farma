$(function () {

    var $block = $('.js-slider');

    if ($block.length === 0) {
        return;
    }

    var $slider = $('.noUiSlider', $block);
    var $start = $('.js-slider_num-start',$block);
    var $end = $('.js-slider_num-end',$block);
    var start = $('.js-slider_num-start__n',$block).text();
    var end = $('.js-slider_num-end__n',$block).text();


    $slider.noUiSlider({
        connect: true,
        range: [ start, end],
        start: [ start, end],
        step: 1,
        serialization: {
            to: [$start, $end],
            resolution: 1 },

        slide: function () {
            var values = $(this).val();

            $start.text(values[0] + ' руб.');
            $end.text(values[1] + ' руб.');

        }
    }).change(function () {
            var values = $(this).val();

            $.ajax({
                url: '/html/ajax/prod.html',
                dataType: 'html',
                data: {min:values[0],max:values[1]}
            })
                .done(function (data) {

                    $('.js-catalog-load').html(data);
                })
                .fail(function () {
                });
        });

    $start.appendTo('.noUi-handle-lower');
    $end.appendTo('.noUi-handle-upper');


});