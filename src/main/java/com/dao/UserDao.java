package com.dao;

import com.domain.User;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

@MapperScan
@Repository
public interface UserDao {
    User getUser(@Param("username") String username);
    void setPassword(@Param("id") Long id, @Param("newPassword") String newPassword);
    void setPhoto(@Param("id") Long id, @Param("newPhoto") String newPhoto);
}
