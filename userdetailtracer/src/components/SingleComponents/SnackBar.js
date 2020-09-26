import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import {Box} from '@material-ui/core'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SnackBar = () => {
    return (
        <Box mt={3}>
                  <Alert severity="info">You are currently working on offline mode.</Alert>
        </Box>
    )
}

export default SnackBar
