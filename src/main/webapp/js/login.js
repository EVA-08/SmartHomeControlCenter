'use strict';

$('.page-container form').submit(function () {
    var username = $(this).find('.username').val();
    var password = $(this).find('.password').val();
    var captcha = $(this).find('.captcha').val();
    if (username === '') {
        $(this).find('.error').fadeOut('fast', function () {
            $(this).css('top', '27px');
        });
        $(this).find('.error').fadeIn('fast', function () {
            $(this).parent().find('.username').focus();
        });
        return false;
    }
    if (password === '') {
        $(this).find('.error').fadeOut('fast', function () {
            $(this).css('top', '94px');
        });
        $(this).find('.error').fadeIn('fast', function () {
            $(this).parent().find('.password').focus();
        });
        return false;
    }
    if (captcha === '') {
        $(this).find('.error').fadeOut('fast', function () {
            $(this).css('top', '160px');
        });
        $(this).find('.error').fadeIn('fast', function () {
            $(this).parent().find('.password').focus();
        });
        return false;
    }
    var options = {
        success: function (response) {
            if (response === 'success') {
                window.location = '/roomList';
            } else if (response === 'usernameOrPasswordWrong'){
                $('.alert-danger').fadeIn('fast', function () {
                    $(this).find('.error').fadeOut('fast');
                    $(this).find('.error').fadeIn('fast', function () {
                        $(this).parent().find('.password').focus();
                    });
                })
            } else {
                $('.alert-warning').fadeIn('fast', function () {
                    $(this).find('.error').fadeOut('fast');
                    $(this).find('.error').fadeIn('fast', function () {
                        $(this).parent().find('.password').focus();
                    });
                })
            }
        },
        error: function () {
            alert('网络错误');
        },
        url: 'login',    //默认是form的action，如果申明，则会覆盖
        type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
    };
    $(this).ajaxSubmit(options);
    return false;
});

$('.page-container form .username, .page-container form .password, .page-container form .captcha').keyup(function () {
    $(this).parent().find('.error').fadeOut('fast');
    $('.alert').fadeOut('fast');
});

$('.page-container').find('img').click(function () {
     $(this).hide().attr('src', '/captcha/' + parseInt(Math.random() * 10000000)).fadeIn('fast');
});

