import React, { Component } from 'react';
import { View,ScrollView, Text,TextInput,Dimensions,AsyncStorage, Platform, TouchableOpacity,TouchableHighlight, Image, Keyboard } from 'react-native';
import { Container, Header, Content, Picker, Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { Col, Row, Grid } from "react-native-easy-grid";


import styles from '../css/style';
import {  StackActions, NavigationActions } from 'react-navigation'

import { fetchapi } from '../config/functions';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Register extends Component{
    
    state = {
        email:'',
        mobile:'',
        password:'',
        otp:'',
        screen:0,
        gender:'Male'
    }

    register(navigate){
        if(this.state.email != '' && this.state.password != ''){
            Keyboard.dismiss();
            let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(reg.test(this.state.email) === false)
            {
                Toast.show('Invalid Email Id');
            }
            else {
                fetchapi({ 
                    app: 'janmo',
                    module: 'register',
                    email:this.state.email,
                    mobile:this.state.mobile,
                    gender:this.state.gender,
                    password:this.state.password
                })
                .then(response => {
                    if(response.data[0].status == '1'){
                        Toast.show('OTP sent to your mobile');
                        this.setState({
                            screen:1
                        });

                        //Toast.show('Your Account Successfully Created');
                        /*setTimeout(() => {
                            const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login'})
                            ]
                            })
                            this.props.navigation.dispatch(resetAction);
                        }, 3000);*/
                    }else{
                        Toast.show('Email id already Exists');
                    }
                });
            }
            
        }else{
            Toast.show('All Fields are required');
        }
    }

    otp(navigate){
        if(this.state.mobile != ''){
            Keyboard.dismiss();
            fetchapi({ 
                app: 'janmo',
                module: 'otp',
                mobile:this.state.mobile,
                otp:this.state.otp
            })
            .then(response => {
                if(response.data.status == '1'){
                    let gender = (response.data.data.membership_plan == 'Female')?0:1;
                    AsyncStorage.setItem('email',String(response.data.data.email));
                    AsyncStorage.setItem('userid',String(response.data.data.id));
                    AsyncStorage.setItem('userplan',String(response.data.data.membership_plan));
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
                    Toast.show('OTP does not Match');
                }
            });

        }else{
            Toast.show('All Fields are required');
        }
    }


    bodypart(navigate){
        if(this.state.screen == 0){
            return(
                <View style={styles.loginbody}>
                <Form>
                <View>
                    <View style={styles.searchSection}>
                        <Icon name="envelope"  style={styles.loginicon} />
                        <TextInput placeholder="Email ID" 
                            onChangeText={(text) => this.setState({ email : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                    <View style={styles.searchSection}>
                        <Icon name="mobile"  style={[styles.loginicon,styles.mobileicon]} />
                        <TextInput placeholder="Mobile" 
                            keyboardType="numeric"
                            onChangeText={(text) => this.setState({ mobile : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',borderBottomWidth:1,borderBottomColor:'#ddd'}}>
                    <Icon name="venus-mars"  style={[styles.loginicon,styles.mobileicon,{fontSize:20,marginTop:4}]} />
                        <Picker selectedValue={this.state.gender}
                         style={{
                         height:35,marginLeft:deviceWidth*16/100,
                         width:deviceWidth*40/100}}
                            onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue})} >
                            <Picker.Item value={'Male'} label={'Male'} />
                            <Picker.Item value={'Female'} label={'Female'} />
                        </Picker>
                    </View>
                    <View style={styles.searchSection}>
                        <Icon name="key" size={30} style={styles.loginicon} />
                        <TextInput placeholder="Password " secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                </View>
                </Form>
                <View>
                    <TouchableHighlight  onPress={() => this.register(navigate)} >
                        <Text style={styles.registerbtn}>REGISTER</Text>
                    </TouchableHighlight>
                </View>
                </View>
            )
        }else{
            return(
                <View style={styles.loginbody}>
                <Form>
                <View>
                   <View style={styles.searchSection}>
                        <Icon name="mobile"  style={[styles.loginicon,styles.mobileicon]} />
                        <TextInput placeholder="OTP" 
                            keyboardType="numeric"
                            value={this.state.otp}
                            onChangeText={(text) => this.setState({ otp : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                </View>
                </Form>
                <View>
                    <TouchableHighlight  onPress={() => this.otp(navigate)} >
                        <Text style={styles.registerbtn}>SUBMIT</Text>
                    </TouchableHighlight>
                </View>
                </View>
            )
        }
    }
    
    /*
    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../img/logo.png')} style={styles.logo} />
    </View>
    */
    render(){
        const { navigate } = this.props.navigation;
        return(
            <Container>
                <Image source={require('../img/bgscreen.jpg')} style={styles.backgroundImage2} />
                <Content>
                
                <View style={[styles.lgbody,{marginTop:deviceHeight*32/100}]}>
                
                {this.bodypart(navigate)}
               
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',marginTop:10,marginLeft:20}}>
                    <Text style={{fontSize:13,fontWeight:'bold',marginRight:20}}
                    onPress={() => navigate('Login')}>LOGIN</Text>
                </View>
                </View>
                </Content>
            </Container>
        );
    }
}

module.export = Register;