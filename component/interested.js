import React, { Component } from 'react';
import { View, Text, Image, NetInfo, AsyncStorage  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Profilelist from './profilelist';

export default class Interested extends Component{

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

   render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:50,paddingTop:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => goBack()} />
                        <Text style={{color:'#fff',fontSize:18}}>Interested</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <Profilelist tab={5} navigation={this.props.navigation}/>
           
            </Container>
        );
    }
}

module.export = Interested;