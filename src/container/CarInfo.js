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
import _ from 'lodash';

export default class CarInfo extends Component {
  render() {
    return (
      <View style={{height: 200, width: 150, backgroundColor: 'white', borderColor: 'white', borderRadius: 5, borderWidth: 0.5, marginLeft: 20, borderColor: '#C0C0C0'}}>
        <View style={{alignItems: 'center', flex: 0.5, paddingTop: 20}}>
          <Image
            source={require('./gov.png')}
            style={{height: 50, width: 50}}
          />
        </View>
        <View style={{flex: 0.5, alignItems: 'flex-start'}}>
          <Text style={{fontWeight: 'bold', marginTop: 5, fontSize: 16, paddingLeft: 20}}>
            淘大商場
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 12,
              color: '#808080',
              paddingTop: 10,
              paddingLeft: 20,
            }}>
            空位：300
          </Text>
          <Text style={{marginTop: 10, paddingLeft: 20, fontSize: 12, color: '#C0C0C0'}}>
            3km
          </Text>
        </View>
      </View>
    );
  }
}
