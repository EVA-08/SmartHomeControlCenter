$('#page-wrapper').find('.btn-primary').click(function (event) {

    $('.tips').fadeOut('fast');
    let id = $(this).parent().find('.thumbnail').attr('data-id');
    let name = $(this).parent().find('h3').text();
    $('#deviceInfo').find('form').find('input[name="name"]').val(name);
    console.log('after click ' + id);
    let options = {
        title: '请选择头像',
        resizeImage: true,
        resizePreference: 'width',
        language: 'zh', //设置语言
        uploadUrl: '/changeDevicePhoto/' + id,
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
        $('#deviceInfo').find('.alert-success').fadeIn('fast');
        $('#deviceInfo').find('.alert-danger').fadeOut('fast');
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
                    $('#deviceInfo').find('.alert-success').fadeIn('fast');
                } else {
                    $('#deviceInfo').find('.alert-danger').fadeIn('fast');
                }
            },
            error: function () {
                alert('网络错误');
            },
            url: '/changeDeviceInfo/' + id,    //默认是form的action，如果申明，则会覆盖
            type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
        };
        console.log('before submit ' + id);
        if (!hasPhoto) {
            $('#deviceInfo').find('.alert-warning').fadeIn('fast');
            return false;
        }
        $(this).ajaxSubmit(options);
        $('#changePhoto').fileinput('upload');

        return false;
    });
    $('#deviceInfo').modal('show').on('hide.bs.modal', function () {
        console.log('after hide ' + id);
        $.post('/deviceInfo/' + id, function (deviceInfo) {
            $('#page-wrapper div[data-id=' + id + ']').children('img').attr('src', deviceInfo.photo);
            $('#page-wrapper div[data-id=' + id + ']').siblings('h3').text(deviceInfo.name);
        });
        $('#changePhoto').off().fileinput('destroy');
        $('#deviceInfo').find('form').off('submit');
        $('#deviceInfo').off();
    });
});
$('#page-wrapper').find('.btn-danger').click(function () {
    let id = $(this).parent().find('.thumbnail').attr('data-id');

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
                $.post('/removeDeviceInfo/' + id, function (response) {
                    location.reload(true);
                });
            }
        }
    });
});

$('#insertDevice').find('select[name="type"]').change(function () {
    let type = $(this).find('option:selected').text();
    if (type === '----请选择种类----') {
        $('#insertDevice').find('select[name="model"]').append('<option>----请选择型号----</option>');
        return;
    }
    $.post('/getSupportedDeviceModel/' + type + '/', function (response) {
        $('#insertDevice').find('select[name="model"]').empty().append('<option>----请选择型号----</option>');
        console.log(response);
        for (option of response) {
            $('#insertDevice').find('select[name="model"]').append('<option>' + option + '</option>');
        }

    });
});

$('#addition').click(function () {
    //获得当前url最后面的路径，即房间ID
    let url = window.location.href;
    let pos = url.lastIndexOf('/');
    let roomId = url.substring(pos + 1);
    if (roomId.endsWith('#')) {
        roomId = roomId.substring(0, roomId.length - 1);
    }
    $('#insertDevice').find('input[type="hidden"]').val(roomId);

    let options = {
        title: '请选择头像',
        resizeImage: true,
        resizePreference: 'width',
        language: 'zh', //设置语言
        uploadUrl: '/insertDevicePhoto',
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
    $('#devicePhoto').fileinput(options).on("fileuploaded", function (event, data) {
        let newPhoto = data.response.response;
        $('#devicePhoto').fileinput('reset').fileinput('enable').fileinput('refresh');
        $('#insertDevice').find('.alert-success').fadeIn('fast');
        $('#insertDevice').find('.alert-danger').fadeOut('fast');
        hasPhoto = false;
    }).on('fileloaded', function (event) {
        $('.tips').fadeOut('fast');
        hasPhoto = true;
    }).on('filecleared', function (event) {
        hasPhoto = false;
    });
    $('#insertDevice').find('form').submit(function (event) {
        let type = $(this).find('select[name="type"] option:selected').text();
        if (type === '----请选择种类----') {
            $(this).find('select[name="type"]').popover('show');
            return false;
        }
        let model = $(this).find('select[name="model"] option:selected').text();
        if (model === '----请选择型号----') {
            $(this).find('select[name="model"]').popover('show');
            return false;
        }
        $('.tips').fadeOut('fast');
        let options = {
            success: function (response) {
                if (response === 'success') {
                    if (response !== 'fail') {
                        $('#insertDevice').find('.alert-success').fadeIn('fast');
                        $('#devicePhoto').fileinput('upload');
                    } else {
                        $('#insertDevice').find('.alert-danger').fadeIn('fast');
                    }
                } else {
                    $('#insertDevice').find('.alert-danger').fadeIn('fast');
                }
            },
            error: function () {
                alert('网络错误');
            },
            url: '/insertDeviceInfo',    //默认是form的action，如果申明，则会覆盖
            type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
        };

        if (!hasPhoto) {
            $('#insertDevice').find('.alert-warning').fadeIn('fast');
            return false;
        }
        $(this).ajaxSubmit(options);

        return false;
    });
    $('#insertDevice').modal('show').on('hide.bs.modal', function () {
        location.reload(true);
    });
});


$('body').click(function (event) {
    $('form').find('select').popover('hide');
});