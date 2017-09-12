package com.dao;

import com.domain.DeviceInfo;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@MapperScan
@Repository
public interface DeviceInfoDao {
    List<DeviceInfo> getDeviceInfoList(@Param("roomId") Long roomId);
    DeviceInfo getDeviceInfo(@Param("id") Long id);
    String getClassName(@Param("id") Long id);
    void setName(@Param("id") Long id, @Param("name") String name);
    void setPhoto(@Param("id") Long id, @Param("photo") String photo);
    void removeDeviceInfo(@Param("id") Long id);
    List<String> getSupportedDeviceTypeList();
    List<String> getSupportedDeviceModelList(@Param("type")String type);
    void insertDeviceInfo(@Param("name")String name, @Param("type")String type, @Param("model") String model,
                          @Param("photo") String photo, @Param("className") String className, @Param("roomId") Long roomId);
    Long getMaxId();
    String getSupportedClassName(@Param("type") String type, @Param("model") String model);
    String getPhoto(@Param("id") Long id);
    List<DeviceInfo> getAll();
}
