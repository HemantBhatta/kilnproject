import React, { Component } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { TextField, Grid } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { myContext } from "../../context";

class SummaryFilter extends Component {
  static contextType = myContext;

  uniqueFilter = (arr,grp) => {
    return arr.reduce((acc,cur)=>{
      if(!acc.includes(cur[grp])) acc.push(cur[grp])
      return acc
    },['All'])
}

 selectOptionFunc = (arr,val) => {
 return  arr.map((val, index) => {
    return (
      <MenuItem key={index} value={val}>
        {val}
      </MenuItem>
    );
  });
 }

  render() {
    const {
      workersInfo,
      searchbydistrictsummary,
      searchbymunicipalitysummary,
      ChangeOptionFilterSummary,
      moneypaidworker
    } = this.context;


  

    let uniquedistrict =   this.uniqueFilter(workersInfo,'district')
    let districtOption = this.selectOptionFunc(uniquedistrict,'district')


    let uniquemunicipality = this.uniqueFilter(workersInfo,'municipality')

    let municipalityOption = this.selectOptionFunc(uniquemunicipality,'municipality')



    return (
      <div>
        <div className="summaryFilter">
          <Grid container spacing={4}>
            <Grid item xs={6} sm={4} md={3} >
              <FormControl variant="outlined" className="SummaryDropDown">
                <InputLabel id="demo-simple-select-outlined-label">
                  By District
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="searchbydistrictsummary"
                  value={searchbydistrictsummary}
                  onChange={ChangeOptionFilterSummary}
                  label="Districtname"
                >
                  {districtOption}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <FormControl variant="outlined" className="SummaryDropDown">
                <InputLabel id="demo-simple-select-outlined-label">
                  By Municipality
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="searchbymunicipalitysummary"
                  value={searchbymunicipalitysummary}
                  onChange={ChangeOptionFilterSummary}
                  label="Municipalityname"
                >
                  {municipalityOption}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={4} md={3}>
              <FormControl variant="outlined" className="SummaryDropDown">
                <InputLabel id="demo-simple-select-outlined-label">
                  By PayStatus
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="moneypaidworker"
                  value={moneypaidworker}
                  onChange={ChangeOptionFilterSummary}
                  label="Municipalityname"
                >
                  <MenuItem name='All' value='All'>All</MenuItem>
                    <MenuItem name='moneypaid' value='paid'>Paid</MenuItem>
                    <MenuItem name='moneyunpaid' value='unpaid'>UnPaid</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default SummaryFilter;
