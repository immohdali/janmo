import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, AsyncStorage, Platform, FlatList,  Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Button, Right, Left,List, ListItem,Thumbnail,  Body } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';

import styles from '../css/style';
import { StackActions, NavigationActions } from 'react-navigation';

import { fetchapi } from '../config/functions';
import global from '../config/global';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Chatlist extends Component {

    state = {
        modalVisible: false,
        messages: [],
        users: [],
        userid: 0,
        userplan: 0,
        connection:true
    };

    componentDidMount() {
        AsyncStorage.getItem('userid', (err, userid) => {
            if (userid !== null) {
                this.setState({
                    userid: userid
                }, () => this.messagesapi(userid))
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

    messagesapi(userid){
        fetchapi({ 
            app: 'janmo',
            module: 'chatlist',
            userid:userid
        })
        .then(response => this.setState({messages: response.data[0].data}));
    }

   
    _renderItem = ({item}) => {
        if(item.id){
            return(
            <ListItem avatar onPress={() => this.props.navigation.navigate('ChatView', { id: item.id , token: item.fcm_token })} >
                <Left>
                    <Image
                        square
                        style={{ height: 40, width: 40 }}
                        source={{ uri: global.BASE_URL + item.photo}}
                        />
                </Left>
                <Body>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
                        <Text>{item.name}</Text>
                    <Text style={{fontWeight:'bold'}}>{(item.count != 0)?' ( '+item.count+' ) ':''}</Text>
                    </View>
                    <View>
                        <Text note>{item.message}</Text>
                    </View>
                </Body>
            </ListItem>
        )
        }
    }

    render() {
        const { navigate, goBack } = this.props.navigation;
        return (
            <Container>
                <Content style={{ backgroundColor: '#fff' }}>
                <View style={{padding:15,backgroundColor:'#12a9a0',paddingTop:(Platform.OS === 'ios')?30:10}}>
                <Grid>
                    <Col size={9}>
                        <Row>
                            <Icon name="arrow-left" style={{fontSize: 20,width:40,color:'#fff'}} 
                            onPress={() =>  this.redirecthome(navigate)} />
                            <Text style={{color:'#fff',fontSize:20,marginTop:-4,fontWeight:'bold'}} >
                            Messages</Text>
                        </Row>
                    </Col>
                </Grid>
                </View>
                <List style={{paddingRight:10}}>
                    <FlatList
                    data={this.state.messages}
                    initialNumToRender={10}
                    keyExtractor={(item, index) => (item.id ? item.id : "0")}
                    renderItem={this._renderItem}
                    />
                </List>
                </Content>
            </Container>
        );
    }
}

module.export = Chatlist;