import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Ionicons} from 'react-native-vector-icons';
import DiscoverScreen from './src/screens/DiscoverScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        // screenOptions={({route}) => ({
        //   tabBarIcon: ({color, size}) => {
        //     return (
        //       <Icon
        //         name={'rocket'}
        //         size={size}
        //         color={
        //           route.name === 'Discover' || route.name === 'Profile'
        //             ? '#900'
        //             : undefined
        //         }
        //       />
        //     );
        //   },
        // })}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
