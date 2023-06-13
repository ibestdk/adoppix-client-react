import React from 'react';
import { Outlet } from 'react-router';
import { ChatList } from '../../../components/chat/ChatList';
import Navigation from '../../navigation/navigation.component';


const WithNav = () => {
    return (
        <div>
        <Navigation />
        <ChatList/>
        <Outlet />
      </div>
    );
  };
  
  export default WithNav;
  ``