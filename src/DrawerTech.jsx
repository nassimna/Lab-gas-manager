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

const DrawerTech = (props) => {
  const { history } = props;
  const classes = useStyles();

  const itemsList = [
    {
      text: "Dashhbord",
      icon: <DashboardIcon />,
      onClick: () => history.push("/tech/dashboard"),
    },

    {
      text: "Alert",
      icon: <NotificationsActiveIcon />,
      onClick: () => history.push("/tech/alert"),
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
      <h1>Technicien</h1>
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

export default withRouter(DrawerTech);
