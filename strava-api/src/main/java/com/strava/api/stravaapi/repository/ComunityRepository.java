package com.strava.api.stravaapi.repository;

import com.strava.api.stravaapi.domain.User;
import org.neo4j.driver.v1.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ComunityRepository {
    private static final String HOST = "localhost";
    private static final int PORT = 7687;
    private static final String USERNAME = "neo4j";
    private static final String PASSWORD = "bdnr";

    Session session;

    public ComunityRepository() {
        Driver driver = GraphDatabase.driver(
                "bolt://" + HOST + ":" + PORT, AuthTokens.basic(USERNAME, PASSWORD));
        session = driver.session();
    }

    public void insertUser(User user) {
        session.run("CREATE (" + user.getUsername() + ":Usuario {usuario: \"" + user.getUsername() + "\"})");
    }

    public void createFollowRelation(String userFrom, String userTo) {
        session.run("MATCH (n:Usuario), (m:Usuario) " +
                "WHERE " +
                "n.usuario = \"" + userFrom + "\" AND m.usuario = \"" + userTo + "\" " +
                "CREATE (n)-[r:SIGUE]->(m) " +
                "RETURN r;");
    }

    public List<String> getUsers() {
        List<String> users = new ArrayList<>();
        StatementResult result = session.run(
                "MATCH n:Usuario return n");
        while (result.hasNext()) {
            users.add(result.next().fields().get(0).value().asMap().get("usuario").toString());
        }
        return users;
    }

    public List<String> getUserCommunity(String username) {
        List<String> community = new ArrayList<>();
        community.add(username);
        StatementResult result = session.run(
                "MATCH " +
                        "p=(n {usuario: \""+username+"\"})-[*]-(m) " +
                        "RETURN m");
        while (result.hasNext()) {
            community.add(result.next().fields().get(0).value().asMap().get("usuario").toString());
        }
        return community;
    }
}
