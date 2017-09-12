package com.domain;

import static com.domain.State.*;

public class Device {

    private String power = OFF;
    private String health = HEALTHY;


    public String getPower() {
        return power;
    }

    public void setPower(String power) {
        this.power = power;
    }

    public void setHealth(String health) {
        this.health = health;
    }

    public String getHealth() {
        return health;
    }
}
