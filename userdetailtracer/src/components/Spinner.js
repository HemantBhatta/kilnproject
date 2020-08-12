import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
    return (
        <div className='spinnerSection'>
            <div>
            <CircularProgress color="secondary" />
            </div>
        </div>
    )
}

export default Spinner
