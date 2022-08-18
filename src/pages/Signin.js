import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../firebase';
import './style.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignIn() {
  const { useState } = React;
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  if (localStorage.getItem('islogin') === 'true') {
    // not logged in so redirect to login page with the return url
    history.push('/home');
  }
  const signin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((authObj) => {
        const userId = authObj.user.uid;
        localStorage.setItem('islogin', 'true');

        const docRef = db.collection('user').doc(userId);

        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              localStorage.setItem('role', doc.data().role);
              if (localStorage.getItem('role') === 'tech') {
                history.push('/tech');
              } else if (localStorage.getItem('role') === 'eng') {
                history.push('/');
              }
              console.log('Document data:', doc.data());
            } else {
              setMessage('Incorrect information');
            }
          })
          .catch(() => {
            setMessage("Couldn't get user information please try again");
          });
      })
      .catch((error) => setMessage(error.message));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Prototype
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <div className={classes.form} noValidate>
          <div className={message !== '' ? 'error-div' : ''}>
            <p>{message}</p>
          </div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={signin}
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item>
              <p>
                {
                  'engineer@demo.com\npassword:engineer\ntechnician@demo.com\npassword:technician'
                }
              </p>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8} />
    </Container>
  );
}
export default SignIn;
