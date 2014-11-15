$(function(){
    var $block = $('.b-accords__item');


    if($block.length === 0) {
        return;
    }

    var active_class = 'b-accords__item-lnk_active';

    $block.each(function() {

        var $opener = $('.b-accords__item-lnk', $(this));
        var $box  = $('.b-accords__box', $(this));

        $opener.click(function(e){
//            console.log(active_class);
            e.preventDefault(e);
            $box.slideToggle(200);
            $(this).toggleClass(active_class);
        });
    });


});