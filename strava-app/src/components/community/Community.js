import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';

const Community = () => {
  const dispatch = useDispatch();

  /*useEffect(() => {
    dispatch(getCampaignsAction());
    // eslint-disable-next-line
  }, []);*/

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
    }
  }))();

  //const campaigns = useSelector((state) => state.campaigns.campaigns);

  return (
    <Fragment>
      <Box m={3}>
          <Box mb={3}>
            <Typography variant="h5" style={{fontWeight: "bold"}}> 
                Comunidades
            </Typography>
          </Box>
          <Grid container justify="flex-start" spacing={2}>
            
          </Grid> 
          <Fab className={classes.fab} color="primary" aria-label="add" component={Link}  >
            <AddIcon />
          </Fab>
        </Box>
    </Fragment>
  );
};

export default Community;