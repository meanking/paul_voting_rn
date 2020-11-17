import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

import LineInput from '../components/LineInput';

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
        paddingVertical: 5,
      }}
    >
      <Text style={styles.itemText}>{props.date}</Text>
      <Text style={styles.itemText}>{props.time}</Text>
      <Text style={styles.itemText}>{props.episodeName}</Text>
      <Entypo name="calendar" size={18} color="white" onClick={() => props.download()} />
    </View>
  )
}

export default function ScheduleScreen() {
  const [episodes, setEpisodes] = useState(episodes_data);
  const [phone, setPhone] = useState('');
  const [reminder, setReminder] = useState(false);

  const download = (url) => {
    window.open(url, '_blank');
  }

  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Schedule</Text>
      <View
        style={{
          width: Layout.window.width * 0.8,
          height: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomColor: Colors.white,
          borderBottomWidth: 1,
          marginTop: 20
        }}
      >
        <Text style={styles.listTitle}>{`Date`.toUpperCase()}</Text>
        <Text style={styles.listTitle}>{`Time`.toUpperCase()}</Text>
        <Text style={styles.listTitle}>{`Episode`.toUpperCase()}</Text>
        <Text style={styles.listTitle}>{`Invite`.toUpperCase()}</Text>
      </View>
      <View style={{height: 150}}>
        <FlatList
          data={episodes}
          renderItem={({ item }) => (
            <ListItem
              date={item.date}
              time={item.time}
              episodeName={item.episode_name}
              url={item.url}
              download={() => download(item.url)}
            />
          )}
        />
      </View>
      <View 
        style={{
          width: Layout.window.width * 0.8, 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: 'row', 
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <Text style={styles.itemText}>SMS Reminders</Text>
        <LineInput
          placeholder={`Phone number`}
          value={phone}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.5,
            padding: 15,
          }}
          onChangeText={value => setPhone(value)}
        />
        <View 
          style={{
            backgroundColor: Colors.white,
            borderRadius: 5,
            opacity: 0.8
          }}
        >
          <Checkbox
            status={reminder? 'checked': 'unchecked'}
            onPress={() => setReminder(!reminder)}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: Layout.logoShow != 'none'? '': 'center',
  },
  logo_image: {
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
  listTitle: { 
    color: Colors.white, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  itemText: {
    color: Colors.white
  }
});
