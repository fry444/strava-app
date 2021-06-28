package com.strava.api.stravaapi.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class User {
    private String username;

    public User(String username) {
        this.username = username;
    }
}
