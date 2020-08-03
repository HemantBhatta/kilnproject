import React, { useContext } from "react";
import { TextField, Container, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { myContext } from "../context";

const ModalPayment = () => {
  const { CloseModal, ModalStatus } = useContext(myContext);
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
            onClick={()=>CloseModal()}
          >
            Save Payment
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ModalPayment;
