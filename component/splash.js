import React, { Component } from 'react';
import { Image, View, Text, AsyncStorage, Platform } from 'react-native';
import { Container, Content, } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation'

import styles from '../css/style';
export default class Splash extends Component{
 
  redirect(){
    setTimeout(() => {
      AsyncStorage.getItem('userid', (err, result) => { 
          if(result == null){
            let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
            const resetAction = navaction.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: 'Login'})
              ]
              })
              this.props.navigation.dispatch(resetAction);    
          }else{
            let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
            const resetAction = navaction.reset({
              index: 0,
              actions: [
                  NavigationActions.navigate({ routeName: 'Home'})
              ]
              })
              this.props.navigation.dispatch(resetAction);
          }
      });        
    }, 1000);
  }

  render() {
    return (
      <Container>
      <Image source={require('../img/bgscreen.jpg')} style={styles.backgroundImage2} />
      <Content>
        <View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <Image source={require('../img/logo-300.png')} style={styles.splashlogo} />
        </View>
          {this.redirect()}
        </View>
      </Content>
      </Container>
    );
  }
};

module.export = Splash;