import React, { Component } from 'react';
import { View,ScrollView, Text,TextInput, AsyncStorage, Platform, TouchableHighlight, Image,Keyboard } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { Col, Row, Grid } from "react-native-easy-grid";
//import FCM, {FCMEvent} from 'react-native-fcm';

import styles from '../css/style';
import { StackActions, NavigationActions } from 'react-navigation'

import { fetchapi } from '../config/functions';

export default class Login extends Component{
    
    state = {
        email:'',
        password:'',
        fcmtoken:''
    }

    componentDidMount(){
        //this.getusertoken()
    }
     /* Firebase NOtification Code Start */

   /*getusertoken() {
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            this.setState({
                fcmtoken:token
            })
            //console.warn(token)
        });
    } /**/
    
    /* Firebase NOtification Code Start */

    login(navigate){
        if(this.state.email != '' && this.state.password != ''){
            Keyboard.dismiss();
            fetchapi({ 
                app: 'janmo',
                module: 'login',
                email:this.state.email,
                password:this.state.password,
                fcmtoken:this.state.fcmtoken
            })
            .then(response => {
                if(response.data.status == "1"){
                    let gender = (response.data.data.membership_plan == 'Female')?0:1;
                    AsyncStorage.setItem('email',String(response.data.data.email));
                    AsyncStorage.setItem('userid',String(response.data.data.id));
                    AsyncStorage.setItem('userplan',String(response.data.data.membership_plan));
                    AsyncStorage.setItem('membership_plan',String(response.data.data.membership_plan));
                    AsyncStorage.setItem('usertype',String(gender));
                    let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
                    const resetAction = navaction.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Home'})
                    ]
                    })
                    this.props.navigation.dispatch(resetAction);
                }else{
                    Toast.show('Incorrect Email Id or Password');
                }
            });
        }else{
            Toast.show('All Fields are required');
        }
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Container>
                <Image source={require('../img/bgscreen.jpg')} style={styles.backgroundImage2} />
                <Content>
                
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                    <Image source={require('../img/logo.png')} style={styles.logo} />
                </View>
                <View style={styles.lgbody}>
             
                <Form>
                <View>
                    <View style={styles.searchSection}>
                        <Icon name="envelope"  style={styles.loginicon} />
                        <TextInput placeholder="Email ID / Mobile No." 
                            value={this.state.email}
                            onChangeText={(text) => this.setState({ email : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                    <View style={styles.searchSection}>
                        <Icon name="key" size={30} style={styles.loginicon} />
                        <TextInput placeholder="Password " secureTextEntry={true}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ password : text})}
                            style={styles.logininput}/>
                    </View>
                </View>
                </Form>
                <View style={styles.signin}>
                    <TouchableHighlight  onPress={() => this.login(navigate)} >
                        <Text style={styles.loginbtn}>LOGIN</Text>
                    </TouchableHighlight>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',marginTop:10,marginLeft:20}}>
                    <Text style={styles.loginfooterlink}
                    onPress={() => navigate('Register')}>REGISTER</Text>
                    <Text style={[styles.loginfooterlink,{color:'red'}]} 
                    onPress={() => navigate('Forgotpassword')}>FORGOT PASSWORD?</Text>
                </View>
                </View>
                </Content>
            </Container>
        );
    }
}

module.export = Login;