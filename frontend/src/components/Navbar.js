import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { NavLink as RouteNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import logoblog from './logoblog.jpg';

import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink
  } from './NavbarElements';
  

  
const Navbar = ({ logout, isAuthenticated }) => {
    const [redirect, setRedirect] = useState(false);

    const logout_user = () => {
        logout();
        setRedirect(true);
    };

    const guestLinks = () => (
        <Fragment>
          <NavMenu>
            <NavLink to='/' activeStyle>
              Home
            </NavLink>

            <NavLink to='/Allblog' activeStyle>
              Blog
            </NavLink>
            <NavLink to='/signup' activeStyle>
              Sign Up
            </NavLink>
    
          <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
        </NavMenu>
        </Fragment>
    );

    const authLinks = () => (  

      <NavMenu>
        <NavLink to='/blog' activeStyle>
        AllBlog
      </NavLink>
      <NavLink to='/createblog' activeStyle>
        CreateBlog
      </NavLink>
      

     
      <NavBtn>
        <NavBtnLink to='/'  onClick={logout_user}>LogOut</NavBtnLink>
      </NavBtn>
      </NavMenu>
        
    );

    return (
        <Fragment>
            <Nav>
            <img src={logoblog} alt="" width="120" height="60"/>
   
        {isAuthenticated ? authLinks() : guestLinks()}           
            </Nav>
            {redirect ? <Redirect to='/' /> : <Fragment></Fragment>}
        </Fragment>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.authreducer.isAuthenticated
});

export default connect(mapStateToProps, { logout})(Navbar);
