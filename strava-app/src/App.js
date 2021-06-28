import React, { Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Test from "./components/Test";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import YesNoDialog from "./components/helpers/YesNoDialog";
import BottomAlert from "./components/helpers/BottomAlert";
import { Provider } from "react-redux";
import store from "./store";
import ProgressBar from "./components/helpers/ProgressBar";
import Modal from "./components/helpers/Modal";
import Activities from "./components/activities/Activities";
import Community from "./components/community/Community";
import NewActivity from "./components/activities/NewActivity";

const useStyles = makeStyles((theme) => ({
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    })
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  },
}));

const AppWrapper = () => {
  return (
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );
};

const App = () => {

  const classes = useStyles();
  const open = useSelector((state) => state.menu.open);

  return (
    <Fragment>
      <Header />
      <Menu />
      <main className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        <ProgressBar />
        <Switch>
          <Route exact path="/" component={Activities} />
          <Route exact path="/activities" component={Activities} />
          <Route exact path="/activities/new" component={NewActivity} />
          <Route exact path="/community" component={Community} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </main>
      <YesNoDialog />
      <Modal />
      <BottomAlert />
    </Fragment>
  );
};

export default AppWrapper;
