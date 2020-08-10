import React, { useContext,useState } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { myContext } from "../context";

const ModalPayment = () => {

  const paymentdat = {
        amount:'',
        timeofpay:'',
        amountpayer:''
  }

  const [paymentData,setPaymentData] = useState(paymentdat)
  const [amount,setAmount] = useState('')
  const { CloseModal, ModalStatus ,ModalData} = useContext(myContext);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
    
  }





  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentdata = {amount:amount,timeofpay:new Date().toLocaleDateString(),amountpayer:'hemant'}
    setPaymentData(paymentdata)

  }
  


  return (
    <div className={ModalStatus ? "modalOverlay" : "hideModal"}>
      <Container maxWidth="sm" component="main">
        <div className="modalInner">
          <CloseIcon className="CloseModelIcon" onClick={()=>CloseModal()}/>
          <h2>Enter Amount</h2>
          <TextField
            id="outlined-full-width"
            label="Enter Amount"
            placeholder="Enter Amount"
            helperText=""
            fullWidth
            value={amount}
            onChange={handleChangeAmount}
            name='amount'
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
            onClick={()=>{handleSubmit();CloseModal()}}
            >
            Save Payment
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ModalPayment;
