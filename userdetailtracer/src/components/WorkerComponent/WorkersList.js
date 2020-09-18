import React, { useState, useContext } from "react";
import WorkersListMap from "./WorkersListMap";
import { Grid, Typography, makeStyles,Box } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Title from "../SingleComponents/Title";
import WorkerFilter from "../FilterComponent/WorkerFilter";
import WorkersPaginate from "../SingleComponents/WorkersPaginate";
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Spinner from '../SingleComponents/Spinner'
import Mycsv from '../mycsv'


import { Link, Redirect } from "react-router-dom";
import "../../App.css";
import { myContext } from "../../context";

const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};

const useStyles = makeStyles((theme) => ({
  pos: {
    marginTop: 15,
    width: "95%",
    margin: "auto",
  
  },
  addIcon: {
    width: "95%",
    marginTop: 30,
    margin: "auto",
    display: "flex",
    justifyContent:'space-between',
    alignItems: "center",
    color: "primary",
  },

  AddIconLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
}));

const WorkersList = () => {
  const classes = useStyles();
  const isAlreadyAuthenticated = isAuthenticated();

  const { sortedWorkersInfo, isSuperUser, workersInfo,csvData,CsvWorkerDataFunc} = useContext(myContext);
 const workerscsvHeaders =  ['Id','First Name', 'Last Name','Naike Name','NaikePhone','Priority','Ngo','Duplicate','Gender','Age','Country','District','Municipality','Village','Ward','Phone','Category','Kiln Id','Children','Kiln','Kiln Address','Amount Paid','Amount Payer'] 
  const [currentPage, setCurrentPage] = useState(1);
  // console.log(currentPage)
  const [workersPerPage] = useState(9);
  if(!sortedWorkersInfo)
  {
    return <Spinner/>
  }

  const indexOfLastWorker = currentPage * workersPerPage;
  const indexOfFirstWorker = indexOfLastWorker - workersPerPage;
  const curretWorkers = sortedWorkersInfo.slice(
    indexOfFirstWorker,
    indexOfLastWorker
  );

  let sortedworkersInfoComp = curretWorkers.map((worker) => {
    // console.log(worker)
    return <WorkersListMap worker={worker} key={worker.id} />;
  });


  const paginate = (pageNumber) => {
    // console.log(pageNumber)
    setCurrentPage(pageNumber);
  };

  return (
    <div className='workerList-Section'>
    
      {isAlreadyAuthenticated ? (
        <div>
          {isSuperUser() ? (
            <span className={classes.addIcon}>
              <Link to="/inputnewworker" className={classes.AddIconLink}>
                <AddCircleIcon color="primary" fontSize="large" />
                <Typography
                  className="addnewWorker"
                  color="primary"
                  component="h1"
                  variant="h6"
                >
                  Add new worker
                </Typography>
              </Link>
              <Link to="/summary" className={classes.AddIconLink}>
              
                <Typography
                  className="addnewWorker"
                  color="primary"
                  component="h1"
                  variant="h6"
                >
                 
                  Summary
                </Typography>
                <ArrowRightAltIcon color="primary" fontSize="large" />
              </Link>
            </span>
          ) : (
            ""
          )}
          <Title title="Workers List" />
          <WorkerFilter />
          <Box>
          <Typography variant='h5' className='SelectedWorkers'>Selected <strong className='sortedOutof'>{sortedWorkersInfo.length}</strong> out of <strong className='sortedOutoflength'>{workersInfo.length}</strong> workers</Typography>
          </Box>
          <div className={classes.pos}>
            <Grid container spacing={2}>
              {sortedworkersInfoComp}
            </Grid>
          </div>

         <div className='CsvBtnSec'>
            <WorkersPaginate
                itemsPerPage={workersPerPage}
                totalItems={sortedWorkersInfo.length}
                paginate={paginate}
                csvData = {csvData}
                csvFunc = {CsvWorkerDataFunc}
                csvheader = {workerscsvHeaders}
              />
             <div className='csvbtn'>
             <Mycsv/>
             </div>
         </div>
        </div>
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )}
    </div>
  );
};

export default WorkersList;
