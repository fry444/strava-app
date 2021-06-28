import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import { Card } from "@material-ui/core";
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  labels: {
    lineHeight: 0
  },
  paper: {
    borderRadius: 16,
    maxWidth: 900,
    width: 900,
    body: {
      lineHeight: 0
    }
  },
  media: {
    height: 160
  },
  img: {
    display: "block",
    width: "100%",
    objectFit: "cover",
    objectPosition: "center",
    height: 160,
    marginLeft: "auto",
    marginRight: "auto"
  },
}));

const Activity = ({ activity }) => {

  const classes = useStyles();

  const data = JSON.parse(activity.data);

  return (
    <Card className={classes.paper}>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt={6} ml={6}>
        <Box display="flex" alignItems="flex-start">          
          <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
            <Typography color="textPrimary" variant="body2">
              {activity.username}
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
            <Typography color="textPrimary" variant="body2" noWrap>              
              <Chip label={activity.type}/>
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
            <Typography color="textPrimary" variant="body2" noWrap>
              {activity.title}
            </Typography>
            <Typography color="textSecondary" variant="body2">
              {activity.date}
            </Typography>
          </Box>
          {activity.type === "phisical" ? 
           (<Fragment>
              <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
              <Typography color="textSecondary" variant="body2" noWrap>
                Tipo actividad: {data.type}
              </Typography>
              <Typography color="textSecondary" variant="body2" noWrap>
                Duración: {data.duration}
              </Typography>
              <Typography color="textSecondary" variant="body2">
                Distancia: {data.distance}
              </Typography>
              </Box>
           </Fragment>):null}
           {activity.type === "photo" ? 
           (<Fragment>
              <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
              <Typography color="textSecondary" variant="body2" noWrap>
                URL: {data.url}
              </Typography>
              <Typography color="textSecondary" variant="body2" noWrap>
                Comentario: {data.comment}
              </Typography>              
              </Box>
           </Fragment>):null}       
           {activity.type === "publication" ? 
           (<Fragment>
              <Box display="flex" flexDirection="column" ml={6} mr={6} justifyContent="center">
              <Typography color="textSecondary" variant="body2" noWrap>
                Texto: {data.text}
              </Typography>          
              </Box>
           </Fragment>):null}   
        </Box>    
      </Box>
      <Box mt={2}>
        <Divider />
      </Box>
    </Card>
  );
};

export default Activity;
