import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Local = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Local Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  title: {fontSize: 18, fontWeight: 'bold', padding: 8},
});

export default Local;
