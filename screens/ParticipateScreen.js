import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import Notification from '../components/Notification';
import LineInput from '../components/LineInput';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import constants from '../constants/Constants';

export default function ParticipateScreen() {

  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [talent, setTalent] = useState('');
  const [require, setRequire] = useState(false);

  useEffect(() => {
    if (Cookies.get('vote_user')) {
      let u = JSON.parse(Cookies.get('vote_user'))
      setName(u.fullname? u.fullname: '')
      setEmail(u.email? u.email: '')
      setPhone(u.phone? u.phone: '')
    }
    if (Cookies.get('vote_token')) {
      setToken(Cookies.get('vote_token'))
    }
  }, [])

  const requestParticipate = () => {
    if (!name) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill name.',
      })
      return
    }    
    if (!email) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill email.',
      })
      return
    }    
    if (!phone) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill phone.',
      })
      return
    }    
    if (!talent) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill talent.',
      })
      return
    }   
    if (!require) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please check contestant requirement.',
      })
      return
    }
    
    axios({
      method: 'POST',
      url: constants.api_url + '/participates',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        name: name,
        email: email,
        phone: phone,
        talent: talent,
        require_contestant: require,
      }
    })
      .then(response => {
        let data = response.data;
        console.log('response data :: ', data.message);
        setNotification({
          ...notification,
          show: true,
          color: Colors.success,
          message: data.message
        })
      })
      .catch(error => {
        console.error('error :: ', error.response);
        if (error.response.status == 422) {
          let errors = error.response.data.errors;
          let errorMessage = '';
          let i = 0;
          Object.keys(errors).map(key => {
            i ++
            errorMessage += '<b>' + i + '</b>. ' + key + ': ' + errors[key];
          })
          setNotification({
            ...notification,
            show: true,
            color: Colors.danger,
            message: errorMessage,
          })
        }
      })
  }
  
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Participate</Text>
      <View>
        <LineInput
          placeholder={`Name`}
          value={name}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
          }}
          onChangeText={value => setName(value)}
        />
        <LineInput
          placeholder={`Email`}
          value={email}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setEmail(value)}
        />
        <LineInput
          placeholder={`Phone`}
          value={phone}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setPhone(value)}
        />
        <LineInput
          placeholder={`Talent`}
          value={talent}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setTalent(value)}
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
        <View 
          style={{
            backgroundColor: Colors.white,
            borderRadius: 3,
            opacity: 0.8
          }}
        >
          <CheckBox
            value={require}
            onValueChange={setRequire}
            style={styles.checkbox}
          />
        </View>
        <Text style={styles.itemText}>I want to be a contestant.</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            borderRadius: 3,
            opacity: 0.8,
            padding: 5,
          }}
          onPress={() => requestParticipate()}
        >
          <Entypo name="paper-plane" size={24} color="black" />
        </TouchableOpacity>
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
    color: Colors.white,
    fontSize: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
