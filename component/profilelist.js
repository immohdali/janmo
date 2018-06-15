import React, { Component } from 'react';
import { View, Text,Image, Dimensions, TouchableWithoutFeedback, FlatList,AsyncStorage, Modal  } from 'react-native';
import { Container, Content} from "native-base";

import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';
import Profilebox from './profilebox';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class ProfileList extends Component{

  constructor(props) {
    super(props);
      this.state = { 
        profilelistdata:[],
        userid:0,
        usertype:0,
        tab : (this.props.tab)?this.props.tab:0,
        searchdata : (this.props.data)?this.props.data:'',
        search : (this.props.data)?1:0,
        
      }
  }

  componentDidMount(){
      AsyncStorage.getItem('userid', (err, userid) => { 
        if(userid !== null){
            this.setState({
                userid : userid
            }, () =>  this._profilelistapi())
        }
      });
  }

  _profilelistapi(){
    if(this.state.tab != 0){
      if(this.state.search != 0){
        fetchapi({ 
            app: 'janmo',
            module: 'profilelist',
            tab:this.state.tab,
            userid:this.state.userid,
            search:this.state.search,
            religion:this.state.searchdata['religion'],
            gender:this.state.searchdata['gender'],
            profession:this.state.searchdata['profession'],
            stateid:this.state.searchdata['stateid'],
            caste:this.state.searchdata['caste']['id'],
            education:this.state.searchdata['education'],
            annual_income:this.state.searchdata['annual_income'],
            diet:this.state.searchdata['diet'],
            smoke:this.state.searchdata['smoke'],
            drink:this.state.searchdata['drink']
        })
        .then(response =>  this.setState({profilelistdata: response.data}));
    }else{
        fetchapi({ 
          app: 'janmo',
          module: 'profilelist',
          tab:this.state.tab,
          userid:this.state.userid
      })
      .then(response => this.setState({profilelistdata: response.data}));
    }
    }
  }

  

  _renderItem = ({item}) => {
    if(item.id){
        return(
            <Profilebox data={item} navigation={this.props.navigation}/>
        );
      }else{
        return(
            <View style={{flex:1,flexDirection: 'column',justifyContent: 'center',height:100,alignItems: 'center'}}>
                <Text style={{fontSize:20,color:'#e14c5d'}}>No Profile Found</Text>
            </View>
        )
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <Container>
        <Content style={{backgroundColor:'#fff'}}>
        <View style={{flex:1,padding:10}}>

              <FlatList
                data={this.state.profilelistdata}
                initialNumToRender={10}
                keyExtractor={(item, index) => (item.id ? item.id : "0")}
                renderItem={this._renderItem}
                />
            
        </View>
        </Content>
        </Container>
    );
  }


}

module.export = ProfileList;