$(function(){
    var $block = $('.js-add-prod-comment');

    if(!$block.length) {return;}

    var $form = $('.js-add-prod-comment__form', $block);
    var $submitCtrl = $('.js-add-prod-comment__submit', $block);

    var parsley = $form.parsley({
        errorsWrapper: '<div></div>',
        errorTemplate: '<div class="b-control__error"></div>',
        errorClass: 'b-control_st_error',
        classHandler: function (field) {
            return field.$element.parents('.b-control');
        }
    });

    $submitCtrl.on('click',formHandler);

    function formHandler(e) {
        e.preventDefault();
        //$form.css({background: "red"});

        if(parsley.validate()) {
            $('.js-add-prod-comment').modal('hide');

        }
    }



});