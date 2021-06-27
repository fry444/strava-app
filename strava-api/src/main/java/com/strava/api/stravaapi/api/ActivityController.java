package com.strava.api.stravaapi.api;

import com.strava.api.stravaapi.domain.Activity;
import com.strava.api.stravaapi.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = {"/activities"}, produces = APPLICATION_JSON_VALUE)
@RequiredArgsConstructor
public class ActivityController {

    @Autowired
    private final ActivityRepository activityRepository;

    @GetMapping()
    public ResponseEntity<Iterable<Activity>> getActivities() {
        return ResponseEntity.ok(activityRepository.selectAll());
    }
}
