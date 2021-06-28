import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuAction } from "../actions/menuActions";
import { Link } from "react-router-dom";
import { Box } from "@material-ui/core";
import GroupIcon from '@material-ui/icons/Group';
import logoUrl from '../assets/strava_logo.png';
import { DirectionsRun } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  drawerHeader: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    ...theme.mixins.toolbar,
    justifyContent: "space-around",
  }
}));

const Menu = () => {

  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const open = useSelector((state) => state.menu.open);

  const toggleMenu = (open) => dispatch(toggleMenuAction(open));

  const handleDrawerClose = () => {
    toggleMenu(false);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}>
      <Box className={classes.drawerHeader}>
        <img src={logoUrl} alt=""/>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" && <ChevronLeftIcon />}
        </IconButton>
      </Box>
      <Divider />
      <List>
        {[
          { name: "Actividades", icon: <DirectionsRun />, url: "/activities" },
          { name: "Comunidades", icon: <GroupIcon />, url: "/community" }
        ].map((menuItem, index) => (
            <ListItem button key={menuItem.name} component={Link} to={menuItem.url}>
              <ListItemIcon style={{minWidth: 0, marginRight: 16}}> 
                {menuItem.icon}
              </ListItemIcon>
              <ListItemText primary={menuItem.name} />
            </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Menu;
