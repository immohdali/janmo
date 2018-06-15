import React, { Component } from 'react';
import { DrawerNavigator } from 'react-navigation';
import Home from './component/home';
import Listing from './component/listing';

const AppDrawer = DrawerNavigator({
  Home: { 
    screen: Home
  },
  Listing: { 
    screen: Listing
  }
});

export default AppDrawer;
