import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  View,
  CheckBox,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Notification from '../components/Notification';
import LineInput from '../components/LineInput';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import Data from '../constants/Data';
import constants from '../constants/Constants';

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
  const navigation = useNavigation();

  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const [episodes, setEpisodes] = useState(episodes_data);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [phone, setPhone] = useState('');
  const [reminder, setReminder] = useState(false);

  useEffect(() => {
    if (Cookies.get('vote_user')) {
      let u = JSON.parse(Cookies.get('vote_user'))
      setUser(u)
      setReminder(u.sms_reminder == 1? true: false)
      setPhone(u.phone? u.phone: '')
    }
    if (Cookies.get('vote_token')) {
      setToken(Cookies.get('vote_token'))
    }
  }, [])

  const download = (url) => {
    window.open(url, '_blank');
  }

  const sendReminder = (value) => {
    if (!user) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.danger,
        message: 'Please login first',
      })
      setTimeout(() => {
        setNotification({
          ...notification,
          show: false,
        })
        navigation.navigate('LoginScreen');
      }, 1500);
    } else {
      if (value) {
        if (!phone) {
          setNotification({
            ...notification,
            show: true,
            color: Colors.purple,
            message: 'Please enter phone number.'
          })
          return
        } else {
          axios({
            method: 'POST',
            url: constants.api_url + '/updatePhone',
            headers: {
              Authorization: 'Bearer ' + token
            },
            data: {
              phone: phone,
              sms_reminder: 1
            }
          })
            .then(response => {
              let data = response.data;
              console.log('response data :: ', data);
              setReminder(value);
            })
            .catch(error => {
              console.error('error :: ', error.response);
            })
        }
      } else {
        axios({
          method: 'POST',
          url: constants.api_url + '/updatePhone',
          headers: {
            Authorization: 'Bearer ' + token
          },
          data: {
            sms_reminder: 0
          }
        })
          .then(response => {
            let data = response.data;
            console.log('response data :: ', data);
            setReminder(value);
          })
          .catch(error => {
            console.error('error :: ', error.response);
          })
      }
    }
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
          keyExtractor={item => item.id.toString()}
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
          <CheckBox
            value={reminder}
            onValueChange={value => sendReminder(value)}
            style={styles.checkbox}
          />
        </View>
      </View>
      <Notification 
        visible={notification.show} 
        color={notification.color} 
        message={notification.message} 
        onPress={() => setNotification({
          ...notification,
          show: false,
        })} 
      />
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
  },
  checkbox: {
    alignSelf: "center",
  },
});
