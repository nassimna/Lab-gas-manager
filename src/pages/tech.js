import React from "react";
import Dashbord from "../component/Dashbord";
import Alert from "../component/Alert";
import { Switch, Route } from "react-router-dom";
import DrawerTech from "../DrawerTech";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
  page: {
    width: "100%",
    paddingRight: "15px",
  },
});

export default function Tech() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <DrawerTech />
      <div className={classes.page}>
        <Switch>
          <Route
            path="/tech/dashboard"
            render={(props) => <Dashbord {...props} />}
          />

          <Route path="/tech/alert" render={(props) => <Alert {...props} />} />
        </Switch>
      </div>
    </div>
  );
}
