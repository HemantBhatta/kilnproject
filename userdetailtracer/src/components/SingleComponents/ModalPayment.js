import React from "react";
import { TextField, Container, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { myContext } from "../../context";
import Axiosapi from './Axiosapi'
import { v4 as uuidv4 } from 'uuid';

const amounts  = {
  Fireman:5650,
  Moulder:7750,
  Transporter:7400,
  Others:5150
};

const dAmount = (ModalData) => {
  if( ModalData ){
    const amount = ModalData.extra && ModalData.extra.payment ?
       ModalData.extra.payment.amount : 
       amounts[ModalData.category];
      return amount;
  }
  return 0;
};

class ModalPayment extends React.Component {
  state = {
      valuea:this.context.ModalData,

      paymentdat: {
      amount:dAmount(this.context.ModalData),
      timeofpay: "",
      amountpayer:this.context.user && this.context.user.username
    }

  };


  handleChangeAmount = (e) => {
          const amount = e.target.value     
          this.setState({paymentdat:{...this.state.paymentdat,amount:amount }})
  };

  setUpdatedPayment = (worker) => {
    this.context.WorkerEditStatefunc(worker);
}

  handleSubmit = (e) => {
    e.preventDefault();

    const worker = this.context.ModalData;
    if (!worker.extra){
      worker.extra = {}
    }
    worker.extra.payment = {...this.state.paymentdat,amountpayer:this.context.user,timeofpay:new Date().toLocaleString(),pay_id:uuidv4()}
    const ModalDataId = this.context.ModalData.id


    if(navigator.onLine ){

      Axiosapi({
        method:'PUT',
        url:`workers/${ModalDataId}`,
        data:worker
      })
      .then(res=>{
        if (res.status === 200 && res.statusText === "OK") {
            this.setUpdatedPayment(worker);
        }
        this.context.CloseModal()

        })
        .catch((err) => {
          this.setState({})
          this.context.CloseModal()


      });

    } else {
      this.setUpdatedPayment(worker);
      this.context.WorkerEditPaymentFunc(
        worker
     );
     this.context.CloseModal()

   }



  };

  

    // componentDidUpdate(prevProps, prevState) {
    //   if (prevState.valuea !== this.state.valuea) {
    //     const data = this.context.sendModalData()
    //     console.log(data)
    //   }
    // }

  
  static contextType = myContext;
  render() {
    const { CloseModal, ModalStatus, ModalData, user,sendModalData } = this.context;
   
    return (
      <div className="modalOverlay">
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
