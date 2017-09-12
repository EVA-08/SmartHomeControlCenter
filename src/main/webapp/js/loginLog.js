'use strict';

let clickFunc = function () {
    const numRow = 10;
    let page = $(this).text();

    if (page === '«') {
        page = $('#page-wrapper').find('nav').find('.active').find('a').text();
        page = parseInt(page) - 1;
    }
    if (page === '»') {
        page = $('#page-wrapper').find('nav').find('.active').find('a').text();
        page = parseInt(page) + 1;
    }
    page = parseInt(page);
    $.post('/getLoginLogPage/' + page, function (response) {
        console.log(response);
        response = JSON.parse(response);
        console.log(response);
        let numLoginLog = response.numLoginLog;
        let numPage = parseInt(numLoginLog / 10) + 1;

        let $pagination = $('#page-wrapper').find('ul');
        $pagination.empty();
        if (page > 1) {
            $pagination.append('<li><a href="#" aria-label="Previous">&laquo;</a></li>');
        }
        if (page > 3) {
            $pagination.append('<li><a href="#">1</a></li>').append('<li><span>..</span></li>');
        }
        let start = 0;
        if (page >= 3 && numPage - page >= 3) {
            start = page - 2;
        } else if (page < 3){
            start = 1;
        } else if (numPage - page < 3 && numPage >= 5) {
            start = numPage - 4;
        }
        for (let i = start; i < start + 5 && i <= numPage; i++) {
            $pagination.append('<li><a href="#">' + i + '</a> </li>')
        }
        if (numPage - page > 2) {
            $pagination.append('<li><span>..</span></li>')
                .append('<li><a href="#">' + numPage + '</a></li> ');
        }
        if (numPage - page > 0) {
            $pagination.append('<li><a href="#" aria-label="Next">&raquo;</a></li>');
        }
        $('#page-wrapper').find('nav').find('li a:contains(' + page + ')').parent().addClass('active');
        let loginLogList = response.loginLogList;
        console.log(loginLogList);
        let $tbody = $('#page-wrapper').find('tbody');
        $tbody.empty();
        for (let loginLog of loginLogList) {
            $tbody.append('<tr><th>' + loginLog.username + '</th><th>' + loginLog.datetime +
                ' </th><th>' + loginLog.ip + '</th><th>' + loginLog.result + '</th></tr>');
        }

        $('#page-wrapper').find('nav').find('a').click(clickFunc)
    });
};
$('#page-wrapper').find('nav').find('a').click(clickFunc);