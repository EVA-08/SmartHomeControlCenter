<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!-- Navigation -->
<nav class="top1 navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
  <div class="navbar-header">
    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
      <span class="sr-only">Toggle navigation</span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
      <span class="icon-bar"></span>
    </button>
    <a class="navbar-brand" href="/roomList">智能家庭控制中心</a>
  </div>
  <!-- /.navbar-header -->
  <ul class="nav navbar-nav navbar-right">
    <li class="dropdown">
      <a href="#" class="dropdown-toggle avatar" data-toggle="dropdown"><img src="${user.getPhoto()}" id="photo"></a>
      <ul class="dropdown-menu">
        <li class="dropdown-menu-header text-center">
          <strong>账户管理</strong>
        </li>
        <li class="m_2"><a href="/changePassword.jsp"><i class="fa fa-wrench"></i>修改密码</a></li>
        <li class="m_2"><a href="/changeUserPhoto.jsp"><i class="fa fa-user"></i>更换头像</a></li>
        <li class="m_2"><a href="/login.jsp"><i class="fa fa-lock"></i>注销登录</a></li>
      </ul>
    </li>
  </ul>
  <form class="navbar-form navbar-right">
    <span class="text">您好，尊敬的${user.getUsername()}</span>
  </form>
  <div class="navbar-default sidebar" role="navigation">
    <div class="sidebar-nav navbar-collapse">
      <ul class="nav" id="side-menu">
        <li>
          <a href="/roomList"><i class="fa fa-dashboard fa-fw nav_icon"></i>家居使用</a>
        </li>
        <li>
          <a href="/modeList"><i class="fa fa-table nav_icon"></i>模式选择</a>
        </li>
        <li>
          <a href="/roomManagement"><i class="fa fa-laptop nav_icon"></i>房间及设备管理</a>
          <!-- /.nav-second-level -->
        </li>
        <li>
          <a href="/modeManagement"><i class="fa fa-indent nav_icon"></i>模式管理</a>
          <!-- /.nav-second-level -->
        </li>
        <li>
          <a href="#"><i class="fa fa-sitemap fa-fw nav_icon"></i>日志<span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li>
              <a href="/loginLog">登录日志</a>
            </li>
          </ul>
          <!-- /.nav-second-level -->
        </li>
      </ul>
    </div>
    <!-- /.sidebar-collapse -->
  </div>
  <!-- /.navbar-static-side -->
</nav>