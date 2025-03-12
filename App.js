/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import ProfileScreen from './src/screens/ProfileScreen';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Local from './src/screens/Local';
import AddPost from './src/screens/AddPost';
import Notification from './src/screens/Notification';
import DashBoard from './src/screens/DashBoard';

const Tab = createBottomTabNavigator();

const CustomHeader = ({title}) => {
  return (
    <View style={styles.header_container}>
      <Image
        source={require('./src/assets/icons/hamburger.png')}
        style={styles.more_option_icon}
      />
      <Text style={styles.appName_txt}>BW Story</Text>
      <Image
        source={require('./src/assets/icons/loupe.png')}
        style={styles.more_option_icon}
      />
    </View>
  );
};

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#013220" barStyle="light-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            header: () => <CustomHeader title={route.name} />,
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
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {backgroundColor: '#fff'},
          })}>
          <Tab.Screen name="Discover" component={DashBoard} />
          <Tab.Screen name="Local" component={Local} />
          <Tab.Screen name="Add" component={AddPost} />
          <Tab.Screen name="Alert" component={Notification} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}
const styles = StyleSheet.create({
  header_container: {
    flexDirection: 'row',
    backgroundColor: '#013220',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  more_option_icon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },

  appName_txt: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
});
