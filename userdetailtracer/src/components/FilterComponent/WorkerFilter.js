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
    width:'90%'
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
    searchbyworkercategory,
    searchbynaike_f_name,
  
  } = useContext(myContext);


let categorylist = workersInfo.map((worker) => {
  return worker.category;
});
let uniquecategory = [...new Set(categorylist), "All"].sort();

let categoryOption = uniquecategory.map((category,index) => {
  return <MenuItem key={index} value={category}>{category}</MenuItem>;
});



let districtlist = workersInfo.map((worker) => {
  return worker.district;
});
let uniquedistrict = [...new Set(districtlist), "All"].sort();

let districtOption = uniquedistrict.map((district,index) => {
  return <MenuItem key={index} value={district}>{district}</MenuItem>;
});


let municipalitylist = workersInfo.map((worker) => {
  return worker.municipality;
});
let uniquemunicipality = [...new Set(municipalitylist), "All"].sort();

let municipalityOption = uniquemunicipality.map((municipality,index) => {
  return <MenuItem key={index} value={municipality}>{municipality}</MenuItem>;
});


  let kilnlist = workersInfo.map((worker) => {
    return worker.kiln.name;
  });
  let uniquekiln = [...new Set(kilnlist), "All"].sort();

  let kilnOption = uniquekiln.map((kiln,index) => {
    return <MenuItem key={index} value={kiln}>{kiln}</MenuItem>;
  });





  return (
    <div>
      <div className={classes.inputSection}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name"
              id="outlined-size-small"
              name="searchbyworkername"
              value={searchbyworkername}
              onChange={ChangeOptionFilter}
              variant="outlined"
             
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Naike name"
              id="outlined-size-normal"
              name="searchbynaike_f_name"
              value={searchbynaike_f_name}
              onChange={ChangeOptionFilter}
              variant="outlined"
              
            />
          
        </Grid>


        <Grid item xs={6} sm={4}  className='categoryMargin'>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By Category
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="searchbyworkercategory"
                value={searchbyworkercategory}
                onChange={ChangeOptionFilter}
                label="Category"
               
              >
                {categoryOption}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6} sm={4} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By District
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="searchbydistrict"
                value={searchbydistrict}
                onChange={ChangeOptionFilter}
                label="Districtname"
                
              >
                {districtOption}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6} sm={4} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By Municipality
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="searchbymunicipality"
                value={searchbymunicipality}
                onChange={ChangeOptionFilter}
                label="Municipalityname"
              
              >
                {municipalityOption}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">
                By Kiln
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                name="kname"
                value={kname}
                onChange={ChangeOptionFilter}
                label="Kilnname"
               
              >
                {kilnOption}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6} sm={4} md={3}>
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
