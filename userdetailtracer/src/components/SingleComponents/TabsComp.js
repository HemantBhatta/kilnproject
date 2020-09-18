import React, { Component } from 'react'
import Title from './Title'
import { Button, Grid, Card, Typography, Box } from "@material-ui/core";


const TabTitle = (props) =>{
    return(
      props.isActive === props.dataTab
      ? <Typography variant='h5' onClick={props.onClick} className="tab-title tab-title--active" data-tab={props.dataTab}>{props.title}</Typography>
      : <Typography variant='h5' onClick={props.onClick} className="tab-title" data-tab={props.dataTab}>{props.title}</Typography>
    )
  }
  
  const  TabContent = (props) =>{
    return(
      <div style={props.style} data-tab={props.dataTab}>{props.content}</div>
    )
  }



class TabsComp extends Component {
  
        state = {isActive: '1'};

    changeActive = (ev) =>{
      this.setState({isActive: ev.target.getAttribute("data-tab")})
    }
    
    render(){
        // console.log(this.props.data)
      var listTitle = this.props.data.map((item) => 
        <TabTitle isActive={this.state.isActive} onClick={this.changeActive} dataTab={item.id} title={item.tabTitle} />
      )                                        
       var listContent = this.props.data.map((item) => 
            this.state.isActive === item.id 
            ? <TabContent dataTab={item.id} content={item.tabContent} />
            : <TabContent style={{display: 'none'}} dataTab={item.id} content={item.tabContent} />
        )
      return(
        <div className="tabs">
          <Typography className="tabs-titles">
            {listTitle}
          </Typography>
          <div className="tab-content">
             {listContent}
          </div>
        </div>
      )
    }
}

export default TabsComp
