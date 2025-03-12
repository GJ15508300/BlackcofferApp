import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';

const DashBoard = () => {
  const sampleData = [
    {
      id: '1',
      prof_name: 'Bot player',
      location: 'Salem, Tamilnadu',
      title: 'Breaking News',
      profile_img: require('../assets/icons/profile-user.png'),
      data: 'https://www.graydart.com/app-media/vid/mp4/dev_sample_video_1280x720_1mb.mp4',
    },
    {
      id: '2',
      prof_name: 'jagadeesh',
      location: 'Salem, Tamilnadu',
      title: 'Technology Update',
      profile_img: require('../assets/icons/profile-user.png'),
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      prof_name: 'ramasamy',
      location: 'Salem, Tamilnadu',
      title: 'React Native Twitter',
      profile_img: require('../assets/icons/profile-user.png'),
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      prof_name: 'sanjay',
      location: 'Salem, Tamilnadu',
      title: `React Native Radio React Native Coach is a stream of React Native-related articles on Medium. Curated by Wyatt McBain it contains plenty of interesting articles submitted by various React Native experts. People actually love this blog. It's an honest, fun blog that addresses the issues of irony in software development, its ecosystem, and how it interacts (or doesn't) with business. Wyatt has a smart look at the big picture of coding and will give you a fresh perspective on the React Native world when you might be overwhelmed.`,
      profile_img: require('../assets/icons/profile-user.png'),
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      prof_name: 'raja',
      location: 'Salem, Tamilnadu',
      title: 'React Native Coach',
      profile_img: require('../assets/icons/profile-user.png'),
      image: 'https://via.placeholder.com/150',
    },
  ];

  const filter_category = [
    {id: 1, name: 'All'},
    {id: 2, name: 'Entertainment'},
    {id: 3, name: 'LifeStyle'},
    {id: 4, name: 'Sports'},
    {id: 5, name: 'Technology'},
    {id: 6, name: 'Government'},
    {id: 7, name: 'Business'},
  ];
  return (
    <View style={styles.container}>
      <FlatList
        data={sampleData}
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
                }}>
                <Text
                  style={{color: '#013220', fontSize: 14, fontWeight: '800'}}>
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
              <Text style={styles.follow_txt}>Follow</Text>
            </View>
            <SafeAreaView style={{flex: 1}}>
              <Video
                // source={{
                //   uri: item?.data,r
                // }}
                source={require('../assets/video/dev_sample_video_1280x720_1mb.mp4')}
                style={styles.video}
                controls={true} // Show play/pause controls
                resizeMode="cover"
              />
            </SafeAreaView>
            <View style={styles.icon_option_container}>
              <Image
                source={require('../assets/icons/heart.png')}
                style={styles.icon_option}
              />
              <Image
                source={require('../assets/icons/share.png')}
                style={styles.icon_option}
              />
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
    paddingHorizontal: 5,
    borderColor: 'black',
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
