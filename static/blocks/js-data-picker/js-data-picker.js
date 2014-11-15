$(function(){
    $block = $('.js-data-picker');

    if(!$block.length){return}

    $input = $('.b-input', $block );


    $input.datepicker({ dateFormat: "dd.mm.yy",  minDate: new Date() } );

    $('.b-calendar').click(function(){
        $input.datepicker( "show" );
    });
});