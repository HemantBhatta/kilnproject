import React, { useContext } from "react";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import Logout from "./components/Logout";
import WorkersList from "./components/WorkersList";
import WorkersInfoInput from "./components/WorkersInfoInput";
import Navbar from "./components/Navbar";
import KilnInfoInput from "./components/KilnInfoInput";
import KilnList from "./components/KilnList";
import EditWorkerCompRe from "./components/EditWorkerCompRe";
import ModalPayment from "./components/ModalPayment";
import NgosList from "./components/NgosList";
import { Route, Switch, HashRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import { Element } from "react-scroll";

import { myContext } from "./context";

function App() {
  const { alertData, isSuperUser, AlertFunc } = useContext(myContext);
  const alert = alertData ? (
    <Collapse in={true}>
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              AlertFunc(null)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={alertData.type}
      >
        {alertData.msg}
      </Alert>
    </Collapse>
  ) : null;

  const super_user_routes = isSuperUser() ? (
    <Route exact path="/workers/:id/" component={EditWorkerCompRe} />
  ) : null;

  return (
    <div className="App">
      <HashRouter>
        <Element name="Home">
          <Navbar />
        </Element>

        {alert}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/inputnewworker" component={WorkersInfoInput} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/kiln" component={KilnInfoInput} />
          <Route exact path="/workers" component={WorkersList} />
        
          <Route exact path="/ngos" component={NgosList} />
          <Route exact path="/kilnlist" component={KilnList} />
          {super_user_routes}
          <Route component={Error} />
        </Switch>
        <ModalPayment />
      </HashRouter>
    </div>
  );
}

export default App;
