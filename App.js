import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/EvilIcons';

import CameraScreen from './src/screens/CameraScreen';
import DiaryScreen from './src/screens/DiaryScreen';
import UploadImageScreen from './src/screens/UploadImageScreen';
import UserScreen from './src/screens/UserScreen';

// console.disableYellowBox = true;

const tabNavigator = createMaterialBottomTabNavigator(
  {
    Camera: {
      screen: CameraScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='camera'
            size={28}
            color={focused ? '#2bbd7e' : '#c6c6c6'}
          />
        ),
      },
    },
    Upload: {
      screen: UploadImageScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon name='plus' size={28} color={focused ? '#2bbd7e' : '#c6c6c6'} />
        ),
      },
    },
    Diary: {
      screen: DiaryScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon
            name='chart'
            size={28}
            color={focused ? '#2bbd7e' : '#c6c6c6'}
          />
        ),
      },
    },
    User: {
      screen: UserScreen,
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
          <Icon name='user' size={28} color={focused ? '#2bbd7e' : '#c6c6c6'} />
        ),
      },
    },
  },
  {
    shifting: true,
    initialRouteName: 'Diary',
    // activeColor: '#FFF',
    barStyle: { backgroundColor: '#f9f9f9' },
  },
);

const App = createAppContainer(tabNavigator);

export default App;
