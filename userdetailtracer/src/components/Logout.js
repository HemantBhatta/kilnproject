import React from "react";
import { Link } from "react-router-dom";
import {Button} from '@material-ui/core'

const Logout = () => {
  localStorage.removeItem("item");

  return (
    <div className="logoutSection">
      <div className="logoutIn">
        <h2>You have been successfully logged out.</h2>

        <Link to="login">
          <Button variant="contained" color="primary">
            Login Again
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Logout;
