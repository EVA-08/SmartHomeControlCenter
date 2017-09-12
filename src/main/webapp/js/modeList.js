$('#page-wrapper').find('.btn-primary').click(function () {
    $(this).popover('hide');
    let id = $(this).parent().attr('data-id');
    let $button = $(this);
    $.post('/applyMode/' + id, function (response) {
        if (response === 'success') {
            $button.attr('data-content', '执行成功');
            $button.popover('show');
            setTimeout(function(){
                $button.popover('hide');
            }, 2000);
        } else {
            $button.attr('data-content', '执行失败');
            $button.popover('show');
            setTimeout(function(){
                $button.popover('hide');
            }, 2000);
        }
    })
});