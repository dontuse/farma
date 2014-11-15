$(function(){

    var $blocks = $('.js-prod-addon');

    var visNum = 4;

    if($blocks.length ===0) {
        return;
    }

    $blocks.each(function(){
        var $block = $(this);
        var $a = $('.b-prod-addon__show', $block);
        var $title = $('.b-title', $block);


        var visNum = 4;
        var mobWidth = 1000;
        var landWidth = 1180;
        var width = $(window).width();



        if(width <= landWidth) {
            visNum = 3;
        }

        var lis = $('.b-prod-addon__el' , $block).hide().filter(':lt('+visNum+')').show().end();
        var lisNum = lis.length;


        var hidNum = lisNum - visNum;

        if(lisNum <= visNum) {
            return;
        }

        if(width >= mobWidth) {
           // console.log('desc');
            var $more = $('<a class="b-title__more" href="">' +
                '<i class="b-title__more-t">Показать еще</i>' +
                ' <i class="b-title__more-i">('+hidNum+')</i></a>').prependTo($title);
        } else {
            //console.log('mob');
            var $more = $('<a class="b-title__more" hrefloca="">' +
                '<i class="b-title__more-t">Показать еще</i>' +
                ' <i class="b-title__more-i">('+hidNum+')</i></a>').appendTo($block);
        }



        //console.log(hidNum, 'скрыто');
        $more.click(function(e) {
            e.preventDefault();
            var i = 0;

            $(this).fadeOut(200);

            (function displayImages() {
                lis.eq(i++).fadeIn(200, displayImages);
            })();
        });
    });

});
