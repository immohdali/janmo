import React, { Component } from 'react';
import { Platform  } from 'react-native';
import AppRouter  from './router';
//import FCM, {FCMEvent} from 'react-native-fcm';

export default class Janmo extends Component{

  /*componentDidMount() {
    FCM.requestPermissions(); // for iOS
    FCM.getFCMToken().then(token => {
      console.log(token)
    });
    this.notificationListener = FCM.on(FCMEvent.Notification, async (notif) => {
        // optional, do some component related stuff
    });
    FCM.subscribeToTopic('/topics/foo-bar');
    FCM.unsubscribeFromTopic('/topics/foo-bar');
  }
  componentWillUnmount() {
    this.notificationListener.remove();
  }*/


  render(){
    return(
      <AppRouter />
    );
  }
}

//console.disableYellowBox = true;
module.export = Janmo;