<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/14
  Time: 12:30
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
  <title>Forms</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
  <meta name="keywords" content="Modern Responsive web template, Bootstrap Web Templates, Flat Web Templates, Andriod Compatible web template, 
Smartphone Compatible web template, free webdesigns for Nokia, Samsung, LG, SonyErricsson, Motorola web design"/>
  <script type="application/x-javascript"> addEventListener("load", function () {
      setTimeout(hideURLbar, 0);
  }, false);

  function hideURLbar() {
      window.scrollTo(0, 1);
  } </script>
  <!-- Bootstrap Core CSS -->
  <link href="/css/bootstrap.min.css" rel='stylesheet' type='text/css'/>
  <!-- Custom CSS -->
  <link href="/css/style.css" rel='stylesheet' type='text/css'/>
  <link href="/css/font-awesome.css" rel="stylesheet">
  <!-- jQuery -->
  <script src="/js/jquery.min.js"></script>

  <!-- Bootstrap Core JavaScript -->
  <script src="/js/bootstrap.min.js"></script>
</head>
<body>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <div class="graphs">
      <div class="xs">
        <h3>修改密码</h3>
        <div class="tab-content">
          <div class="tab-pane active" id="horizontal-form">
            <form class="form-horizontal">
              <div class="form-group">
                <label for="oldPassword" class="col-sm-2 control-label">请输入原密码：</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control1" id="oldPassword" name="oldPassword" required>
                </div>
              </div>
              <div class="form-group">
                <label for="newPassword" class="col-sm-2 control-label" >请输入新密码：</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control1" id="newPassword" name="newPassword" required>
                </div>
              </div>
              <div class="form-group">
                <label for="repeatNewPassword" class="col-sm-2 control-label">请重复新密码：</label>
                <div class="col-sm-8">
                  <input type="password" class="form-control1" id="repeatNewPassword" required>
                </div>
              </div>
              <div class="panel-footer">
                <div class="row">
                  <div class="col-sm-12 col-sm-offset-5">
                    <button class="btn-success btn">确定</button>
                  </div>
                </div>
              </div>
            </form>
            <div id="wrong_password" class="tips alert-danger" style="display: none;">原密码错误</div>
            <div id="not_match" class="tips alert-warning" style="display: none;">新密码与重复密码不匹配</div>
            <div id="success" class="tips alert-success" style="display: none;">修改成功</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /#page-wrapper -->
  </div>
  <!-- /#wrapper -->
</div>
<!-- Nav CSS -->
<link href="/css/custom.css" rel="stylesheet">
<!-- Metis Menu Plugin JavaScript -->
<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/changePassword.js"></script>
</body>
</html>
