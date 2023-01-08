import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../../navigation/navigation.component';


const WithNav = () => {
    return (
        <div>
        <Navigation />
        <Outlet />
      </div>
    );
  };
  
  export default WithNav;
  