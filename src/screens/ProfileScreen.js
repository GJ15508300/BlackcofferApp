import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import GenderSelection from './common/GenderSelection';
import {requestLocationPermission} from '../../utils/locationPermissions';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState(null);
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');
  const [errors, setErrors] = useState({});

  // Pick Image from Camera or Gallery
  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
    };
    try {
      const response = await ImagePicker.launchCamera(options);
      if (response.didCancel) return;
      if (response.assets) {
        setProfileImage(response.assets[0].uri);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Get Current Location
  const getCurrentLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(
              'Latitude : ',
              position?.coords?.latitude,
              'Longitude : ',
              position?.coords?.longitude,
            );

            getCityAndState(
              position?.coords?.latitude,
              position?.coords?.longitude,
            );
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };

  const getCityAndState = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      let response = await fetch(url);
      let data = await response.json();

      // Extract city and state
      const city =
        data.address.city || data.address.town || data.address.village || '';
      const state = data.address.state || '';

      console.log(`City: ${city}, State: ${state}`);
      return setLocation(city + ', ' + state);
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    // if (!gender) newErrors.gender = 'Select a gender';
    if (!location) newErrors.location = 'Location is required';
    // if (!profession.trim()) newErrors.profession = 'Profession is required';
    // if (!bio.trim()) newErrors.bio = 'Bio is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Submit
  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Profile Saved',
        'Your profile has been updated successfully!',
      );
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.scrollContainer}
        // edges={['top']}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.profile_img_space}>
            <Image
              source={
                profileImage
                  ? {uri: profileImage}
                  : require('../assets/icons/profile-user.png')
              }
              style={styles.profile_Image}
            />
          </View>

          <TouchableOpacity onPress={pickImage} style={styles.camera_btn}>
            <Image
              source={require('../assets/icons/camera.png')}
              style={styles.camera_icon}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Name<Text style={styles.mustFill}>*</Text>
              </Text>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor="#999"
                style={[styles.input, errors.name && styles.errorInput]}
                value={name}
                onChangeText={setName}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            <GenderSelection
              gender={gender}
              setGender={setGender}
              errors={errors}
            />

            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Location<Text style={styles.mustFill}>*</Text>
              </Text>

              <TouchableOpacity
                style={[
                  styles.locationButton,
                  {
                    borderColor: errors.location ? 'red' : '#D3D3D3',
                  },
                ]}
                onPress={getCurrentLocation}>
                {location ? (
                  <View style={styles.locationContainer}>
                    <Image
                      source={require('../assets/icons/location.png')}
                      style={styles.camera_icon}
                    />
                    <Text style={styles.locationText}>{location}</Text>
                  </View>
                ) : (
                  <Text style={styles.locationButtonText}>
                    Get Current Location
                  </Text>
                )}
              </TouchableOpacity>

              {errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Profession</Text>
              <TextInput
                placeholder="Enter your profession"
                placeholderTextColor="#999"
                style={[styles.input, errors.profession && styles.errorInput]}
                value={profession}
                onChangeText={setProfession}
              />
              {errors.profession && (
                <Text style={styles.errorText}>{errors.profession}</Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                placeholder="Write your bio (Max 5 lines)"
                placeholderTextColor="#999"
                style={[
                  styles.input,
                  styles.bioInput,
                  errors.bio && styles.errorInput,
                ]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={5}
              />
              {errors.bio && <Text style={styles.errorText}>{errors.bio}</Text>}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// Styles
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    position: 'static',
  },
  profile_img_space: {
    backgroundColor: '#D8d4d4',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  camera_btn: {
    position: 'absolute',
    top: 250,
    right: 20,
    backgroundColor: '#D3D3D3',
    padding: 10,
    margin: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 15,
  },
  camera_icon: {
    width: 35,
    height: 35,
  },
  profile_Image: {
    width: '100%',
    height: 300,
    borderRadius: 0,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  inputContainer: {width: '100%', marginBottom: 10},
  label: {fontSize: 14, fontWeight: 'bold', marginBottom: 5, color: '#333'},
  mustFill: {color: 'red'},
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  bioInput: {height: 100, textAlignVertical: 'top'},
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  genderButton: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedGenderButton: {backgroundColor: '#007bff', borderColor: '#007bff'},
  genderText: {color: '#000'},
  locationButton: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
  },
  locationButtonText: {color: '#fff', fontWeight: 'bold'},
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationText: {
    color: 'black',
    fontSize: 12,
  },
  submitButton: {
    backgroundColor: '#013220',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  submitButtonText: {color: '#fff', fontWeight: 'bold', fontSize: 16},
  errorText: {color: 'red', fontSize: 12, marginBottom: 5},
  errorInput: {borderColor: 'red'},
});

export default ProfileScreen;
