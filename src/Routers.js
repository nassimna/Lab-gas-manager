import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/home';
import Apps from './pages/Ingenieur';
import SignIn from './pages/Signin';
import tech from './pages/tech';
import PrivateRoute from './routes/PrivateRouter';
import PublicRoute from './routes/routes';

export default function Routers() {
  return (
    <Router>
      <CssBaseline />
      <Switch>
        <PublicRoute restricted path="/SignIn" component={SignIn} />
        <PublicRoute restricted={false} path="/home" component={Home} />
        <PrivateRoute roles="tech" path="/tech" component={tech} />
        <PrivateRoute roles="eng" component={Apps} />
      </Switch>
    </Router>
  );
}
