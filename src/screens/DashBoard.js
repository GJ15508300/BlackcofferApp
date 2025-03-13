/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Share,
} from 'react-native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {updateItem} from '../redux/dataSlice';

const DashBoard = () => {
  const dispatch = useDispatch();
  const sampleData_fromRedux = useSelector(state => state.data.items);
  console.log('sampleData_fromRedux', sampleData_fromRedux);

  const filter_category = [
    {id: 1, name: 'All'},
    {id: 2, name: 'Entertainment'},
    {id: 3, name: 'LifeStyle'},
    {id: 4, name: 'Sports'},
    {id: 5, name: 'Technology'},
    {id: 6, name: 'Government'},
    {id: 7, name: 'Business'},
  ];

  const handleUpdateFollow = data => {
    const updatedItem = {
      ...data,
      follow: !data.follow,
    };
    dispatch(updateItem(updatedItem));
  };

  const handleUpdateLike = data => {
    const updatedItem = {
      ...data,
      like: !data.like,
    };
    dispatch(updateItem(updatedItem));
  };

  const shareData = async data => {
    try {
      const result = await Share.share({
        message: data.prof_name,
        url: 'https://example.com',
        title: data.title,
      });

      if (result.action === Share.sharedAction) {
        console.log('Content shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData_fromRedux}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <ScrollView
            style={{margin: 10}}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide scrollbar
            contentContainerStyle={{paddingHorizontal: 10}}>
            {filter_category?.map((item, index) => (
              <View
                key={item.id}
                style={{
                  marginHorizontal: 5,
                  borderWidth: 1.5,
                  borderRadius: 10,
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderColor: '#013220',
                  backgroundColor: index === 0 ? '#013220' : 'white',
                }}>
                <Text
                  style={{
                    color: index === 0 ? 'white' : '#013220',
                    fontSize: 14,
                    fontWeight: '800',
                  }}>
                  {item.name}
                </Text>
              </View>
            ))}
          </ScrollView>
        )}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.prof_container}>
              <View style={styles.prof_img_name}>
                <Image source={item.profile_img} style={styles.prof_image} />
                <View>
                  <Text style={styles.prof_name_txt}>{item.prof_name}</Text>
                  <Text style={styles.prof_loc_txt}>{item.location}</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => handleUpdateFollow(item)}>
                <Text
                  style={[
                    styles.follow_txt,
                    {
                      color: item?.follow ? 'white' : 'black',
                      backgroundColor: item?.follow ? '#013220' : '#f5f5f5',
                    },
                  ]}>
                  {item?.follow ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
            </View>
            <SafeAreaView style={{flex: 1}}>
              <Video
                source={item?.data}
                style={styles.video}
                controls={true} // Show play/pause controls
                resizeMode="cover"
              />
            </SafeAreaView>
            <View style={styles.icon_option_container}>
              <TouchableOpacity onPress={() => handleUpdateLike(item)}>
                <Image
                  source={
                    item.like
                      ? require('../assets/icons/heart.png')
                      : require('../assets/icons/like.png')
                  }
                  style={[styles.icon_option, {tintColor: '#013220'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => shareData(item)}>
                <Image
                  source={require('../assets/icons/share.png')}
                  style={styles.icon_option}
                />
              </TouchableOpacity>
              <Image
                source={require('../assets/icons/speech-bubble.png')}
                style={styles.icon_option}
              />
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingBottom: 5,
    backgroundColor: '#fff',
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 15},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  prof_container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  prof_img_name: {flexDirection: 'row', alignItems: 'center'},
  prof_image: {width: 40, height: 40, borderRadius: 30},
  prof_name_txt: {
    fontSize: 16,
    color: 'blue',
    marginLeft: 10,
    fontWeight: '900',
  },
  prof_loc_txt: {
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
  },
  follow_txt: {
    fontSize: 14,
    color: 'black',
    fontWeight: '900',
    borderWidth: 2,
    borderRadius: 30,
    paddingHorizontal: 8,
    borderColor: 'black',
    paddingVertical: 5,
  },
  image: {width: '100%', height: 250},
  video: {
    width: '100%',
    height: 300,
    backgroundColor: 'red',
  },
  icon_option_container: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  icon_option: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  title: {fontSize: 18, fontWeight: 'bold', padding: 8},
});

export default DashBoard;
