import React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import 'react-native-gesture-handler';

import CarPark from './src/containers/CarPark';
import ParkDetail from './src/containers/ParkDetail';
import Search from './src/containers/Search';

function NotificationsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Home"
        component={CarPark}
        />
      <Stack.Screen
        name="Search"
        component={Search}
        />
      <Stack.Screen
        name="ParkDetail"
        component={ParkDetail}
        header={null}
        options={{
          headerStyle: {
            display: 'none',
          },
        }}
      />
    </Stack.Navigator>
  );
}

{/* <Drawer.Navigator initialRouteName="Home">
<Drawer.Screen name="Home" component={CarPark} options={{ title: 'My home' }} />
<Drawer.Screen 
  name="ParkDetail" 
  component={ParkDetail}  
  options={{ title: 'My home' }}/>
</Drawer.Navigator> */}


export default function App({props}) {
  return (
    <React.Fragment>
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
    </React.Fragment>
  );
}
