import React from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios'
import {csrftoken} from './Axiosapi'
import {
  Grid,
  Container,
  Avatar,
  Typography,
  TextField,
  Button,
 
  Box,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import "../App.css";

const styles = (theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#3f51b5",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {},
});

class Login extends React.Component {
  state = {
   userInfo:{
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
   }
  };

  InputHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
  
    this.setState((prevState)=>{
      return ({...prevState,[name]:value})
    });
  };

  login = (e) => {
    e.preventDefault();
    
      axios({
        method:'POST',
        headers: {
          'X-CSRFToken':csrftoken
      },
        url : `${process.env.REACT_APP_BASE_URL}/auth/`,
        data:this.state
      })
      .then(res=>{
        localStorage.setItem("item", JSON.stringify(res.data.token));
      
       
       this.setState({})
       window.location.href = ''
      })
      .catch((err) => console.log(err));


  };

  isAuthenticated = () => {
    const token = localStorage.getItem("item");
    return token && token.length > 10;
  };

  render() {
    const isAlreadyAuthenticated = this.isAuthenticated();
    const { classes } = this.props;

    return (
      <div>
        {isAlreadyAuthenticated ? (
          <Redirect to={{ pathname: "workers" }} />
        ) : (
          <Container maxWidth="sm" component="main">
            <Box component="div" mt={10}>
              <div className={classes.paper}>
                <Box component="div" my={1}>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                  </Avatar>
                </Box>
                <Box component="div" mb={2}>
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                </Box>
                <form className={classes.form} onSubmit={this.login}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="username"
                        variant="outlined"
                        required
                        fullWidth
                        name="username"
                        value={this.state.username}
                        onChange={this.InputHandle}
                        id="userName"
                        label="User Name"
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        value={this.state.password}
                        onChange={this.InputHandle}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                      />
                    </Grid>
                  </Grid>
                  <Box component="div" my={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Login
                    </Button>
                  </Box>
                </form>
                <Grid container justify="flex-end">
                  <Grid item>
                    <a href="#register" className='registerLink'>
                      Need an account? Register
                    </a>
                  </Grid>
                </Grid>
              </div>
            </Box>
          </Container>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Login);
