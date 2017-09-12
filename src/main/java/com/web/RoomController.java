package com.web;

import com.dao.RoomDao;
import com.domain.Room;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.util.List;

@Controller
public class RoomController {

    private RoomDao roomDao;

    @Autowired
    public void setRoomDao(SqlSessionTemplate sqlSessionTemplate) {
        this.roomDao = sqlSessionTemplate.getMapper(RoomDao.class);
    }

    @RequestMapping("roomList")
    public String roomList(ModelMap modelMap) {
        List<Room> roomList = roomDao.getRoomList();
        modelMap.put("roomList", roomList);
        return "roomList";
    }

    @RequestMapping("roomManagement")
    public String roomManagement(ModelMap modelMap) {
        List<Room> roomList = roomDao.getRoomList();
        modelMap.put("roomList", roomList);
        return "roomManagement";
    }

    @RequestMapping(path = "changeRoomPhoto/{roomId}", method = RequestMethod.POST)
    public @ResponseBody String changeRoomPhoto(@PathVariable Long roomId, @RequestPart("photo")MultipartFile multipartFile) {
        Room room = roomDao.getRoom(roomId);
        String originName = multipartFile.getOriginalFilename();
        String fileName = "room_" + roomId + "_" + Instant.now().getEpochSecond()+ "." + originName.substring(originName.lastIndexOf('.') + 1);
        boolean success = true;
        try {
            multipartFile.transferTo(new File(fileName));
        } catch (IOException e) {
            e.printStackTrace();
            success = false;
        }
        if (success) {
            File file = new File(getClass().getResource("../../../../").getFile() + room.getPhoto());
            if (file.exists()) {
                file.delete();
            }
            roomDao.setPhoto( room.getId(), "/data/" + fileName);
            return "{\"response\":\"" + "/data/" + fileName + "\"}";
        } else {
            return "{\"error\": \"Can't replace photo\"}";
        }
    }

    @RequestMapping(path = "changeRoomInfo/{roomId}", method = RequestMethod.POST)
    public @ResponseBody String changeRoomInfo(@PathVariable Long roomId, @RequestParam("name") String name){
        roomDao.setName(roomId, name);
        return "success";
    }

    @RequestMapping(path = "room/{roomId}", method = RequestMethod.POST)
    public @ResponseBody Room room(@PathVariable Long roomId) {
        return roomDao.getRoom(roomId);
    }

    @RequestMapping(path = "getDevicesCount/{roomId}")
    public @ResponseBody Integer getDevicesCount(@PathVariable Long roomId) {
        Integer count = roomDao.getDevicesCount(roomId);
        return count;
    }

    @RequestMapping(path = "insertRoom")
    public @ResponseBody String insertRoom(@RequestParam String name) {
        roomDao.insertRoom(name, "");
        return "success";
    }

    @RequestMapping(path = "insertRoomPhoto")
    public @ResponseBody String insertRoomPhoto(@RequestPart("photo") MultipartFile multipartFile) {
        Long roomId = roomDao.getMaxId();
        return changeRoomPhoto(roomId, multipartFile);
    }

    @RequestMapping(path = "removeRoom/{roomId}")
    public @ResponseBody String removeRoom(@PathVariable Long roomId) {
        String photo = roomDao.getPhoto(roomId);
        File file = new File(getClass().getResource("../../../").getFile() + photo);
        if (file.exists()) {
            file.delete();
        }
        roomDao.removeRoom(roomId);
        return "success";
    }
}
