package com.domain;

import java.io.*;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

/**
 * 模拟物理设备
 */

public class PhysicalDevice {
    private Long id;

    public PhysicalDevice(Long id) {
        this.id = id;
    }

    /**
     * 获得设备状态
     *
     * @return 设备状态变量
     */
    public Device get(Class<?> deviceClass) {
        try (InputStream inputStream = new BufferedInputStream(new FileInputStream(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties"))) {
            Properties realDevice = new Properties();
            realDevice.load(inputStream);
            Device device = (Device) deviceClass.newInstance();
            for (Method method : deviceClass.getMethods()) {
                if (!method.getName().startsWith("set")) {
                    continue;
                }
                String stateName = method.getName().substring(3);
                stateName = stateName.substring(0, 1).toLowerCase() + stateName.substring(1);
                String stateValue = realDevice.getProperty(stateName);
                method.invoke(device, stateValue);
            }
            return device;
        } catch (InstantiationException | IllegalAccessException | IOException | InvocationTargetException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * 设置设备状态
     *
     * @param device 设备状态变量
     * @return 返回设置是否成功
     */
    public boolean set(Device device, Class<?> deviceClass) {
        InputStream inputStream = null;
        OutputStream outputStream = null;
        try {
            inputStream = new BufferedInputStream(new FileInputStream(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties"));
            Properties realDevice = new Properties();
            realDevice.load(inputStream);
            for (Method method : deviceClass.getMethods()) {
                if (!method.getName().startsWith("get") || "getClass".equals(method.getName())) {
                    continue;
                }
                String stateName = method.getName().substring(3);
                stateName = stateName.substring(0, 1).toLowerCase() + stateName.substring(1);
                String stateValue = (String) method.invoke(device);
                if (stateValue != null) {
                    realDevice.setProperty(stateName, stateValue);
                }
            }
            outputStream = new BufferedOutputStream(new FileOutputStream(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties"));
            realDevice.store(outputStream, null);
            return true;
        } catch (IOException | IllegalAccessException | InvocationTargetException e) {
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }

            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean set(Map<String, String> device) {
        InputStream inputStream = null;
        OutputStream outputStream = null;
        try {
            inputStream = new BufferedInputStream(new FileInputStream(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties"));
            Properties realDevice = new Properties();
            realDevice.load(inputStream);
            for (Map.Entry<String, String> entry: device.entrySet()) {
                realDevice.setProperty(entry.getKey(), entry.getValue());
            }
            outputStream = new BufferedOutputStream(new FileOutputStream(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties"));
            realDevice.store(outputStream, null);
            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public boolean create() {
        File file = new File(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties");
        try {
            return file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return false;
    }

    public boolean remove() {
        File file = new File(PhysicalDevice.class.getResource("/").getPath() + "/" + id + ".properties");
        return file.delete();
    }
}
