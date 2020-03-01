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
import {Card, ListItem, Icon} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';
import Geolocation from '@react-native-community/geolocation';
import _ from 'lodash';
import CarInfo from './CarInfo';
import BottomDrawer from 'rn-bottom-drawer';
import SwipeablePanel from '../components/SwipeablePanel'

class CarPark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      privateCarParks: [],
      carParkInfoArr: [],
      privateCarParkList: [],
      location: {},
      swipeablePanelActive: false
    };
  }

  async componentDidMount() {
    console.log('props', this.props);
    this.openPanel();
    this.findCoordinates();
    const carParkData = await axios.get(
      'https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy',
    );
    const carParkInfoData = await axios.get(
      'https://api.data.gov.hk/v1/carpark-info-vacancy?lang=zh_TW',
    );
    const carParkArr = carParkData.data.results;
    const carParkInfoArr = carParkInfoData.data.results;
    const privateCarParks = [];
    carParkArr.map(item => {
      item.privateCar[0].vacancy > 0 ? privateCarParks.push(item) : null;
    });

    // carParkInfoArr = _.intersectionWith(privateCarParks, carParkInfoArr, _.isEqual);
    console.log('carParkInfoArr', carParkInfoArr);
    this.setState({privateCarParks, carParkInfoArr});
  }

  findCoordinates() {
    Geolocation.getCurrentPosition(info => {
      console.log(info);
      const {coords} = info;
      const location = {latitude: coords.latitude, longitude: coords.longitude};
      this.setState({location});
    });
  }

  openPanel = () => {
    this.setState({ swipeablePanelActive: true });
  };

  closePanel = () => {
    this.setState({ swipeablePanelActive: false });
  };

  renderPrivateCarParkList() {
    console.log('carParkInfoArr', this.state.carParkInfoArr);
    const {privateCarParks, carParkInfoArr} = this.state;
    const privateCarParkList = [];
    privateCarParks.map(async item => {
      // const carParkData = await axios.get(`https://api.data.gov.hk/v1/carpark-info-vacancy?carparkIds=${item.park_Id}`);
      // const carPark = carParkData.data.results[0];
      // console.log(carPark);
      const targetCarParkInfo = _.find(carParkInfoArr, {park_Id: item.park_Id});
      privateCarParkList.push(
        <TouchableOpacity onPress={() => {}}>
          <Card title={targetCarParkInfo.name}>
            <Icon
              reverse
              name="ios-american-football"
              type="ionicon"
              color="#517fa4"
            />
            <Text>位置 {targetCarParkInfo.displayAddress}</Text>
            <Text>地區 {targetCarParkInfo.district}</Text>
            <Text>
              方位 {targetCarParkInfo.latitude}, {targetCarParkInfo.longitude}
            </Text>
          </Card>
        </TouchableOpacity>,
      );
    });
    // this.setState({privateCarParkList})
    return privateCarParkList;
  }

  render() {
    console.log(this.state.location);
    return (
      <SafeAreaView>
        <View
          style={{height: '100%'}}>
          <View >
            <View style={{height: '100%', backgroundColor: 'blue'}}>

            </View>
            {/* <MapView
              provider={PROVIDER_GOOGLE}
              style={{height: '90%', backgroundColor: 'red'}}
              initialRegion={{
                latitude: 22.2355456,
                longitude: 114.1547008,
                latitudeDelta: 0.1,
                longitudeDelta: 0.001,
              }}
              onRegionChange={(region) => this.setState({ region })}
              ></MapView> */}
            <SwipeablePanel stlye={{zIndex: 0}} />
          </View>

          {/* <View
            style={{
              flex: 0.4,
              justifyContent: 'center',
              backgroundColor: 'null',
              flexDirection: 'row',
            }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <CarInfo />
              <CarInfo />
              <CarInfo />
              <CarInfo />
              <CarInfo />
              <CarInfo />
            </ScrollView>
          </View> */}
          {/* {this.state.location} */}
          {/* {this.renderPrivateCarParkList()} */}
        </View>
        {/* <MapView
            provider={PROVIDER_GOOGLE}
            style={{height: '100%', backgroundColor: 'red'}}
            initialRegion={{
              latitude: 22.2355456,
              longitude: 114.1547008,
              latitudeDelta: 0.1,
              longitudeDelta: 0.001,
            }}
            onRegionChange={(region) => this.setState({ region })}
            >
              {this.state.carParkInfoArr.map((info, index) => {
                if (index <= 10) {
                console.log(info)
                return (<Marker
                  coordinate={{latitude:info.latitude, longitude: info.longitude}}
                  title={info.name}
                  description={info.description}
                />
               )} else return;
               }  
               )}
               <MapView.Circle
                center = {{latitude:22.2355456, longitude: 114.1547008}}
                radius = { 500 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                />
          </MapView> */}
      </SafeAreaView>
    );
  }
}

export default CarPark;
