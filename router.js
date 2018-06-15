import React, { Component } from 'react';
import {  AppRegistry, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Splash from './component/splash';
import Login from './component/login';
import Register from './component/register';
import Forgotpassword from './component/forgotpassword';
import Home from './component/home';
import Details from './component/details';
import Profile from './component/profile';
import Partnerprofile from './component/partnerprofile';
import Search from './component/search';
import Searchresult from './component/searchresult';
import Shortlist from './component/shortlist';
import Interested from './component/interested';
import Chat from './component/chatlist';
import ChatView from './component/chatview';
import Membership from './component/membership';
import Changepassword from './component/changepassword';
import Invitation from './component/invitation';
import Notificationlist from './component/notification';

const AppRouter = StackNavigator({
  Splash: { 
    screen: Splash,
    navigationOptions : { header: null }
  },
  Login: { 
    screen: Login,
    navigationOptions : { header: null }
  },
  Register: { 
    screen: Register,
    navigationOptions : { header: null }
  },
  Forgotpassword: { 
    screen: Forgotpassword,
    navigationOptions : { header: null }
  },
  Home: { 
    screen: Home,
    navigationOptions : { header: null }
  },
  Details: { 
    screen: Details,
    navigationOptions : { header: null }
  },
  Profile: { 
    screen: Profile,
    navigationOptions : { header: null }
  },
  Partnerprofile: { 
    screen: Partnerprofile,
    navigationOptions : { header: null }
  },
  Search: { 
    screen: Search,
    navigationOptions : { header: null }
  },
  Searchresult: { 
    screen: Searchresult,
    navigationOptions : { header: null }
  },
  Shortlist: { 
    screen: Shortlist,
    navigationOptions : { header: null }
  },
  Interested: { 
    screen: Interested,
    navigationOptions : { header: null }
  },
  Chat: { 
    screen: Chat,
    navigationOptions : { header: null }
  },
  ChatView: { 
    screen: ChatView,
    navigationOptions : { header: null }
  },
  Membership: { 
    screen: Membership,
    navigationOptions : { header: null }
  },
  Changepassword: { 
    screen: Changepassword,
    navigationOptions : { header: null }
  },
  Invitation: { 
    screen: Invitation,
    navigationOptions : { header: null }
  },
  Notification: { 
    screen: Notificationlist,
    navigationOptions : { header: null }
  },
}, {
   initialRouteName: 'Splash',
});

export default AppRouter;