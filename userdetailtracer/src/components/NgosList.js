import React, { Component } from 'react'
import Axiosapi from './Axiosapi'
import Title from './Title'
import NgoListMap from './NgoListMap'
import {myContext} from '../context'
import {Link, Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card';
class NgosList extends Component {

    state={
        ngos :[]
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
        if(!ngos){
            return 'loading'
        }
        const {workersInfo} = this.context
        console.log(ngos)
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
        console.log(workersInfo)

        
console.log(ngos)

        return (
            <div className='ngoSection'>
                <Title title='NgoList'/>
                <div className='ngoInnerSection'>
                    {ngolist}
                </div>
            </div>
        )
    }
}

export default NgosList
