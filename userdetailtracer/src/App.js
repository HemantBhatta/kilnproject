import React, { useContext } from "react";
import "./App.css";

import Mycsv from './components/mycsv'

import Home from "./components/SingleComponents/Home";
import Login from "./components/SingleComponents/Login";
import Logout from "./components/SingleComponents/Logout";
import Register from "./components/SingleComponents/Register";
import Error from "./components/SingleComponents/Error";
import Navbar from "./components/SingleComponents/Navbar";
import ModalPayment from "./components/SingleComponents/ModalPayment";
import Spinner from './components/SingleComponents/Spinner'

import WorkersList from "./components/WorkerComponent/WorkersList";
import WorkersInfoInput from "./components/WorkerComponent/WorkersInfoInput";
import EditWorkerCompRe from "./components/WorkerComponent/EditWorkerCompRe";

import KilnInfoInput from "./components/KilnComponent/KilnInfoInput";
import KilnList from "./components/KilnComponent/KilnList";

import NgosList from "./components/SingleComponents/NgosList";
import NewSummary from './components/SingleComponents/NewSummary'

import { Route, Switch, HashRouter } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import {IconButton,Collapse} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { Element } from "react-scroll";
import { myContext } from "./context";

    const isAuthenticated = () => {
      const token = localStorage.getItem("item");
      return token && token.length > 10;
    };

function App() {
  const { alertData, isSuperUser, AlertFunc, user } = useContext(myContext);
  const isAlreadyAuthenticated = isAuthenticated();

  if(isAlreadyAuthenticated){
    if( !user )return <Spinner></Spinner>;
  }

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
          <Route exact path="/csv" component={Mycsv} />
          <Route exact path="/summary" component={NewSummary} />
          {super_user_routes}
          <Route component={Error} />
        </Switch>
        <ModalPayment />
      </HashRouter>
    </div>
  );
}



export default App;
