import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signup } from '../actions/auth';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

const Signup = ({ signup, isAuthenticated }) => {
    const classes = useStyles();
    const [accountCreated, setAccountCreated] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username:'',
        email: '',
        password: '',
        re_password: ''
    });

    const { first_name, last_name, username, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup(first_name, last_name,username, email, password, re_password);
            setAccountCreated(true);
        }
    };

   


    if (isAuthenticated) {
        return <Redirect to='/' />
    }
    if (accountCreated) {
        return <Redirect to='/login' />
    }
    return (
        <Container component="main" maxWidth="xs" >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                   
                    name="first_name"
                    variant="outlined"
                    type='text'
                    required
                    fullWidth
                    label="First Name"
                    value={first_name}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <TextField
                   
                    name="last_name"
                    variant="outlined"
                    type='text'
                    required
                    fullWidth
                    label="last_name"
                    value={last_name}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                   
                    name="username"
                    variant="outlined"
                    type='text'
                    required
                    fullWidth
                    label="username"
                    value={username}
                    onChange={e => onChange(e)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name='email'
                    label="Email Address"  
                    onChange={e=> onChange(e)}
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    
                    value={password}
                    onChange={e => onChange(e)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="re_password"
                    label="Confirm password"
                    type="password"
                    // autoComplete="re_password"
                    value={re_password}
                    onChange={e => onChange(e)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e)=>onSubmit(e)}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2">
                    Already have an account? Sign in
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

export default connect(mapStateToProps, { signup })(Signup);
