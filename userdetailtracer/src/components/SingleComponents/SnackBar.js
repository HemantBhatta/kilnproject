import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import {Box} from '@material-ui/core'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const SnackBar = ({title,bg}) => {
    return (
        <Box mt={3}>
                  <Alert severity={bg}>{title}</Alert>
        </Box>
    )
}

export default SnackBar
