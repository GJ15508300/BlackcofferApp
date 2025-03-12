import React from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

const DiscoverScreen = () => {
  const sampleData = [
    {id: '1', title: 'Breaking News', image: 'https://via.placeholder.com/150'},
    {
      id: '2',
      title: 'Technology Update',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image source={{uri: item.image}} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
  },
  image: {width: '100%', height: 150},
  title: {fontSize: 18, fontWeight: 'bold', padding: 8},
});

export default DiscoverScreen;
