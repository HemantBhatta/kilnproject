import React from 'react'
import '../../App.css';
 

const Title = ({title,children}) => {
    return (
        <div className='title'>        
            <p>{title}</p>
            <div/>
        </div>
    )
}

export default Title
