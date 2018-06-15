import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, AsyncStorage,Platform, TouchableHighlight, Linking, TextInput, Dimensions, Alert, Modal } from 'react-native';
import { Container, Content, Card, CardItem, Button, Right, Left, List, ListItem, Thumbnail, Footer, FooterTab, Body } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';


import styles from '../css/style';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';

import { fetchapi } from '../config/functions';
import global from '../config/global';
import AutoScroll from 'react-native-auto-scroll';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class ChatView extends Component {

    state = {
        modalVisible: false,
        messages:[],
        userid: 0,
        connection: true,
        fromid: this.props.navigation.state.params.id,
        fcmtoken: '',
        lastid: 0,
        name:'',
        photo:'',
        connected:1,
        sendtext:'',
        sendmsg:0
    };

    componentDidMount() {
        AsyncStorage.getItem('userplan', (err, userplan) => {
            if (userplan !== null) {
                this.setState({
                    userplan: userplan
                })
            }
        });
        AsyncStorage.getItem('userid', (err, userid) => {
            if (userid !== null) {
                this.setState({
                    userid: userid
                }, () => this._messagesapi())
            }
        });
        this._profileapi()
    }

    componentWillUpdate(){
        this.getchatlive();
    }


    messageslist(navigate) {
        let navaction = (Platform.OS === 'ios')?StackActions:NavigationActions;
            const resetAction = navaction.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Chat' })
            ]
        })
        this.props.navigation.dispatch(resetAction);
    }

    _profileapi(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'myprofile',
                userid:this.state.fromid
            })
            .then(response => this.setState({
                name:response.data[0].basic.name,
                photo:response.data[0].basic.photo
            }));
        }
    }

    getchatlive() {
        setTimeout(() => {
            fetchapi({
                app: 'janmo',
                module: 'getchatlive',
                userid: this.state.userid,
                fromid: this.state.fromid,
                lastid: this.state.lastid
            })
            .then(response => {
                if(response.data[0].status != 0) {
                    this._messagesapi()
                }
            } );
        }, 3000);
    }

    sendtext() {
        if(this.state.sendtext != '' && this.state.sendmsg == 0){
            this.setState({
                sendmsg:1
            })
            fetchapi({
                app: 'janmo',
                module: 'sendtext',
                fromid: this.state.userid,
                toid: this.state.fromid,
                message: this.state.sendtext
            })
            .then(response => this.setState({ sendtext: '', sendmsg:0 },
            () => this._messagesapi()));
        }
    }

    connectreply(toid,reply){
        fetchapi({ 
            app: 'janmo',
            module: 'connectreply',
            toid:toid,
            userid:parseInt(this.state.userid),
            reply:reply,
            tab:0
        })
        .then(response =>{
            if(reply == 1){
                this._messagesapi(),
                Toast.show('Invitation Accepted Successfully');
            }else{
                this.props.navigation.navigate('Chat'),
                Toast.show('Invitation Declined Successfully');
            }
        });
    }

    footerbox(){
        if(this.state.connected == 1){
            return(
                <FooterTab style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' }}>
                    <TextInput
                        onChangeText={(text) => this.setState({ sendtext: text })}
                        value={this.state.sendtext}
                        underlineColorAndroid='transparent'
                        style={{ paddingLeft: 20, width: deviceWidth - 80 }} />
                    <Text
                        onPress={() => this.sendtext()}
                        style={{ shadowColor: '#000',elevation: 0.5,backgroundColor: '#00ada9', color: '#fff', padding: 10, paddingRight: 20, paddingLeft: 20, fontWeight: 'bold', fontSize: 16, textAlignVertical: 'center',padding:(Platform.OS === 'ios')?15:10 }}>
                        Send</Text>
                </FooterTab>
            )
        }else{
            return(
                <FooterTab style={{ backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' }}>
                    <Text onPress={() => this.connectreply(this.state.fromid,1)}
                        style={{ shadowColor: '#000',elevation: 0.5,
                        backgroundColor: '#00ada9', color: '#fff',  
                        width:deviceWidth*50/100, fontWeight: 'bold', fontSize: 20,
                        textAlign:'center',
                         textAlignVertical: 'center' }}>
                        Accept</Text>
                    <Text onPress={() => this.connectreply(this.state.fromid,2)}
                        style={{ shadowColor: '#000',elevation: 0.5,
                        backgroundColor: '#666', color: '#fff',  
                        width:deviceWidth*50/100, fontWeight: 'bold', fontSize: 20,
                        textAlign:'center',
                         textAlignVertical: 'center' }}>
                        Declined</Text>
                </FooterTab>
            )
            }
    }

    _messagesapi() {
        if (this.state.connection == true) {
            fetchapi({
                app: 'janmo',
                module: 'chatview',
                userid: this.state.userid,
                fromid: this.state.fromid
            })
            .then(response => this.setState({ 
                messages: (response.data[0].status != 0)?response.data[0].data:null,
                status: response.data[0].status,
                connected: response.data[0].connected,
                lastid: response.data[0].lastid
             }))
            .catch(function(error) {
                  throw error;
            });
        }
    }

    _messagesbox(navigate) {
        if(this.state.messages != null){
            return this.state.messages.map((item, index) =>
                <View key={index} style={(this.state.userid == item.toid) ? styles.leftmsg : styles.rightmsg}>
                    <Text style={{fontSize:14,color:(this.state.userid == item.toid)?'#000':'#fff'}}>{item.message}</Text>
                    <Text style={{fontSize:10,textAlign:(this.state.userid == item.toid)?'left':'right',color:(this.state.userid == item.toid)?'#000':'#fff'}}>{item.time}</Text>
                </View>
            );
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        let row = this.state.postdetails;
        return (
            <Container style={{ backgroundColor: '#fff' }}>
                <View style={{shadowColor: '#000',elevation: 0.5,}}>
                    <View style={{ padding: 10, backgroundColor: '#00ada9', height: (Platform.OS === 'ios')?60:50,paddingTop:(Platform.OS === 'ios')?30:15 }}>
                        <Grid>
                            <Col size={9}>
                                <Row>
                                    <Icon name="arrow-left" style={{ fontSize: 20, width: 40, color: '#fff' }}
                                        onPress={() => this.messageslist(navigate)} />
                                    <Image
                                    square
                                    style={{ height:40, width: (Platform.OS === 'ios')?60:40,borderRadius:50, marginTop:-10,marginRight:10 }}
                                    source={{ uri: global.BASE_URL + this.state.photo}}
                                    /> 
                                    <Text style={{ color: '#fff', fontSize: 20, marginTop: -4, fontWeight: 'bold' }} >
                                    {this.state.name}</Text>
                                </Row>
                            </Col>
                        </Grid>
                    </View>
                </View>

                <AutoScroll style={{backgroundColor:'#fff'}}
                contentContainerStyle={styles.scrollContainer}>
                    {this._messagesbox(navigate)}                    
                </AutoScroll>
                <Footer>
                    
                        {this.footerbox()}
                    
                </Footer>
            </Container>
        );
    } 

}

module.export = ChatView;