import React, { Component } from 'react'
import Axiosapi from './Axiosapi'
import Title from './Title'
import {myContext} from '../../context'
import {Card,Typography} from '@material-ui/core';
import Spinner from './Spinner'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {Redirect,Link} from 'react-router-dom'
import SnackBar from './SnackBar'




const isAuthenticated = () => {
    const token = localStorage.getItem("item");
    return token && token.length > 10;
  };

class NgosList extends Component {

   
    state={
        ngos :this.context.ngos,
    }

    static contextType = myContext;
    render() {
        const {isSuperUserSummary} = this.context
        const {ngos} = this.state
        const isAlreadyAuthenticated = isAuthenticated();

        if(!ngos){
            return <Spinner/>
        }
        const {workersInfo} = this.context
       
        let ngolist = ngos.map(ngo=>{
        return <Card key={ngo.uuid} style={{'marginBottom':'.5em', 'padding': '1em'}}>
             <Typography key={ngo.uuid}>{ngo.name}</Typography>
             <div style={{'marginTop': '.5em'}}>
                <a href={`#register?ngo=${ngo.uuid}`} className='registerLink'>
                Registration link
                </a>
            </div>
            </Card>
        })

        return (
            <div className='ngolist-Section'>
                {
                  navigator.onLine ? '' :  <SnackBar/>
                }
               {
                   isSuperUserSummary() ? 
                   <div className='ngosummaryLink'>
                   <Link to="/summary" >
                 
                 <Typography
                   className="ngosummarytext"
                   color="primary"
                   component="h1"
                   variant="h6"
                 >
                  
                   Summary
                 </Typography>
               </Link>
                 <ArrowRightAltIcon color="primary" fontSize="large" />
                   </div> : ''
               }
                { isAlreadyAuthenticated ? 
            <div className='ngoSection'>
                <Title title='NgoList'/>
                <div className='ngoInnerSection'>
                    {ngolist}
                </div>
            </div> : <Redirect to={{pathname:'/login'}}/>}
            </div>
        )
    }
}

export default NgosList
