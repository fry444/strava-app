package com.strava.api.stravaapi.repository;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.SimpleStatement;
import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.select.Select;
import com.strava.api.stravaapi.config.CassandraConnector;
import com.strava.api.stravaapi.domain.Activity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ActivityRepository {
    private final CassandraConnector cassandraConnector;
    private static final String KEYSPACE = "strava";
    private static final String TABLE_NAME = "activity";

    public ActivityRepository() {
        cassandraConnector = new CassandraConnector();
        cassandraConnector.connect();
    }

    public List<Activity> selectAll() {
        Select select = QueryBuilder.selectFrom(TABLE_NAME).all();

        ResultSet resultSet = executeStatement(select.build());

        List<Activity> result = new ArrayList<>();

        resultSet.forEach(a -> result.add(
                new Activity(a.getUuid("id"),
                        a.getString("usuario"),
                        a.getInstant("fecha"),
                        a.getString("tipo"),
                        a.getString("titulo"),
                        a.getString("datos"))
        ));
        return result;
    }

    private ResultSet executeStatement(SimpleStatement statement) {
        statement.setKeyspace(CqlIdentifier.fromCql(KEYSPACE));
        return cassandraConnector.getSession().execute(statement);
    }

}
