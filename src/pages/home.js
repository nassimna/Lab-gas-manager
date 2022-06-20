import React from "react";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default function Home() {
  const classes = useStyles();
  const history = useHistory();
  if (localStorage.getItem("islogin") !== "true") {
    history.push("/signIn");
  }
  const tech = (e) => {
    e.preventDefault();

    history.push("/tech/dashboard");
  };
  const ing = (e) => {
    e.preventDefault();

    history.push("/");
  };
  return (
    <div>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={tech}
      >
        Tech
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={ing}
      >
        Ingenier
      </Button>
    </div>
  );
}
