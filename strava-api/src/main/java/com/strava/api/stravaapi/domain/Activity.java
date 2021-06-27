package com.strava.api.stravaapi.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.UUID;

@NoArgsConstructor
@Getter
@Setter
public class Activity {
    private UUID id;
    private String username;
    private Instant date;
    private String type;
    private String title;
    private String data;

    public Activity(UUID id, String usuario, Instant fecha, String tipo, String titulo, String datos) {
        this.id = id;
        this.username = usuario;
        this.date = fecha;
        this.type = tipo;
        this.title = titulo;
        this.data = datos;
    }
}
