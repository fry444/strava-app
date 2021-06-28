package com.strava.api.stravaapi.api;

import com.strava.api.stravaapi.domain.Activity;
import com.strava.api.stravaapi.domain.User;
import com.strava.api.stravaapi.repository.ActivityRepository;
import com.strava.api.stravaapi.repository.ComunityRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = {"/comunity"}, produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ComunityController {

    @Autowired
    private final ComunityRepository comunityRepository;

    private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);

    private static final String NEW_USER_LOG = "Usuario nuevo creado :{}";
    private static final String NEW_FOLLOW_LOG = "Usuario {} sigue a {}";

    @PostMapping(path = "/user")
    public ResponseEntity<Object> postUser(@RequestBody User user) {
        comunityRepository.insertUser(user);
        logger.info(NEW_USER_LOG, user.getUsername());
        return ResponseEntity.status(HttpStatus.CREATED).body(user.getUsername());
    }

    @PostMapping(path = "/follow")
    public ResponseEntity<Object> postFollow(
            @RequestParam(value = "userFrom") String userFrom,
            @RequestParam(value = "userTo") String userTo) {
        comunityRepository.createFollowRelation(userFrom, userTo);
        logger.info(NEW_FOLLOW_LOG, userFrom, userTo);
        return ResponseEntity.status(HttpStatus.CREATED).body(userFrom + " -> " + userTo);
    }

    @GetMapping(path = "/{username}")
    public ResponseEntity<Object> getCommunity(@PathVariable String username) {
        return ResponseEntity.ok(comunityRepository.getUserCommunity(username));
    }

}
