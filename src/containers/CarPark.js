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
import {Button} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
// import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';
import CarInfo from './CarInfo';
import Geocoder from 'react-native-geocoder';

Geocoder.fallbackToGoogle('AIzaSyDp508Nj0vkRzXdlcBlz3Jun5UgzopOKXw');

import SwipeablePanel from '../components/SwipeablePanel';

class CarPark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateCarParks: [],
      carParkInfoArr: [],
      privateCarParkList: [],
      nearbyArr: [],
      location: {},
    };
  }

  async componentDidMount() {
    console.log('props', this.props);
    // this.findCoordinates();
    const carParkData = await axios.get(
      'https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy',
    );
    const carParkInfoData = await axios.get(
      'https://api.data.gov.hk/v1/carpark-info-vacancy?lang=zh_TW',
    );

    const nearbyData = await axios.get(
      'http://192.168.2.240:3000/api/car-park/nearby',
    );
    const carParkArr = carParkData.data.results;
    const carParkInfoArr = carParkInfoData.data.results;
    const nearbyArr = nearbyData.data.results;
    const privateCarParks = [];
    carParkArr.map(item => {
      item.privateCar[0].vacancy > 0 ? privateCarParks.push(item) : null;
    });
    // carParkInfoArr = _.intersectionWith(privateCarParks, carParkInfoArr, _.isEqual);
    this.setState({privateCarParks, carParkInfoArr, nearbyArr});
  }

  // findCoordinates() {
  //   Geolocation.getCurrentPosition(info => {
  //     console.log(info);
  //     const {coords} = info;
  //     const location = {latitude: coords.latitude, longitude: coords.longitude};
  //     this.setState({location});
  //   });
  // }

  onRegionChange(region) {
    this.setState({latitude: region.latitude, longitude: region.longitude})
    console.log({region});
  }


  renderNearby() {
    let nearby = []
    this.state.nearbyArr.map(item => {
      nearby.push(
        <TouchableOpacity onPress={() => this.props.navigation.navigate('ParkDetail', {carInfo: item })}><CarInfo carPark={item} /></TouchableOpacity>
      )
    })
    return nearby;
  }


  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
          {/* <StatusBar translucent backgroundColor="transparent" /> */}
            <View style={{backgroundColor: '', height: '100%'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Search')}
            >
              <Text>213</Text>
            </TouchableOpacity>
              {/* <MapView
                // showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                style={{height: '100%', backgroundColor: 'red'}}
                initialRegion={{
                  latitude: 22.2355456,
                  longitude: 114.1547008,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.001,
                }}
                onRegionChangeComplete={(region) => {this.onRegionChange(region)}}
              >
                {this.state.carParkInfoArr.map(item => {
                  return (
                    <Marker 
                      coordinate={{latitude: item.latitude, longitude: item.longitude}}
                    >
                      <Image
                        source={require('./parkMarker.png')}
                        style={{width: 20, height: 20}}
                        resizeMode="contain"
                      />
                    </Marker>
                  )
                })}
                <Marker />
              </MapView> */}
              <View style={{zIndex: 99, position: 'absolute', bottom: '3%'}}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingEnd: 20}}>
                  {this.renderNearby()}
                  {/* <CarInfo /> */}
                  {/* <CarInfo /> */}
                </ScrollView>
              </View>
          </View>
      </SafeAreaView>
    );
  }
}

const CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

export default CarPark;
