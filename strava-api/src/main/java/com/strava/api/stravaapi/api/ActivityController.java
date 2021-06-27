package com.strava.api.stravaapi.api;

import com.strava.api.stravaapi.domain.Activity;
import com.strava.api.stravaapi.repository.ActivityRepository;
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
@RequestMapping(path = {"/activities"}, produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ActivityController {

    @Autowired
    private final ActivityRepository activityRepository;

    private static final Logger logger = LoggerFactory.getLogger(ActivityController.class);

    private static final String ID = "activityId";
    private static final String NEW_ACTIVITY_LOG = "Actividad nueva creada con id:{}";


    @GetMapping()
    public ResponseEntity<Iterable<Activity>> getActivities() {
        return ResponseEntity.ok(activityRepository.selectAll());
    }

    @PostMapping()
    public ResponseEntity<Object> postActivity(@RequestBody Activity activity) {
        final UUID activityId = activityRepository.insert(activity);
        logger.info(NEW_ACTIVITY_LOG, activityId.toString());
        return ResponseEntity.status(HttpStatus.CREATED).body(activityId);
    }
}
