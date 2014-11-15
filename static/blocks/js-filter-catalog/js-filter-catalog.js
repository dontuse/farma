$(function () {

    var $block = $('.js-filter-catalog');

    if ($block.length === 0) {
        return;
    }

    var $slider = $('.noUiSlider', $block);

    var $start = $('.js-slider_num-start', $block);
    var $end = $('.js-slider_num-end', $block);

    var start = $('.js-slider_num-start__n', $block).text();
    var end = $('.js-slider_num-end__n', $block).text();

    var slideMin = $('.b-filters__slider').data('min');
    var slideMax = $('.b-filters__slider').data('max');


    var min = getVarValueFromURL(location.search, 'min') || start;
    var max = getVarValueFromURL(location.search, 'max') || end;
    var curFilter = getVarValueFromURL(location.search, 'order') || 'name';

   // alert(curFilter);


    var $paginatio = $('.b-pagination__el', $block);

    var histEdited = false;

    var loadedClass = 'b-locked';

//    console.log(start);
//    console.log(end);

//    console.log(min);
//    console.log(max);

    function selectFilter(curFilter) {

        $('.b-filters__how-a').removeClass('b-filters__how-a_active');
        $('[href="&order='+curFilter+'"]').addClass('b-filters__how-a_active');

    }

    selectFilter(curFilter);


    var hisSup = function supports_history_api() {
//        console.log('qqq');
        return !!(window.history && history.pushState);
    }();

//    console.log(hisSup);


    $slider.noUiSlider({
        connect: true,
        range: [ slideMin, slideMax],
        start: [ min, max],
        step: 1,
        serialization: {
            to: [$start, $end],
            resolution: 1 },

        slide: function () {
            var values = $(this).val();

            $start.text(values[0] + ' руб.');
            $end.text(values[1] + ' руб.');

        },
        set: function () {
//            console.log('set');
            var values = $(this).val();
            $start.text(values[0] + ' руб.');
            $end.text(values[1] + ' руб.');
        }


    }).change(function () {
            //doLoad($(this).val());
//            console.log('change');

            var values = $(this).val();

            if (hisSup) {
				history.pushState(null, null, location.pathname + '?min=' + values[0] + '&max=' + values[1] + '&order=' + curFilter); // how filter
            }


            (function (url) {
                $('.js-catalog-load').addClass(loadedClass);

                $.ajax({
                    url: url,
                    dataType: 'html'
                })
                    .done(function (data) {

                        $('.js-catalog-load').removeClass(loadedClass);
                        $('.js-catalog-load').html(data);
                        //history.pushState( null, null ,location.search );
                    })
                    .fail(function () {
                    });
            })(location.pathname + '?min=' + values[0] + '&max=' + values[1]+'&order=' + curFilter);

            histEdited = true;
        });

    $start.appendTo('.noUi-handle-lower');
    $end.appendTo('.noUi-handle-upper');

    $slider.val([min , max], true);

    /// -------

    $(window).bind('popstate', function (e) {

        if (location.search) {

            if (histEdited === false) {
                return;
            }

            //  console.log('qqq' , e);

            //console.log(history.state);

            // var val = history.state;

            var curFilter = getVarValueFromURL(location.search, 'order') || 'name';
            selectFilter(curFilter);


            var min = getVarValueFromURL(location.search, 'min');
            var max = getVarValueFromURL(location.search, 'max');

//            console.log(location.search);
//            console.log(min);
//            console.log(max);

            $slider.val([min , max], true);

            (function (url) {
                $('.js-catalog-load').addClass(loadedClass);

                $.ajax({
                    url: url,
                    dataType: 'html'
                })
                    .done(function (data) {

                        $('.js-catalog-load').removeClass(loadedClass);
                        $('.js-catalog-load').html(data);
                        //history.pushState( null, null ,location.search );
                    })
                    .fail(function () {
                    });
            })(location.search);

        }

    });


    $block.on('click', '.b-pagination__el', function (e) {

        e.preventDefault();
        e.stopPropagation();

        var url = $(this).attr('href');
//        console.log(url);
        histEdited = true;

        if (hisSup) {
            history.pushState(null, null, url);
        }




        (function (url) {
            $('.js-catalog-load').addClass(loadedClass);

            $.ajax({
                url: url,
                dataType: 'html'
            })
                .done(function (data) {

                    $('.js-catalog-load').removeClass(loadedClass);
                    $('.js-catalog-load').html(data);

                })
                .fail(function () {
                });
        })(url);

    });


    // фильтры ссылки
    $('.b-filters__how-a').click(function(e){
        e.preventDefault();
        var $that =  $(this);

        histEdited == true;

        $('.b-filters__how-a').removeClass('b-filters__how-a_active');

        $that.addClass('b-filters__how-a_active');

        var values = $slider.val();
		curFilter = getVarValueFromURL($(this).attr('href'), 'order');

        if (hisSup) {
            history.pushState(null, null, location.pathname + '?min=' + values[0] + '&max=' + values[1] + $(this).attr('href')); // how filter
        }

        (function (url) {
            $('.js-catalog-load').addClass(loadedClass);

            $.ajax({
                url: url,
                dataType: 'html'
            })
                .done(function (data) {

                    $('.js-catalog-load').removeClass(loadedClass);
                    $('.js-catalog-load').html(data);

                })
                .fail(function () {
                });
        })(location.pathname+ '?min=' + values[0] + '&max=' + values[1] + $(this).attr('href'));
    });


    function getVarValueFromURL(url, varName) {
        var query = url.substring(url.indexOf('?') + 1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == varName) {
                return pair[1];
            }
        }
        return null;
    }


});







