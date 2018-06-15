import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, Platform, TextInput, Dimensions  } from 'react-native';
import { Container, Content, Drawer,Tab, Tabs, TabHeading,ScrollableTab  } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';

import Toast from 'react-native-simple-toast';
import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Header from './header';
import SideBar from './sidebar';
import Invitationitem from './invitationitem';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Invitation extends Component{

    state = { 
        connection:true,
        userid:0,
        refresh:0
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


    refresh(reply){
        if(reply == 1){
            Toast.show('Invitation Accepted Successfully');
        }else{
            Toast.show('Invitation Declined Successfully');
        }
        this.setState({
            refresh:1
        })
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
                        <Text style={{color:'#fff',fontSize:18}}>Invitation</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <Tabs renderTabBar={()=> <ScrollableTab 
                underlineStyle={{backgroundColor: '#fff'}} />}>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>Pending</Text>
                        </TabHeading>}>
                <Invitationitem tab={6} refresh={this.refresh.bind(this)} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>My Accepted</Text>
                        </TabHeading>}>
                <Invitationitem tab={7} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>My Declined</Text>
                        </TabHeading>}>
                <Invitationitem tab={8} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>Sent</Text>
                        </TabHeading>}>
                <Invitationitem tab={9} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>Accepted</Text>
                        </TabHeading>}>
                <Invitationitem tab={10} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Text style={{color:'#fff',marginLeft:10}}>Declined</Text>
                        </TabHeading>}>
                <Invitationitem tab={11} navigation={this.props.navigation}/>
            </Tab>
            </Tabs>
           
            </Container>
        );
    }
}

module.export = Invitation;