package com.dao;

import com.domain.Mode;
import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.stereotype.Repository;

import java.util.List;

@MapperScan
@Repository
public interface ModeDao {
    public List<Mode> getModeList();
    public void insertMode(@Param("name") String name, @Param("state") String state);
    public String getState(@Param("id") Long id);
    public void changeMode(@Param("id") Long id, @Param("name") String name, @Param("state") String state);
    public void removeMode(@Param("id") Long id);
}
