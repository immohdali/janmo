import React, { Component } from 'react';
import { View, Text, Image, NetInfo, AsyncStorage, Picker, Platform, Dimensions, FlatList  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Membershipbox from './membershipbox';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Membership extends Component{

    state = { 
        connection:true,
        userid:0,
        plandata:[]
    };

    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                })
            }
        });  
        AsyncStorage.getItem('membership_plan', (err, membership_plan) => { 
            if(membership_plan !== null){
                this.setState({
                    membership_plan : membership_plan
                }, () => this.planapi(membership_plan))
            }
        });
    }

    planapi(membership_plan){
        fetchapi({ 
            app: 'janmo',
            module: 'plans',
            membership_plan:membership_plan
        })
        .then(response => {
            this.setState({plandata: response.data})
        })
        .catch((error)=>{ });
    }

    _renderItem = ({item}) => {
        if(item.id){
            return(
               <Membershipbox data={item} navigation={this.props.navigation} />
            )
        }
    }

   render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
            <Image source={require('../img/membershipbg.jpg')} style={styles.dollibg} />
            <Content>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?55:50,paddingTop:(Platform.OS === 'ios')?20:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => goBack()} />
                        <Text style={{color:'#fff',fontSize:18}}>Membership Plan</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <View>
                
                <View style={{backgroundColor:'rgba(210, 59, 112, 0.8)',position:'relative',padding:10}}>
                    <Text style={{fontSize:24,color:'#fff',textAlign:'center',fontWeight:'bold',marginBottom:5}}>Membership Plan</Text>
                    <Text style={{fontSize:13,color:'#fff',textAlign:'center',lineHeight:18}}>Welcome to 7janmokabandan.com! We are a leading Indian Matrimonial Matchmaking Service Provider.</Text>
                </View>


                <FlatList
                data={this.state.plandata}
                initialNumToRender={10}
                keyExtractor={(item, index) => (item.id ? item.id : "0")}
                renderItem={this._renderItem}
                />

            </View>
            </Content>
            </Container>
        );
    }
}

module.export = Membership;