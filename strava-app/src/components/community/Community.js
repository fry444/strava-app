import React, { Fragment, useEffect,useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { getUsersAction, getCommunityAction, addUserAction, addRelationAction } from "../../actions/communityActions";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const Community = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line
  }, []);

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

  const users = useSelector((state) => state.community.users);
  const [selectedUser, updateSelectedUser] = useState("");
  const community = useSelector((state) => state.community.community);
  const [newUser, updateNewUser] = useState("");
  const [selectedUserFrom, updateSelectedUserFrom] = useState("");
  const [selectedUserTo, updateSelectedUserTo] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleUserListClick = (user) => {
    updateSelectedUser(user);
    dispatch(getCommunityAction(user));
  };

  const addUser = () => {
    dispatch(addUserAction(newUser, handleRedirect.bind(this)));
  };

  const addRelation = () => {
    dispatch(addRelationAction(selectedUserFrom,selectedUserTo, handleRedirect.bind(this)));
  };

  const handleRedirect = () => {
    setRedirect(true);
  }

  const handleUserFromListClick = (user) => {
    updateSelectedUserFrom(user);
  };

  const handleUserToListClick = (user) => {
    updateSelectedUserTo(user);
  };

  return (
    <Fragment>
      <Box m={3}>
          <Box mb={3}>
            <Typography variant="h5" style={{fontWeight: "bold"}}> 
                Comunidades
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                <Typography variant="h6" style={{fontWeight: "bold"}}> 
                Usuarios
                </Typography>
                <List component="nav">
                {users.length !== 0 && users.map((user) => (
                  <ListItem
                  button
                  onClick={(event) => handleUserListClick(user)}
                >
                  <ListItemText primary={user} />
                </ListItem>
                  ))
                }
                </List>
                </CardContent>
              </Card>
              </Paper>
            </Grid>  
            {community.length>0 ? 
            (<Grid item xs={6}>
              <Paper className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                <Typography variant="h6" style={{fontWeight: "bold"}}> 
                Comunidad de {selectedUser}
                </Typography>
                <List component="nav">
                {community.length !== 0 && community.map((user) => (
                  <ListItem
                >
                  <ListItemText primary={user} />
                </ListItem>
                  ))
                }
                </List>
                </CardContent>
              </Card>
              </Paper>
            </Grid>)
            : null}
          </Grid>

          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                <Typography variant="h6" style={{fontWeight: "bold"}}> 
                Crear usuario
                </Typography>
                <TextField
                  style={{ marginBottom: 16 }}
                  label="Usuario"
                  variant="outlined"
                  fullWidth
                  value={newUser}
                  onChange={(e) => updateNewUser(e.target.value)} />
                <CardActions>
                <Button onClick={() => addUser()} fullWidth variant="contained" color="primary" style={{ backgroundColor: '#FC6100', height: 56, marginRight: 8 }}>
                  Crear Usuario
                </Button>
                </CardActions>

                </CardContent>
              </Card>
              </Paper>
            </Grid>  
            <Grid item xs={6}>
            <Paper className={classes.paper}>
              <Card className={classes.root}>
                <CardContent>
                <Typography variant="h6" style={{fontWeight: "bold"}}> 
                Crear relación
                </Typography>
                <Box mb={3}>
                <InputLabel id="userFromSelectLabel">Usuario</InputLabel>
                <Select
                fullWidth
                labelId="userFromSelectLabel"
                id="userFromSelect"
                value={selectedUserFrom}
                onChange={(event) => handleUserFromListClick(event.target.value)}
              >
                {users.length !== 0 && users.map((user) => (
                  <MenuItem value={user}>{user}</MenuItem>
                ))}
              </Select>
              </Box>
              <Box mb={3}>
              <Typography variant="h7" style={{fontWeight: "bold"}}> 
                Sigue a
                </Typography>
                </Box>
                <Box mb={3}>
              <InputLabel id="userToSelectLabel">Usuario</InputLabel>
              <Select
                fullWidth
                labelId="userToSelectLabel"
                id="userToSelect"
                value={selectedUserTo}
                onChange={(event) => handleUserToListClick(event.target.value)}
              >
                {users.length !== 0 && users.map((user) => (
                  <MenuItem value={user}>{user}</MenuItem>
                ))}
              </Select>
              </Box>
                </CardContent>
                <CardActions>
                <Button onClick={() => addRelation()} fullWidth variant="contained" color="primary" style={{ backgroundColor: '#FC6100', height: 56, marginRight: 8 }}>
                  Crear Relación
                </Button>
                </CardActions>
              </Card>
              </Paper>
              
            </Grid>
            
          </Grid>
        </Box>
        {redirect && <Redirect to={"/community"} />}
    </Fragment>
  );
};

export default Community;