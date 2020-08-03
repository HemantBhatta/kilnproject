import React,{useContext} from 'react'
import KilnListMap from './KilnListMap'
import { Grid, Typography ,makeStyles} from "@material-ui/core";
import {myContext} from '../context'
import AddCircleIcon from "@material-ui/icons/AddCircle";
import KilnFilter from './FilterComponent/KilnFilter'
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

    const {sortedkilnInfo,kilnInfo} = useContext(myContext)
   console.log(sortedkilnInfo,kilnInfo)


    let kilnInfoComp = sortedkilnInfo.map(kiln=>{
        return <KilnListMap kiln={kiln} key = {kiln.id}/>
    })


    return (
      <div>

     {isAlreadyAuthenticated ? 
      <div>
        <span className={classes.addIcon}>
          <Link to="/kiln" className={classes.AddIconLink}>
            <AddCircleIcon color="primary" fontSize="large" />
          <Typography  className="addnewWorker" color="primary" component="h1" variant="h6">
            Add new kiln
          </Typography>
          </Link>
        </span>
        <Title title='Kiln List'/>
        <KilnFilter/>
        <div className={classes.pos}>    
        <Grid container spacing={2}>
                 {kilnInfoComp}
       </Grid>
    </div>
      </div> : <Redirect to={{pathname:'/login'}}/>
      }
      </div>
    )
}

export default KilnList
