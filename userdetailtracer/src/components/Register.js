import React from "react";
import {Grid, Container,Avatar,Typography,TextField,Button,Link,Box} from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Axiosapi from './Axiosapi'


const styles = theme => ({
    paper: {
     
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
  
    backgroundColor: '#3f51b5',
    },
    form: {
      width: "100%", // Fix IE 11 issue.
    
    },
    submit: {
    
    },
  });



class Register extends React.Component {
    
    
    
    state = {      
           userInfo:{
            username: "",
            first_name:'',
            last_name:'',
            email:'',
            password: "",      
           }
    };
    






   register = (e) => {

    e.preventDefault()

      Axiosapi({
        method:'POST',
        url:'users/',
        data:this.state
      })
      .then(res=>{
        console.log(res);
      })
      .catch((err) => console.log(err));
    

  };



 InputHandle = (e) => {
     let value = e.target.value;
     let name = e.target.name;

     this.setState({
         [name]:value
     })
   };


  
  render(){
    const { classes } = this.props;



  return (
    <div>   
    <Container maxWidth="sm" component="main">
      <Box component='div' mt={5} >
      <div className={classes.paper}>
      <Box component='div' my={1} >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        </Box>
        <Box component='div' mb={2} >
        <Typography component='h1' variant='h5'>
           Register
        </Typography>
        </Box>
        <form className={classes.form} onSubmit={this.register}>
            <Grid container  spacing={2}>

                <Grid item xs={12} sm={6}>
                        <TextField
                        autoComplete="username"
                        variant="outlined"
                        required
                        fullWidth
                        
                        name = 'username'
                        value ={this.state.username}
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
                        required
                        fullWidth
                        
                        name = 'first_name'
                        value ={this.state.first_name}
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
                        required
                        fullWidth
                        name = 'last_name'
                        value ={this.state.last_name}
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
                    value ={this.state.email}
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
                    value ={this.state.password}
                    onChange={this.InputHandle}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                </Grid>




                <Grid item xs={12} sm={12}>
              
            </Grid>





            </Grid>
            <Box component='div' my={3} >
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
        <Grid container  justify="flex-end">
            <Grid item>
            <Link href="/login" variant="body2">
                Already have an account? Login
              </Link>
            </Grid>
        </Grid>
      </div></Box>
    </Container>
    </div>
  );  }
};

export default withStyles(styles)(Register);


