'use strict';
jQuery(document).ready(function() {

    $('form').submit(function(){

        $('.tips').fadeOut('fast');

        let newPassword = $('#newPassword').val();
        let repeatNewPassword = $('#repeatNewPassword').val();
        if (newPassword !== repeatNewPassword) {
            $('#not_match').fadeIn('fast');
            return false;
        }
        let options = {
            success: function (response) {
                if (response === 'success') {
                    $('#success').fadeIn('fast');
                } else {
                    $('#wrong_password').fadeIn('fast');
                }
            },
            error: function () {
                alert('网络错误');
            },
            url : 'changePassword',    //默认是form的action，如果申明，则会覆盖
            type : 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
        };
        $(this).ajaxSubmit(options);
        return false;
    });

    $('#oldPassword, #newPassword, #repeatNewPassword').keyup(function(){
        $('.tips').fadeOut('fast');
    });


});
