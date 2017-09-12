<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/16
  Time: 16:08
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
<div class="modal fade bs-example-modal-lg" id="device" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <form method="post">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title center-block"></h4>
        </div>
        <div class="modal-body">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button class="btn btn-primary">确定</button>
        </div>
      </div>
    </form>
  </div>
</div>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <div class="graphs">
      <c:forEach items="${deviceList}" var="device" varStatus="state">
        <c:choose>
          <c:when test="${state.index % 2 == 0}">
            <div class="graph_box">
          </c:when>
        </c:choose>
        <div class="col-md-6 grid_2">
          <div class="grid_1">
            <h3>${device.getName()}</h3>
            <a href="#" data-id="${device.getId()}" data-name="${device.getName()}"><img src="${device.getPhoto()}" class="img-responsive center-block"></a>
          </div>
        </div>
        <c:choose>
          <c:when test="${state.index % 2 != 0 or state.count == deviceList.size()}">
            <div class="clearfix"></div>
            </div>
          </c:when>
        </c:choose>
      </c:forEach>
    </div>
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
<script src="/js/deviceList.js"></script>
</body>
</html>
