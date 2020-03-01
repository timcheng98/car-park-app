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
  Dimensions
} from 'react-native';
import {Icon, ListItem} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion} from 'react-native-maps';
// import axios from 'axios';
// import _ from 'lodash';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.003;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class ParkDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinate: new AnimatedRegion({
        latitude: this.props.route.params.carInfo.latitude,
        longitude: this.props.route.params.carInfo.longitude,
      }),
    };
  }
  
  onRegionChange(region) {
    this.setState({latitude: region.latitude, longitude: region.longitude})
    console.log({region});
  }
  render() {
    const {distance, park_id, name, vacancy, address, district, contact, latitude, longitude, opening_status, park_type, nature} = this.props.route.params.carInfo;
console.log(this.props.route.params)
    return (
      <View
        style={{flex: 1}} 
      >
        {/* <View style={{flex: 0.3, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1 / 3, borderColor: '#C0C0C0', paddingTop: 30 }}> */}
          {/* <Image source={require('./parking.png')} style={{height: '80%', width: '80%', resizeMode: 'contain', color: 'red'}}/> */}
            <MapView
                showsMyLocationButton
                provider={PROVIDER_GOOGLE}
                style={{flex: 0.3, height: '50%'}}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                onRegionChangeComplete={(region) => {this.onRegionChange(region)}}
              >
                <Marker 
                  ref={marker => {
                    this.marker = marker;
                  }}
                  coordinate={{latitude: latitude, longitude: longitude}}
                >
                  <Image
                    source={require('./parkMarker.png')}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                </Marker>
          </MapView>
        {/* </View> */}
        <View style={{flex:0.3, flexDirection: 'column', backgroundColor: 'white', borderBottomWidth: 1/3, borderColor: '#bcbbc1'}}>
          <View style={{flex:0.8, alignItems: 'flex-start', alignContent: 'flex-start'}}>
            <View style={{flex: 0.4}}>
              <Text style={{fontSize: 20, fontWeight: '700', marginTop: 20, marginLeft: 20 }}>{name}</Text>
              <Text style={{fontSize: 12, fontWeight: '700', marginTop: 5, marginLeft: 20 }}>{nature}</Text>
              <Text style={{fontSize: 12, fontWeight: '700', marginTop: 5, marginLeft: 20 }}>{park_type}</Text>
              <Text style={{fontSize: 12, fontWeight: '700', marginTop: 5, marginLeft: 20 }}>{opening_status}</Text>
            </View>
          </View>
          <View style={{flex:0.5, flexDirection: 'row'}}>
            <View style={{flex: 1/3, }}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="navigation" color="blue" containerStyle={{borderWidth : 1 , borderRadius: 20, padding: 5, borderColor: 'blue'}} size={14}/>
                <Text style={{fontSize: 12, color: 'blue', marginTop: 10, alignSelf: 'center'}}>路線</Text>
              </View>
            </View>
            <View style={{flex: 1/3}}>
              <View style={{alignSelf: 'center'}}>
              <TouchableOpacity
              >
                <Icon type="MaterialIcons" name="my-location" color="blue" containerStyle={{borderWidth : 1 , borderRadius: 20, padding: 5, borderColor: 'blue'}} size={14}/>
                <Text style={{fontSize: 12, color: 'blue', marginTop: 10, alignSelf: 'center'}}>位置</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1/3}}>
              <View style={{alignSelf: 'center'}}>
                <Icon type="MaterialIcons" name="bookmark" color="blue" containerStyle={{borderWidth : 1 , borderRadius: 20, padding: 5, borderColor: 'blue'}} size={14}/>
                <Text style={{fontSize: 12, color: 'blue', marginTop: 10, alignSelf: 'center'}}>收藏</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{flex: 0.5, width: '100%', backgroundColor: 'white'}}>
          <View>
            <ListItem
              key={park_id}
              titleStyle={{fontSize: 12}}
              // leftAvatar={{ source: { uri: l.avatar_url } }}
              title={`${address}, ${district}`}
              leftIcon={(<Icon type="MaterialIcons" name="location-on" color="blue"/>)}
              bottomDivider
            />
            <ListItem
              key={park_id}
              titleStyle={{fontSize: 12}}
              // leftAvatar={{ source: { uri: l.avatar_url } }}
              title={contact}
              leftIcon={(<Icon type="MaterialIcons" name="local-phone" color="blue"/>)}
              bottomDivider
            />
          </View>
        </View>
      </View>
    );
  }
}

const list = [
  {
    name: '九龍九龍灣承豐路33號啟德郵輪碼頭1樓, 觀塘區',
    icon: 'location-on',
  },
  {
    name: '+852 3465 6888, 09:30-18:00 Mon-Fri, except public holiday',
    icon: 'local-phone',
  },
]

