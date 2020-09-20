import Title from "../SingleComponents/Title";
import React from "react";
import TextField from "@material-ui/core/TextField";
import { scroller } from "react-scroll";
import { Button, Grid, Container,InputLabel,MenuItem,FormControl,Select } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
  },
}));



const WorkersInfoInputComp = ({
  SubmitHandler,
  valuea,
  InputHandler,
  kilnlist,
  InputHandlerKiln,
}) => {
  const classes = useStyles();

  const scrollToElement=(element)=>{
    scroller.scrollTo(element,{

     duration:1000,
     delay:100,
     smooth:true,

    })
  }


  let kilnOption = kilnlist.map((kiln) => {
    return (
      <MenuItem key={kiln.id} value={kiln.id}>
        {kiln.name}, {kiln.address}
      </MenuItem>
    );
  });



  return (
    <Container maxWidth="sm" component="main">
      <div className={classes.paper}>
       
          <Title title="Add Worker" />
      
        <form className={classes.form} action="" onSubmit={SubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="f_name"
                value={valuea.f_name}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Firstname"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="l_name"
                value={valuea.l_name}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Lastname"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="naike_name"
                value={valuea.naike_name}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Naike name"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                name="age"
                value={valuea.age}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Age"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="country"
                value={valuea.country}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Country"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="district"
                value={valuea.district}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter District"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="municipality"
                value={valuea.municipality}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Municipality"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="ward"
                value={valuea.ward}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Ward"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                margin="normal"
                name="category"
                value={valuea.category}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Category"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="phone"
                value={valuea.phone}
                onChange={InputHandler}
                id="standard-basic"
                label="Enter Phone"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <FormControl
                variant="outlined"
                required
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={valuea.gender}
                  name="gender"
                  onChange={InputHandler}
                  label="gender"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="MALE">Male</MenuItem>
                  <MenuItem value="FEMALE">Female</MenuItem>
                  <MenuItem value="OTHERS">Others</MenuItem>
                </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} sm={12}>
              <FormControl
                variant="outlined"
                fullWidth
                required
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Kiln Name
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={valuea.kiln_id}
                  name="kiln_id"
                  onChange={InputHandlerKiln}
                  label="kiln"
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  {kilnOption}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Button
            onClick={()=>scrollToElement("Home")}
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
  );
};

export default WorkersInfoInputComp;
