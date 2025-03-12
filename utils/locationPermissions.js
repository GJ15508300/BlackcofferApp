import { PermissionsAndroid, Linking, Alert } from 'react-native';

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    console.log('Permission result:', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Geolocation');
      return true;
    } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log('Permission denied permanently.');
      showSettingsAlert();
      return false;
    } else {
      console.log('Permission denied.');
      return false;
    }
  } catch (err) {
    console.error('Location permission error:', err);
    return false;
  }
};

// Function to show alert and redirect to app settings
const showSettingsAlert = () => {
  Alert.alert(
    'Permission Required',
    'You have permanently denied location access. Please enable it in the app settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => Linking.openSettings() },
    ],
  );
};
