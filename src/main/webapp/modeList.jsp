<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/25
  Time: 23:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<!DOCTYPE HTML>
<html>
<head>
  <title>家电列表</title>
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
  <link href="/css/bootstrap-slider.min.css" rel="stylesheet" type="text/css">
  <!-- Custom CSS -->
  <link href="/css/style.css" rel='stylesheet' type='text/css'/>
  <link href="/css/font-awesome.css" rel="stylesheet">
  <link href="/css/bootstrap-colorpicker.min.css" rel="stylesheet">

  <!-- jQuery -->
  <script src="/js/jquery.min.js"></script>
  <!-- chart -->
  <script src="/js/Chart.js"></script>
</head>
<body>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <c:forEach items="${modeList}" var="mode">
      <div class="thumbnail col-md-3" data-id="${mode.getId()}" data-name="${mode.getName()}">
        <h1 class="center-block">${mode.getName()}</h1>
        <a href="#" class="btn btn-primary" data-toggle="popover" data-content="执行成功" data-placement="top" data-trigger="manual">启用</a>
      </div>
    </c:forEach>
  </div>
</div>
<link href="/css/custom.css" rel="stylesheet">
<!-- Metis Menu Plugin JavaScript -->
<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="/js/bootstrap.min.js"></script>
<script src="/js/bootstrap-slider.min.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/bootstrap-colorpicker.min.js"></script>
<script src="/js/modeList.js"></script>
</body>
</html>
