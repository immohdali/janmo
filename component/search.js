import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, TextInput,  Dimensions  } from 'react-native';
import { Container, Content, Card, CardItem, Picker, List, ListItem, Body, Button, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';
import Profilelist from './profilelist';

import { SegmentedControls } from 'react-native-radio-buttons'

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Search extends Component{

    state = { 
        connection:true,
        userid:0,
        search:0,
        selectedOption:'Bride',
        religionlist:[],
        castelist:[],
        educationlist:[],
        professionlist:[],
        statelist:[],
        citylist:[],
        annualincomelist:[],
        dietlist:[],
        profession:'',
        religion:'',
        caste:'',
        stateid:'Maharashtra',
        education:'',
        annual_income:'',
        diet:'',
        smoke:'No',
        drink:'No',
        searchdata:[],
        selectoption:{
            name : ''
        }
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
                })
            }
        });  
    }


    _profilepickers(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'profilepickers',
                search: '1',
            })
            .then(response => {
                if(response.data[0].profession){
                    this.setState({
                        professionlist:response.data[0].profession,
                        profession:(response.data[0].profession[0].id == '')?' Select ':response.data[0].profession[0].id,
                        religionlist:response.data[0].religion,
                        religion:(response.data[0].religion[0].id == '')?' All Religion ':response.data[0].religion[0].id,
                        //response.data[0].religion[0],
                        castelist:response.data[0].caste,
                        caste:(response.data[0].caste[0].id == '')?' Select ':response.data[0].caste[0].id,
                        //response.data[0].caste[0],
                        educationlist:response.data[0].education,
                        education:(response.data[0].education[0].id == '')?' Select ':response.data[0].education[0].id,
                        //response.data[0].education[0],
                        annualincomelist:response.data[0].annual_income,
                        annual_income:(response.data[0].annual_income[0].id == '')?' Select ':response.data[0].annual_income[0].id,
                        //response.data[0].annual_income[0],
                        dietlist:response.data[0].diet,
                        diet:response.data[0].diet[0].name,
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
                stateid: this.state.stateid,
                search:1
            })
            .then(response => {
                this.setState({
                    statelist:response.data[0].states
                })
            }
        );
        }
    }


    editprofile(){
        this.setState({
            editprofile: !this.state.editprofile
        })
    }

    setSelectedOption(selectedOption){
        this.setState({
          selectedOption
        });
    };

    searchbox(){
        if(this.state.search == 0){
        const options = [
            "Bride",
            "Groom"
            ];
        return(
            <Content style={{backgroundColor:'#fff'}}>
            <View style={{flex:1,padding:10,paddingLeft:20,paddingRight:20}}>
                <View style={styles.profileeditlinebox}>
                    <Text style={{fontSize:16,color:'#666'}}>I am Looking for</Text>
                </View>
                
                <View style={{padding:10,marginBottom:10}}>
                    <SegmentedControls
                        tint={'#f00'}
                        selectedTint= {'white'}
                        backTint= {'#fff'}
                        options={ options }
                        allowFontScaling={ false } // default: true
                        selectedIndex={this.state.selectedOption}
                        onSelection={ this.setSelectedOption.bind(this) }
                        selectedOption={ this.state.selectedOption }
                        optionStyle={{fontFamily: 'AvenirNext-Medium'}}
                        optionContainerStyle={{flex: 1}}
                        />
                    </View>
                    
                    <List>
                        <ListItem itemDivider>
                            <Text>Profession</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.profession}
                                    onValueChange={(itemValue, itemIndex) => this.setState({profession: itemValue})}
                                    style={styles.searchpicker}>
                                    {this.getpickers(this.state.professionlist)} 
                                </Picker>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Religion</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.religion}
                                    onValueChange={(itemValue, itemIndex) => this.setState({religion: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.religionlist)} 
                                </Picker>
                            </View>
                        </ListItem>  
                        <ListItem itemDivider>
                            <Text>Caste</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.caste}
                                    onValueChange={(itemValue, itemIndex) => this.setState({caste: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.castelist)} 
                                </Picker>
                            </View>
                        </ListItem>  
                        <ListItem itemDivider>
                            <Text>State</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.stateid}
                                    onValueChange={(itemValue, itemIndex) => this.setState({stateid: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.statelist)}
                                </Picker>
                            </View>
                        </ListItem>   
                        <ListItem itemDivider>
                            <Text>Education</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.education}
                                    onValueChange={(itemValue, itemIndex) => this.setState({education: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.educationlist)}
                                </Picker>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Annual Income</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.annual_income}
                                    onValueChange={(itemValue, itemIndex) => this.setState({annual_income: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.annualincomelist)}
                                </Picker>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Diet</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.diet}
                                    onValueChange={(itemValue, itemIndex) => this.setState({diet: itemValue})}
                                    style={styles.searchpicker} >
                                    {this.getpickers(this.state.dietlist)}
                                </Picker>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Smoking</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.smoke}
                                    onValueChange={(itemValue, itemIndex) => this.setState({smoke: itemValue})}
                                    style={styles.searchpicker} >
                                    <Picker.Item value={'Yes'} label={'Yes'}/>
                                    <Picker.Item value={'No'} label={'No'}/>
                                    <Picker.Item value={'Doesnt Matter'} label={'Doesnt Matter'}/>
                                </Picker>
                            </View>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Drinking</Text>
                        </ListItem>  
                        <ListItem >
                            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between'}}>
                                <Picker selectedValue={this.state.drink}
                                    onValueChange={(itemValue, itemIndex) => this.setState({drink: itemValue})}
                                    style={styles.searchpicker} >
                                    <Picker.Item value={'Yes'} label={'Yes'}/>
                                    <Picker.Item value={'No'} label={'No'}/>
                                    <Picker.Item value={'Doesnt Matter'} label={'Doesnt Matter'}/>
                                </Picker>
                            </View>
                        </ListItem>
                    </List>
            </View>
            </Content>
        )
        }else{
            return(
                <Profilelist tab={1} data={this.state.searchdata} navigation={this.props.navigation} />
            )
        }
    }

    searchsubmit(){
        let searchdata =  {
            gender:this.state.selectedOption,
            profession:(this.state.profession != ' Select ')?this.state.profession:'',
            religion:(this.state.profession != ' All Religion ')?this.state.religion:'',
            caste:(this.state.profession != ' Select ')?this.state.caste:'',
            stateid:this.state.stateid,
            education:(this.state.profession != ' Select ')?this.state.education:'',
            annual_income:(this.state.profession != ' Select ')?this.state.annual_income:'',
            diet:this.state.diet,
            smoke:this.state.smoke,
            drink:this.state.drink
        }
        console.warn(searchdata)
        this.setState({
            searchdata: searchdata,
            search:1
        })
    }

    render(){
        const { navigate, goBack } = this.props.navigation;
        return(
            <Container>
           
            <View style={{padding:5,backgroundColor:'#102038',paddingLeft:15,paddingRight:15,height:50,paddingTop:12 }}>
            <Grid>
                <Col>
                    <Row>
                        <Icon name="arrow-left" style={{fontSize: 18,width:40,color:'#fff',marginTop:3}} 
                        onPress={() => (this.state.search == 0)?goBack():this.setState({search:0})} />
                        <Text style={{color:'#fff',fontSize:18}}>Search</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

                {this.searchbox()}
           
            <Footer>
            <FooterTab>
                <Button style={{backgroundColor:'#12a9a0'}} onPress={() => this.searchsubmit()}>
                    <Text style={{padding:10,fontWeight:'bold',color:'#fff',width:deviceWidth,textAlign:'center',fontSize:16}}
                    >SUBMIT</Text>
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

module.export = Search;