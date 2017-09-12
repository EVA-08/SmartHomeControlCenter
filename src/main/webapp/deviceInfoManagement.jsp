<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: EVA-08
  Date: 2017/8/20
  Time: 16:42
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
  <link href="/css/fileinput.min.css" rel="stylesheet">
  <link href="/css/custom.css" rel="stylesheet">

  <!-- jQuery -->
  <script src="/js/jquery.min.js"></script>

  <!-- Bootstrap Core JavaScript -->
  <script src="/js/bootstrap.min.js"></script>

</head>
<body>
<div class="modal fade bs-example-modal-lg" id="deviceInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <form method="post">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title center-block">修改设备</h4>
        </div>
        <div class="modal-body">
          <label class="control-label">更改设备名</label>

          <input class="form-control1 ng-invalid ng-invalid-required ng-touched" ng-model="model.name"
                 name="name" required>

          <label class="control-label">更改图片</label>
          <input type="file" id="changePhoto" name="photo">
          <div id="fail" class="tips alert-danger" style="display: none;">更改失败</div>
          <div id="success" class="tips alert-success" style="display: none">更改成功</div>
          <div id="noPhoto" class="tips alert-warning" style="display: none;">请选择图片</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button class="btn btn-primary">确认</button>
        </div>
      </div>
    </form>
  </div>
</div>
<div class="modal fade bs-example-modal-lg" id="insertDevice" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog">
    <form method="post">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
              aria-hidden="true">&times;</span></button>
          <h4 class="modal-title center-block">增加设备</h4>
        </div>
        <div class="modal-body">
          <label class="control-label">设备名</label>

          <input class="form-control1 ng-invalid ng-invalid-required ng-touched" ng-model="model.name"
                 name="name" required>
          <label class="control-label">种类</label>
          <select class="form-control" name="type" data-toggle="popover" data-content="" data-placement="top" data-trigger="manual">
            <option>----请选择种类----</option>
            <c:forEach items="${supportedDeviceTypeList}" var="type">
              <option>${type}</option>
            </c:forEach>
          </select>
          <label class="control-label">型号</label>
          <select class="form-control" name="model" data-toggle="popover" data-content="请选择型号" data-placement="top" data-trigger="manual">
            <option>----请选择型号----</option>
          </select>

          <label class="control-label">图片</label>
          <input type="file" id="devicePhoto" name="photo">
          <input type="hidden" name="roomId">
          <div class="tips alert-danger" style="display: none;">创建失败</div>
          <div class="tips alert-success" style="display: none">创建成功</div>
          <div class="tips alert-warning" style="display: none;">请选择图片</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
          <button class="btn btn-primary">确认</button>
        </div>
      </div>
    </form>
  </div>
</div>
<div id="wrapper">
  <%@include file="nav.jsp" %>
  <div id="page-wrapper">
    <div class="graphs">
      <c:forEach items="${deviceInfoList}" var="deviceInfo" varStatus="state">
        <c:choose>
          <c:when test="${state.index % 2 == 0}">
            <div class="graph_box">
          </c:when>
        </c:choose>
        <div class="col-md-6 grid_2">
          <div class="grid_1">
            <h3>${deviceInfo.getName()}</h3>
            <div class="thumbnail" data-id="${deviceInfo.getId()}" data-name="${deviceInfo.getName()}">
              <img src="${deviceInfo.getPhoto()}" class="img-responsive center-block">
            </div>
            <a href="#" class="btn btn-primary">修改</a>
            <a href="#" class="btn btn-danger">删除</a>
          </div>
        </div>
        <c:choose>
          <c:when test="${state.index % 2 != 0}">
            <div class="clearfix"></div>
            </div>
          </c:when>
        </c:choose>
      </c:forEach>
      <c:choose>
      <c:when test="${deviceInfoList.size() % 2 == 0}">
        <div class="graph_box">
          <div class="col-md-6 grid_2">
            <div class="grid_1">
              <a href="#" class="thumbnail" id="addition">
                <h3>增加</h3>
                <img src="/data/addition.jpg" class="img-responsive">
              </a>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </c:when>
      <c:when test="${deviceInfoList.size() % 2 != 0}">
      <div class="col-md-6 grid_2">
        <div class="grid_1">
          <a href="#" class="thumbnail" id="addition">
            <h3>增加</h3>
            <img src="/data/addition.jpg" class="img-responsive">
          </a>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    </c:when>
    </c:choose>
  </div>
</div>
<!-- Metis Menu Plugin JavaScript -->
<script src="/js/metisMenu.min.js"></script>
<script src="/js/custom.js"></script>
<script src="/js/piexif.min.js"></script>
<script src="/js/fileinput.min.js"></script>
<script src="/js/zh.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/bootbox.min.js"></script>
<script src="/js/deviceInfoManagement.js"></script>
</body>
</html>
