import React,{useContext,useState} from 'react'
import KilnListMap from './KilnListMap'
import { Grid, Typography ,makeStyles} from "@material-ui/core";
import {myContext} from '../context'
import AddCircleIcon from "@material-ui/icons/AddCircle";
import KilnFilter from './FilterComponent/KilnFilter'
import WorkersPaginate from './WorkersPaginate'
import Spinner from './Spinner'
import {Link, Redirect} from 'react-router-dom'

import Title from './Title'



const useStyles = makeStyles({
  
    pos: {
      marginTop: 30,
      width: "90%",
      margin: "auto",
     
    },

    addIcon: {
      width: "90%",
      marginTop: 30,
      margin: "auto",
      display: "flex",
      alignItems: "center",
      color: "primary",
    },

    AddIconLink:{
      display: "flex",
      alignItems: "center",
      textDecoration:'none'
    }
  });

  const isAuthenticated = () => {
    const token = localStorage.getItem("item");
    return token && token.length > 10;
  };


const KilnList = () =>  {
    const classes = useStyles()
    const isAlreadyAuthenticated = isAuthenticated();

    const {sortedkilnInfo,isSuperUser} = useContext(myContext)
    const [currentPage,setCurrentPage] = useState(1)
    const [kilnsPerPage] = useState(9)
    if(!sortedkilnInfo)
  {
    return <Spinner/>
  }

    const indexOfLastKiln = currentPage * kilnsPerPage;
    const indexOfFirstKiln  = indexOfLastKiln - kilnsPerPage
    const curretKilns = sortedkilnInfo.slice(indexOfFirstKiln,indexOfLastKiln)

    let kilnInfoComp = curretKilns.map(kiln=>{
        return <KilnListMap kiln={kiln} key = {kiln.id}/>
    })

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber)
    }
  

    return (
      <div>

     {isAlreadyAuthenticated ? 
      <div>
{ isSuperUser() ? 
        <span className={classes.addIcon}>
          <Link to="/kiln" className={classes.AddIconLink}>
            <AddCircleIcon color="primary" fontSize="large" />
          <Typography  className="addnewWorker" color="primary" component="h1" variant="h6">
            Add new kiln
          </Typography>
          </Link>
        </span> : null
}
        <Title title='Kiln List'/>
        <KilnFilter/>
        <div className={classes.pos}>    
              <Grid container spacing={2}>
                      {kilnInfoComp}
            </Grid>
        </div>
        <WorkersPaginate itemsPerPage={kilnsPerPage} totalItems={sortedkilnInfo.length} paginate={paginate}/>

      </div> : <Redirect to={{pathname:'login'}}/>
      }
      </div>
    )
}

export default KilnList
