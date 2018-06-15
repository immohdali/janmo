import {StyleSheet} from 'react-native';
import { Platform, Dimensions } from "react-native";
import res from './responsive';
 
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

module.exports = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch',
        width:deviceWidth,
        height:deviceHeight
    },
    container: {
        flex: 1
    },
    backgroundImage2: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch',
        position:'absolute',
        top:-20,
        width:deviceWidth,
        height:deviceHeight,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    dollibg: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch',
        position:'absolute',
        top:-20,
        width:deviceWidth,
        height:deviceHeight,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },
    dolli: {
        flex: 1,
        resizeMode: 'stretch', // or 'stretch',
        position:'absolute',
        width:deviceWidth,
        height:280
    },
    dollibox:{
        width:deviceWidth*39/100,
        backgroundColor:'#fff',
        height:114,
        position:'relative',
        top:103,
        left:deviceWidth*31/100,
        alignItems:'center'
    },
    dollititle:{
        fontSize:18,
        textAlign:'center',
        fontWeight:'bold',
        color:'#333'
    },
    dollipicker:{
        width:deviceWidth*30/100,
        height:30
    },
    dolliprice:{
        fontSize:16,
        fontWeight:'bold',
        color:'#e91e63'
    },
    dolligst:{
        fontSize:10,
        fontWeight:'bold'
    },
    selectbtn:{
        backgroundColor:'#00ada9',
        color:'#fff',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        marginTop:7
    },
    splashlogo:{
        marginTop:deviceHeight*35/100,
        width:200,
        height:200
    },
    logo:{
        marginTop:deviceHeight*20/100
    },
    lgbody:{
        marginLeft:deviceWidth*15/100,
        marginRight:deviceWidth*15/100
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:Style.DEVICE_HEIGHT*6/100,
        marginBottom:10,
        borderBottomColor: '#ddd',
        borderBottomWidth:1
    },
    loginicon: {
        marginRight:5,
        fontSize:17,
        marginBottom: -10,
        color:'#666'
    },
    mobileicon:{
        fontSize:30
    },
    loginfooterlink:{
        fontSize:Style.FONT_SIZE_SMALLER,
        fontWeight:'bold'
    },
    logininput:{
        flex:1,
        fontSize:14,
        paddingBottom: 0,
        color:'#000',
        textAlign:'center',
        marginLeft:-20,
    },
    loginbtn:{
        backgroundColor:'#00ada9',
        textAlign:'center',
        color:'#fff',
        padding:10,
        fontSize:12,
        marginTop:10,
        borderRadius:50
    },
    registerbtn:{
        backgroundColor:'#c22127',
        textAlign:'center',
        color:'#fff',
        padding:10,
        fontSize:12,
        marginTop:10,
        borderRadius:50
    },
    profilelistphoto:{
        height:400,
        maxWidth:deviceWidth-20,
        //resizeMode: 'stretch', // or 'stretch',
        borderRadius:5,
        backgroundColor:'#f1f1f1'
    },
    blurprofile:{
        position:'absolute',
        opacity: 0.95,
        height:400,
        maxWidth:deviceWidth-20,
    },
    profilephoto:{
        height:deviceHeight*50/100,
        maxWidth:deviceWidth-20,
        resizeMode: 'stretch', // or 'stretch',
        borderRadius:5,
        backgroundColor:'#f1f1f1'
    },
    profilelisttext:{
        fontSize:12,
        color:'#fff',
        paddingLeft:5,
        paddingBottom:2,
        paddingTop:2,
        
    },
    profilelistsmallbox:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        padding:3
    },
    changepassword:{
        borderWidth:1,
        borderColor: '#bbb',
        paddingLeft:20,
        paddingRight:20,
        paddingTop:5,
        paddingBottom:5,
        marginTop:10
    },
    profilelisticon:{
        color:'#fff',
        fontSize:18,
        marginBottom:5
    },
    profilelistboxtext:{
        color:'#fff',
        fontSize:(Platform.OS == 'ios')?Style.FONT_SIZE_SMALLER2:Style.FONT_SIZE_SMALL
    },
    profileheadlinebox:{
        padding:10
    },
    sidebaricon:{
        fontSize: 16,
        width:30,
        color:'#666',
        marginTop:1
    },
    sidebartext:{
        color:'#666',
        fontSize:14,
        fontWeight:'bold',
        width:deviceWidth
    },
    profileeditlinebox:{
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between',
        padding:10
    },
    profileheadline:{
        fontSize: 14,
        color:'#f70000'
    },
    profiledetailhead:{
        fontWeight: 'bold',
        marginBottom:10,
        fontSize: 14,
    },
    profilesinglebox:{
        flex:1,
        flexDirection:'row',
        marginBottom:15
    },
    profilesmallbox:{
        width:deviceWidth*40/100
    },
    profileborder:{
        borderBottomColor:'#eee',
        borderBottomWidth:1
    },
    profileboxhead:{
        fontWeight: 'bold',
    },
    profileboxcontent:{
        fontSize:14,
      //  color:'#000',
        margin:0,
        height:40,
        borderBottomColor:'#eee',
        borderBottomWidth:1,
        width:deviceWidth*40/100
    },
    profileboxpicker:{
        //color:'#000',
        margin:0,
        height:40,
        borderBottomColor:'#eee',
        borderBottomWidth:(Platform.OS == 'ios')?1:0,
        width:deviceWidth*40/100
    },
    searchpicker:{
        flex:1,
        color:'#000',
        height:30
    },
    searchpickerbox:{
        flex:1
    },
    leftmsg:{
        alignSelf: 'flex-start',
        backgroundColor:'#f0f0f0',
        padding:5,
        paddingLeft:10,
        paddingRight:10,
        marginTop:5,
        marginBottom:5,
        shadowColor: '#000',
        elevation: 0.5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        marginLeft:5,
        marginRight:10
    },
    rightmsg:{
        backgroundColor:'#00ada9',
        padding:5,
        alignSelf: 'flex-end',
        paddingRight:10,
        paddingLeft:10,
        marginTop:5,
        marginBottom:5,
        shadowColor: '#000',
        elevation: 0.5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        marginRight:5,
        marginLeft:10
    },

});