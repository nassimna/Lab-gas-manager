import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../component/Alert';
import Dashbord from '../component/Dashbord';
import Capteure from '../component/ListCapteur';
import Drawer from '../Drawer';
import SignUp from './SignUp';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  page: {
    width: '100%',
    paddingRight: '15px',
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
            path="/"
            render={(props) => <Dashbord props={props} />}
          />
          <Route
            path="/Capteure"
            render={(props) => <Capteure props={props} />}
          />

          <Route
            path="/alert"
            render={(props) => <Alert props={props} />}
          />

          <Route restricted path="/SignUp" component={SignUp} />
        </Switch>
      </div>
    </div>
  );
}
