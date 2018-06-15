import React, { Component } from 'react';
import { View, Text, Image, NetInfo, ScrollView, AsyncStorage, Platform, TextInput, Dimensions  } from 'react-native';
import { Container, Content, Card, CardItem, Body,Picker, Button, Footer, FooterTab } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { StackActions, NavigationActions } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';

import Toast from 'react-native-simple-toast';
import DatePicker from 'react-native-datepicker';
import ImagePicker from 'react-native-image-picker';

import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

var options = {
    title: 'Select a Photo',
    takePhotoButtonTitle:'Take a Photo',
    chooseFromLibraryButtonTitle:'Choose from gallery',
    quality:1
};

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
export default class Profile extends Component{

    state = { 
        connection:true,
        spinner : false,
        userdata:[],
        profileforlist:[],
        religionlist:[],
        castelist:[],
        mothertonguelist:[],
        genderlist:[],
        educationlist:[],
        professionlist:[],
        educationtypelist:[],
        workingwithlist:[],
        moonsignlist:[],
        statelist:[],
        citylist:[],
        annualincomelist:[],
        heightlist:[],
        weightlist:[],
        bloodlist:[], 
        complexionlist:[],
        bodytypelist:[],
        dietlist:[],
        maritalstatuslist:[],
        havechildrenlist:[],
        noofchildrenlist:[],
        userid:0,
        name:'',
        profile_for:'',
        dob:'',
        religion:'',
        caste:'',
        mother_tongue:'',
        gender:'',
        mobile:'',
        facebookurl:'',
        maritalstatus:'',
        havechildren:'',
        noofchildren:'',
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
        editprofile:true,
        photo:'',
        imagedata:'',
        fileName:'',
        membershipactive:1,
        mtitle:'',
        mmonths:'',
        mamount:'',
        mexpire:'',
        aadhar_no:'',
        aadharno:'',
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

        this._profilepickers();
        this._getstates();
        AsyncStorage.getItem('userid', (err, userid) => { 
            if(userid !== null){
                this.setState({
                    userid : userid
                }, () => this._profileapi(userid))
            }
        });  
    }

    _profilepickers(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'profilepickers'
            })
            .then(response => {
                if(response.data[0].profile_for){
                    this.setState({
                        profileforlist:response.data[0].profile_for,
                        religionlist:response.data[0].religion,
                        castelist:response.data[0].caste,
                        genderlist:response.data[0].gender,
                        mothertonguelist:response.data[0].mother_tongue,
                        educationlist:response.data[0].education,
                        professionlist:response.data[0].profession,
                        educationtypelist:response.data[0].educationtype,
                        workingwithlist:response.data[0].working_with,
                        moonsignlist:response.data[0].moonsign,
                        annualincomelist:response.data[0].annual_income,
                        heightlist:response.data[0].height,
                        weightlist:response.data[0].weight,
                        bloodlist:response.data[0].blood_group,
                        complexionlist:response.data[0].complexion,
                        bodytypelist:response.data[0].body_type,
                        dietlist:response.data[0].diet,
                        maritalstatuslist:response.data[0].maritalstatus,
                        havechildrenlist:response.data[0].havechildren,
                        noofchildrenlist:response.data[0].noofchildren
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
                stateid: this.state.stateid
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

    _profileapi(userid){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'myprofile',
                userid:userid
            })
            .then(response => this.setState({
                name:response.data[0].basic.name,
                profile_for:response.data[0].basic.profile_for,
                dob:response.data[0].basic.dob,
                religion:response.data[0].basic.religionid,
                caste:response.data[0].basic.caste,
                mother_tongue:response.data[0].basic.mother_tongueid,
                gender:response.data[0].basic.gender,
                mobile:response.data[0].basic.mobile,
                facebookurl:response.data[0].basic.facebook_url,
                maritalstatus:response.data[0].basic.marital_status,
                havechildren:response.data[0].basic.have_children,
                noofchildren:response.data[0].basic.no_of_children,
                photo:response.data[0].basic.photo,
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
        this._getmembership(userid)
    }


    _updateprofile(){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'updateprofile',
                userid:this.state.userid,
                name:this.state.name,
                profile_for:this.state.profile_for,
                dob:this.state.dob,
                religion:this.state.religion,
                caste:this.state.caste,
                mother_tongue:this.state.mother_tongue,
                gender:this.state.gender,
                facebookurl:this.state.facebookurl,
                maritalstatus:this.state.maritalstatus,
                havechildren:this.state.havechildren,
                noofchildren:this.state.noofchildren,
                description:this.state.description,
                education:this.state.education,
                aadhar_no:this.state.aadhar_no,
                profession:this.state.profession,
                occupation:this.state.occupation,
                education_field:this.state.education_field,
                working_with:this.state.working_with,
                annual_income:this.state.annual_income,
                employed_in:this.state.employed_in,
                height:this.state.height,
                blood_group:this.state.blood_group,
                complexion:this.state.complexion,
                body_type:this.state.body_type,
                spectacles:this.state.spectacles,
                weight:this.state.weight,
                smoke:this.state.smoke,
                drink:this.state.drink,
                diet:this.state.diet,
                father:this.state.father,
                father_details:this.state.father_details,
                mother:this.state.mother,
                mother_details:this.state.mother_details,
                no_of_brothers:this.state.no_of_brothers,
                brother_married:this.state.brother_married,
                no_of_sisters:this.state.no_of_sisters,
                sister_married:this.state.sister_married,
                gothra:this.state.gothra,
                manglik:this.state.manglik,
                moonsign:this.state.moonsign,
                horos_match:this.state.horos_match,
                place_of_birth:this.state.place_of_birth,
                time_of_birth:this.state.time_of_birth,
                country:this.state.country,
                state:this.state.stateid,
                city:this.state.city,
                village:this.state.village,
                taluka:this.state.taluka,
                district:this.state.district
            })
            .then(response => 
                this.setState({
                    editprofile:false
                }, () => Toast.show('Profile Successfully Updated'))
            );
        }
    }
    
    selectphoto(){
        ImagePicker.showImagePicker(options, (response) => {
           if (response.didCancel) {
              console.log('User cancelled image picker');
            }
            else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            }
            else {
              let source = { uri: response.uri };
              this.setState({
                spinner : true
              }, () => this.uploadimage(response.data,response.fileName))
            }
        });
    }

    uploadimage(imagedata,fileName){
        fetchapi({ 
            app: 'janmo',
            module: 'uploadimage',
            image:imagedata,
            fileName:fileName,
            userid:this.state.userid
        })
        .then(response => this.setState({photo:response.data[0].photo ,  spinner : false}))
        .catch((error)=>{ });
    }


    showimage(){
        if(this.state.photo != ''){
            let imgarr = this.state.photo.split(',');
            return imgarr.map((data,index) => {
            return (
                <View key={index} style={{flex:0,marginRight:10}}>
                <Image 
                    source={{ uri: global.BASE_URL +  data }}
                    style={{height:150,width:150,zIndex:0}}/>
                <Icon name="trash" onPress={() => this.deletephoto(data)} 
                style={{position:'absolute',zIndex:1,backgroundColor:'#fff',
                top:5,right:5,fontSize:16,borderRadius:50,paddingLeft:9,paddingRight:9,
                paddingTop:6,paddingBottom:6}}/>
                </View>
            )
            })
        }    
    }

    deletephoto(data){
        fetchapi({ 
            app: 'janmo',
            module: 'deletephoto',
            userid:this.state.userid,
            image:data
        })
        .then(response => this.setState({photo:response.data[0].photo}))
        .catch((error)=>{ });
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

    editprofile(){
        this.setState({
            editprofile: !this.state.editprofile
        })
    }

    updatecaste(id){
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'castelist',
                religion: id
            })
            .then(response => {
                this.setState({
                    castelist:response.data[0].caste
                })
            });
        }
    }

    showmarital(){
        if(this.state.maritalstatus != 'Never Married' && this.state.maritalstatus != ''){
            return(
                <View style={styles.profilesinglebox}>
                <View style={styles.profilesmallbox}>
                    <Text style={styles.profileboxhead}>Have Children </Text>
                    <Picker selectedValue={this.state.havechildren}
                        onValueChange={(itemValue, itemIndex) => this.setState({havechildren: itemValue , editprofile:true })}
                        style={styles.profileboxpicker} enabled={this.state.editprofile} >
                        {this.getpickers(this.state.havechildrenlist)} 
                    </Picker>
                </View>
                {this.noofchildren()}
                </View>
            )
        }
    }

    noofchildren(){
        if(this.state.havechildren != 'No'){
            return(
                <View style={styles.profilesinglebox}>
                <View style={[styles.profilesmallbox,{flex:1}]}>
                    <Text style={styles.profileboxhead}>No of Children</Text>
                    <Picker selectedValue={this.state.noofchildren}
                        onValueChange={(itemValue, itemIndex) => this.setState({noofchildren: itemValue , editprofile:true })}
                        style={styles.profileboxpicker} enabled={this.state.editprofile} >
                        {this.getpickers(this.state.noofchildrenlist)} 
                    </Picker>
                </View>
                </View>
            )
        }
    }

    _getmembership(userid){
        
        if(this.state.connection == true){
            fetchapi({ 
                app: 'janmo',
                module: 'usermembership',
                userid: userid
            })
            .then(response => {
                if(response.data[0].status == 1){
                    this.setState({
                        membershipactive:1,
                        mtitle:response.data[0].title,
                        mmonths:response.data[0].months,
                        mamount:response.data[0].amount,
                        mexpire:response.data[0].expire
                    })
                }else{
                    this.setState({
                        membershipactive:0
                    })
                }
            })
        }
    }

    membershipshow(){
        if(this.state.membershipactive == 1){
            return(
                <View>
                    <View style={styles.profileeditlinebox}>
                        <Text style={styles.profileheadline}>Your Plan Details</Text>
                    </View>
                    <Card>
                        <CardItem>
                        <Body>
                        <View>
                                <View style={{flex:1,flexDirection:'row',justifyContent:'space-around'}}>
                                    <Text style={{fontSize:16,fontWeight:'bold',marginRight:deviceWidth*20/100,marginLeft:2}}>{this.state.mtitle} ({this.state.mmonths} months)</Text>
                                    <Text style={{fontSize:16,fontWeight:'bold',color:'red'}}>Rs. {this.state.mamount}/-</Text>
                                </View>
                            <Text style={{marginTop:10}}>Expiry Date: {this.state.mexpire}</Text>
                        </View>
                        </Body>
                        </CardItem>
                    </Card>
                </View>
            )
        }else{
            return(
                <View>
                    <Text style={{padding:10,backgroundColor:'#12a9a0',color:'#fff',flex:1,textAlign:'center',fontWeight:'bold'}}
                        onPress={() => this.props.navigation.navigate('Membership')} >Upgrade Your Plan</Text>
                </View>
            )
        }
    }

    aadharverify(){
        if(this.state.aadharno != ''){
            console.warn(this.state.aadharno)
            fetchapi({ 
                app: 'janmo',
                module: 'aadharverify',
                userid:this.state.userid,
                aadharno:this.state.aadharno
            })
            .then(response => 
                {
                    if(this.state.data.status == 1){
                        this.setState({
                            refresh:1
                        })
                    }
                    Toast.show('Profile Successfully Updated')
                }
            );
        }
    }

    aadharbox(){
        if(this.state.aadhar_no == ''){
       // setTimeout(() => {
            return(
            <Card>
                <CardItem>
                <Body>
                    
                    <View style={[styles.profilesmallbox,{flex:1,flexDirection:'row',justifyContent:'space-between', width:deviceWidth*85/100}]}>
                        <TextInput
                        value={this.state.aadharno}
                        maxLength = {16}
                        keyboardType="numeric"
                        placeholder={'Aadhar Number '}
                        onChangeText={(text) => this.setState({ aadharno : text})}
                        style={[styles.profileboxcontent,{flex:1}]}
                        />
                        <Text
                        onPress={() => this.aadharverify()}
                        style={{backgroundColor:'green',color:'#fff',height:30,paddingTop:5,paddingBottom:2,paddingRight:8,paddingLeft:8,marginTop:5}}>Update</Text>
                    </View>
                </Body>
                </CardItem>
            </Card>
        ) //}, 1000);
        }else{
            return(
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingTop:7,paddingBottom:7,backgroundColor:'green',marginTop:5,marginBottom:5}}>
                <Text style={{fontSize:16,color:'#fff',fontWeight:'bold'}} >Aadhar Verified</Text>
            </View>)
        }
       
    }

    editupdateicon(){
        if(this.state.editprofile == true){
            return(
                <Text>Update</Text>
            )
        }else{
            return(
                <Text>Edit</Text>
            )
        }
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
                        <Text style={{color:'#fff',fontSize:18}}>Profile</Text>
                    </Row>
                </Col>
            </Grid>
            </View>

            <View style={{flex:1,flexDirection:'row',padding:10,justifyContent:'center'}}>
                <Text style={{padding:5,paddingLeft:20,paddingRight:20,fontWeight:'bold',color:'#fff',backgroundColor:'#12a9a0'}}
                >My Profile</Text>
                <Text style={{padding:5,paddingLeft:20,paddingRight:20,fontWeight:'bold',color:'#12a9a0',borderWidth:1,borderColor:'#12a9a0'}}
                onPress={() => navigate('Partnerprofile')}>Partner</Text>
            </View>

             <View style={{margin:10,flex:1,flexDirection:'row'}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} scrollEventThrottle={10} pagingEnabled  >
                    {this.showimage()}
                </ScrollView>
            </View>
            <View style={{flex:1,flexDirection:'row',justifyContent:'center',paddingLeft:10,paddingRight:10}}>
                <Text style={{padding:10,backgroundColor:'#12a9a0',color:'#fff',flex:1,textAlign:'center',fontWeight:'bold'}}
                onPress={this.selectphoto.bind(this)} >Add Photo</Text>
            </View>
        
            <View style={{flex:1,padding:10}}>

                
                {this.membershipshow()}

                {this.aadharbox()}
              
                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Basic Information</Text>
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Name</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.name}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => this.setState({ name : text})}
                            style={styles.profileboxcontent}
                            />
                          
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Profile For</Text>
                            <Picker selectedValue={this.state.profile_for}
                                onValueChange={(itemValue, itemIndex) => this.setState({profile_for: itemValue, editprofile:true})}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.profileforlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>DOB</Text>
                       
                            <DatePicker
                                //disabled={!this.state.editprofile}
                                style={{width:120,borderWidth:0,borderColor:'#fff',backgroundColor:'#fff'}}
                                date={this.state.dob}
                                mode="date"
                                showIcon={false}
                                placeholder="Select Date"
                                format="DD-MMM-YYYY"
                                minDate="01-01-1900"
                                maxDate="31-12-2000"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({dob: date})}}
                            />
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Religion </Text>
                            <Picker selectedValue={this.state.religion}
                                onValueChange={(itemValue, itemIndex) => this.setState({religion: itemValue , editprofile:true }, () => this.updatecaste(itemValue))}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.religionlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Mother Tongue</Text>
                            <Picker selectedValue={this.state.mother_tongue}
                                onValueChange={(itemValue, itemIndex) => this.setState({mother_tongue: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.mothertonguelist)} 
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Caste </Text>
                            <Picker selectedValue={this.state.caste}
                                onValueChange={(itemValue, itemIndex) => this.setState({caste: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.castelist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Mobile</Text>
                            <TextInput editable={false}
                            value={this.state.mobile}
                            onChangeText={(text) => this.setState({ mobile : text})}
                            style={styles.profileboxcontent}
                            />
                        </View>
                        
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Gender</Text>
                            <Picker selectedValue={this.state.gender}
                                onValueChange={(itemValue, itemIndex) => this.setState({gender: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.genderlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,{flex:1}]}>
                            <Text style={styles.profileboxhead}>Facebook URL</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.facebookurl}
                            onChangeText={(text) => this.setState({ facebookurl : text})}
                            style={[styles.profileboxcontent,{width:deviceWidth*80/100}]}
                            />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Marital Status</Text>
                            <Picker selectedValue={this.state.maritalstatus}
                                onValueChange={(itemValue, itemIndex) => this.setState({maritalstatus: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.maritalstatuslist)} 
                            </Picker>
                        </View>
                        </View>
                        {this.showmarital()}
                       
                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>About Me</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <TextInput editable={this.state.editprofile}
                            value={this.state.description}
                            multiline = {true}
                            numberOfLines = {4}
                            onChangeText={(text) => this.setState({ description : text})}
                            style={{flex:1,width:deviceWidth-60}}
                        />
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
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Education</Text>
                            <Picker selectedValue={this.state.education}
                                onValueChange={(itemValue, itemIndex) => this.setState({education: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.educationlist)} 
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
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
                            <Text style={styles.profileboxhead}>Occupation</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.occupation}
                            onChangeText={(text) => this.setState({ occupation : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Education Field</Text>
                            <Picker selectedValue={this.state.education_field}
                                onValueChange={(itemValue, itemIndex) => this.setState({education_field: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.educationtypelist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Working With</Text>
                            <Picker selectedValue={this.state.working_with}
                                onValueChange={(itemValue, itemIndex) => this.setState({working_with: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                 {this.getpickers(this.state.workingwithlist)} 
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Annual Income</Text>
                            <Picker selectedValue={this.state.annual_income}
                                onValueChange={(itemValue, itemIndex) => this.setState({annual_income: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.annualincomelist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={[styles.profilesinglebox,{width:deviceWidth*90/100}]}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Employed In </Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.employed_in}
                            onChangeText={(text) => this.setState({ employed_in : text})}
                            style={[styles.profileboxcontent,{width:deviceWidth*80/100}]} />
                        </View>
                        </View>
                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Physical Attribute</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Height</Text>
                            <Picker selectedValue={this.state.height}
                                onValueChange={(itemValue, itemIndex) => this.setState({height: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.heightlist)} 
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Blood Group</Text>
                            <Picker selectedValue={this.state.blood_group}
                                onValueChange={(itemValue, itemIndex) => this.setState({blood_group: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.bloodlist)}
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Complexion</Text>
                            <Picker selectedValue={this.state.complexion}
                                onValueChange={(itemValue, itemIndex) => this.setState({complexion: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.complexionlist)}
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Body Type</Text>
                            <Picker selectedValue={this.state.body_type}
                                onValueChange={(itemValue, itemIndex) => this.setState({body_type: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.bodytypelist)}
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Spectacles </Text>
                            <Picker selectedValue={this.state.spectacles}
                                onValueChange={(itemValue, itemIndex) => this.setState({spectacles: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Weight</Text>
                            <Picker selectedValue={this.state.weight}
                                onValueChange={(itemValue, itemIndex) => this.setState({weight: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.weightlist)} 
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Smoke</Text>
                            <Picker selectedValue={this.state.smoke}
                                onValueChange={(itemValue, itemIndex) => this.setState({smoke: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Drink </Text>
                            <Picker selectedValue={this.state.drink}
                                onValueChange={(itemValue, itemIndex) => this.setState({drink: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Diet </Text>
                            <Picker selectedValue={this.state.diet}
                                onValueChange={(itemValue, itemIndex) => this.setState({diet: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.dietlist)} 
                            </Picker>
                        </View>
                        </View>
                    </Body>
                    </CardItem>
                </Card>

                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Family Details</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Father</Text>
                            <Picker selectedValue={this.state.father}
                                onValueChange={(itemValue, itemIndex) => this.setState({father: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                            </Picker>
                        </View>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Father Details</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.father_details}
                            onChangeText={(text) => this.setState({ father_details : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={[styles.profilesmallbox,styles.profileborder]}>
                            <Text style={styles.profileboxhead}>Mother</Text>
                            <Picker selectedValue={this.state.mother}
                                onValueChange={(itemValue, itemIndex) => this.setState({mother: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Mother Details</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.mother_details}
                            onChangeText={(text) => this.setState({ mother_details : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>No. of Brothers</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.no_of_brothers}
                            keyboardType="numeric"
                            maxLength={2}
                            onChangeText={(text) => this.setState({ no_of_brothers : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Brother Married</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.brother_married}
                            onChangeText={(text) => this.setState({ brother_married : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>No. of Sisters</Text>
                            <TextInput editable={this.state.editprofile}
                            keyboardType="numeric"
                            maxLength={2}
                            value={this.state.no_of_sisters}
                            onChangeText={(text) => this.setState({ no_of_sisters : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Sister Married</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.sister_married}
                            onChangeText={(text) => this.setState({ sister_married : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                    </Body>
                    </CardItem>
                </Card>


                <View style={styles.profileeditlinebox}>
                    <Text style={styles.profileheadline}>Horoscope Details</Text>
                    
                </View>
                <Card>
                    <CardItem>
                    <Body>
                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Gothra</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.gothra}
                            onChangeText={(text) => this.setState({ gothra : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Manglik</Text>
                            <Picker selectedValue={this.state.manglik}
                                onValueChange={(itemValue, itemIndex) => this.setState({manglik: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                                <Picker.Item label={'Not Applicable'} value={'Not Applicable'} />
                            </Picker>
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Moonsign</Text>
                            <Picker selectedValue={this.state.moonsign}
                                onValueChange={(itemValue, itemIndex) => this.setState({moonsign: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.moonsignlist)}
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Place Of Birth</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.place_of_birth}
                            onChangeText={(text) => this.setState({ place_of_birth : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Horos Match</Text>
                            <Picker selectedValue={this.state.horos_match}
                                onValueChange={(itemValue, itemIndex) => this.setState({horos_match: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                <Picker.Item label={'Yes'} value={'Yes'} />
                                <Picker.Item label={'No'} value={'No'} />
                                <Picker.Item label={'Not Applicable'} value={'Not Applicable'} />
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Time Of Birth</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.time_of_birth}
                            onChangeText={(text) => this.setState({ time_of_birth : text})}
                            style={styles.profileboxcontent} />
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
                            <Text style={styles.profileboxhead}>Country</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.country}
                            onChangeText={(text) => this.setState({ country : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Village</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.village}
                            onChangeText={(text) => this.setState({ village : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>State</Text>
                            <Picker selectedValue={this.state.stateid}
                                onValueChange={(itemValue, itemIndex) => this.setState({stateid: itemValue , editprofile:true },
                                () => this._getstates())}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.statelist)}
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>Taluka</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.taluka}
                            onChangeText={(text) => this.setState({ taluka : text})}
                            style={styles.profileboxcontent} />
                        </View>
                        </View>

                        <View style={styles.profilesinglebox}>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>City</Text>
                            <Picker selectedValue={this.state.city}
                                onValueChange={(itemValue, itemIndex) => this.setState({city: itemValue , editprofile:true })}
                                style={styles.profileboxpicker} enabled={this.state.editprofile} >
                                {this.getpickers(this.state.citylist)}
                            </Picker>
                        </View>
                        <View style={styles.profilesmallbox}>
                            <Text style={styles.profileboxhead}>District</Text>
                            <TextInput editable={this.state.editprofile}
                            value={this.state.district}
                            onChangeText={(text) => this.setState({ district : text})}
                            style={styles.profileboxcontent} />
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
            <Spinner visible={this.state.spinner} animation="fade" textStyle={{color: '#FFF'}} color="#e14c5d" overlayColor="rgba(0, 0, 0, 0)" />
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