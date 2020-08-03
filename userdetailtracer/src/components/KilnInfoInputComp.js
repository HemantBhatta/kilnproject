import React from 'react'
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Title from './Title'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
      textAlign: "center",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

  }));

const KilnInfoInputComp = ({InputHandler,SubmitHandler,valuea})=> {

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
      <div className={classes.paper}>
      
        <Title title='Add Kiln'/>
        <form className={classes.form} action="" onSubmit={SubmitHandler}>
          <Grid container spacing={1}>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="name"
                value={valuea.name}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter kilnname"
              />
            </Grid>
            <Grid item xs={12} >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="address"
                value={valuea.address}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter kilnaddress"
              />
            </Grid>


           

            </Grid>
            <Button      
            className={classes.submit}
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </form>
        </div>
    </Container>
    )
}

export default KilnInfoInputComp
