import React, { Component } from 'react'

class LoadingScreen extends Component {
    render() {
        return (
            <div className='loadingscreen'>
              <div>
              <h1>Syncing offline data...</h1>
              </div>
            </div>
        )
    }
}

export default LoadingScreen
