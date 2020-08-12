import React from "react";
import { TextField, Container, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { myContext } from "../context";
import Axiosapi from './Axiosapi'

class ModalPayment extends React.Component {
  state = {
    valuea:this.context.ModalData
    ,
    paymentdat: {
      amount: "",
      timeofpay: "",
      amountpayer:this.context.user && this.context.user.username
    },
  };

  handleChangeAmount = (e) => {
          const amount = e.target.value
          
          this.setState({paymentdat:{...this.state.paymentdat,amount:amount,timeofpay:new Date().toLocaleString()}})
  };

  setUpdatedPayment = () => {
    this.context.WorkerEditStatefunc({
      ...this.context.ModalData[0],
      extra:JSON.stringify({...this.state.paymentdat,amountpayer:this.context.user.username})
  });
}

  handleSubmit = (e) => {
    e.preventDefault();

    const vals = {...this.context.ModalData[0],extra:JSON.stringify({...this.state.paymentdat,amountpayer:this.context.user.username})}
    const ModalDataId = this.context.ModalData.map(data=>{
      return data.id
    })

    if( navigator.onLine ){

      Axiosapi({
        method:'PUT',
        url:`workers/${ModalDataId[0]}`,
        data:vals
      })
      .then(res=>{
        if (res.status === 200 && res.statusText === "OK") {
            this.setUpdatedPayment();
        }
        })
        .catch((err) => {
          this.setState({})
      });

    } else {
      this.setUpdatedPayment();
      this.context.WorkerEditPaymentFunc({
        ...this.context.ModalData[0],
        extra:JSON.stringify({...this.state.paymentdat,amountpayer:this.context.user.username})
     });
   }



  };

  

  
  static contextType = myContext;
  render() {
    
    const { CloseModal, ModalStatus, ModalData, user } = this.context;
   
    return (
      <div className={ModalStatus ? "modalOverlay" : "hideModal"}>
        <Container maxWidth="sm" component="main">
          <div className="modalInner">
            <CloseIcon
              className="CloseModelIcon"
              onClick={() => CloseModal()}
            />
            <form onSubmit={this.handleSubmit}>
            <h2>Enter Amount</h2>
            <TextField
              id="outlined-full-width"
              label="Enter Amount"
              placeholder="Enter Amount"
              helperText=""
              fullWidth
              value={this.state.paymentdat.amount}
              onChange={this.handleChangeAmount}
              name="amount"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
            <Button
              style={{ marginTop: 8 }}
              type="submit"
              variant="contained"
              color="primary"
            onClick={() => {CloseModal()}}
            >
              Save Payment
            </Button>
            </form>
          </div>
        </Container>
      </div>
    );
  }
}

export default ModalPayment;
