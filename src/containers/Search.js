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
  Dimensions,
} from 'react-native';
import {Icon, ListItem, SearchBar} from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE, Marker, AnimatedRegion} from 'react-native-maps';
import axios from 'axios';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: [],
      keyword: 'ma'
    };
  }

  async componentDidUpdate(prevPros, prevState) {
    console.log('currentstate', this.state.keyword);
    console.log('prevstate', prevState.keyword);
    if (prevState.keyword !== this.state.keyword) {
      let data = await axios.get(`http://192.168.2.240:3000/api/search?keyword=${this.state.keyword}`);
      this.setState({location: data.data.parks})
    }
 
  }

  async componentDidMount() {
    let data = await axios.get(`http://192.168.2.240:3000/api/search?keyword=${this.state.keyword}`);
    console.log(data.data.parks);
    this.setState({location: data.data.parks})
    console.log('test')
  }
    render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <SearchBar
                onChangeText={(e) => this.setState({keyword: e})}
                lightTheme
                value={this.state.keyword}
                ref='searchBar'
                placeholder="搜尋"
                containerStyle={{backgroundColor: 'white'}}
                inputContainerStyle={{ height: 20}}
                showsCancelButtonWhileEditing={false}
              />
          <FlatList
        data={this.state.location}
        renderItem={({ item }) =>
         (
          <ListItem
            title={item.name}
            subtitle={item.address}
            bottomDivider
            />
         )
        }
        keyExtractor={item => item.park_id}
      />
          </SafeAreaView>
    )
  }
}

export default Search;