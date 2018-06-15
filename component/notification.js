import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, TouchableWithoutFeedback, FlatList, Platform, TextInput, Dimensions  } from 'react-native';
import { Container, Content, Drawer,Tab, Tabs, TabHeading,ScrollableTab , Card, CardItem, Body } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';

import Toast from 'react-native-simple-toast';
import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class NotificationList extends Component{

    state = { 
        connection:true,
        userid:0,
        refresh:0,
        notificationlistdata:[]
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
                }, () => this._notificationlistapi(userid))
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

    _notificationlistapi(userid){
        fetchapi({ 
            app: 'janmo',
            module: 'notificationlist',
            userid:userid
        })
        .then(response => this.setState({notificationlistdata: (response != null)?response.data:null}));
      }

    _renderItem = ({item}) => {
        if(item.id){
            return(
                <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate(item.link, { id: item.toid })}>
                <Card style={{marginLeft:10,marginRight:10}}>
                    <CardItem>
                    <Body>
                        <Text style={{fontWeight:'bold'}}>{item.title}</Text>
                        <Text>
                            {item.content}
                        </Text>
                    </Body>
                    </CardItem>
                </Card>
                </TouchableWithoutFeedback>
            );
          }else{
            return(
                <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',height:100,alignItems: 'center'}}>
                    <Text style={{fontSize:20,color:'#e14c5d'}}>No Notification Found</Text>
                </View>
            )
        }
    }
    
    render(){
        const { navigate } = this.props.navigation;
        return(
            
            <Container>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?55:50,paddingTop:(Platform.OS === 'ios')?20:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => this.redirecthome(navigate)} />
                        <Text style={{color:'#fff',fontSize:18}}>Notification</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <FlatList
                data={this.state.notificationlistdata}
                initialNumToRender={10}
                keyExtractor={(item, index) => (item.id ? item.id : "0")}
                renderItem={this._renderItem}
                />           
            </Container>
        );
    }
}

module.export = NotificationList;