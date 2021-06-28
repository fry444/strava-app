import React, { Fragment, useEffect,useState } from "react";
import Activity from "./Activity";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import { getActivitiesAction, getUserActivitiesAction } from "../../actions/activityActions";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const Activities = () => {
  const dispatch = useDispatch();

  const [username, updateUsername] = useState("");

  useEffect(() => {
    dispatch(getActivitiesAction());
    // eslint-disable-next-line
  }, []);

  const searchUserActivities = () => {
    dispatch(getUserActivitiesAction(username));
  }

  const classes = makeStyles((theme) => ({
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    fab: {
      margin: 0,
      top: 'auto',
      right: 56,
      bottom: 56,
      left: 'auto',
      position: 'fixed',
      color: 'white',
      backgroundColor: '#FC6100'
    },
  }))();

  const activities = useSelector((state) => state.activities.activities);

  return (
    <Fragment>
      <Box m={3}>
      <Box display="flex" flexDirection="row" >
            <Box width="58%" flexDirection="row" justifyContent="flex-start">
              <Typography variant="h5" style={{fontWeight: "bold"}}> 
                  Actividades
              </Typography>
            </Box>
            <Box className={classes.search} flexDirection="row" justifyContent="flex-end">
              <TextField
                style={{ marginLeft: '50' }}
                label="Usuario"
                variant="outlined"
                value={username}
                onChange={(e) => updateUsername(e.target.value)} />
                <IconButton onClick={() => searchUserActivities()} color="grey" aria-label="buscar actividades" component="span">
                  <SearchIcon />
                </IconButton>
            </Box>
            </Box>
            
          <Grid container justify="flex-start" spacing={2} >
          {activities.length !== 0 && activities.map((activity) => (
              <Grid key={activity.id} item>
                <Activity key={activity.id} activity={activity}></Activity>
              </Grid>
              ))
            }
          </Grid> 
          <Fab className={classes.fab} aria-label="add" component={Link} to={"/activities/new"} >
            <AddIcon />
          </Fab>
        </Box>
    </Fragment>
  );
};

export default Activities;