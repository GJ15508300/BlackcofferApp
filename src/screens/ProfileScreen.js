import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
// import Geolocation from '@react-native-community/geolocation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GenderSelection from './common/GenderSelection';

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [bio, setBio] = useState('');

  const [errors, setErrors] = useState({});

  // Pick Image from Camera or Gallery
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
        if (response.didCancel) return;
        if (response.assets) {
          setProfileImage(response.assets[0].uri);
        }
      },
    );
  };

  // Get Current Location
  const getCurrentLocation = () => {
    // Geolocation.getCurrentPosition(
    //   position => {
    //     const {latitude, longitude} = position.coords;
    //     setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
    //   },
    //   error => Alert.alert('Location Error', error.message),
    //   {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    // );
  };

  // Form Validation
  const validateForm = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!gender) newErrors.gender = 'Select a gender';
    if (!location) newErrors.location = 'Location is required';
    if (!profession.trim()) newErrors.profession = 'Profession is required';
    if (!bio.trim()) newErrors.bio = 'Bio is required';
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
    <View style={styles.container}>
      {/* Profile Picture */}
      <TouchableOpacity onPress={pickImage}>
        {profileImage ? (
          <Image source={{uri: profileImage}} style={styles.profileImage} />
        ) : (
          <Ionicons name="person" color="#000" size={24} />
        )}
      </TouchableOpacity>
      <Text style={styles.prof_label}>Tap to change profile picture</Text>

      {/* Name */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Name<Text style={styles.mustFill}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your name"
          style={[styles.input, errors.name && styles.errorInput]}
          value={name}
          onChangeText={setName}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>

      {/* Gender Selection */}
      {/* <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Gender</Text>
        <View style={styles.genderContainer}>
          {['Male', 'Female', 'Other'].map(option => (
            <TouchableOpacity
              key={option}
              style={[
                styles.genderButton,
                gender === option && styles.selectedGenderButton,
              ]}
              onPress={() => setGender(option)}>
              <Text style={styles.genderText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
      </View> */}
      <GenderSelection gender={gender} setGender={setGender} errors={errors} />

      {/* Location */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={getCurrentLocation}>
          <Text style={styles.locationButtonText}>Get Current Location</Text>
        </TouchableOpacity>
        <Text style={styles.locationText}>{location}</Text>
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}
      </View>

      {/* Profession */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          Profession<Text style={styles.mustFill}>*</Text>
        </Text>
        <TextInput
          placeholder="Enter your profession"
          style={[styles.input, errors.profession && styles.errorInput]}
          value={profession}
          onChangeText={setProfession}
        />
        {errors.profession && (
          <Text style={styles.errorText}>{errors.profession}</Text>
        )}
      </View>

      {/* Bio */}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bio</Text>
        <TextInput
          placeholder="Write your bio (Max 5 lines)"
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

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileImage: {width: 100, height: 100, borderRadius: 50, marginBottom: 10},
  prof_label: {fontSize: 14, color: 'gray', marginBottom: 10},
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
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationButtonText: {color: '#fff', fontWeight: 'bold'},
  locationText: {marginBottom: 10},
  submitButton: {
    backgroundColor: '#007bff',
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
