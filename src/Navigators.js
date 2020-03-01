import React from 'react';
import {createDrawerNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import CarPark from './container/CarPark';

export const CarParkNavigator = createStackNavigator(
  {
    CarPark
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export const DrawerNavigator = createDrawerNavigator(
  {
    Home: CarParkNavigator,
    CarPark: CarParkNavigator,
  },
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    defaultNavigationOptions: {
      header: null
    },
    drawerBackgroundColor: '#FFF',
    contentComponent: DrawerContent,
    contentOptions: {
      activeTintColor: '#707070',
      activeLabelStyle: {
        fontWeight: '400'
      },
      inactiveLabelStyle: {
        fontWeight: '200'
      }
    }
  }
);
