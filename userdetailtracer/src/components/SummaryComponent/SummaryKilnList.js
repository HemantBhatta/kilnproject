import React, { Component } from 'react'
import SummaryKilnTotals from './SummaryKilnTotals'
import {myContext} from '../../context'

class SummaryKilnList extends Component {


    componentDidMount(){
        this.context.PaidUnpaidKilnSummary()
     }
 

     static contextType = myContext
    render() {
        return (
            <div className='summaryKilnSection'>            
               <SummaryKilnTotals/>
            </div>
        )
    }
}

export default SummaryKilnList
