import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const GenderSelection = ({gender, setGender, errors}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectGender = option => {
    setGender(option);
    setModalVisible(false);
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Select Gender</Text>
      <TouchableOpacity
        style={[
          styles.inputBox,
          {
            borderColor: errors?.gender ? 'red' : '#ccc',
          },
        ]}
        onPress={() => setModalVisible(true)}>
        <Text style={[styles.inputText, !gender && styles.placeholder]}>
          {gender || 'Select Gender'}
        </Text>
      </TouchableOpacity>

      {errors?.gender && <Text style={styles.errorText}>{errors.gender}</Text>}

      {/* Modal for Gender Selection */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Gender</Text>
            {['Male', 'Female', 'Other'].map(option => (
              <TouchableOpacity
                key={option}
                style={styles.modalOption}
                onPress={() => handleSelectGender(option)}>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  label: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  inputBox: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  inputText: {fontSize: 16, color: '#333'},
  placeholder: {color: '#999'},
  errorText: {color: 'red', fontSize: 12, marginTop: 5},

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {fontSize: 18, fontWeight: 'bold', marginBottom: 15},
  modalOption: {paddingVertical: 10, width: '100%', alignItems: 'center'},
  optionText: {fontSize: 16},
  cancelButton: {
    marginTop: 15,
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  cancelText: {fontSize: 16, color: 'red'},
});

export default GenderSelection;
