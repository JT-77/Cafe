import React from 'react';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import InputAdornment from '@material-ui/core/InputAdornment';
import fire from './fire';
import Swal from 'sweetalert2'
import Hero from './Hero';


function Login() {

  const clearInputs = () => {
    setState({
      username: "",
      password: ""
    })
  }

  const clearErrors = () => {
    setState({
      emerror: "",
      paserror: ""
    })
  }

  const [state, setState] = React.useState({
    username: '',
    password: '',
    emerror: '',
    paserror: ''
  });

  const [user, setUser] = React.useState('');

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleLogin = () => {
    clearErrors();
    fire.auth().signInWithEmailAndPassword(state.username, state.password)
      .catch(err => {
        switch (err.code) {

          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setState({
              emerror: err.message
            })
            break;

          case "auth/wrong-password":
            setState({
              paserror: err.message
            })
            break;
        }
      })
  }

  const handleLogout = () => {
    fire.auth().signOut();
  }

  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      }
      else {
        setUser("");
      }
    })
  }

  React.useEffect(() => {
    authListener();
  }, []);


  return (
    <div>
      { user ? (
        <Hero handleLogout={handleLogout} email={user.email} />
      ) : (

          <Grid container justify="space-around">
            <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
              <div className="inputFields">

                <Grid container spacing={3} style={{ padding: '7px' }}>
                  <Grid item xs={12}>
                    <TextField label="Email" name="username"
                      value={state.username}
                      id="email"
                      onChange={handleChange}
                      type="email" fullWidth required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle style={{ color: '#767676' }} />
                          </InputAdornment>
                        ),
                      }} />
                    <p className="error">{state.emerror}</p>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField id="input-with-icon-grid" label="Password"
                      name="password"
                      value={state.password}
                      onChange={handleChange}
                      id="password"
                      type="password" required fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LockIcon style={{ color: '#767676' }} />
                          </InputAdornment>
                        ),
                      }} />
                    <p className="error">{state.paserror}</p>
                  </Grid>
                </Grid>
              </div>

              <div className="logBtn">
                <button onClick={handleLogin}>Sign In</button>
              </div>
            </Grid>
          </Grid>

        )}
    </div >
  );
}

export default Login