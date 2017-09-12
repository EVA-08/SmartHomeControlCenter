package com.dao;

import com.domain.LoginLog;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@MapperScan
@Repository
public interface LogDao {
    void insertLoginLog(@Param("username")String username, @Param("datetime") Timestamp dateTime,
                               @Param("ip") String ip, @Param("result") String result);
    List<LoginLog> getLoginLogList(@Param("start") Integer start, @Param("length") Integer length);
    Integer numLoginLog();
}
