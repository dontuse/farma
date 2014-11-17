$(function(){
    var $block = $('.js-cat-nav');

    if(!$block.length){return;}

    $('.b-nav__header').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        //$('.b-nav__menu').slideToggle(200);

        $('.b-nav__menu').toggleClass('b-nav__menu_visible');
    });


});