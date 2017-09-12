package com.web;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.dao.DeviceInfoDao;
import com.dao.ModeDao;
import com.domain.Mode;
import com.domain.PhysicalDevice;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Controller
public class ModeController {
    private ModeDao modeDao;
    private DeviceInfoDao deviceInfoDao;
    @Autowired
    public void setDeviceInfoDao(SqlSessionTemplate sqlSessionTemplate) {
        deviceInfoDao = sqlSessionTemplate.getMapper(DeviceInfoDao.class);
    }

    @Autowired
    public void setModeDao(SqlSessionTemplate sqlSessionTemplate) {
        this.modeDao = sqlSessionTemplate.getMapper(ModeDao.class);
    }

    @RequestMapping(path = "modeManagement")
    public String modeManagement(ModelMap modelMap) {
        List<Mode> modeList = modeDao.getModeList();
        modelMap.put("modeList", modeList);
        return "modeManagement";
    }

    @RequestMapping(path = "insertMode", method = RequestMethod.POST)
    public @ResponseBody String insertMode(@RequestBody String mode) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<String, Object> map = mapper.readValue(mode, new TypeReference<Map<String, Object>>(){});
            String name = (String)map.get("name");
            Map<String, Map<String, String>> state = (Map<String, Map<String, String>>)map.get("state");
            String stateJson = mapper.writeValueAsString(state);
            modeDao.insertMode(name, stateJson);
            return "success";
        } catch (IOException e) {
            e.printStackTrace();
            return "fail";
        }
    }

    @RequestMapping(path = "modeState/{id}", method = RequestMethod.POST)
    public @ResponseBody String modeState(@PathVariable Long id) {
        return modeDao.getState(id);
    }

    @RequestMapping(path = "changeMode/{id}", method = RequestMethod.POST)
    public @ResponseBody String changeMode(@PathVariable Long id, @RequestBody String mode) {
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<String, Object> map = mapper.readValue(mode, new TypeReference<Map<String, Object>>(){});
            String name = (String)map.get("name");
            Map<String, Map<String, String>> state = (Map<String, Map<String, String>>)map.get("state");
            String stateJson = mapper.writeValueAsString(state);
            modeDao.changeMode(id, name, stateJson);
            return "success";
        } catch (IOException e) {
            e.printStackTrace();
            return "fail";
        }
    }

    @RequestMapping(path = "removeMode/{id}")
    public @ResponseBody String removeMode(@PathVariable Long id) {
        modeDao.removeMode(id);
        return "success";
    }

    @RequestMapping(path = "modeList")
    public String modeList(ModelMap modelMap) {
        modelMap.put("modeList", modeDao.getModeList());
        return "modeList";
    }

    @RequestMapping(path = "applyMode/{modeId}")
    public @ResponseBody String applyMode(@PathVariable Long modeId) {
        String stateJson = modeDao.getState(modeId);
        ObjectMapper mapper = new ObjectMapper();
        try {
            Map<Long, Map<String, String>> state = mapper.readValue(stateJson, new TypeReference<Map<Long, Map<String, String>>>(){});
            for (Map.Entry<Long, Map<String, String>> entry: state.entrySet()) {
                new PhysicalDevice(entry.getKey()).set(entry.getValue());
            }
            return "success";
        } catch (IOException e) {
            e.printStackTrace();
            return "fail";
        }
    }
}
