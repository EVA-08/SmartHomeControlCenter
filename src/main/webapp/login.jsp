<%@ page import="java.util.Random" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html>
<html lang="en" class="no-js">

<head>

  <meta charset="utf-8">
  <title>登录</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">

  <!-- CSS -->
  <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=PT+Sans:400,700'>
  <link rel="stylesheet" href="/css/reset.css">
  <link rel="stylesheet" href="/css/supersized.css">
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/login_style.css">

</head>

<body>

<div class="page-container">
  <h1>智能家庭控制中心</h1>
  <form action="" method="post">
    <input type="text" name="username" class="username" placeholder="请输入用户名">
    <input type="password" name="password" class="password" placeholder="请输入密码">
    <input type="text" name="captcha" class="captcha" placeholder="请输入验证码">
    <a href="#"><img src="/captcha/<%=new Random().nextInt()%>>" title="看不清楚？单击图片进行刷新   "></a>
    <button type="submit">登录</button>

    <div class="error"><span>+</span></div>
  </form>
  <div class="alert alert-danger" style="display: none" role="alert">用户名或密码错误</div>
  <div class="alert alert-warning" style="display: none" role="alert">验证码错误</div>
</div>
<!-- Javascript -->
<script src="/js/jquery-1.8.2.min.js"></script>
<script src="/js/supersized.3.2.7.min.js"></script>
<script src="/js/supersized-init.js"></script>
<script src="/js/jquery.form.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/login.js"></script>

</body>

</html>

