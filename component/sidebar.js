import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Image, AsyncStorage, Platform  } from 'react-native';
import { Container, Content, List,ListItem } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';

import SideBar from './sidebar';

import { fetchapi } from '../config/functions';
import global from '../config/global';

import styles from '../css/style';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Sidebar extends Component{

    state = { 
        connection:true,
        userid:0,
        name:'',
        photo:'',
        packagesactive:0
    };

    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                }, () => this._profileapi(userid))
            }
        });
        this._pacakagesactiveapi();
    }

    _pacakagesactiveapi(){
        fetchapi({ 
            app: 'janmo',
            module: 'packagesactive'
        })
        .then(response => 
            this.setState({ packagesactive : 1
                //response.data[0].status 
            })
        )
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
                photo:response.data[0].basic.photo,
            }));
        }
    }

    packagesactive(navigate){
        if(this.state.packagesactive == 1){
        return(
            <ListItem onPress={() => navigate('Membership')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                <Icon name="list-ul" style={styles.sidebaricon} />
                <Text style={styles.sidebartext}>Packages</Text>
            </ListItem>
        )
        }
    }
    
    redirecthome(navigate){
        let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
            const resetAction = navaction.reset({
        index: 0,
        actions: [
            NavigationActions.navigate({ routeName: 'Home' })
        ]
        })
        this.props.navigation.dispatch(resetAction);
    }
   
    logout(navigate){
        AsyncStorage.removeItem('userplan');
        AsyncStorage.removeItem('userid',() =>{
            let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
            const resetAction = navaction.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'})
            ]
            })
            this.props.navigation.dispatch(resetAction)
        });
    }

    mylinks(navigate){
        if(this.state.userid != 0){
            return(
                <View>
                    <ListItem onPress={() => navigate('Profile')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="user" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Profile</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Chat')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                    <Icon name="comment" style={styles.sidebaricon} />
                    <Text style={styles.sidebartext}>Chats</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Shortlist')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                    <Icon name="check-square" style={styles.sidebaricon} />
                    <Text style={styles.sidebartext}>Shortlist</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Invitation')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                    <Icon name="random" style={styles.sidebaricon} />
                    <Text style={styles.sidebartext}>Invitations</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Changepassword')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="key" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Change Password</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Feedback')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="envelope" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Feedback </Text>
                    </ListItem>
                    <ListItem onPress={() => this.logout(navigate)} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="sign-out" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Logout</Text>
                    </ListItem>
                </View>
            )
        }else{
            return(
                <View>
                    <ListItem onPress={() => navigate('Login')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="sign-in" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Login</Text>
                    </ListItem>
                    <ListItem onPress={() => navigate('Register')} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="user-plus" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Register</Text>
                    </ListItem>
                </View>
            )
        }
    }

    singleimage(){
        photo =  (this.state.photo != '')?this.state.photo:'images/avatar-default.png';
        return(
            <Image source={{ uri: global.BASE_URL + photo}}
                    square
                    style={{ height: 100, width: 100, borderRadius:50 }}/>
        )
    }

   

    render(){
        const { navigate } = this.props.navigation;
        return(
            <Container>
            <Content style={{backgroundColor:'#fff'}}>
                <View style={{backgroundColor:'#102038',padding:10,alignItems:'center',borderBottomWidth:1,borderBottomColor:'grey',paddingTop:(Platform.OS === 'ios')?20:10}}>
                {this.singleimage()}
                <View style={{flex:1,flexDirection:'row',marginTop:10}}>
                    <Text style={{color:'#fff'}}>Welcome </Text>
                    <Text style={{fontWeight:'bold',color:'#fff'}}>{this.state.name}</Text>
                </View>
                </View>
                <List>
                    <ListItem onPress={() => this.redirecthome(navigate)} style={{borderBottomColor:'#ccc',borderBottomWidth:1}}>
                        <Icon name="home" style={styles.sidebaricon} />
                        <Text style={styles.sidebartext}>Home</Text>
                    </ListItem>
                    {this.packagesactive(navigate)}
                    {this.mylinks(navigate)}
                    
                </List>
            </Content>
          </Container>
       );
    }
}

module.export = Sidebar;