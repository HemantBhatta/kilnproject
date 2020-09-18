import React from "react";
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
import { csrftoken } from "./Axiosapi";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import { myContext } from "../../context";

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

class Register extends React.Component {
  state = {
    userInfo: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      ngo: window.location.toString().split("ngo=")[1],
    },
    alertInfo: this.context.alertData,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.alertInfo !== this.state.alertInfo) {
      this.context.AlertFunc(this.state.alertInfo);
    }
  }

  register = (e) => {
    e.preventDefault();

    axios({
      method: "POST",
      headers: {
        "X-CSRFToken": csrftoken,
      },
      url: `${process.env.REACT_APP_BASE_URL}/api/users/`,
      data: this.state.userInfo,
    })
      .then((res) => {
        if (res.status === 201 && res.statusText === "Created") {
          this.setState({
            alertInfo: {
              type: "success",
              msg: "Worker Registered Successfully.",
            },
          });
          this.setState((prevState) => {
            return { prevState, userInfo: this.state.userInfo };
          });
          window.location.href = `/#/login`;
        }
      })
      .catch((err) => {
        this.setState({
          alertInfo: {
            type: "error",
            msg: "Something went wrong. Please try again.",
          },
        });
      });
  };

  InputHandle = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    const { userInfo } = this.state;
    this.setState({ userInfo: { ...userInfo, [name]: value } });
  };

  static contextType = myContext;
  render() {
    const { classes } = this.props;
    if (!this.state.userInfo.ngo) {
      return <Redirect to={{ pathname: "/login" }} />;
    }

    return (
      <div>
        <Container maxWidth="sm" component="main">
          <Box component="div" mt={5}>
            <div className={classes.paper}>
              <Box component="div" my={1}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
              </Box>
              <Box component="div" mb={2}>
                <Typography component="h1" variant="h5">
                  Register
                </Typography>
              </Box>
              <form className={classes.form} onSubmit={this.register}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      variant="outlined"
                      fullWidth
                      name="first_name"
                      value={this.state.first_name}
                      onChange={this.InputHandle}
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="lname"
                      variant="outlined"
                      fullWidth
                      name="last_name"
                      value={this.state.last_name}
                      onChange={this.InputHandle}
                      id="lastName"
                      label="Last Name"
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      value={this.state.email}
                      onChange={this.InputHandle}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
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
                    Register
                  </Button>
                </Box>
              </form>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#login" variant="body2">
                    Already have an account? Login
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Register);
