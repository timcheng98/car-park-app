import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Icon} from 'react-native-elements';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import axios from 'axios';
// import _ from 'lodash';


export default class CarInfo extends Component {
  render() {
    const {distance, park_id, name, vacancy} = this.props.carPark;
    console.log('this.props', this.props);
    return (
      <View
        style={{
          height: 160,
          width: 240,
          backgroundColor: 'white',
          borderRadius: 20,
          borderWidth: 0,
          marginLeft: 20,
          // borderColor: '#C0C0C0',
          shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

        }}  
      >
        <View style={{flex: 0.6, flexDirection: 'row', borderBottomWidth: 1 / 3, borderColor: '#C0C0C0', }}>
          <View style={{flex:0.4, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', }}>
            <Image source={require('./parking.png')} style={{height: '60%', width: '60%', resizeMode: 'contain'}}/>
          </View>
          <View style={{flex:0.6, justifyContent: 'center'}}>
            <View style={{flexDirection: 'row',  alignItems: 'center', marginVertical: 5, marginRight: 20}}>
              <Image
                source={require('./carMap.png')}
                style={{width: 20, height: 20}}
                resizeMode="contain"
              />    
              <View style={{flex: 1, flexGrow: 1, width: 0}}>
              <Text style={{fontWeight: 'bold', fontSize: 14, paddingLeft: 5}}>
                {name}
              </Text>
              </View>           
            </View>   
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('./transportation.png')}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />          
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: 'black',
              paddingLeft: 5
            }}> {vacancy}
          </Text>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end', alignSelf: 'flex-end', paddingRight: 10}}>
          <Text style={{paddingLeft: 10, fontSize: 12, color: '#C0C0C0'}}>~{distance.toFixed(2)}m</Text>
          </View>       
          </View>
        </View>
        <View style={{flex: 0.4, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1/3, }}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="navigation" color="blue"  size={18}/>
              </View>
            </View>
            <View style={{flex: 1/3}}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="my-location" color="blue"  size={18} />
              </View>
            </View>
            <View style={{flex: 1/3}}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="bookmark" color="blue"  size={18}/>
              </View>
            </View>
            <View style={{flex: 1 / 4}}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="more-horiz" color="blue"  size={18}/>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
