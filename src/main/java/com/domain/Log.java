package com.domain;

import com.dao.LogDao;
import org.apache.ibatis.session.SqlSession;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.sql.Timestamp;
import java.time.LocalDateTime;

@Aspect
@Component
public class Log {
    private LogDao logDao;

    @Autowired
    public void setLogDao(SqlSession sqlSession) {
        this.logDao = sqlSession.getMapper(LogDao.class);
    }

    @AfterReturning(value="execution(* com.web.UserController.login(..))", returning = "result")
    public void LoginLog(String result) {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        HttpServletRequest request= ((ServletRequestAttributes)requestAttributes).getRequest();
        String username = request.getParameter("username");
        String ip = request.getRemoteAddr();
        Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
        logDao.insertLoginLog(username, timestamp, ip, result);
    }
}
