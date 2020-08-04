import React,{useContext} from 'react';
import './App.css';
import Home from './components/Home'
import Login from "./components/Login";
import Error from './components/Error'
import Register from './components/Register'
import Logout from "./components/Logout";
import WorkersList from './components/WorkersList'
import Navbar from './components/Navbar'
import KilnInfoInput from './components/KilnInfoInput'
import KilnList from './components/KilnList'
import EditWorkerCompRe from './components/EditWorkerCompRe'
import ModalPayment from './components/ModalPayment'
import {BrowserRouter as Router,Route,Switch, HashRouter} from 'react-router-dom'
import Alert from '@material-ui/lab/Alert'
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { myContext } from "./context";



function App() {
  const [open, setOpen] = React.useState(true);
  const {alertData} = useContext(myContext)
  const alert = alertData ? <Collapse in={open}><Alert
   action={
     <IconButton
       aria-label="close"
       color="inherit"
       size="small"
       onClick={() => {
         setOpen(false);
       }}
     >
       <CloseIcon fontSize="inherit" />
     </IconButton>
   }
   severity={alertData.type} >
  {alertData.msg}
 </Alert></Collapse> : null;

  return (
    <div className="App">
      <HashRouter>
      <Navbar/>
      {alert}
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/workers/:id" component={EditWorkerCompRe} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path='/kiln' component={KilnInfoInput}/>
          <Route exact path='/workers' component={WorkersList}/>
          <Route exact path='/kilnlist' component={KilnList}/>
          <Route  component={Error} />
        </Switch>
        <ModalPayment/>
      
      </HashRouter>
    </div>
  );
}

export default App;
