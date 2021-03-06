import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
// import {token } from '../actions/auth'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



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


const Login = ({login, isAuthenticated }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        username: '',
        password: '' 
    });

    const { username, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        // token(username,password);
        login(username, password);
    };

   

    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate   > 
              <TextField
                type='text'
                placeholder='text'
                name='username'
                value={username} 
                onChange={e => onChange(e)}                  
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'                                   
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          
        </Container>
      );
    
    
};

const mapStateToProps = state => ({
    isAuthenticated: state.authreducer.isAuthenticated
});

export default connect(mapStateToProps, { login})(Login);

