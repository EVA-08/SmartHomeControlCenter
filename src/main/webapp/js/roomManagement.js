'use strict';
$('#page-wrapper').find('a[data-id]').each(function () {
    let $a = $(this);
    let id = $a.attr('data-id');
    $.post('/getDevicesCount/' + id, function (response) {
        console.log(response);
        $a.prev().text($a.prev().text() + '(设备数：' + response + ')');
    });
});

$('#page-wrapper').find('.btn-primary').click(function (event) {
    $('.tips').fadeOut('fast');
    let id = $(this).parent().find('.thumbnail').attr('data-id');
    let name = $(this).parent().find('.thumbnail').attr('data-name');
    $('form').find('input[name="name"]').val(name);
    let options = {
        title: '请选择头像',
        resizeImage: true,
        resizePreference: 'width',
        language: 'zh', //设置语言
        uploadUrl: '/changeRoomPhoto/' + id,
        allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
        dropZoneEnabled: true,
        showUpload: false, //是否显示上传按钮
        showCaption: true,//是否显示标题
        showPreview: true,
        elCaptionText: '请选择头像',
        dropZoneTitle: '请将图片拖动到此处',
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        minFileCount: 1,
        maxFileCount: 1,
        msgFilesTooMany: "选择图片超过了最大数量",
        maxFileSize: 2000,
        autoReplace: true,
        fileActionSettings: {
            showUpload: false
        },
        enctype: 'multipart/form-data'
    };
    let hasPhoto = false;
    $('#changePhoto').fileinput(options).on("fileuploaded", function (event, data) {
        let newPhoto = data.response.response;
        $('#changePhoto').fileinput('reset').fileinput('enable').fileinput('refresh');
        $('#success').fadeIn('fast');
        $('#fail').fadeOut('fast');
        hasPhoto = false;
    }).on('fileloaded', function (event) {
        $('.tips').fadeOut('fast');
        hasPhoto = true;
    }).on('filecleared', function (event) {
        hasPhoto = false;
    });
    $('form').submit(function (event) {
        $('.tips').fadeOut('fast');
        let options = {
            success: function (response) {
                if (response === 'success') {
                    $('#success').fadeIn('fast');
                } else {
                    $('#fail').fadeIn('fast');
                }
            },
            error: function () {
                alert('网络错误');
            },
            url: '/changeRoomInfo/' + id,    //默认是form的action，如果申明，则会覆盖
            type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
        };

        if (!hasPhoto) {
            $('#noPhoto').fadeIn('fast');
            return false;
        }
        $(this).ajaxSubmit(options);
        $('#changePhoto').fileinput('upload');

        return false;
    });
    $('#room').modal('show').on('hide.bs.modal', function () {
        $('#changePhoto').fileinput('destroy');
        $('#changePhoto').off();
        $('#page-wrapper').find('form').off();
        $('#room').off();
        $.post('/room/' + id, function (room) {
            $('#page-wrapper').find('a[data-id="' + id + '"]').find('img').attr('src', room.photo);
            $('#page-wrapper').find('a[data-id="' + id + '"]').siblings('h3').text(room.name);
            $('#page-wrapper').find('a[data-id="' + id + '"]').attr('data-name', room.name);
            $.post('/getDevicesCount/' + id, function (response) {
                let $h3 = $('#page-wrapper').find('a[data-id="' + id + '"]').siblings('h3');
                $h3.text(room.name + '(设备数：' + response + ')');
            });
        });
    });
});

$('#addition').click(function () {
    $('.tips').fadeOut('fast');
    $('#room').find('.modal-title').text('创建房间');
    $('#room').find('.modal-body label:first').text('房间名');
    $('#room').find('.modal-body label:last').text('图片');
    $('#room').find('.modal-body input[name="name"]').text('');
    $('#success').text('创建成功');
    $('#fail').text('创建失败');
    let options = {
        title: '请选择头像',
        resizeImage: true,
        resizePreference: 'width',
        language: 'zh', //设置语言
        uploadUrl: '/insertRoomPhoto',
        allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
        dropZoneEnabled: true,
        showUpload: false, //是否显示上传按钮
        showCaption: true,//是否显示标题
        showPreview: true,
        elCaptionText: '请选择头像',
        dropZoneTitle: '请将图片拖动到此处',
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
        minFileCount: 1,
        maxFileCount: 1,
        msgFilesTooMany: "选择图片超过了最大数量",
        maxFileSize: 2000,
        autoReplace: true,
        fileActionSettings: {
            showUpload: false
        },
        enctype: 'multipart/form-data'
    };
    let hasPhoto = false;
    $('#changePhoto').fileinput(options).on("fileuploaded", function (event, data) {
        let newPhoto = data.response.response;
        $('#photo').attr('src', newPhoto);
        $('#changePhoto').fileinput('reset').fileinput('enable').fileinput('refresh');
        $('#success').fadeIn('fast');
        $('#fail').fadeOut('fast');
        hasPhoto = false;
    }).on('fileloaded', function (event) {
        $('.tips').fadeOut('fast');
        hasPhoto = true;
    }).on('filecleared', function (event) {
        hasPhoto = false;
    });
    $('form').submit(function () {
        $('.tips').fadeOut('fast');
        let options = {
            success: function (response) {
                if (response !== 'fail') {
                    $('#success').fadeIn('fast');
                    $('#changePhoto').fileinput('upload');
                } else {
                    $('#fail').fadeIn('fast');
                }
            },
            error: function () {
                alert('网络错误');
            },
            url: '/insertRoom',    //默认是form的action，如果申明，则会覆盖
            type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
        };
        if (!hasPhoto) {
            $('#noPhoto').fadeIn('fast');
            return false;
        }
        $(this).ajaxSubmit(options);

        return false;
    });
    $('#room').modal('show').on('hide.bs.modal', function () {
        location.reload(true);
    });
});

$('#page-wrapper').find('.btn-danger').click(function () {
    let id = $(this).parent().find('.thumbnail').attr('data-id');

    $.post('/getDevicesCount/' + id, function (response) {

         if (response > 0) {
             bootbox.alert({
                 size: "large",
                 message: "不可删除（设备数大于0）",
                buttons: {
                     ok: {
                         label: '确定',
                         className: 'btn-primary'
                     }
                },
                 callback: function () {

                 }
             });
         } else {
             bootbox.confirm({
                 size: "large",
                 message: '确认删除？',
                 buttons: {
                     confirm: {
                         label: '确定',
                         className: 'btn-primary'
                     },
                     cancel: {
                         label: '取消',
                         className: 'btn-danger'
                     }
                 },
                 callback: function (result) {
                    if (result) {
                        $.post('/removeRoom/' + id,function (response) {
                            location.reload(true);
                        });
                    }
                 }
             });
         }
    });
});