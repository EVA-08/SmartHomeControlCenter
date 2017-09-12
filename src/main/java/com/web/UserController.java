package com.web;

import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.impl.DefaultKaptcha;
import com.dao.UserDao;
import com.domain.User;
import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.time.Instant;

@Controller
@SessionAttributes({"user", Constants.KAPTCHA_SESSION_KEY})
public class UserController {
    private UserDao userDao;
    private DefaultKaptcha kaptcha;

    @Autowired
    public void setKaptcha(DefaultKaptcha kaptcha) {
        this.kaptcha = kaptcha;
    }

    @Autowired
    public void setUserDao(SqlSessionTemplate sqlSessionTemplate) {
        this.userDao = sqlSessionTemplate.getMapper(UserDao.class);
    }

    @RequestMapping(path = "login", method = RequestMethod.POST)
    public @ResponseBody String login(@RequestParam String username, @RequestParam String password, @RequestParam String captcha, ModelMap modelMap) {
        String realCaptcha = (String)modelMap.get(Constants.KAPTCHA_SESSION_KEY);
        if (!realCaptcha.equals(captcha)) {
            return "captchaNotMatch";
        }
        User user = userDao.getUser(username);
        if (user != null && user.getPassword().equals(password)) {
            modelMap.put("user", user);
            return "success";
        } else {
            return "usernameOrPasswordWrong";
        }
    }
    @RequestMapping(path = "changePassword", method = RequestMethod.POST)
    public @ResponseBody String changePassword(@RequestParam String oldPassword, @RequestParam String newPassword, ModelMap modelMap) {
        User user = (User)modelMap.get("user");
        if (!user.getPassword().equals(oldPassword)) {
            return "wrongPassword";
        }
        userDao.setPassword(user.getId(), newPassword);
        user.setPassword(newPassword);
        modelMap.put("user", user);
        return "success";
    }

    @RequestMapping(path = "changeUserPhoto", method = RequestMethod.POST, produces = "application/json")
    public @ResponseBody String changeUserPhoto(@RequestPart("photo")MultipartFile multipartFile, ModelMap modelMap) {
        User user = (User)modelMap.get("user");
        String originName = multipartFile.getOriginalFilename();
        String fileName = "user_" + user.getId()+ "_" + Instant.now().getEpochSecond()+ "." + originName.substring(originName.lastIndexOf('.') + 1);
        boolean success = true;
        try {
            multipartFile.transferTo(new File(fileName));
        } catch (IOException e) {
            e.printStackTrace();
            success = false;
        }

        if (success) {
            File file = new File(getClass().getResource("../../../../").getFile() + user.getPhoto());
            if (file.exists()) {
                file.delete();
            }
            user.setPhoto("data/" + fileName);
            userDao.setPhoto( user.getId(), "/data/" + fileName);
            return "{\"response\":\""+ "/data/" + fileName + "\"}";
        } else {
            return "{\"error\": \"Can't replace photo\"}";
        }
    }
    @RequestMapping(path = "captcha/*")
    public void captcha(HttpServletResponse response, ModelMap modelMap) {

        response.setDateHeader("Expires", 0);

        // Set standard HTTP/1.1 no-cache headers.
        response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

        // Set IE extended HTTP/1.1 no-cache headers (use addHeader).
        response.addHeader("Cache-Control", "post-check=0, pre-check=0");

        // Set standard HTTP/1.0 no-cache header.
        response.setHeader("Pragma", "no-cache");

        // return a jpeg
        response.setContentType("image/jpeg");

        // create the text for the image
        String capText = kaptcha.createText();

        // store the text in the session
        modelMap.put(Constants.KAPTCHA_SESSION_KEY, capText);

        // create the image with the text
        BufferedImage bi = kaptcha.createImage(capText);
        ServletOutputStream out = null;
        try {
            out = response.getOutputStream();
            // write the data out
            ImageIO.write(bi, "jpg", out);
            try {
                out.flush();
            } finally {
                out.close();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

