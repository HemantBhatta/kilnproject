import React, { Component } from 'react'
import TextField from "@material-ui/core/TextField";
import { Button, Grid, Container } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Title from './Title'
import Axiosapi from './Axiosapi'


import { myContext } from "../context";


class EditWorkerCompRe extends Component {

state={
    singleWorkerInfo:{},
    id:this.props.match.params.id,
    alertInfo:this.context.alertData


}

   componentDidMount(){

      Axiosapi({
        method:'GET',
        url:`workers/${this.state.id}`
      })
      .then(res=>{
        this.setState({singleWorkerInfo: res.data})
      })
      .catch((err) => console.log(err));

   }

  //  componentDidUpdate(prevProps,prevState){
  //    if( prevState !== this.state.alertInfo){
  //     this.context.AlertFunc(this.state.alertInfo);
  //    }
  //  }


    InputHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name,value)
    value = value.toUpperCase()
    const singleWorkerInfo = {...this.state.singleWorkerInfo, [name]: value}
    this.setState({singleWorkerInfo})
   }


    InputHandlerKiln = (e)=>{
    let name = e.target.name;
    let value = e.target.value;
    console.log(name,value)
  
    }


     SubmitHandler = (e) => {
        e.preventDefault();

          Axiosapi({
            method:'PUT',
            url:`workers/${this.state.singleWorkerInfo.id}`,
            data:this.state.singleWorkerInfo
          })
          .then(res=>{
            this.context.WorkerEditStatefunc(this.state.singleWorkerInfo);
            if (res.status === 201 && res.statusText === "Created") {
              this.setState({type: 'success', msg: 'Worker saved'})
             }
            })
            .catch((err) => {
              this.setState({alertInfo:{type: 'error', msg: 'Something went wrong. Please try again.'}})
          })
    

       
      };

  


    static contextType = myContext;
    render() {

     const {kilnInfo,alertData,AlertFunc} =  this.context
     let kilnOption = kilnInfo.map((kiln)=>{
        return   <MenuItem value={kiln.id}>{kiln.name}</MenuItem>
    })

   

        return (
            <Container  maxWidth="sm" component="main">
            <div>
              {/* <Typography component="h1" variant="h5">
               Add Worker
              </Typography> */}
              <Title title='Update Worker'/>
              <form action="" onSubmit={this.SubmitHandler}>
                <Grid container spacing={2}>
             
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="f_name"
                      value={this.state.singleWorkerInfo.f_name}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter firstname"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="l_name"
                      value={this.state.singleWorkerInfo.l_name}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter lastname"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
      
      
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="naikename"
                      value={this.state.singleWorkerInfo.naikename}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter naikename"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="naikelastname"
                      value={this.state.singleWorkerInfo.naikelastname}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter naikelastname"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
                
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="age"
                      value={this.state.singleWorkerInfo.age}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter age"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
              
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="district"
                      value={this.state.singleWorkerInfo.district}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter district"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="municipality"
                      value={this.state.singleWorkerInfo.municipality}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter municipality"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required 
                      fullWidth
                      margin="normal"
                      name="ward"
                      value={this.state.singleWorkerInfo.ward}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter ward"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      name="workercategory"
                      value={this.state.singleWorkerInfo.workercategory}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter workercategory"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
      
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="phone"
                      value={this.state.singleWorkerInfo.phone}
                      onChange={this.InputHandler}
                      id="standard-basic"
                      label="Enter phone"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
      
      
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth                   
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Gender
                      </InputLabel>
                     
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.singleWorkerInfo.gender}
                        name="gender"
                        onChange={this.InputHandler}
                        label="gender"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        <MenuItem value='MALE'>MALE</MenuItem>
                        <MenuItem value='FEMALE'>FEMALE</MenuItem>
                        <MenuItem value='OTHERS'>OTHERS</MenuItem>                   
                      </Select>
                    </FormControl>
                  </Grid>
      
                 
                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant="outlined"
                      fullWidth                  
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Kiln Name
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={this.state.singleWorkerInfo.kiln}
                        name="kiln"
                        onChange={this.InputHandlerKiln}
                        label="kiln"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                       {kilnOption}                     
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
               
                <Button      
                 className='editWorkerBtn'
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
              
              </form>
            </div>
          </Container>
        )
    }
}


export default EditWorkerCompRe
