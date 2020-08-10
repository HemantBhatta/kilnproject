import React from 'react'
import Pagination from '@material-ui/lab/Pagination';




const WorkersPaginate = ({itemsPerPage,totalItems,paginate}) => {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
      setPage(value);
     
    };
   
    return (
        <div className='paginateClass'>
            <div>      
                <Pagination count={Math.ceil(totalItems/itemsPerPage)}   onClick={paginate(page)} page={page} onChange={handleChange} color="secondary"  className='paginateInner'/>       
            </div>
        </div>
    )
}

export default WorkersPaginate
