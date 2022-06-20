import React from "react";
import SignUp from "./SignUp";
import Dashbord from "../component/Dashbord";
import Capteure from "../component/ListCapteur";
import Parametre from "../component/Parametre";
import Alert from "../component/Alert";
import { Switch, Route } from "react-router-dom";
import Drawer from "../Drawer";
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

export default function Apps() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Drawer />
      <div className={classes.page}>
        <Switch>
          <Route
            exact
            //roles="eng"
            path="/"
            render={(props) => <Dashbord {...props} />}
          />
          <Route
            //roles="eng"
            path="/Capteure"
            render={(props) => <Capteure {...props} />}
          />
          <Route
            //roles="eng"
            path="/Parametre"
            render={(props) => <Parametre {...props} />}
          />
          <Route
            //roles="eng"
            path="/alert"
            render={(props) => <Alert {...props} />}
          />

          <Route restricted={true} path="/SignUp" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
}
