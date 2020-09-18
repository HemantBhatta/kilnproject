import React from "react";
import { Typography ,Card} from "@material-ui/core";

const Error = () => {
  return (
    <div className='errorSection'>
      {" "}
      <Card style={{'padding':'20px'}} >
        <Typography
         
          color="primary"
          component="h1"
          variant="h4"
        >
          Error! 404 Not Found
        </Typography>
      </Card>
    </div>
  );
};

export default Error;
