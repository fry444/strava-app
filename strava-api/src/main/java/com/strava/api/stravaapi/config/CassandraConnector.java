package com.strava.api.stravaapi.config;

import com.datastax.oss.driver.api.core.CqlSession;
import org.springframework.stereotype.Component;

import java.net.InetSocketAddress;

@Component
public class CassandraConnector {

    private CqlSession session;

    private static final String HOST = "localhost";
    private static final int PORT = 9042;
    private static final String KEYSPACE = "strava";

    public void connect() {
        session = CqlSession.builder().addContactPoint(new InetSocketAddress(HOST, PORT))
                .withLocalDatacenter("datacenter1").withKeyspace(KEYSPACE).build();
    }

    public CqlSession getSession() {
        return this.session;
    }

    public void close() {
        session.close();
    }

}
