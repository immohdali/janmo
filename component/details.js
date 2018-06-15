import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, Platform, TouchableHighlight, TextInput, Dimensions, Modal  } from 'react-native';
import { Container, Content, Card, CardItem, Body, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import Toast from 'react-native-simple-toast';
import { NavigationActions } from 'react-navigation';

import FastImage from 'react-native-fast-image';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import ImageViewer from 'react-native-image-zoom-viewer';

import Header from './header';
import SideBar from './sidebar';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Details extends Component{

    state = { 
        connection:true,
        userid:0,
        id: this.props.navigation.state.params.id,
        userid:0,
        contactview:false,
        name:'',
        email:'',
        profile_for:'',
        dob:'',
        religion:'',
        mother_tongue:'',
        gender:'',
        mobile:'',
        description:'',
        education:'',
        profession:'',
        occupation:'',
        education_field:'',
        working_with:'',
        annual_income:'',
        employed_in:'',
        height:'',
        blood_group:'',
        complexion:'',
        body_type:'',
        spectacles:'',
        weight:'',
        smoke:'',
        drink:'',
        diet:'',
        father:'',
        father_details:'',
        mother:'',
        mother_details:'',
        no_of_brothers:'',
        brother_married:'',
        no_of_sisters:'',
        sister_married:'',
        gothra:'',
        manglik:'',
        moonsign:'',
        place_of_birth:'',
        horos_match:'',
        time_of_birth:'',
        country:'',
        village:'',
        stateid:'',
        taluka:'',
        city:'',
        district:'',
        editprofile:false,
        photo:'',
        agefrom:'',
        ageto:'',
        minheight:'',
        maxheight:'',
        pmother_tongue:'',
        preligion:'',
        peducation:'',
        pprofession:'',
        pworking_with:'',
        pannual_income:'',
        pstate:'',
        pcity:'',
        fcm_token:'',
        aadhar_no:'',
        modalVisible: false,
        shortlist:'Shortlist',
        connect:'Connect',
        umembership_plan:0,
        membership_plan:0,
        membership_planname:'',
        membership_plancolor:''
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
                }, () => this._profileapi(userid), this.viewprofile(userid))
            }
        });

        AsyncStorage.getItem('membership_plan', (err, membership_plan) => { 
            if(membership_plan !== null){
                this.setState({
                    membership_plan : membership_plan
                })
            }
        }); 

        this._partnerprofileapi()
    }

    viewprofile(userid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'viewprofile',
                viewid:this.state.id,
                userid:userid
            })
        }
    }

    inphotoslider(images) {
        if (images) {
            let imgarr = images.split(',');
            return imgarr.map((data) => {
                return (
                    {
                        url: global.BASE_URL + data
                    }
                )
            })
        }
    }
    
    _profileapi(userid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'myprofile',
                userid:this.state.id,
                viewby:userid
            })
            .then(response => this.setState({
                name:response.data[0].basic.name,
                email:response.data[0].basic.email,
                profile_for:response.data[0].basic.profile_for,
                dob:response.data[0].basic.dob,
                age:response.data[0].basic.age,
                umembership_plan:response.data[0].basic.membership_plan,
                membership_planname:response.data[0].basic.membership_planname,
                membership_plancolor:response.data[0].basic.membership_plancolor,
                fcm_token:response.data[0].basic.fcm_token,
                religion:response.data[0].basic.religion,
                mother_tongue:response.data[0].basic.mother_tongue,
                gender:response.data[0].basic.gender,
                mobile:response.data[0].basic.mobile,
                photo:response.data[0].basic.photo,
                photos:response.data[0].basic.photos,
                connect:response.data[0].basic.connect,
                shortlist:response.data[0].basic.shortlist,
                aadhar_no:response.data[0].basic.aadhar_no,
                description:response.data[0].profile_description.description,
                education:response.data[0].education.education,
                profession:response.data[0].education.profession,
                occupation:response.data[0].education.occupation,
                education_field:response.data[0].education.education_field,
                working_with:response.data[0].education.working_with,
                annual_income:response.data[0].education.annual_income,
                employed_in:response.data[0].education.employed_in,
                height:response.data[0].physical.height,
                blood_group:response.data[0].physical.blood_group,
                complexion:response.data[0].physical.complexion,
                body_type:response.data[0].physical.body_type,
                spectacles:response.data[0].physical.spectacles,
                weight:response.data[0].physical.weight,
                smoke:response.data[0].physical.smoke,
                drink:response.data[0].physical.drink,
                diet:response.data[0].physical.diet,
                father:response.data[0].family.father,
                father_details:response.data[0].family.father_details,
                mother:response.data[0].family.mother,
                mother_details:response.data[0].family.mother_details,
                no_of_brothers:response.data[0].family.no_of_brothers,
                brother_married:response.data[0].family.brother_married,
                no_of_sisters:response.data[0].family.no_of_sisters,
                sister_married:response.data[0].family.sister_married,
                gothra:response.data[0].horoscope.gothra,
                moonsign:response.data[0].horoscope.moonsign,
                horos_match:response.data[0].horoscope.horos_match,
                manglik:response.data[0].horoscope.manglik,
                place_of_birth:response.data[0].horoscope.place_of_birth,
                time_of_birth:response.data[0].horoscope.time_of_birth,
                country:response.data[0].residence.country,
                stateid:response.data[0].residence.state,
                city:response.data[0].residence.city,
                village:response.data[0].residence.village,
                taluka:response.data[0].residence.taluka,
                district:response.data[0].residence.district
            }));
        }
    }

    _partnerprofileapi(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'partnerprofile',
                userid:this.state.id
            })
            .then(response => this.setState({
                agefrom:response.data[0].agefrom,
                ageto:response.data[0].ageto,
                minheight:response.data[0].minheight,
                maxheight:response.data[0].maxheight,
                preligion:response.data[0].preligion,
                pmother_tongue:response.data[0].pmother_tongue,
                pcity:response.data[0].city,
                pstate:response.data[0].state,
                peducation:response.data[0].education,
                pworking_with:response.data[0].working_with,
                pprofession:response.data[0].profession,
                pannual_income:response.data[0].annual_income
            }));
        }
    }

    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showblue(membership_plan){
        if(membership_plan > this.state.membership_plan){
            return(
                <Image source={require('../img/blur.png')}
                style={styles.blurprofile}/>
            )
        }
    }

    singleimage(membership_plan,membership_planname,membership_plancolor){
        photo =  (this.state.photo != '')?this.state.photo:'images/avatar-default.png';
        return(
            <TouchableHighlight onPress={() => (membership_plan <= this.state.membership_plan)?this.setModalVisible(true):{}}>
            <View>
            <FastImage
                style={styles.profilephoto}
                source={{
                uri: global.BASE_URL + photo,
                priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
            />
            {this.showblue(membership_plan)}
            {this.plansticker(membership_planname,membership_plancolor)}
            </View>
            </TouchableHighlight>
        )
    }

    plansticker(membership_planname,membership_plancolor){
        if(membership_planname != ''){
            return(
                <View style={{position:'absolute',top:10,right:0,backgroundColor:membership_plancolor,paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:3,
                borderWidth:1,borderColor:'#fff'}}>
                    <Text style={{color:'#fff'}}>{membership_planname}</Text>
                </View>
            )
        }
    }

    imagecontactview(){
        photo =  (this.state.photo != '')?this.state.photo:'images/avatar-default.png';
        return(
            <Image source={{ uri: global.BASE_URL + photo}}
            style={{ height: 100, width: 100,borderRadius:50}}/>
        )   
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    setModalcontact(visible) {
        this.setState({ contactview: visible });
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
                this.props.navigation.navigate('ChatView', { id: toid , token: token})
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

    
    contact(toid,membership_plan){
        if(membership_plan <= this.state.membership_plan){
            fetchapi({ 
                app: 'janmo',
                module: 'contactuser',
                toid:toid,
                userid:this.state.userid
            })
            .then(response => {
            if(response.data[0].status == 1){
                this.setState({
                contactview:true
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
    
      setcontactview(visible) {
          this.setState({ contactview: visible });
      }
    
      contactview(){
        return(
          <Modal animationType={"slide"} transparent={true}
              visible={this.state.contactview}
              onRequestClose={() => { this.setModalcontact(false) }}
              style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <View style={{padding:10,backgroundColor:'#fff',height:260,alignItems:'center',margin:30,paddingTop:30,marginTop:deviceHeight*20/100}}>
                  <Text style={{position:'absolute',right:10,top:10,fontSize:16,fontWeight:'bold',padding:10}}
                  onPress={() => this.setModalcontact(false)}
                  >X</Text>
                  {this.imagecontactview(this.state.photo)}
                  <View style={{margin:10,alignItems:'center'}}>
                      <Text style={{fontSize:18,marginBottom:10}}>{this.Capitalize(this.state.name)}</Text>
                      <Text style={{fontSize:14,marginBottom:10}}>Mobile : {this.state.mobile}</Text>
                      <Text style={{fontSize:14}}>{this.state.email}</Text>
                  </View>
              </View>
  
          </Modal>
        )
    }

    aadharverified(){
        if(this.state.aadhar_no != ''){
        return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingTop:7,paddingBottom:7,backgroundColor:'green'}}>
                <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}} >Aadhar Verified</Text>
            </View>
        )
        }
    }

    
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
                        onPress={() => goBack()} />
                        <Text style={{color:'#fff',fontSize:18}}>{this.Capitalize(this.state.name)}</Text>
                    </Row>
                </Col>
            </Grid>
            </View>
        
            <View style={{flex:1,padding:10}}>
                
                {this.singleimage(this.state.umembership_plan,this.state.membership_planname,this.state.membership_plancolor)}
                <Modal animationType={"slide"} transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { this.setModalVisible(false) }}
                    style={{ backgroundColor: '#000' }}>
                    <TouchableHighlight onPress={() => this.setModalVisible(false)} style={{ backgroundColor: '#000' }}>
                        <Text style={{ zIndex: 0, color: '#fff', position: 'relative', left: deviceWidth - 60, fontSize: 16, marginTop: 10, paddingBottom: 10 }}>Close</Text>
                    </TouchableHighlight>
                    <ImageViewer
                        imageUrls={this.inphotoslider(this.state.photos)}
                        style={{ zIndex: 1, height: 210, maxWidth: deviceWidth }} />
                </Modal>
              <View style={{marginTop:-100,height:100,backgroundColor: 'rgba(0,0,0,0.5)',}}>
                <Grid>
                <Col size={1.5}>
                  <Row><Text style={styles.profilelisttext}>{this.Capitalize(this.state.name)}</Text></Row>
                  {(this.state.age != '' && this.state.age != 0)?
                    <Row><Text style={styles.profilelisttext}>{this.state.age+' Years'} / {this.state.height}</Text></Row>
                    :<View></View>}
                  {(this.state.religion != '')?
                    <Row><Text style={styles.profilelisttext}>{this.state.religion}</Text></Row>
                    :<View></View>}
                  {(this.state.mother_tongue != '')?
                  <Row><Text style={styles.profilelisttext}>{this.state.mother_tongue}</Text></Row>
                    :<View></View>}
                  {(this.state.city != '')?
                    <Row><Text style={styles.profilelisttext}>{this.state.city}</Text></Row>
                    :<View></View>}
                </Col>
                <Col size={1}>
                    {(this.state.occupation != '')?
                        <Row><Text style={styles.profilelisttext}>{this.state.occupation}</Text></Row>
                    :<View></View>}
                    {(this.state.annual_income != '')?
                        <Row><Text style={styles.profilelisttext}>{this.state.annual_income}</Text></Row>
                    :<View></View>}
                    {(this.state.education != '')?
                        <Row><Text style={styles.profilelisttext}>{this.state.education}</Text></Row>
                    :<View></View>}
                    {(this.state.stateid != '')?
                        <Row><Text style={styles.profilelisttext}>{this.state.stateid}</Text></Row>
                    :<View></View>}
                </Col>
                </Grid>               
              </View>

                {this.aadharverified()}

                <View style={styles.profileheadlinebox}>
                    <Text style={styles.profileheadline}>About {this.Capitalize(this.state.name)}</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <Text style={{fontSize:12, lineHeight:25}}>
                            {this.state.description}
                        </Text>
                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileheadlinebox}>
                    <Text style={styles.profileheadline}>Education Details</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Education</Text>
                            <Text style={styles.profileboxcontent}>{this.state.education}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Profession</Text>
                            <Text style={styles.profileboxcontent}>{this.state.profession}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Occupation</Text>
                            <Text style={styles.profileboxcontent}>{this.state.occupation}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Education Field</Text>
                            <Text style={styles.profileboxcontent}>{this.state.education_field}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Working With</Text>
                            <Text style={styles.profileboxcontent}>{this.state.working_with}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Annual Income</Text>
                            <Text style={styles.profileboxcontent}>{this.state.annual_income}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Employed In </Text>
                            <Text style={styles.profileboxcontent}>{this.state.employed_in}</Text>
                        </View>
                        </View>
                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileheadlinebox}>
                    <Text style={styles.profileheadline}>Physical Attribute</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Height</Text>
                            <Text style={styles.profileboxcontent}>{this.state.height}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Blood Group</Text>
                            <Text style={styles.profileboxcontent}>{this.state.blood_group}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Complexion</Text>
                            <Text style={styles.profileboxcontent}>{this.state.complexion}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Body Type</Text>
                            <Text style={styles.profileboxcontent}>{this.state.body_type}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Spectacles </Text>
                            <Text style={styles.profileboxcontent}>{this.state.spectacles}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Weight</Text>
                            <Text style={styles.profileboxcontent}>{this.state.weight}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Smoke</Text>
                            <Text style={styles.profileboxcontent}>{this.state.smoke}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Drink </Text>
                            <Text style={styles.profileboxcontent}>{this.state.drink}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Diet </Text>
                            <Text style={styles.profileboxcontent}>{this.state.diet}</Text>
                        </View>
                        </View>
                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileheadlinebox}>
                    <Text style={styles.profileheadline}>Horoscope Details</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Gothra</Text>
                            <Text style={styles.profileboxcontent}>{this.state.gothra}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Manglik</Text>
                            <Text style={styles.profileboxcontent}>{this.state.manglik}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Moonsign</Text>
                            <Text style={styles.profileboxcontent}>{this.state.moonsign}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Place Of Birth</Text>
                            <Text style={styles.profileboxcontent}>{this.state.place_of_birth}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Horos Match</Text>
                            <Text style={styles.profileboxcontent}>{this.state.horos_match}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Time Of Birth</Text>
                            <Text style={styles.profileboxcontent}>{this.state.time_of_birth}</Text>
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileheadlinebox}>
                    <Text style={styles.profileheadline}>Residence Details</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Country</Text>
                            <Text style={styles.profileboxcontent}>{this.state.country}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Village</Text>
                            <Text style={styles.profileboxcontent}>{this.state.village}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>State</Text>
                            <Text style={styles.profileboxcontent}>{this.state.stateid}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Taluka</Text>
                            <Text style={styles.profileboxcontent}>{this.state.taluka}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>City</Text>
                            <Text style={styles.profileboxcontent}>{this.state.city}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>District</Text>
                            <Text style={styles.profileboxcontent}>{this.state.district}</Text>
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>

                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Partner Preference</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Age ( Years )</Text>
                            <Text style={styles.profileboxcontent}>{this.state.agefrom}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}> </Text>
                            <Text style={styles.profileboxcontent}>{this.state.ageto}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Height</Text>
                            <Text style={styles.profileboxcontent}>{this.state.minheight}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}> </Text>
                            <Text style={styles.profileboxcontent}>{this.state.maxheight}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Mother Tongue</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pmother_tongue}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Religion </Text>
                            <Text style={styles.profileboxcontent}>{this.state.preligion}</Text>
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
                            <Text style={styles.profiledetailhead}>Education</Text>
                            <Text style={styles.profileboxcontent}>{this.state.peducation}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Profession</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pprofession}</Text>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Working With</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pworking_with}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>Annual Income</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pannual_income}</Text>
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
                            <Text style={styles.profiledetailhead}>State</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pstate}</Text>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profiledetailhead}>City</Text>
                            <Text style={styles.profileboxcontent}>{this.state.pcity}</Text>
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>

            </View>
            {this.contactview()}
            </Content>
            <Footer>
            <FooterTab>
            <Grid style={{backgroundColor:'#12a9a0',padding:5}}>
                  <Col size={1} onPress={() => (this.state.connect == 'Connect')?this.connect(this.state.id,this.state.umembership_plan):{}}>
                      <Row style={styles.profilelistsmallbox}>
                        <Icon name="check-square" style={styles.profilelisticon}/>
                        <Text style={styles.profilelistboxtext}>{this.state.connect}</Text>
                      </Row>
                  </Col>
                  <Col size={1} onPress={() => (this.state.shortlist == 'Shortlist')?this.shortlist(this.state.id):this.unlist(this.state.id)}>
                      <Row style={styles.profilelistsmallbox}>
                        <Icon name="star" style={[styles.profilelisticon,{marginLeft:20}]} />
                        <Text style={[styles.profilelistboxtext,{marginLeft:16}]}>{this.state.shortlist}</Text>
                      </Row>
                  </Col>
                  <Col size={1} onPress={() => this.chatverify(this.state.id,this.state.fcm_token,this.state.umembership_plan)}>
                      <Row style={styles.profilelistsmallbox}>
                        <Icon name="comment" style={styles.profilelisticon}/>
                        <Text style={styles.profilelistboxtext}>Chat</Text>
                      </Row>
                  </Col>
                  <Col size={1} onPress={() => this.contact(this.state.id,this.state.umembership_plan)}>
                      <Row style={styles.profilelistsmallbox}>
                        <Icon name="phone" style={styles.profilelisticon}/>
                        <Text style={styles.profilelistboxtext}>Contact</Text>
                      </Row>
                  </Col>
                </Grid>
            </FooterTab>
            </Footer>
            </Container>
        );
    }

}

module.export = Details;