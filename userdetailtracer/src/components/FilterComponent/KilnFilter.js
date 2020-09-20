import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import { myContext } from "../../context";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  inputSection: {
    width: "95%",
    margin: "auto",
  },
}));

const KilnFilter = () => {
  const classes = useStyles();

  const {searchbykiln,ChangeOptionFilter} = useContext(myContext);

  return (
    <div>
      <div className={classes.inputSection}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} >
            <TextField
              fullWidth
              label="Search by Name"
              id="outlined-size-small"
              name="searchbykiln"
              value={searchbykiln}
              onChange={ChangeOptionFilter}
              variant="outlined"
             
            />
          </Grid>


      
        </Grid>
      </div>
    </div>
  );
};

export default KilnFilter;
