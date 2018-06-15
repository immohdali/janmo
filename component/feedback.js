import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, Platform, Keyboard, TextInput, Picker, Dimensions  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab, Button } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Feedback extends Component{

    state = { 
        connection:true,
        userid:0,
        name:'',
        mobile:'',
        message:''
    };

    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                }, () => this._profileapi(userid))
            }
        });  
    }

    redirecthome(navigate){
        let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
        const resetAction = navaction.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Home'})
        ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    _profileapi(userid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'myprofile',
                userid:userid
            })
            .then(response => this.setState({
                name:response.data[0].basic.name,
                mobile:response.data[0].basic.mobile
            }));
        }
    }

    submit(){
        if(this.state.name != ''){
            if(this.state.mobile != ''){
                if(this.state.message != ''){
                    Keyboard.dismiss();
                    fetchapi({ 
                        app: 'janmo',
                        module: 'feedback',
                        userid:this.state.userid,
                        name:this.state.name,
                        mobile:this.state.mobile,
                        message:this.state.message
                    })
                    .then(response => {
                        if(response.data[0].status == 1){
                            Toast.show('Feedback Successfully Sent')
                            this.props.navigation.navigate('Home');
                        }
                    });
                }else{
                    Toast.show('Message is required')
                }
            }else{
                Toast.show('Mobile is Password')
            }
        }else{
            Toast.show('Name is required')
        }
    }

    _replaceSpace(str) {
        return str.replace(/\u0020/, '\u00a0')
    }

    render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
            <Content style={{backgroundColor:'#fff'}}>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?55:50,paddingTop:(Platform.OS === 'ios')?20:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => this.redirecthome(navigate)} />
                        <Text style={{color:'#fff',fontSize:18}}>Feedback</Text>
                    </Row>
                </Col>
            </Grid>
            </View>
      
            <View style={{flex:1,padding:10}}>
                <Card>
                    <CardItem>
                    <Body>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>Name</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            value={this.state.name}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ name : newStr})
                                }
                            }}
                            style={[styles.changepassword]}
                            />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>Mobile</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            value={this.state.mobile}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ mobile : newStr})
                                }
                            }}
                            style={[styles.changepassword]}
                            />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>Message</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            value={this.state.message}
                            multiline = {true}
                            numberOfLines = {6}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ message : newStr})
                                }
                            }}
                            style={[styles.changepassword]}
                            />
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>

                
            </View>
            </Content>
            <Footer>
            <FooterTab>
                <Button style={{backgroundColor:'#12a9a0'}}
                    onPress={() => this.submit()}>
                    <Text style={{padding:10,fontWeight:'bold',color:'#fff',width:deviceWidth,textAlign:'center',fontSize:16}}
                    >SUBMIT</Text>
                </Button>
            </FooterTab>
            </Footer>
            </Container>
        );
    }

}


module.export = Feedback;