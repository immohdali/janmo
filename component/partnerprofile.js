import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, Platform, TextInput,  Dimensions, Modal  } from 'react-native';
import { Container, Content, Card, CardItem,Picker,Left, Button, Right, Body, Footer, FooterTab,List, ListItem } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import MultiSelect from 'react-native-multiple-select';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Profile extends Component{

    state = { 
        connection:true,
        editprofile:true,
        agelist:[],
        profileforlist:[],
        religionlist:[],
        mothertonguelist:[],
        educationlist:[],
        professionlist:[],
        workingwithlist:[],
        statelist:[],
        citylist:[],
        annualincomelist:[],
        heightlist:[],
        userid:0,
        agefrom:'',
        ageto:'',
        minheight:'',
        maxheight:'',
        religion:'',
        mother_tongue:[],
        city:'',
        stateid:'',
        education:[],
        working_with:'',
        profession:'',
        annual_income_from:'',
        annual_income_to:'',
        partner_preference:'',
        created:''
    };

    componentDidMount(){
        /*NetInfo.isConnected.fetch().then(
            isConnected => {
                this.setState({
                    connection:isConnected
                })    
            }
        )*/

        this._profilepickers();
        this._getstates();
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                }, () => this._partnerprofileapi(userid))
            }
        });  
    }

    _profilepickers(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'partnerprofilepickers'
            })
            .then(response => {
                if(response.data[0].agelist){
                    this.setState({
                        agelist:response.data[0].agelist,
                        heightlist:response.data[0].height,
                        mothertonguelist:response.data[0].mother_tongue,
                        educationlist:response.data[0].education,
                        professionlist:response.data[0].profession,
                        workingwithlist:response.data[0].working_with,
                        religionlist:response.data[0].religion,
                        annualincomelist:response.data[0].annual_income
                    })
                }
            }
        );
        }
    }

    _getstates(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'stateslist',
                stateid: ''
            })
            .then(response => {
                this.setState({
                    statelist:response.data[0].states,
                    citylist:response.data[0].cities
                })
            }
        );
        }
    }

    _getcities(stateid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'stateslist',
                stateid: stateid
            })
            .then(response => this.setState({ citylist:response.data[0].cities })
        );
        }
    }

    _partnerprofileapi(userid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'partnerprofile',
                userid:userid
            })
            .then(response => this.setState({
                agefrom:response.data[0].agefrom,
                ageto:response.data[0].ageto,
                minheight:response.data[0].minheight,
                maxheight:response.data[0].maxheight,
                religion:response.data[0].religion,
                mother_tongue:response.data[0].mother_tongue,
                city:response.data[0].city,
                stateid:response.data[0].state,
                education:response.data[0].education,
                working_with:response.data[0].working_with,
                profession:response.data[0].profession,
                annual_income_from:response.data[0].annual_income_from,
                annual_income_to:response.data[0].annual_income_to
            }));
        }
    }


    _updateprofile(type){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'updatepartnerprofile',
                userid:this.state.userid,
                agefrom:this.state.agefrom,
                ageto:this.state.ageto,
                minheight:this.state.minheight,
                maxheight:this.state.maxheight,
                religion:this.state.religion,
                mother_tongue:this.state.mother_tongue.toString(),
                state:this.state.stateid,
                city:this.state.city,
                education:this.state.education.toString(),
                working_with:this.state.working_with,
                profession:this.state.profession,
                annual_income_from:this.state.annual_income_from,
                annual_income_to:this.state.annual_income_to
            })
            .then(response => 
                this.setState({
                    editprofile:false
                }, () => {
                    if(type != 1){
                        Toast.show('Partner Profile Successfully Updated')
                    }
                })
            );
        }
    }
    
    editprofile(){
        this.setState({
            editprofile: !this.state.editprofile
        })
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
    //<Icon name={(this.state.editprofile == true)?"check":"edit"}  onPress={() => {(this.state.editprofile == true)?this._updateprofile():this.editprofile()}} style={{fontSize: 18,width:40,color:'#000',marginTop:3}} />
    
    render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
            <Content style={{backgroundColor:'#fff'}}>
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:(Platform.OS === 'ios')?55:50,paddingTop:(Platform.OS === 'ios')?20:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => this.redirecthome(navigate)} />
                        <Text style={{color:'#fff',fontSize:18}}>Partner Profile</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <View style={{flex:1,flexDirection:'row',padding:10,justifyContent:'center'}}>
                <Text onPress={() => navigate('Profile')}
                 style={{padding:5,paddingLeft:20,paddingRight:20,fontWeight:'bold',color:'#12a9a0',borderWidth:1,borderColor:'#12a9a0'}}>My Profile</Text>
                <Text 
                style={{padding:5,paddingLeft:20,paddingRight:20,fontWeight:'bold',color:'#fff',backgroundColor:'#12a9a0'}}>Partner</Text>
            </View>
        
            <View style={{flex:1,padding:10}}>
              
              <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Basic Information</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Age ( Years )</Text>
                            <Picker selectedValue={this.state.agefrom}
                                onValueChange={(itemValue, itemIndex) => this.setState({agefrom: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.agelist)} 
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}> </Text>
                            <Picker selectedValue={this.state.ageto}
                                onValueChange={(itemValue, itemIndex) => this.setState({ageto: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.agelist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Height</Text>
                            <Picker selectedValue={this.state.minheight}
                                onValueChange={(itemValue, itemIndex) => this.setState({minheight: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.heightlist)} 
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}> </Text>
                            <Picker selectedValue={this.state.maxheight}
                                onValueChange={(itemValue, itemIndex) => this.setState({maxheight: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.heightlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Mother Tongue</Text>
                            <MultiSelect
                                multi
                                hideTags
                                items={this.state.mothertonguelist}
                                uniqueKey="id"
                                onSelectedItemsChange={text => this.setState({mother_tongue : text}, () => this._updateprofile(1))}
                                selectedItems={this.state.mother_tongue}
                                selectText="" />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Religion </Text>
                            <Picker selectedValue={this.state.religion}
                                onValueChange={(itemValue, itemIndex) => this.setState({religion: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.religionlist)} 
                            </Picker>
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>

                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Education Details</Text>
                   
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Education</Text>
                            <MultiSelect
                                multi
                                hideTags
                                items={this.state.educationlist}
                                uniqueKey="id"
                                onSelectedItemsChange={text => this.setState({education : text}, () => this._updateprofile(1))}
                                selectedItems={this.state.education}
                                selectText="" />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Profession</Text>
                            <Picker selectedValue={this.state.profession}
                                onValueChange={(itemValue, itemIndex) => this.setState({profession: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.professionlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Working With</Text>
                            <Picker selectedValue={this.state.working_with}
                                onValueChange={(itemValue, itemIndex) => this.setState({working_with: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                 {this.getpickers(this.state.workingwithlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                         <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Annual Income From</Text>
                            <Picker selectedValue={this.state.annual_income_from}
                                onValueChange={(itemValue, itemIndex) => this.setState({annual_income_from: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.annualincomelist)} 
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Annual Income To</Text>
                            <Picker selectedValue={this.state.annual_income_to}
                                onValueChange={(itemValue, itemIndex) => this.setState({annual_income_to: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.annualincomelist)} 
                            </Picker>
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Residence Details</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>
                   
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>State</Text>
                            <Picker selectedValue={this.state.stateid}
                                onValueChange={(itemValue, itemIndex) => this.setState({stateid: itemValue , editprofile:true },
                                () => this._getcities(itemValue))}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.statelist)}
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>City</Text>
                            <Picker selectedValue={this.state.city}
                                onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.citylist)}
                            </Picker>
                        </View>
                        </View>
                    </Body>
                    </CardItem>
                </Card>
                
            </View>
            </Content>
            <Footer>
            <FooterTab>
                <Button style={{backgroundColor:'#12a9a0'}} onPress={() => {(this.state.editprofile == true)?this._updateprofile():this.editprofile()}}>
                    <Text style={{padding:10,fontWeight:'bold',color:'#fff',width:deviceWidth,textAlign:'center',fontSize:16}}
                    >{(this.state.editprofile == true)?'UPDATE':'EDIT'}</Text>
                </Button>
            </FooterTab>
            </Footer>
            </Container>
        );
    }

    
    getpickers(looplist){
        if(looplist != ''){
        return looplist.map((item, i) => {
            return <Picker.Item key={i} value={(item.id)?item.id:item.name} label={item.name} />
        });
        }
    }

}


module.export = Profile;