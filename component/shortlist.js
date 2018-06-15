import React, { Component } from 'react';
import { View, Text, Image, NetInfo, AsyncStorage, Platform  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Profilelist from './profilelist';

export default class Shortlist extends Component{

    state = { 
        connection:true,
        userid:0
    };

    componentDidMount(){

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

   render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?55:50,paddingTop:(Platform.OS === 'ios')?20:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => this.redirecthome(navigate)} />
                        <Text style={{color:'#fff',fontSize:18}}>Shortlist</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <Profilelist tab={4} navigation={this.props.navigation}/>
           
            </Container>
        );
    }
}

module.export = Shortlist;