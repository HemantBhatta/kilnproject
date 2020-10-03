import React, { useContext, useState } from "react";
import KilnListMap from "./KilnListMap";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";
import { myContext } from "../../context";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import KilnFilter from "../FilterComponent/KilnFilter";
import WorkersPaginate from "../SingleComponents/WorkersPaginate";
import Spinner from "../SingleComponents/Spinner";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Link, Redirect } from "react-router-dom";
import SnackBar from "../SingleComponents/SnackBar";
import Title from "../SingleComponents/Title";

const useStyles = makeStyles({
  pos: {
    marginTop: 30,
    width: "95%",
    margin: "auto",
  },

  addIcon: {
    width: "95%",
    marginTop: 30,
    margin: "auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "primary",
  },

  AddIconLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
});

const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};

const KilnList = () => {
  const classes = useStyles();
  const isAlreadyAuthenticated = isAuthenticated();

  const { sortedkilnInfo, isSuperUserSummary,isSuperUser, kilnInfo,supportServiceWorker } = useContext(
    myContext
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [kilnsPerPage] = useState(9);
  if (!sortedkilnInfo) {
    return <Spinner />;
  }
  const indexOfLastKiln = currentPage * kilnsPerPage;
  const indexOfFirstKiln = indexOfLastKiln - kilnsPerPage;
  const curretKilns = sortedkilnInfo.slice(indexOfFirstKiln, indexOfLastKiln);

  let kilnInfoComp = curretKilns.map((kiln) => {
    return <KilnListMap kiln={kiln} key={kiln.id} />;
  });

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="kilnList-Section">

        {
          supportServiceWorker() && navigator.onLine ? (
            ""
          ) : supportServiceWorker() && !navigator.onLine ? (
            <SnackBar
              bg="info"
              title="You are currently working on offline mode."
            />
          ) : !supportServiceWorker() ? (
            <SnackBar
              bg="warning"
              title="Sorry,your browser doesn't support offline mode."
            />
          ) : null
      }

      {isAlreadyAuthenticated ? (
        <div>
          {isSuperUser() ? (
            <span className={classes.addIcon}>
              <Link to="/kiln" className={classes.AddIconLink}>
                <AddCircleIcon color="primary" fontSize="large" />
                <Typography
                  className="addnewWorker"
                  color="primary"
                  component="h1"
                  variant="h6"
                >
                  Add new kiln
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
          ) : isSuperUserSummary() ? (
            <span className="offlineSummaryLink">
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

          <Title title="Kiln List" />
          <KilnFilter />
          <Box>
            <Typography variant="h5" className="SelectedWorkers">
              Selected{" "}
              <strong className="sortedOutof">{sortedkilnInfo.length}</strong>{" "}
              out of{" "}
              <strong className="sortedOutoflength">{kilnInfo.length}</strong>{" "}
              kilns
            </Typography>
          </Box>
          <div className={classes.pos}>
            <Grid container spacing={2}>
              {kilnInfoComp}
            </Grid>
          </div>
          <WorkersPaginate
            itemsPerPage={kilnsPerPage}
            totalItems={sortedkilnInfo.length}
            paginate={paginate}
          />
        </div>
      ) : (
        <Redirect to={{ pathname: "login" }} />
      )}
    </div>
  );
};

export default KilnList;
