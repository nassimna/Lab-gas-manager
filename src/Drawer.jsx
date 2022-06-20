import React from "react";
import {
  Drawer as MUIDrawer,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AirplayIcon from "@material-ui/icons/Airplay";
import SettingsIcon from "@material-ui/icons/Settings";
import { withRouter } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { auth } from "./firebase";
const useStyles = makeStyles({
  drawer: {
    display: "flex",
    width: "190px",
  },
});

const Drawer = (props) => {
  const { history } = props;
  const classes = useStyles();
  const itemsList = [
    {
      text: "Dashhbord",
      icon: <DashboardIcon />,
      onClick: () => history.push("/"),
    },

    {
      text: "Capteure",
      icon: <AirplayIcon />,
      onClick: () => history.push("/Capteure"),
    },
    {
      text: "Parametre",
      icon: <SettingsIcon />,
      onClick: () => history.push("/Parametre"),
    },
    {
      text: "Alert",
      icon: <NotificationsActiveIcon />,
      onClick: () => history.push("/alert"),
    },
    {
      text: "SingUp",
      icon: <NotificationsActiveIcon />,
      onClick: () => history.push("/SignUp"),
    },
    {
      text: "Signout",
      icon: <ExitToAppIcon />,
      onClick: (e) => {
        e.preventDefault();
        auth
          .signOut()
          .then((auth) => {
            localStorage.clear();
            history.push("/SignIn");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
      },
    },
  ];
  return (
    <MUIDrawer variant="permanent" className={classes.drawer}>
      <h1>Ingénieur</h1>
      <List>
        {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem button key={text} onClick={onClick}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </MUIDrawer>
  );
};

export default withRouter(Drawer);
