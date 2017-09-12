$('.tips').fadeOut('fast');
let option = {
    title: '请选择头像',
    resizeImage: true,
    resizePreference: 'width',
    language: 'zh', //设置语言
    uploadUrl: 'changeUserPhoto',
    allowedFileExtensions: ['jpg', 'png', 'gif'],//接收的文件后缀
    dropZoneEnabled: true,
    showUpload: true, //是否显示上传按钮
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
    enctype: 'multipart/form-data'
};
$('#changePhoto').fileinput(option).on("fileuploaded", function (event, data) {

    let newPhoto = data.response.response;
    $('#photo').attr('src', newPhoto);
    $('#changePhoto').fileinput('reset').fileinput('enable').fileinput('refresh');
    $('#success').fadeIn('fast');
    $('#fail').fadeOut('fast');
}).on('fileerror', function (event, data) {
    $('#fail').fadeIn('fast');
    $('#success').fadeOut('fast');
}).on('fileloaded', function (event) {
    $('.tips').fadeOut('fast');
});