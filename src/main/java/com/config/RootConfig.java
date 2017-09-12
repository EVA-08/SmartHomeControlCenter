package com.config;

import org.springframework.context.annotation.*;
import org.springframework.stereotype.Controller;

@Configuration
@Import(DataConfig.class)
@PropertySource("classpath:config.properties")
@ComponentScan(basePackages = "com", excludeFilters = @ComponentScan.Filter(type = FilterType.ANNOTATION, value = Controller.class))

public class RootConfig {

}
