import React from 'react'
import { Redirect } from "react-router-dom";





const Home = () => {
  
    return (
        <div>
            <Redirect to ={{pathname:'workers'}} />
            {/* home */}
        </div>
    )
}

export default Home
