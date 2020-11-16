import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import Data from '../constants/Data';

const episodes_data = Data.episods;

function ListItem (props) {
  return (
    <View 
      style={{
        width: Layout.window.width * 0.8,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
      }}
    >
      <Text style={{color: Colors.white}}>{props.date}</Text>
      <Text style={{color: Colors.white}}>{props.time}</Text>
      <Text style={{color: Colors.white}}>{props.episodeName}</Text>
      <AntDesign name="book" size={18} color="white" />
    </View>
  )
}

export default function ScheduleScreen() {
  const [episodes, setEpisodes] = useState(episodes_data);
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Schedule</Text>
      <View
        style={{
          width: Layout.window.width * 0.8,
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: Colors.white }}>Date</Text>
        <Text style={{ color: Colors.white }}>Time</Text>
        <Text style={{ color: Colors.white }}>Episode</Text>
        <Text style={{ color: Colors.white }}>Invite</Text>
      </View>
      <FlatList
        data={episodes}
        renderItem={({ item }) => (
          <ListItem
            date={item.date}
            time={item.time}
            episodeName={item.episode_name}
            url={item.url}
          />
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_image: {
    marginTop: -50,
    width: Layout.logoWidth,
    height: Layout.logoWidth,
    display: Layout.logoShow,
  },
  title: {
    fontSize: 45,
    color: Colors.title,
    fontFamily: Assets.fonts.pal,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 1, height: 1 }
  },
});
