<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/29
  Time: 17:52
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
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
    <table class="table table-bordered table-responsive table-striped table-hover">
      <thead>
      <tr>
        <th>用户名</th>
        <th>时间</th>
        <th>IP地址</th>
        <th>登录结果</th>
      </tr>
      </thead>
      <tbody>
      <c:forEach items="${loginLogList}" var="loginLog">
        <tr>
          <th>${loginLog.getUsername()}</th>
          <th>${loginLog.getDatetime()}</th>
          <th>${loginLog.getIp()}</th>
          <th>${loginLog.getResult()}</th>
        </tr>
      </c:forEach>
      </tbody>
    </table>
    <nav>
      <ul class="pagination pagination-lg">
        <li class="active"><a href="#">1</a></li>
        <c:choose>
          <c:when test="${numLoginLog > 0 }">
            <c:forEach begin="2" end="${Math.floor(numLoginLog / 10 + 1) < 5? numLoginLog / 10 + 1: 5}" var="index">
              <li><a href="#"><fmt:formatNumber value="${index}" maxFractionDigits="0"></fmt:formatNumber></a></li>
            </c:forEach>
            <c:choose>
              <c:when test="${Math.floor(numLoginLog / 10 + 1) > 5}">
                <li><span>..</span></li>
                <li><a href="#"><fmt:formatNumber type="number" value="${Math.floor(numLoginLog / 10 + 1)}" maxFractionDigits="0"></fmt:formatNumber></a></li>
              </c:when>
            </c:choose>
          </c:when>
        </c:choose>
        <c:choose>
          <c:when test="${Math.floor(numLoginLog / 10) > 1}">
            <li><a href="#" aria-label="Next">&raquo;</a></li>
          </c:when>
        </c:choose>
      </ul>
    </nav>
  </div>
</div>
<link href="/css/custom.css" rel="stylesheet">
<!-- Metis Menu Plugin JavaScript -->
<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<!-- Bootstrap Core JavaScript -->
<script src="/js/bootstrap.min.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/loginLog.js"></script>
</body>
</html>
