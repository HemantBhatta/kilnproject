import React, { Component } from 'react'
import Axiosapi from './Axiosapi'
import Title from './Title'
import {myContext} from '../context'
import Card from '@material-ui/core/Card';
import Spinner from './Spinner'
import {Redirect} from 'react-router-dom'


const isAuthenticated = () => {
    const token = localStorage.getItem("item");
    return token && token.length > 10;
  };

class NgosList extends Component {

   
    state={
        ngos :[],
    }

    componentDidMount()
    {
        Axiosapi.get('ngos')
        .then(res=>{   
              
            this.setState({ngos:res.data})
        })
    }
    static contextType = myContext;
    render() {
        const {ngos} = this.state
        const isAlreadyAuthenticated = isAuthenticated();

        if(!ngos){
            return <Spinner/>
        }
        const {workersInfo} = this.context
       
        let ngolist = ngos.map(ngo=>{
        return <Card style={{'margin-bottom':'.5em', 'padding': '1em'}}>
             <p key={ngo.id}>{ngo.name}</p>
             <div style={{'margin-top': '.5em'}}>
                <a href={`#register?ngo=${ngo.id}`} className='registerLink'>
                Registration link
                </a>
            </div>
            </Card>
        })


        return (
            <div>
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
