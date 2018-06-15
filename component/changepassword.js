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
export default class Profile extends Component{

    state = { 
        connection:true,
        userid:0,
        oldpassword:'',
        password:'',
        confirm:''
    };

    componentDidMount(){
        /*NetInfo.isConnected.fetch().then(
            isConnected => {
                this.setState({
                    connection:isConnected
                })    
            }
        )*/
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                })
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

    submit(){
        if(this.state.password != ''){
            if(this.state.password != ''){
                if(this.state.password == this.state.confirm){
                    Keyboard.dismiss();
                    fetchapi({ 
                        app: 'janmo',
                        module: 'changepassword',
                        userid:this.state.userid,
                        password:this.state.password,
                        oldpassword:this.state.oldpassword
                    })
                    .then(response => {
                        if(response.data[0].status == 1){
                            Toast.show('Password Successfully Updated')
                            this.props.navigation.navigate('Profile');
                        }else{
                            Toast.show('Old Password does not Match')
                        }
                    });
                }else{
                    Toast.show('Password does not Match')
                }
            }else{
                Toast.show('Incorrect Password')
            }
        }else{
            Toast.show('Old Password required')
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
                        <Text style={{color:'#fff',fontSize:18}}>Change Password</Text>
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
                            <Text style={styles.profileboxhead}>Old Password</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            value={this.state.oldpassword}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ oldpassword : newStr})
                                }
                            }}
                            style={[styles.changepassword]}
                            />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>New Password</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ password : newStr})
                                }
                            }}
                            style={[styles.changepassword]}
                            />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>Confirm Password</Text>
                            <TextInput
                            underlineColorAndroid='transparent'
                            secureTextEntry={true}
                            value={this.state.confirm}
                            onChangeText={(text) => {
                                if(text != ' '){
                                    let newStr = text.replace(/\s+/g, '');
                                    this.setState({ confirm : newStr})
                                }
                            }}
                            style={[styles.changepassword ]}
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

    
    getpickers(looplist){
        if(looplist != ''){
        return looplist.map((item, i) => {
            return <Picker.Item key={i} value={(item.id)?item.id:item.name} label={item.name} />
        });
        }
    }
}


module.export = Profile;