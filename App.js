import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import {Image, StatusBar} from 'react-native';
import Local from './src/screens/Local';
import AddPost from './src/screens/AddPost';
import Notification from './src/screens/notification';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#013220" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarIcon: ({focused, color, size}) => {
              let iconSource;

              if (route.name === 'Discover') {
                iconSource = require('./src/assets/icons/compass.png');
              } else if (route.name === 'Local') {
                iconSource = require('./src/assets/icons/location.png');
              } else if (route.name === 'Add') {
                iconSource = require('./src/assets/icons/add.png');
              } else if (route.name === 'Alert') {
                iconSource = require('./src/assets/icons/bell.png');
              } else if (route.name === 'Profile') {
                iconSource = require('./src/assets/icons/profile-user.png');
              }

              return (
                <Image
                  source={iconSource}
                  style={{
                    height: 15,
                    width: 16,
                    tintColor: focused ? '#007bff' : 'gray',
                  }}
                />
              );
            },
            tabBarActiveTintColor: '#007bff', // Active icon color
            tabBarInactiveTintColor: 'gray', // Inactive icon color
            tabBarStyle: {backgroundColor: '#fff'}, // Background color
          })}>
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Local" component={Local} />
          <Tab.Screen name="Add" component={AddPost} />
          <Tab.Screen name="Alert" component={Notification} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
