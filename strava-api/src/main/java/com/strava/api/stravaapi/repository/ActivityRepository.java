package com.strava.api.stravaapi.repository;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.cql.BoundStatement;
import com.datastax.oss.driver.api.core.cql.PreparedStatement;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.SimpleStatement;
import com.datastax.oss.driver.api.core.uuid.Uuids;
import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.insert.RegularInsert;
import com.datastax.oss.driver.api.querybuilder.select.Select;
import com.strava.api.stravaapi.config.CassandraConnector;
import com.strava.api.stravaapi.domain.Activity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

    public UUID insert(Activity activity) {
        UUID activityId = Uuids.timeBased();

        activity.setId(activityId);
        activity.setDate(Instant.now());

        RegularInsert insertInto = QueryBuilder.insertInto(TABLE_NAME)
                .value("id", QueryBuilder.bindMarker())
                .value("usuario", QueryBuilder.bindMarker())
                .value("fecha", QueryBuilder.bindMarker())
                .value("tipo", QueryBuilder.bindMarker())
                .value("titulo", QueryBuilder.bindMarker())
                .value("datos", QueryBuilder.bindMarker());

        SimpleStatement insertStatement = insertInto.build();

        //insertStatement = insertStatement.setKeyspace(KEYSPACE);

        PreparedStatement preparedStatement = cassandraConnector.getSession().prepare(insertStatement);

        BoundStatement statement = preparedStatement.bind()
                .setUuid(0, activity.getId())
                .setString(1, activity.getUserName())
                .setInstant(2, activity.getDate())
                .setString(3, activity.getType())
                .setString(4, activity.getTitle())
                .setString(5, activity.getData());

        cassandraConnector.getSession().execute(statement);

        return activityId;
    }

    private ResultSet executeStatement(SimpleStatement statement) {
        statement.setKeyspace(CqlIdentifier.fromCql(KEYSPACE));
        return cassandraConnector.getSession().execute(statement);
    }

}
