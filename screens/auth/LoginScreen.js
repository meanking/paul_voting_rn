import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import LineInput from '../../components/LineInput';
import RoundButton from '../../components/RoundButton';
import Layout from '../../constants/Layout';
import Assets from '../../constants/Assets';
import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';

import Notification from '../../components/Notification';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    if (Cookies.get('vote_user') && Cookies.get('vote_token')) {
      setLoggedin(true)
    }
  }, [])

  const login = () => {
    axios({
      method: 'POST',
      url: constants.api_url + '/login',
      data: {
        email: email,
        password: password,
      }
    })
      .then(response => {
        let data = response.data;
        console.log('response data :: ', data);
        Cookies.set('vote_token', data.data.token, { expires: 1 / 12 });
        Cookies.set('vote_user', JSON.stringify(data.data.user), { expires: 1 / 12 });
        setLoggedin(true);
      })
      .catch(error => {
        let errors = error.response.data;
        console.error('error :: ', errors);
        setNotification({
          ...notification,
          show: true,
          color: Colors.warning,
          message: errors.message,
        })
      })
  }
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>{ loggedin? `Welcome to talented 10!`: `Login/Profile`}</Text>
      {!loggedin && <View style={{
        width: Layout.window.width * 0.8,
        height: Layout.window.height * 0.35,
        padding: 10,
        alignItems: 'center'
      }}>
        <LineInput
          placeholder={`Email`}
          value={email}
          maxlen={40}
          keyboardType="email-address"
          encrypt={false}
          style={{
            padding: 15,
          }}
          onChangeText={value => setEmail(value)}
        />
        <LineInput
          placeholder={`Password`}
          value={password}
          maxlen={40}
          encrypt={true}
          onChangeText={value => setPassword(value)}
          style={{
            marginTop: 20,
            padding: 15,
          }}
        />
        <View style={styles.forgot} >
          <TouchableOpacity onPress={() => navigation.navigate('ForgotScreen')}>
            <Text style={styles.forgottext}>{`Forgot password ?`}</Text>
          </TouchableOpacity>
        </View>
        <RoundButton
          style={styles.login}
          textStyle={styles.loginText}
          onPress={() => login()}
          text={`Login`.toUpperCase()}
        />
        <View style={styles.footer}>
          <Text style={styles.dont}>{`Don't have an account?`}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signup}>{`Sign Up`}</Text>
          </TouchableOpacity>
        </View>
      </View>}
      {loggedin && <View 
        style={{
          width: Layout.window.width * 0.7,
          height: Layout.window.height * 0.35,
          padding: 10,
          marginTop: 20,
          alignItems: 'flex-start',
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('Vote')}
        >
          <FontAwesome name="thumbs-o-up" size={24} color={Colors.yellow} />
          <Text
            style={{
              color: Colors.success,
              fontSize: 24,
              fontFamily: Assets.fonts.calB,
              marginLeft: 20,
            }}
          >{`Vote with tokens`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('Tokens')}
        >
          <FontAwesome name="money" size={24} color={Colors.yellow} />
          <Text
            style={{
              color: Colors.success,
              fontSize: 24,
              fontFamily: Assets.fonts.calB,
              marginLeft: 20,
            }}
          >{`Buy more tokens`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('Scoreboard')}
        >
          <FontAwesome name="sort-numeric-asc" size={24} color={Colors.yellow} />
          <Text
            style={{
              color: Colors.success,
              fontSize: 24,
              fontFamily: Assets.fonts.calB,
              marginLeft: 20,
            }}
          >{`View scoreboard`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('Chat')}
        >
          <AntDesign name="aliwangwang-o1" size={24} color={Colors.yellow} />
          <Text
            style={{
              color: Colors.success,
              fontSize: 24,
              fontFamily: Assets.fonts.calB,
              marginLeft: 20,
            }}
          >{`Chat with Octavius`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            marginVertical: 10,
          }}
          onPress={() => navigation.navigate('Live')}
        >
          <AntDesign name="play" size={24} color={Colors.yellow} />
          <Text
            style={{
              color: Colors.success,
              fontSize: 24,
              fontFamily: Assets.fonts.calB,
              marginLeft: 20,
            }}
          >{`Enjoy the show!`}</Text>
        </TouchableOpacity>
      </View>}
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
    justifyContent: Layout.logoShow != 'none' ? '' : 'center',
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
  forgot: {
    width: Layout.window.width * 0.73,
    paddingHorizontal: 20,
    alignItems: 'left',
  },
  forgottext: {
    color: Colors.darkWhite,
    fontFamily: Assets.fonts.cal,
    fontSize: 18,
    textAlign: 'left',
    marginTop: 12
  },
  login: {
    width: Layout.window.width * 0.6,
    height: 40,
    borderRadius: 25,
    marginTop: 30,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    color: Colors.purple,
    fontFamily: Assets.fonts.cal,
    fontSize: 18,
    fontWeight: '600'
  },
  footer: {
    flexDirection: 'row',
    marginTop: 40,
  },
  dont: {
    color: Colors.white,
    fontFamily: Assets.fonts.cal,
    fontSize: 18,
    fontWeight: '400',
    marginRight: 15
  },
  signup: {
    color: Colors.gold,
    fontFamily: Assets.fonts.cal,
    fontSize: 18,
    fontWeight: '400'
  },
});
