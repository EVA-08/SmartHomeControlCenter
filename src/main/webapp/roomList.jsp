<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/15
  Time: 20:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE HTML>
<html>
<head>
  <title>房间列表</title>
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
  <!-- chart -->
  <script src="/js/Chart.js"></script>
</head>
<body>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <div class="graphs">
      <c:forEach items="${roomList}" var="room" varStatus="state">
        <c:choose>
          <c:when test="${state.index % 2 == 0}">
            <div class="graph_box">
          </c:when>
        </c:choose>
        <div class="col-md-6 grid_2">
          <div class="grid_1">
            <h3>${room.getName()}</h3>
            <a href="/room/${room.getId()}"><img src="${room.getPhoto()}" class="img-responsive center-block"></a>
          </div>
        </div>
        <c:choose>
          <c:when test="${state.index % 2 != 0 or state.count == roomList.size()}">
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
</body>
</html>
