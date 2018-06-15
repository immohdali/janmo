import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, TextInput, Dimensions  } from 'react-native';
import { Container, Content, Drawer,Tab, Tabs, TabHeading,ScrollableTab  } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Header from './header';
import SideBar from './sidebar';
import Profilelist from './profilelist';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Home extends Component{

    state = { 
        connection:true,
        userid:0,
        usertype:0
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
                }, () => this.updatemembershiptype(userid) )
            }else{
                this.props.navigation.navigate('Login');
            }
        });  
        AsyncStorage.getItem('usertype', (err, usertype) => { 
            if(usertype !== null){
                this.setState({
                    usertype : usertype
                })
            }
        });  
    }

    updatemembershiptype(userid) {
        fetchapi({
            app: 'janmo',
            module: 'updatemembershiptype',
            userid: userid
        }).then(response => {
            AsyncStorage.setItem('membership_plan', String(response.data.data.membership_plan));
        })
    }

    closeDrawer(){
        this.drawer._root.close()
    };

    openDrawer(){
        this.drawer._root.open()
    };
    
    render(){
        const { navigate } = this.props.navigation;
        return(
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar navigation={this.props.navigation} />}
                onClose={() => this.closeDrawer()} >
            <Container>
            <Header navigation={this.props.navigation} openDrawerheader={this.openDrawer.bind(this)}/>
            <Tabs renderTabBar={()=> <ScrollableTab 
                underlineStyle={{backgroundColor: '#fff'}} />}>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Icon name="users" style={{color:'#fff'}} />
                            <Text style={{color:'#fff',marginLeft:10}}>My Matches</Text>
                        </TabHeading>}>
                <Profilelist tab={1} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Icon name="map-marker" style={{color:'#fff'}} />
                            <Text style={{color:'#fff',marginLeft:10}}>Near Me</Text>
                        </TabHeading>}>
                <Profilelist tab={2} navigation={this.props.navigation}/>
            </Tab>
            <Tab heading={ <TabHeading style={{backgroundColor:'#c22127'}}>
                            <Icon name="eye" style={{color:'#fff'}} />
                            <Text style={{color:'#fff',marginLeft:10}}>Recently Viewed</Text>
                        </TabHeading>}>
                <Profilelist tab={3} navigation={this.props.navigation}/>
            </Tab>
            </Tabs>
           
            </Container>
            </Drawer>
        );
    }
}

module.export = Home;