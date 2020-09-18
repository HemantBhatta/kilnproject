import React, { Component } from 'react'
import SummaryNgoTotals from './SummaryNgoTotals'
import {myContext} from '../../context'

class SummaryNgoList extends Component {


    componentDidMount(){
        this.context.PaidUnpaidNgoSummary()
     }
 

     static contextType = myContext
    render() {
        return (
            <div className='summaryNgoSection'>       
               <SummaryNgoTotals/>
            </div>
        )
    }
}

export default SummaryNgoList
