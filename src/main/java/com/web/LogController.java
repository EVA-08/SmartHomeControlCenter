package com.web;

import com.dao.LogDao;
import com.domain.LoginLog;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class LogController {
    private LogDao logDao;

    @Autowired
    public void setLogDao(SqlSessionTemplate sqlSessionTemplate) {
        this.logDao = sqlSessionTemplate.getMapper(LogDao.class);
    }

    @RequestMapping(path = "loginLog")
    public String loginLog(ModelMap modelMap) {
        List<LoginLog> loginLogList = logDao.getLoginLogList(0, 10);
        Integer numLoginLog = logDao.numLoginLog();
        modelMap.put("loginLogList", loginLogList);
        modelMap.put("numLoginLog", numLoginLog);
        return "loginLog";
    }

    @RequestMapping(path = "getLoginLogPage/{page}")
    public @ResponseBody String getLoginLogPage(@PathVariable Integer page) {
        List<LoginLog> loginLogList = logDao.getLoginLogList((page - 1) * 10, 10);
        Integer numLoginLog = logDao.numLoginLog();
        ObjectMapper mapper = new ObjectMapper();
        String loginLogListJson = "";
        try {
            loginLogListJson = mapper.writeValueAsString(loginLogList);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return "{\"numLoginLog\": "+ numLoginLog +", \"loginLogList\": "+ loginLogListJson + "}";
    }
}
