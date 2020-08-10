import React, { useContext } from "react";
import { AppBar, Button } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from 'react-router-dom'
import { myContext } from "../context";
import "../App.css";



const isAuthenticated = () => {
  const token = localStorage.getItem("item");
  return token && token.length > 10;
};

const Navbar = () => {
  const { mobileNav,CloseNavMenu,OpenNavMenu } = useContext(myContext);
  const isAlreadyAuthenticated = isAuthenticated();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className="nav">
          <div className="navLeft">
            <Typography edge="start" className="logoTitle" variant="h6">
            Global Fairness Initiative
            </Typography>
            <div className="burgerBar">
              { mobileNav ?  

              <MenuOpenIcon onClick= {()=>CloseNavMenu()}/>
            :
            <MenuIcon onClick= {()=>OpenNavMenu()}/>
}
            </div>
          </div>

          <div className={mobileNav ? 'navRight hide' : 'navRight' }>
            <Link to='/kilnlist'>
            <Button  className="loginButton">
              Kiln
            </Button>
            </Link>
            <Link to='/workers'>
            <Button  className="loginButton" >
              Workers
            </Button>
            </Link>
            <Link to='/ngos'>
            <Button  className="loginButton" >
              Ngos
            </Button>
            </Link>
            <div>
              {isAlreadyAuthenticated ? (
                <div>
                <span>
                   <Link to='/logout'>
                  <Button  className="loginButton">
                    Logout
                  </Button>
                  </Link>
                </span>
              </div>
              ) : (
                <span>
                   <Link to='/login'>
                  <Button  className="loginButton" variant="h6">
                    Login
                  </Button>
                  </Link>
                </span>
              )}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
