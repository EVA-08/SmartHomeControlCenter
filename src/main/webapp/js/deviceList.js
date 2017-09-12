$('#page-wrapper').find('a').click(function (event) {
    let id = $(this).attr('data-id');
    let name = $(this).attr('data-name');
    $('form').attr('action', 'changeDeviceState/' + id);
    $.post('/device/' + id, function (response) {
        $('.modal-title').text(name);
        $('.modal-body').empty();
        console.log(response);
        //构造开关
        if (response.power) {
            let power = response.power;
            $('.modal-body').append('<div class="btn-group" data-toggle="buttons" id="power">' +
                '<h4>电源选项</h4>' +
                '<label class="btn btn-default btn-lg btn_5">' +
                '<input type="radio" name="power" autocomplete="off" value="ON">' +
                '开</label>' +
                '<label class="btn btn-default btn-lg btn_5">' +
                '<input type="radio" name="power" autocomplete="off" value="OFF">' +
                '关</label></div>');

            $('#power').find('input[value="ON"]').parent().click(function (event) {
                $(this).removeClass('btn-default active').addClass('active btn-info');
                $(this).siblings().removeClass('active btn-danger').addClass('btn-default');
            });
            $('#power').find('input[value="OFF"]').parent().click(function (event) {
                $(this).removeClass('btn-default active').addClass('active btn-danger');
                $(this).siblings().removeClass('active btn-info').addClass('btn-default');
            });
            $('#power').find('input[value=' + power + ']').parent().trigger('click');
            $('.modal-body').append('<br>');
        }

        //构造温度
        if (response.temperature) {
            let temperature = response.temperature;
            $('.modal-body').append('<h4>温度</h4>' +
                '<input id="temperature" type="text" ' +
                'data-slider-min="16" data-slider-max="30" ' +
                'data-slider-step="1" data-slider-value="17" ' +
                'data-slider-tooltip="always" ' +
                'name="temperature">');
            $('#temperature').slider().slider('setValue', temperature);
            $('.modal-body').append('<br>');
        }

        //构造工作模式
        if (response.workingState) {
            let workingState = response.workingState;
            $('.modal-body').append('<div class="btn-group" data-toggle="buttons" id="workingState">' +
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
            $('#workingState').find('label').click(function (event) {
                $(this).removeClass('btn-default active').addClass('btn-primary active');
                $(this).siblings().removeClass('active btn-primary').addClass('btn-default');
            });
            $('#workingState').find('input[value=' + workingState + ']').parent().trigger('click');
            $('.modal-body').append('<br>');
        }

        //构造风速
        if (response.fanSpeed) {
            let fanSpeed = response.fanSpeed;
            $('.modal-body').append('<h4>风速</h4>' +
                '<input id="fanSpeed" type="text" ' +
                'data-provide="slider" ' +
                'data-slider-ticks="[1, 2, 3]" ' +
                'data-slider-ticks-labels=\'["低", "中", "高"]\' ' +
                'data-slider-min="1" ' +
                'data-slider-max="3" ' +
                'data-slider-step="1" ' +
                'data-slider-value="3" ' +
                'data-slider-tooltip="hide" ' +
                'name="fanSpeed">');

            $('.modal-body').append('<br>');
            $('.modal').on('shown.bs.modal', function () {
                $('#fanSpeed').slider().slider('setValue', response.fanSpeed);
            });
        }

        //构造光照强度
        if (response.intensity) {
            let intensity = response.intensity;
            $('.modal-body').append('<h4>光照强度</h4>' +
                '<input id="intensity" type="text" ' +
                'data-slider-min="0" data-slider-max="100" ' +
                'data-slider-step="1" data-slider-value="17" ' +
                'data-slider-tooltip="always" ' +
                'name="intensity">');
            $('#intensity').slider().slider('setValue', intensity);
            $('.modal-body').append('<br>');
        }

        //构造灯光颜色
        if (response.color) {
            let color = response.color;
            $('.modal-body').append('<h4>颜色</h4>' +
                '<div id="color"><input name="color"></div>');
            $('.modal-body').append('<br>');
            $('#color').colorpicker({
                inline: true,
                color: color,
                format: 'hex',
                container: true,
            });
        }
        //构造提示
            $('.modal-body').append('<div class="alert-success">执行成功</div>').find('.alert-success').hide();
        $('.modal-body').append('<div class="alert-danger">执行失败</div>').find('.alert-danger').hide();

        $('.modal').modal('show');

        $('form').submit(function () {

            let options = {
                success: function (response) {
                    if (response === 'success') {
                        $('.alert-success').fadeIn('fast');
                    } else {
                        $('.alert-danger').fadeIn('fast');
                    }
                },
                error: function () {
                    alert('网络错误');
                },
                url: '/changeDeviceState/' + id,    //默认是form的action，如果申明，则会覆盖
                type: 'POST',    // 默认值是form的method("GET" or "POST")，如果声明，则会覆盖
            };
            $(this).ajaxSubmit(options);
            return false;
        });
    })
});