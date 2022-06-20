import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { PrivateRoute } from "./routes/PrivateRouter";
import { PublicRoute } from "./routes/routes";
import Apps from "./pages/Ingenieur";
import SignIn from "./pages/Signin";
import Home from "./pages/home";
import tech from "./pages/tech";
export default function Routers() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <PublicRoute restricted={true} path="/SignIn" component={SignIn} />
        <PublicRoute restricted={false} path="/home" component={Home} />
        <PrivateRoute roles={"tech"} path="/tech" component={tech} />
        <PrivateRoute roles={"eng"} component={Apps} />
      </Switch>
    </Router>
  );
}
