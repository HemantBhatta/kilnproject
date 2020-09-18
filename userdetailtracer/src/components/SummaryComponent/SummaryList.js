import React, { Component } from 'react'
import SummaryFilter from './SummaryFilter'

import SummaryTotals from './SummaryTotals'

import { Button, Grid, Container,Box } from "@material-ui/core";
import { myContext } from "../../context";

class SummaryList extends Component {

    componentDidMount(){
       this.context.filterAllOptionsSummary()
    }

    static contextType = myContext
    render() {
        return (
            <div className='summarySection'>             
                <SummaryFilter/>           
              <div className='summarylistTotal'>
                  <SummaryTotals/>           
              </div>
            </div>
        )
    }
}

export default SummaryList
