import React from 'react'
import { Button, Grid, Card, Typography, Box } from "@material-ui/core";


const SummaryCard = ({keys,totalSummary,max_amount,OuterAmountBar,CardTextFirst,CardTextSecond}) => {
    // console.log(keys)
    return (
           <Grid item xs={12} sm={12} md={10} >
       
        <Box my={0}>
          <Card>
            <Box p={2}>
              <Typography variant="button" >
                {keys}
              </Typography>

              <Typography variant="body2">
                {CardTextFirst} :
                {totalSummary[keys].peoplecount}
              </Typography>
        {  totalSummary[keys].totalamount >0 ? 
              <OuterAmountBar
                width={max_amount}
                abcd={
                  (totalSummary[keys].totalamount / max_amount) * 100
                }
              >
                    <Typography variant="body2"  className="AmountBar">
                {CardTextSecond}: Rs.{" "}
                    {totalSummary[keys].totalamount}
                    
                  </Typography>
                <div
                 
                  style={{
                    width: `${(totalSummary[keys].totalamount / max_amount) *100}%`,}}
                >
                  
                </div>
              </OuterAmountBar> : 
               <div style={{margin:'4px 0'}}>
               {CardTextSecond}: Rs.{" "}
               {totalSummary[keys].totalamount}
             </div>
        }
            </Box>
          </Card>
        </Box>
     
      </Grid>
    )
}

export default SummaryCard
