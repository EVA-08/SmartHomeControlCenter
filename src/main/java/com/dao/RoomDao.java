package com.dao;

import com.domain.Room;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@MapperScan
@Repository
public interface RoomDao {
    List<Room> getRoomList();
    Room getRoom(@Param("id") Long id);
    void setPhoto(@Param("id") Long id, @Param("photo") String photo);
    void setName(@Param("id") Long id, @Param("name") String name);
    Integer getDevicesCount(@Param("roomId") Long roomId);
    void insertRoom(@Param("name") String name, @Param("photo") String photo);
    Long getMaxId();
    void removeRoom(@Param("id") Long id);
    String getPhoto(@Param("id") Long id);
}
