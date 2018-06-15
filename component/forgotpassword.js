import React, { Component } from 'react';
import { View,ScrollView, Text,TextInput, AsyncStorage, TouchableHighlight, Image,Keyboard } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { Col, Row, Grid } from "react-native-easy-grid";


import styles from '../css/style';
import { NavigationActions } from 'react-navigation'

import { fetchapi } from '../config/functions';

export default class Forgotpassword extends Component{
    
    state = {
        email:'',
        password:''
    }

    forgot(navigate){
        if(this.state.email != ''){
            Keyboard.dismiss();
            fetchapi({ 
                app: 'janmo',
                module: 'forgotpassword',
                mobile:this.state.email
            })
            .then(response => {
                if(response.data[0].status == 1){
                    Toast.show('New Password Sent to Mobile No.');
                    setTimeout(() => {
                        navigate('Login');
                    }, 3000);
                }else{
                    Toast.show('Mobile not Found');
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
                        <Icon name="user"  style={styles.loginicon} />
                        <TextInput placeholder="Mobile Number" 
                            value={this.state.email}
                            keyboardType="numeric"
                            onChangeText={(text) => this.setState({ email : text})}
                            underlineColorAndroid='transparent'
                            style={styles.logininput}/>
                    </View>
                </View>
                </Form>
                <View>
                    <TouchableHighlight  onPress={() => this.forgot(navigate)} >
                        <Text style={styles.registerbtn}>SUBMIT</Text>
                    </TouchableHighlight>
                </View>
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

module.export = Forgotpassword;