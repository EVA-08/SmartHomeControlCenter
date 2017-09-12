$('#addition').click(function () {
    //构造创建页面
    $('.modal-title').text('创建模式');
    $('.modal-body').empty().append('<label class="control-label">模式名</label>\n' +
        '<input class="form-control1 ng-invalid ng-invalid-required ng-touched" ng-model="model.name"\n' +
        'name="name" required>');
    $.post('/allDeviceInfoList', function (allDeviceInfoList) {
        for (let deviceInfo of allDeviceInfoList) {
            $('.modal-body').append('<form data-id="' + deviceInfo.id + '"><h3 class="page-header">' + deviceInfo.name + '</h3></form>');
            $.post('/device/' + deviceInfo.id, function (response) {
                //构造开关
                if (response.power) {
                    let power = response.power;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<div class="btn-group" data-toggle="buttons">' +
                        '<h4>电源选项</h4>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="power" autocomplete="off" value="ON">' +
                        '开</label>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="power" autocomplete="off" value="OFF">' +
                        '关</label></div>');

                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[value="ON"]').parent().click(function (event) {
                        $(this).removeClass('btn-default active').addClass('active btn-info');
                        $(this).siblings().removeClass('active btn-danger').addClass('btn-default');
                    });
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[value="OFF"]').parent().click(function (event) {
                        $(this).removeClass('btn-default active').addClass('active btn-danger');
                        $(this).siblings().removeClass('active btn-info').addClass('btn-default');
                    });
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[value=' + power + ']').parent().trigger('click');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                }

                //构造温度
                if (response.temperature) {
                    let temperature = response.temperature;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<h4>温度</h4>' +
                        '<input type="text" ' +
                        'data-slider-min="16" data-slider-max="30" ' +
                        'data-slider-step="1" data-slider-value="17" ' +
                        'data-slider-tooltip="always" ' +
                        'name="temperature">');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[name="temperature"]').slider().slider('setValue', temperature);
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                }

                //构造工作模式
                if (response.workingState) {
                    let workingState = response.workingState;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<div class="btn-group" data-toggle="buttons" data-type="workingState">' +
                        '<h4>工作模式</h4>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="workingState" autocomplete="off" value="AUTO">' +
                        '自动</label>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="workingState" autocomplete="off" value="HEAT">' +
                        '制热</label>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="workingState" autocomplete="off" value="COOL">' +
                        '制冷</label>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="workingState" autocomplete="off" value="FAN">' +
                        '送风</label>' +
                        '<label class="btn btn-default btn-lg btn_5">' +
                        '<input type="radio" name="workingState" autocomplete="off" value="DRY">' +
                        '除湿</label>' +
                        '</div>');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('div[data-type="workingState"]').find('label').click(function (event) {
                        $(this).removeClass('btn-default active').addClass('btn-primary active');
                        $(this).siblings().removeClass('active btn-primary').addClass('btn-default');
                    });
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[value=' + workingState + ']').parent().trigger('click');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                }

                //构造风速
                if (response.fanSpeed) {
                    let fanSpeed = response.fanSpeed;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<h4>电源选项</h4>' +
                        '<input type="text" ' +
                        'data-provide="slider" ' +
                        'data-slider-ticks="[1, 2, 3]" ' +
                        'data-slider-ticks-labels=\'["低", "中", "高"]\' ' +
                        'data-slider-min="1" ' +
                        'data-slider-max="3" ' +
                        'data-slider-step="1" ' +
                        'data-slider-value="3" ' +
                        'data-slider-tooltip="hide" ' +
                        'name="fanSpeed">');

                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                    $('.modal').on('shown.bs.modal', function () {
                        $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[name="fanSpeed"]')
                            .slider().slider('setValue', response.fanSpeed);
                    });
                }

                //构造光照强度
                if (response.intensity) {
                    let intensity = response.intensity;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<h4>光照强度</h4>' +
                        '<input type="text" ' +
                        'data-slider-min="0" data-slider-max="100" ' +
                        'data-slider-step="1" data-slider-value="17" ' +
                        'data-slider-tooltip="always" ' +
                        'name="intensity">');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[name="intensity"]').slider().slider('setValue', intensity);
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                }

                //构造灯光颜色
                if (response.color) {
                    let color = response.color;
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<h4>颜色</h4>' +
                        '<div><input name="color"></div>');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').append('<br>');
                    $('.modal-body').find('form[data-id="' + deviceInfo.id + '"]').find('input[name="color"]').parent().colorpicker({
                        inline: true,
                        color: color,
                        format: 'hex',
                        container: true,
                    });
                }
            });

        }
        //构造提示
        $('.modal-body').append('<div class="alert-success tips" style="display:none">执行成功</div>');
        $('.modal-body').append('<div class="alert-danger tips" style="display:none">执行失败</div>');

        $('.modal').modal('show').on('hide.bs.modal', function () {
            location.reload(true);
        });

    });
    //序列化每个表单并提交
    $('#form').submit(function () {
        $('.modal-body').find('.tips').fadeOut('fast');
        let state = {};
        $('form[data-id]').each(function () {
            let id = $(this).attr('data-id');
            let data = $(this).serializeJSON();
            state[id] = data;
        });
        let name = $('.modal-body').children('input').val();
        $.ajax({
            type: 'post',
            url: '/insertMode',
            data: JSON.stringify({name: name, state: state}),
            contentType: "application/json",
            success: function (response) {
                if (response === 'success') {
                    $('.modal-body').find('.alert-success').fadeIn('fast');
                } else {
                    $('.modal-body').find('.alert-danger').fadeIn('fast');
                }
            },
        });
        return false;
    });
});

$('#page-wrapper').find('.btn-primary').click(function () {
    //构造修改模式
    $('.modal-title').text('修改模式');
    $('.modal-body').empty().append('<label class="control-label">模式名</label>\n' +
        '<input class="form-control1 ng-invalid ng-invalid-required ng-touched" ng-model="model.name"\n' +
        'name="name" required>');
    let modeName = $(this).parent().attr('data-name');
    let modeId = $(this).parent().attr('data-id');
    $('.modal-body').find('input').val(modeName);
    $.post('modeState/' + modeId, function (mode) {
        mode = JSON.parse(mode);
        for (let id in mode) {
            let deviceState = mode[id];
            $('.modal-body').append('<form data-id="' + id + '"><h3 class="page-header"></h3></form>');
            $.post('/deviceInfo/' + id, function (response) {
                if (response) {
                    $('.modal-body').find('form[data-id=' + id + ']').find('h3').text(response.name);
                }
            });
            //构造开关
            if (deviceState.power) {
                let power = deviceState.power;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<div class="btn-group" data-toggle="buttons">' +
                    '<h4>电源选项</h4>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="power" autocomplete="off" value="ON">' +
                    '开</label>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="power" autocomplete="off" value="OFF">' +
                    '关</label></div>');

                $('.modal-body').find('form[data-id="' + id + '"]').find('input[value="ON"]').parent().click(function (event) {
                    $(this).removeClass('btn-default active').addClass('active btn-info');
                    $(this).siblings().removeClass('active btn-danger').addClass('btn-default');
                });
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[value="OFF"]').parent().click(function (event) {
                    $(this).removeClass('btn-default active').addClass('active btn-danger');
                    $(this).siblings().removeClass('active btn-info').addClass('btn-default');
                });
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[value=' + power + ']').parent().trigger('click');
                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
            }

            //构造温度
            if (deviceState.temperature) {
                let temperature = deviceState.temperature;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<h4>温度</h4>' +
                    '<input type="text" ' +
                    'data-slider-min="16" data-slider-max="30" ' +
                    'data-slider-step="1" data-slider-value="17" ' +
                    'data-slider-tooltip="always" ' +
                    'name="temperature">');
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[name="temperature"]').slider().slider('setValue', temperature);
                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
            }

            //构造工作模式
            if (deviceState.workingState) {
                let workingState = deviceState.workingState;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<div class="btn-group" data-toggle="buttons" data-type="workingState">' +
                    '<h4>工作模式</h4>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="workingState" autocomplete="off" value="AUTO">' +
                    '自动</label>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="workingState" autocomplete="off" value="HEAT">' +
                    '制热</label>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="workingState" autocomplete="off" value="COOL">' +
                    '制冷</label>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="workingState" autocomplete="off" value="FAN">' +
                    '送风</label>' +
                    '<label class="btn btn-default btn-lg btn_5">' +
                    '<input type="radio" name="workingState" autocomplete="off" value="DRY">' +
                    '除湿</label>' +
                    '</div>');
                $('.modal-body').find('form[data-id="' + id + '"]').find('div[data-type="workingState"]').find('label').click(function (event) {
                    $(this).removeClass('btn-default active').addClass('btn-primary active');
                    $(this).siblings().removeClass('active btn-primary').addClass('btn-default');
                });
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[value=' + workingState + ']').parent().trigger('click');
                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
            }

            //构造风速
            if (deviceState.fanSpeed) {
                let fanSpeed = deviceState.fanSpeed;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<h4>电源选项</h4>' +
                    '<input type="text" ' +
                    'data-provide="slider" ' +
                    'data-slider-ticks="[1, 2, 3]" ' +
                    'data-slider-ticks-labels=\'["低", "中", "高"]\' ' +
                    'data-slider-min="1" ' +
                    'data-slider-max="3" ' +
                    'data-slider-step="1" ' +
                    'data-slider-value="3" ' +
                    'data-slider-tooltip="hide" ' +
                    'name="fanSpeed">');

                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
                $('.modal').on('shown.bs.modal', function () {
                    $('.modal-body').find('form[data-id="' + id + '"]').find('input[name="fanSpeed"]')
                        .slider().slider('setValue', deviceState.fanSpeed);
                });
            }

            //构造光照强度
            if (deviceState.intensity) {
                let intensity = deviceState.intensity;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<h4>光照强度</h4>' +
                    '<input type="text" ' +
                    'data-slider-min="0" data-slider-max="100" ' +
                    'data-slider-step="1" data-slider-value="17" ' +
                    'data-slider-tooltip="always" ' +
                    'name="intensity">');
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[name="intensity"]').slider().slider('setValue', intensity);
                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
            }

            //构造灯光颜色
            if (deviceState.color) {
                let color = deviceState.color;
                $('.modal-body').find('form[data-id="' + id + '"]').append('<h4>颜色</h4>' +
                    '<div><input name="color"></div>');
                $('.modal-body').find('form[data-id="' + id + '"]').append('<br>');
                $('.modal-body').find('form[data-id="' + id + '"]').find('input[name="color"]').parent().colorpicker({
                    inline: true,
                    color: color,
                    format: 'hex',
                    container: true,
                });
            }
        }
        //构造提示
        $('.modal-body').append('<div class="alert-success tips" style="display:none">执行成功</div>');
        $('.modal-body').append('<div class="alert-danger tips" style="display:none">执行失败</div>');

        $('.modal').modal('show').on('hide.bs.modal', function () {
            location.reload(true);
        });
    });

    //序列化每个表单并提交
    $('#form').submit(function () {
        $('.modal-body').find('.tips').fadeOut('fast');
        let state = {};
        $('form[data-id]').each(function () {
            let id = $(this).attr('data-id');
            let data = $(this).serializeJSON();
            state[id] = data;
        });
        let name = $('.modal-body').children('input').val();
        $.ajax({
            type: 'post',
            url: '/changeMode/' + modeId,
            data: JSON.stringify({name: name, state: state}),
            contentType: "application/json",
            success: function (response) {
                if (response === 'success') {
                    $('.modal-body').find('.alert-success').fadeIn('fast');
                } else {
                    $('.modal-body').find('.alert-danger').fadeIn('fast');
                }
            },
        });
        return false;
    });
});

//删除
$('#page-wrapper').find('.btn-danger').click(function () {
    let id = $(this).parent().attr('data-id');
    console.log(id);
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
                $.post('/removeMode/' + id,function (response) {
                    location.reload(true);
                });
            }
        }
    });
});