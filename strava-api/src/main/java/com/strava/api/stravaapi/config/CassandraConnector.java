package com.strava.api.stravaapi.config;

import com.datastax.oss.driver.api.core.CqlSession;

import java.net.InetSocketAddress;

public class CassandraConnector {
    private static String contactPoint = "localhost";
    private static int port = 9042;
    private static String keySpace = "strava";
    private static String dataCenter = "datacenter1";

    private CqlSession session;

    public void connect() {
        session = CqlSession.builder().addContactPoint(new InetSocketAddress(contactPoint, port))
                .withLocalDatacenter(dataCenter).withKeyspace(keySpace).build();
    }

    public CqlSession getSession() {
        return this.session;
    }

    public void close() {
        session.close();
    }

}
