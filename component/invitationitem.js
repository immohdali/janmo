import React, { Component } from 'react';
import { View, Text, Image, NetInfo, AsyncStorage, FlatList, TouchableWithoutFeedback  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import Profilelist from './profilelist';

export default class Shortlist extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            connection:true,
            userid:0,
            invitation : (this.props.data)?this.props.data:[],
            tab : (this.props.tab)?this.props.tab:0,
            refresh:0
        }
    }


    componentDidMount(){
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                }, () =>  this.invitationapi())
            }
        });  
    }

    
    invitationapi(){
        fetchapi({ 
            app: 'janmo',
            module: 'profilelist',
            tab:this.state.tab,
            userid:this.state.userid
        })
        .then(response => this.setState({invitation: response.data})
        );
    }

    imageview(photo){
        if(photo != ''){
          return(
            <Image source={{ uri: global.BASE_URL + photo }}
            style={styles.profilelistphoto}/>
          )
        }else{
          return(
            <Image source={require('../img/avatar-default.png')}
            style={styles.profilelistphoto}/>
          )
        }
    }


    connectreply(toid,reply){
        fetchapi({ 
            app: 'janmo',
            module: 'connectreply',
            toid:toid,
            userid:parseInt(this.state.userid),
            reply:reply,
            tab:1
        })
        .then(response =>{
            if(reply == 1){
                Toast.show('Invitation Accepted Successfully');
                this.invitationapi()
            }else{
                Toast.show('Invitation Declined Successfully');
                this.invitationapi()
            }
            
        });
    }

    options(item){
        if(this.state.tab == 6)
        return(
            <Grid style={{backgroundColor:'#12a9a0',padding:5}}>
                <Col size={1} onPress={() => this.connectreply(item.id,1)}>
                    <Row style={styles.profilelistsmallbox}>
                    <Icon name="check" style={[styles.profilelisticon,{fontSize: 16,padding:2,paddingLeft:3,paddingRight:3,color:'#12a9a0',backgroundColor:'#fff'}]}/>
                    <Text style={styles.profilelistboxtext}>Accept</Text>
                    </Row>
                </Col>
                <Col size={1} onPress={() => this.connectreply(item.id,2)}>
                    <Row style={styles.profilelistsmallbox}>
                    <Icon name="times" style={[styles.profilelisticon,{fontSize: 16,padding:2,paddingLeft:4,paddingRight:4,color:'#12a9a0',backgroundColor:'#fff'}]}/>
                    <Text style={styles.profilelistboxtext}>Reject</Text>
                    </Row>
                </Col>
            </Grid>
        )
    }

    _renderItem = ({item}) => {
        if(item.id){
            return(
                <View style={{marginBottom:20,padding:10}}>
                    <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate('Details', { id: item.id })} >
                    {this.imageview(item.photo)}
                    </TouchableWithoutFeedback>
                    <View style={{marginTop:-100,height:(this.state.tab == 6)?'auto':100,backgroundColor: 'rgba(0,0,0,0.5)',}}>
                    <Grid>
                    <Col size={1.5}>
                        <Row><Text style={styles.profilelisttext}>{item.name}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.age} Years / {item.height}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.religion}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.city}</Text></Row>
                    </Col>
                    <Col size={1}>
                        <Row><Text style={styles.profilelisttext}>{item.occupation}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.annual_income}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.education}</Text></Row>
                        <Row><Text style={styles.profilelisttext}>{item.state}</Text></Row>
                    </Col>
                    </Grid>
                    {this.options(item)}
                    </View>
                </View>
            )}else{
            return(
                <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',height:100,alignItems: 'center'}}>
                    <Text style={{fontSize:20,color:'#e14c5d'}}>No Profile Found</Text>
                </View>
            )}
        }

    
   

   render(){
        const { navigate, goBack } = this.props.navigation;
        let item = this.state.invitation;
        return(
            <FlatList
            data={this.state.invitation}
            initialNumToRender={10}
            keyExtractor={(item, index) => (item.id ? item.id : "0")}
            renderItem={this._renderItem}
            />
        );
    }
}

module.export = Shortlist;