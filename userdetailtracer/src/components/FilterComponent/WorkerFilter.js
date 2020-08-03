import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
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
    width: "90%",
    margin: "auto",
  },
}));

const WorkerFilter = () => {
  const classes = useStyles();
  const {
    workersInfo,
    kname,
    gender,
    searchbyworkername,
    ChangeOptionFilter,
  
    searchbydistrict,
    searchbymunicipality,
    searchbyward,
    searchbyworkercategory,
    searchbynaikename,
    searchbykilnname,
  } = useContext(myContext);

  let kilnlist = workersInfo.map((kiln) => {
   
    return kiln.kiln.name;
  });

  let uniquekiln = [...new Set(kilnlist), "All"];

  let kilnOption = uniquekiln.map((kiln,index) => {
    return <option key={index} value={kiln}>{kiln}</option>;
  });

  return (
    <div>
      <div className={classes.inputSection}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by name"
              id="outlined-size-small"
              name="searchbyworkername"
              value={searchbyworkername}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by workercategory"
              id="outlined-size-normal"
              name="searchbyworkercategory"
              value={searchbyworkercategory}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by naikename"
              id="outlined-size-normal"
              name="searchbynaikename"
              value={searchbynaikename}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
        fullWidth
          label="Search by country"
          id="outlined-size-normal"
          name="searchbycountry"
          value={searchbycountry}
          onChange={ChangeOptionFilter}
          variant="outlined"
          size="small"
        />
 </Grid> */}

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by district"
              id="outlined-size-normal"
              name="searchbydistrict"
              value={searchbydistrict}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by municipality"
              id="outlined-size-normal"
              name="searchbymunicipality"
              value={searchbymunicipality}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by ward"
              id="outlined-size-normal"
              name="searchbyward"
              value={searchbyward}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by kilnname"
              id="outlined-size-normal"
              name="searchbykilnname"
              value={searchbykilnname}
              onChange={ChangeOptionFilter}
              variant="outlined"
              // size="small"
            />
          </Grid>

          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By Kiln Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="kname"
                value={kname}
                onChange={ChangeOptionFilter}
                label="Kilnname"
                // size="small"
              >
                {kilnOption}
              </Select>
            </FormControl>
          </Grid>

          <Grid item>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By Gender
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="gender"
                value={gender}
                onChange={ChangeOptionFilter}
                label="Gender"
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default WorkerFilter;
