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
  <link href="/css/fileinput.min.css" rel="stylesheet">
  <!-- Nav CSS -->
  <link href="/css/custom.css" rel="stylesheet">
  <!-- Metis Menu Plugin JavaScript -->
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
        <h3>更改头像</h3>
        <div class="tab-content">
          <div class="tab-pane active" id="horizontal-form">
            <form class="form-horizontal">
              <div class="form-group">
                <div class="col-sm-12">
                  <input type="file" id="changePhoto" name="photo" required>
                </div>
              </div>
            </form>
            <div id="fail" class="tips alert-danger" style="display: none;">更改失败</div>
            <div id="success" class="tips alert-success" style="display: none">更改成功</div>
          </div>
        </div>
      </div>
    </div>
    <!-- /#page-wrapper -->
  </div>
  <!-- /#wrapper -->
</div>

<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<script src="/js/piexif.min.js"></script>
<script src="/js/fileinput.min.js"></script>
<script src="/js/zh.js"></script>
<script src="/js/changeUserPhoto.js"></script>
</body>
</html>
