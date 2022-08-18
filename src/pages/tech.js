import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from '../component/Alert';
import Dashbord from '../component/Dashbord';
import DrawerTech from '../DrawerTech';

const useStyles = makeStyles({
  container: {
    display: 'flex',
  },
  page: {
    width: '100%',
    paddingRight: '15px',
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
            render={(props) => <Dashbord props={props} />}
          />

          <Route path="/tech/alert" render={(props) => <Alert props={props} />} />
        </Switch>
      </div>
    </div>
  );
}
