package com.web;

import com.dao.DeviceInfoDao;
import com.domain.Device;
import com.domain.DeviceInfo;
import com.domain.PhysicalDevice;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.mapper.MapperFactoryBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.time.Instant;
import java.util.List;

@Controller
public class DeviceController {
    private DeviceInfoDao deviceInfoDao;

    @Autowired
    public void setDeviceInfoDao(SqlSessionTemplate sqlSessionTemplate) {
        this.deviceInfoDao = sqlSessionTemplate.getMapper(DeviceInfoDao.class);
    }

    @RequestMapping("room/{roomId}")
    public String deviceList(@PathVariable Long roomId, ModelMap modelMap) {
        List<DeviceInfo> deviceInfoList = deviceInfoDao.getDeviceInfoList(roomId);
        modelMap.put("deviceList", deviceInfoList);
        return "deviceList";
    }

    @RequestMapping("device/{deviceId}")
    public @ResponseBody
    Object deviceState(@PathVariable Long deviceId) {
        String deviceClassName = deviceInfoDao.getClassName(deviceId);
        Class<?> deviceClass = null;
        try {
            deviceClass = Class.forName(deviceClassName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        return new PhysicalDevice(deviceId).get(deviceClass);
    }

    @RequestMapping("allDeviceInfoList")
    public @ResponseBody
    List<DeviceInfo> allDeviceInfoList() {
        List<DeviceInfo> deviceInfoList = deviceInfoDao.getAll();
        return deviceInfoList;
    }

    @RequestMapping("changeDeviceState/{deviceId}")
    public @ResponseBody
    String changeDeviceState(@PathVariable Long deviceId, HttpServletRequest request) {
        String deviceClassName = deviceInfoDao.getClassName(deviceId);
        Class<?> deviceClass = null;
        try {
            deviceClass = Class.forName(deviceClassName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            return "fail";
        }
        PhysicalDevice physicalDevice = new PhysicalDevice(deviceId);
        try {
            Device device = (Device) deviceClass.newInstance();
            for (Method method : deviceClass.getMethods()) {
                if (!method.getName().startsWith("set")) {
                    continue;
                }
                String stateName = method.getName().substring(3);
                stateName = stateName.substring(0, 1).toLowerCase() + stateName.substring(1);
                String stateValue = request.getParameter(stateName);
                method.invoke(device, stateValue);
            }
            if (physicalDevice.set(device, deviceClass)) {
                return "success";
            } else {
                return "fail";
            }
        } catch (InstantiationException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
            return "fail";
        }
    }

    @RequestMapping(path = "deviceManagement/{roomId}")
    public String deviceManagement(@PathVariable Long roomId, ModelMap modelMap) {
        List<DeviceInfo> deviceInfoList = deviceInfoDao.getDeviceInfoList(roomId);
        List<String> supportedDeviceTypeList = deviceInfoDao.getSupportedDeviceTypeList();
        modelMap.put("deviceInfoList", deviceInfoList);
        modelMap.put("supportedDeviceTypeList", supportedDeviceTypeList);
        return "deviceInfoManagement";
    }

    @RequestMapping(path = "changeDeviceInfo/{deviceId}")
    public @ResponseBody
    String changeDeviceInfo(@PathVariable Long deviceId, @RequestParam String name) {
        deviceInfoDao.setName(deviceId, name);
        return "success";
    }

    @RequestMapping(path = "changeDevicePhoto/{deviceId}")
    public @ResponseBody
    String changeDevicePhoto(@PathVariable Long deviceId, @RequestParam("photo") MultipartFile multipartFile) {
        DeviceInfo deviceInfo = deviceInfoDao.getDeviceInfo(deviceId);
        String originName = multipartFile.getOriginalFilename();
        String fileName = "device_" + deviceId + "_" + Instant.now().getEpochSecond() + "." + originName.substring(originName.lastIndexOf('.') + 1);
        boolean success = true;
        try {
            multipartFile.transferTo(new File(fileName));
        } catch (IOException e) {
            e.printStackTrace();
            success = false;
        }
        if (success) {
            File file = new File(getClass().getResource("../../../../").getFile() + deviceInfo.getPhoto());
            if (file.exists()) {
                file.delete();
            }
            deviceInfoDao.setPhoto(deviceInfo.getId(), "/data/" + fileName);
            return "{\"response\":\"" + "/data/" + fileName + "\"}";
        } else {
            return "{\"error\": \"Can't replace photo\"}";
        }
    }

    @RequestMapping(path = "deviceInfo/{deviceId}")
    public @ResponseBody
    DeviceInfo deviceInfo(@PathVariable Long deviceId) {
        return deviceInfoDao.getDeviceInfo(deviceId);
    }

    @RequestMapping(path = "removeDeviceInfo/{deviceId}")
    public @ResponseBody
    String removeDeviceInfo(@PathVariable Long deviceId) {
        String className = deviceInfoDao.getClassName(deviceId);
        String photo = deviceInfoDao.getPhoto(deviceId);
        File file = new File(getClass().getResource("../../../").getFile() + photo);
        if (file.exists()) {
            file.delete();
        }
        deviceInfoDao.removeDeviceInfo(deviceId);
        new PhysicalDevice(deviceId).remove();
        return "success";


    }

    @RequestMapping(path = "getSupportedDeviceModel/{type}")
    public @ResponseBody
    List<String> getSupportedDeviceModel(@PathVariable String type) {
        return deviceInfoDao.getSupportedDeviceModelList(type);
    }

    @RequestMapping(path = "insertDeviceInfo")
    public @ResponseBody
    String insertDeviceInfo(@RequestParam String name, @RequestParam String type, @RequestParam String model, @RequestParam Long roomId) {
        String className = deviceInfoDao.getSupportedClassName(type, model);

        deviceInfoDao.insertDeviceInfo(name, type, model, "", className, roomId);
        Long deviceId = deviceInfoDao.getMaxId();
        boolean success = true;
        try {
            Class deviceClass = Class.forName(className);
            success = new PhysicalDevice(deviceId).create();
            success &= new PhysicalDevice(deviceId).set((Device) deviceClass.newInstance(), deviceClass);
        } catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {
            e.printStackTrace();
        }
        if (success) {
            return "success";
        } else {
            return "fail";
        }
    }

    @RequestMapping(path = "insertDevicePhoto")
    public @ResponseBody
    String insertDevicePhoto(@RequestParam("photo") MultipartFile multipartFile) {
        Long deviceId = deviceInfoDao.getMaxId();
        return changeDevicePhoto(deviceId, multipartFile);
    }
}
