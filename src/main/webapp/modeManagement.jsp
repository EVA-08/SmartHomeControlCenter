<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/21
  Time: 23:12
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html>
<head>
  <title>Basic_tables</title>
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
  <link href="/css/custom.css" rel="stylesheet">
  <link href="/css/bootstrap-slider.min.css" rel="stylesheet" type="text/css">
  <link href="/css/bootstrap-colorpicker.min.css" rel="stylesheet">

  <!-- jQuery -->
  <script src="/js/jquery.min.js"></script>


</head>
<body>
<div class="modal fade bs-example-modal-lg" id="mode" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <div class="modal-content">
      <form method="post" id="form">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title center-block"></h4>
        </div>
        <div class="modal-body">
          <
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button class="btn btn-primary">确认</button>
        </div>
      </form>
    </div>
  </div>
</div>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <c:forEach items="${modeList}" var="mode">
      <div class="thumbnail col-md-3" data-id="${mode.getId()}" data-name="${mode.getName()}">
        <h1 class="center-block">${mode.getName()}</h1>
        <a href="#" class="btn btn-primary">修改</a>
        <a href="#" class="btn btn-danger">删除</a>
      </div>
    </c:forEach>
    <div class="col-md-3 grid_2">
      <div class="grid_1">
        <a href="#" class="thumbnail" id="addition">
          <h3>增加</h3>
          <img src="/data/addition.jpg" class="img-responsive">
        </a>
      </div>
    </div>
  </div>
</div>
<!-- Metis Menu Plugin JavaScript -->

<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="/js/bootstrap.min.js"></script>
<script src="/js/bootstrap-slider.min.js"></script>
<script src="/js/bootstrap-colorpicker.min.js"></script>
<script src="/js/piexif.min.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/jquery.serializejson.min.js"></script>
<script src="/js/bootbox.min.js"></script>
<script src="/js/modeManagement.js"></script>
</body>
</html>
