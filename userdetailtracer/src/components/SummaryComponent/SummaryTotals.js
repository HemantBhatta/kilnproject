import React, { useContext, useEffect } from "react";
import { Button, Grid, Card, Typography, Box } from "@material-ui/core";
import SummaryCard from './SummaryCard'
import Spinner from '../SingleComponents/Spinner'
import styled from "styled-components";
import { myContext } from "../../context";

const SummaryTotals = () => {
  const {
    TotalSummaryAmountPaid,
    TotalSummaryByDistrict,
    calculateTotalPaidSummary,
  } = useContext(myContext);

  useEffect(() => {
    calculateTotalPaidSummary();
  }, []);
 if(!TotalSummaryByDistrict){
   return <Spinner/>
 }
  const max_amount = Math.max(
    ...Object.values(TotalSummaryByDistrict).map((e) => e.totalamount)
  );

  const abcd = Object.keys(TotalSummaryByDistrict).map(function (key) {
    return (
   
        <SummaryCard key={key} keys={key} totalSummary={TotalSummaryByDistrict} max_amount={max_amount} OuterAmountBar={OuterAmountBar} CardTextFirst='PeopleCount in District' CardTextSecond='Total paid amount in a district'/>
      
    );
  });

  return (
    <div>
      <Grid item xs={12} sm={6} md={4}>
        <Typography variant="h6" component="h2">
          <Box component="div" mb={2} mt={4} className='Totalpaidamount'>
            {" "}
            Total Amount Paid : Rs. {TotalSummaryAmountPaid}
          </Box>
        </Typography>
      </Grid>

      <Grid container spacing={2}>
        {abcd}
      </Grid>
    </div>
  );
};

const OuterAmountBar = styled.div`
  width: ${(props) => (props.width ? props.width : '')};

  border-radius: 5px;
  margin: 10px 0;
  background-color: aliceblue;

  div {
   
    background-color: orange;
    height:15px;
    transition: 0.5s ease all;
    text-align: center;
    color: white;
    border-radius: 5px;
    padding: 3px 0;
  }
`;

export default SummaryTotals;
