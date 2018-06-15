import React, { Component } from 'react';
import { View, Text, Image, Dimensions, Modal, Platform, TouchableHighlight, AsyncStorage, WebView, NativeModules } from 'react-native';
import { Container, Content, Picker } from "native-base";

import { Col, Row, Grid } from "react-native-easy-grid";
import Icon from 'react-native-fa-icons';
import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import styles from '../css/style';
import { fetchapi } from '../config/functions';
import global from '../config/global';

import * as RNIap from 'react-native-iap';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default class Membershipbox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: 0,
            data: (this.props.data) ? this.props.data : '',
            plan: this.props.data.id,
            title: this.props.data.title,
            month: this.props.data.month,
            amount: this.props.data.amount,
            productid: this.props.data.productid,
            productids: this.props.data.productids,
            paymentmode: false,
            progressTitle: '0'
        }
    }


    componentDidMount() {
        //this.getproductids()
        AsyncStorage.getItem('userid', (err, userid) => {
            if (userid !== null) {
                this.setState({
                    userid: userid
                })
            }
        });
    }


    /*async getproductids(){
        
        try {
            await RNIap.prepare();
            const products = await RNIap.getProducts(this.state.productids);
            console.warn( products );
          } catch(err) {
            console.warn(err); // standardized err.code and err.message available
          }
    } */
    monthpicker(months) {
        return months.map((data, i) => {
            return <Picker.Item key={i} value={data} label={data + ' Months'} />
        });
    }

    updatedata(month, title) {
        fetchapi({
            app: 'janmo',
            module: 'plandetails',
            month: month,
            title: title
        })
            .then(response => this.setState({
                amount: response.data[0].amount,
                plan: response.data[0].plan,
                productid: response.data[0].productid
            }))
            .catch((error) => { });
    }

    /* buyplan(){
         
         fetchapi({ 
             app: 'janmo',
             module: 'applypackages',
             plan:this.state.plan,
             userid:this.state.userid
         })
         .then(response => 
             this.setState({paymenturl: response.data[0].url,paymentmode:true})
         )
         .catch((error)=>{ });
     } */

    async buyplan() {
        try {
            await RNIap.prepare();
            //const products = await RNIap.getProducts([`${this.state.productid}`]);
            const products = await RNIap.getProducts([ this.state.productid ]);
            console.warn(products)
            RNIap.buyProduct(this.state.productid).then(purchase => {
                Toast.show("Payment Successfully Completed");
            }).catch(err => {
                // Toast.show("Payment Transaction Failed");
                console.warn(err);
                alert(err);
            })
        } catch (err) {
            //console.warn(err);
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        let item = this.state.data;
        return (
            <View style={{ height: 280 }}>
                <Image source={require('../img/dolli.png')} style={styles.dolli} />
                <View style={styles.dollibox}>
                    <Text style={styles.dollititle}>{item.title}</Text>
                    <Picker selectedValue={this.state.month}
                        onValueChange={(itemValue, itemIndex) => this.setState({ month: itemValue }, () => this.updatedata(itemValue, item.title))}
                        style={styles.dollipicker}  >
                        {this.monthpicker(item.months)}
                    </Picker>
                    <Text style={styles.dolliprice}>Rs {this.state.amount}</Text>
                    <Text style={styles.selectbtn}
                        onPress={() => this.buyplan()}>Buy Now</Text>
                </View>
                {this.paymentview()}
            </View>
        );
    }

    setModalVisible(visible) {
        this.setState({ paymentmode: visible });
    }

    paymentview() {
        return (
            <Modal animationType={"slide"} transparent={false}
                visible={this.state.paymentmode}
                onRequestClose={() => { this.setModalVisible(false) }}
                style={{ backgroundColor: '#000' }}>
                <View style={{ height: (Platform.OS === 'ios') ? 60 : 50 }}>

                    <Row>
                        <Col size={1}>
                            <TouchableHighlight onPress={() => this.setModalVisible(false)} >
                                <Icon
                                    name="arrow-left" style={{ marginTop: 10, marginLeft: 10, fontSize: 24, width: 40, color: '#000', height: 40 }} />
                            </TouchableHighlight>
                        </Col>
                        <Col size={3}>
                            <Text style={{ fontSize: 22, marginTop: (Platform.OS === 'ios') ? 25 : 10, marginLeft: (Platform.OS === 'ios') ? -20 : -10, fontWeight: 'bold', color: '#000' }}>Payment</Text>
                        </Col>
                    </Row>

                </View>
                <WebView
                    javaScriptEnabled={true}
                    source={{ uri: this.state.paymenturl }}
                    style={{ height: deviceHeight, width: deviceWidth }}
                    onMessage={(event) => this.onMessage(event.nativeEvent.data)}
                />

            </Modal>
        );
    }

    updatemembershiptype() {
        fetchapi({
            app: 'janmo',
            module: 'updatemembershiptype',
            userid: this.state.userid
        }).then(response => {
            AsyncStorage.setItem('membership_plan', String(response.data.data.membership_plan));
        })
    }

    onMessage(data) {
        if (data == '1') {
            Toast.show("Payment Successfully Completed");
            { this.updatemembershiptype() }
            this.props.navigation.navigate('Profile');
            this.setModalVisible(false);
        } else {
            this.setModalVisible(false);
            Toast.show("Payment Transaction Failed");
        }
    }
}

module.export = Membershipbox;