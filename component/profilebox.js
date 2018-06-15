import React, { Component } from 'react';
import { View, Text, Image, NetInfo, AsyncStorage, Dimensions, TouchableWithoutFeedback,Modal  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';

import FastImage from 'react-native-fast-image';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Shortlist extends Component{

    constructor(props) {
        super(props);
        this.state = { 
            connection:true,
            userid:0,
            membership_plan:0,
            data : (this.props.data)?this.props.data:[],
            connect:this.props.data.connect,
            shortlist:this.props.data.shortlist,
            contactview:false,
            contactdetails:[],
            refresh:0
        }
    }


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
                })
            }
        }); 
    }

    connect(toid,membership_plan){
        if(membership_plan <= this.state.membership_plan){
            fetchapi({ 
                app: 'janmo',
                module: 'connect',
                toid:toid,
                userid:this.state.userid
            })
            .then(response => {
                if(response.data[0].status == 1){
                    this.setState({
                        connect:'Sent'
                    })
                    Toast.show('Invitation Successfully Sent')
                }else{
                    Toast.show('Please Upgrade your Plan')
                    this.props.navigation.navigate('Membership')
                }
            })
        }else{
            Toast.show('Please Upgrade your Plan')
            this.props.navigation.navigate('Membership')
        }
    }
    
    shortlist(toid){
        fetchapi({ 
            app: 'janmo',
            module: 'shortlist',
            toid:toid,
            userid:this.state.userid
        })
        .then(response => {
            if(response.data[0].status == 1){
                this.setState({
                    shortlist:'Unlist'
                })
                Toast.show('Added in Shorlist list')
            }else{
                Toast.show('Please Upgrade your Plan')
                this.props.navigation.navigate('Membership')
            }
        })
    }

    unlist(toid){
        fetchapi({ 
            app: 'janmo',
            module: 'unlist',
            toid:toid,
            userid:this.state.userid
        })
        .then(response => {
            if(response.data[0].status == 1){
                this.setState({
                    shortlist:'Shortlist'
                })
            }
        })
    }
    
    contact(toid,item){
        if(item.membership_plan <= this.state.membership_plan){
            fetchapi({ 
                app: 'janmo',
                module: 'contactuser',
                toid:toid,
                userid:this.state.userid
            })
            .then(response => {
                if(response.data[0].status == 1){
                this.setState({
                    contactview:true,
                    contactdetails:item
                })
                }else{
                    Toast.show('Please Upgrade your Plan')
                    this.props.navigation.navigate('Membership')
                }
            })
        }else{
            Toast.show('Please Upgrade your Plan')
            this.props.navigation.navigate('Membership')
        }
    }

    setModalcontact(visible) {
        this.setState({ contactview: visible });
    }
  
    imagecontactview(photo){
        photo =  (photo != '')?photo:'images/avatar-default.png';
        return(
            <Image source={{ uri: global.BASE_URL + photo}}
            style={{ height: 100, width: 100,borderRadius:50}}/>
        )   
    }

    showblue(membership_plan){
        if(membership_plan > this.state.membership_plan){
            return(
                <Image source={require('../img/blur.png')}
                style={styles.blurprofile}/>
            )
        }
    }
    
    imageview(photo,membership_plan,membership_planname,membership_plancolor,verified){
        if(photo != ''){
          return(
            <View>
            <FastImage
                style={styles.profilelistphoto}
                source={{
                uri: global.BASE_URL + photo,
                priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            {this.showblue(membership_plan)}
            {this.plansticker(membership_planname,membership_plancolor)}
            {this.aadharverified(verified)}
            </View>
          )
        }else{
          return(
            <Image source={require('../img/avatar-default.png')}
            style={styles.profilelistphoto}/>
          )
        }
    }

    aadharverified(verified){
        if(verified == 1){
            return <View style={{position:'absolute',bottom:125,right:0,backgroundColor:'green',paddingLeft:10,paddingRight:10,paddingTop:1,paddingBottom:1,
            borderWidth:0,flex:1,flexDirection:'row',justifyContent:'center'}}>
                <Icon name="check-square" style={{color:'#fff',padding:3,marginRight:5}}/>
                <Text style={{color:'#fff'}}>Aadhar </Text>
            </View>
        }
    }
 

    chatverify(toid,token,membership_plan){
        if(membership_plan <= this.state.membership_plan){
            fetchapi({ 
                app: 'janmo',
                module: 'chatverify',
                toid:toid,
                userid:this.state.userid
            })
            .then(response => {
                if(response.data[0].status == 1){
                    this.props.navigation.navigate('ChatView', { id: toid, token: token })
                }else{
                    Toast.show('Please Upgrade your Plan')
                    this.props.navigation.navigate('Membership')
                }
            })
        }else{
            Toast.show('Please Upgrade your Plan')
            this.props.navigation.navigate('Membership')
        }
    }


    plansticker(membership_planname,membership_plancolor){
        if(membership_planname != ''){
            return(
                <View style={{position:'absolute',top:10,right:0,backgroundColor:membership_plancolor,paddingLeft:10,paddingRight:10,paddingTop:1,paddingBottom:1,
                borderWidth:1,borderColor:'#fff'}}>
                    <Text style={{color:'#fff'}}>{membership_planname}</Text>
                </View>
            )
        }
    }

    contactview(){
        let item = this.state.contactdetails;
        return(
        <Modal animationType={"slide"} transparent={true}
            visible={this.state.contactview}
            onRequestClose={() => { this.setModalcontact(false) }}
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{padding:10,backgroundColor:'#fff',height:260,alignItems:'center',margin:30,paddingTop:30,marginTop:deviceHeight*20/100}}>
                <Text style={{position:'absolute',right:10,top:10,fontSize:16,fontWeight:'bold',padding:10}}
                onPress={() => this.setModalcontact(false)}
                >X</Text>
                {this.imagecontactview(item.photo)}
                <View style={{margin:10,alignItems:'center'}}>
                    <Text style={{fontSize:18,marginBottom:10}}>{item.name}</Text>
                    <Text style={{fontSize:14,marginBottom:10}}>Mobile : {item.mobile}</Text>
                    <Text style={{fontSize:14}}>{item.email}</Text>
                </View>
            </View>
        </Modal>
        )
    }

    //<View style={{backgroundColor: 'rgba(0,0,0,0.5)',marginTop:-125,marginBottom:15}}>
    render(){
        const { navigate, goBack } = this.props.navigation;
        let item = this.state.data;
        return(
            <View style={{marginBottom:0}}>
                <TouchableWithoutFeedback  onPress={() => this.props.navigation.navigate('Details', { id: item.id })} >
                    {this.imageview(item.photo,item.membership_plan,item.membership_planname,item.membership_plancolor,item.verified)}
                </TouchableWithoutFeedback>

                <View style={{backgroundColor: 'rgba(0,0,0,0.5)',marginTop:-125,marginBottom:15}}>
                    <Grid style={{height:70}}>
                    <Col size={1.5}>
                    <Row><Text style={[styles.profilelisttext,{fontSize:16}]}>{item.name}</Text></Row>
                    {(item.age != '' && item.age != 0)?
                        <Row><Text style={styles.profilelisttext}>{(item.age == '' || item.age != 0)?item.age+' Years':''}  {item.height}</Text></Row>
                    :<View></View>}
                    {(item.religion != '')?
                        <Row><Text style={styles.profilelisttext}>{item.religion}</Text></Row>
                    :<View></View>}
                    {(item.city != '')?
                        <Row><Text style={styles.profilelisttext}>{item.city}</Text></Row>
                    :<View></View>}
                    </Col>
                    <Col size={1}>
                    {(item.occupation != '')?
                        <Row><Text style={styles.profilelisttext}>{item.occupation}</Text></Row>
                    :<View></View>}
                    {(item.annual_income != '')?
                        <Row><Text style={styles.profilelisttext}>{item.annual_income}</Text></Row>
                    :<View></View>}
                    {(item.education != '')?
                        <Row><Text style={styles.profilelisttext}>{item.education}</Text></Row>
                    :<View></View>}
                    {(item.state != '')?
                        <Row><Text style={styles.profilelisttext}>{item.state}</Text></Row>
                    :<View></View>}
                    </Col>
                    </Grid>
                    <Grid style={{backgroundColor:'#12a9a0',padding:5,opacity:0.9}}>
                    <Col size={1} onPress={() => { (this.state.connect == 'Connect')?this.connect(item.id,item.membership_plan):{}}}>
                        <Row style={styles.profilelistsmallbox}>
                            <Icon name="check-square" style={styles.profilelisticon}/>
                            <Text style={styles.profilelistboxtext}>{this.state.connect}</Text>
                        </Row>
                    </Col>
                    <Col size={1} onPress={() =>  (this.state.tab != 4)?(this.state.shortlist == 'Shortlist')?this.shortlist(item.id):this.unlist(item.id):{}}>
                        <Row style={styles.profilelistsmallbox}>
                            <Icon name="star" style={[styles.profilelisticon,{marginLeft:20}]} />
                            <Text style={[styles.profilelistboxtext,{marginLeft:16}]}>{this.state.shortlist}</Text>
                        </Row>
                    </Col>
                    <Col size={1} onPress={() => this.chatverify(item.id,item.fcm_token,item.membership_plan)}>
                        <Row style={styles.profilelistsmallbox}>
                            <Icon name="comment" style={styles.profilelisticon}/>
                            <Text style={styles.profilelistboxtext}>Chat</Text>
                        </Row>
                    </Col>
                    <Col size={1} onPress={() => this.contact(item.id,item)}>
                        <Row style={styles.profilelistsmallbox}>
                            <Icon name="phone" style={styles.profilelisticon}/>
                            <Text style={styles.profilelistboxtext}>Contact</Text>
                        </Row>
                    </Col>
                    </Grid>
                </View>
                
                {this.contactview()}
            </View>
        );
    }
}

module.export = Shortlist;