import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, Keyboard,AsyncStorage, TouchableWithoutFeedback, Platform, TextInput,Dimensions  } from 'react-native';
import { Container, Content, Button, Badge } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';

import styles from '../css/style';
import { StackActions, NavigationActions } from 'react-navigation';
import Share, {ShareSheet} from 'react-native-share';

import { fetchapi } from '../config/functions';

export default class Header extends Component{
    state = {
        search:'',
        sharelink:'',
        notificationcount:0
    }

    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                },() => this._notificationcount(userid))
            }
        });  
        {this._sharelink()}
    }

    _sharelink(){
        fetchapi({ 
            app: 'janmo',
            module: 'sharelink',
            platform:Platform.OS
        })
        .then(response =>  this.setState({
            sharelink:response.data[0].status
        }) );
    }


    _notificationcount(userid){
        fetchapi({ 
            app: 'janmo',
            module: 'notificationcount',
            userid:userid
        })
        .then(response => this.setState({
            notificationcount:response.data.status
        }) );
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

    userprofile(navigate){
        AsyncStorage.getItem('userid', (err, result) => { 
            if(result == null){
                navigate('Login');
            }else{
                navigate('Profile');
            }
        })
    }
    



    render(){
        let shareOptions = {
            title: "7 janmo ka bandhan",
            message: "Download 7 janmo ka bandhan matrimony App and Find your dream matches.",
            url: this.state.sharelink,
            subject: "Share Link" //  for email
        };
       
          
        const { navigate } = this.props.navigation;
        return(
            
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?70:50,paddingTop:(Platform.OS === 'ios')?20:5 }}>
            <Grid>
                <Col size={2}>
                    <Row style={{marginVertical:10}}>
                        <Icon name="bars" style={{fontSize: 20,width:40,color:'#fff'}} 
                        onPress={() => this.props.openDrawerheader()} />
                        <Image
                        style={{ height: 40, width: 40,marginTop:-10 }}
                        source={require('../img/logo.png')}
                        />
                    </Row>
                </Col>
                <Col size={1}>
                    <Row style={{marginVertical:10}}>
                        <Icon name="search" style={{fontSize: 20,width:24,fontWeight:'normal',color:'#fff',marginRight:20}}
                         onPress={() => navigate('Search')} 
                        />
                        
                        <Icon name="share-alt" style={{fontSize: 20,width:24,fontWeight:'normal',color:'#fff',marginRight:20}}
                        onPress={()=>{
                            Share.open(shareOptions);
                          }} />
                        
                        <Icon name="bell" style={{fontSize: 20,width:24,color:'#fff'}}
                        onPress={() => navigate('Notification')} />
                        {this.badge()}
                        
                        
                    </Row>
                </Col>
            </Grid>
            </View>
       );
    }

    badge(){
        if(this.state.notificationcount != 0){
            return <Badge style={{height:15,position:'relative',right:10}} 
            onPress={() => navigate('Notification')}>
                <Text style={{color:'#fff',fontSize:10}}>
                    {this.state.notificationcount}
                </Text>
            </Badge>
        }
    }
}

module.export = Header;