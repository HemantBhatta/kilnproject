import React, { Component } from 'react'
import Axiosapi from './Axiosapi'
import Title from './Title'
import NgoListMap from './NgoListMap'
import {myContext} from '../context'
class NgosList extends Component {

    state={
        ngos :{}
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
        
        let ngolist = workersInfo.map(ngo=>{
        return <p className='ngoNameList' key={ngo.id}>{ngo.f_name}</p>
        })
        console.log(workersInfo)

        
console.log(ngos)

        return (
            <div className='ngoSection'>
                <Title title='NgoList'/>
                <div className='ngoInnerSection'>
                    {/* {ngolist} */}
                    
                </div>
            </div>
        )
    }
}

export default NgosList
