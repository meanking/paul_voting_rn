import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import {
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  View,
  Modal,
  TouchableHighlight,
} from 'react-native';

import LineInput from '../../components/LineInput';
import RoundButton from '../../components/RoundButton';
import Layout from '../../constants/Layout';
import Assets from '../../constants/Assets';
import Colors from '../../constants/Colors';
import constants from '../../constants/Constants';

export default function ForgotScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const send = () => {
    axios({
      method: 'POST',
      url: constants.api_url + '/forgotpassword',
      data: {
        forgotpasswordemail: email,
      }
    })
      .then(response => {
        let data = response.data;
        console.log('response data :: ', data);
        setNotification({
          ...notification,
          show: true,
          color: Colors.success,
          message: data.message,
        })
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
      <Text style={styles.title}>Forgot password</Text>
      <View style={{
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
        <RoundButton
          style={styles.login}
          textStyle={styles.loginText}
          onPress={() => send()}
          text={`Send email`.toUpperCase()}
        />
        <View style={styles.footer}>
          <Text style={styles.dont}>{`Do you remember password?`}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signup}>{`Login`}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={notification.show}
        onRequestClose={() => console.log('Modal has been closed.')}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text 
              style={{
                ...modalStyles.modalText,
                color: notification.color,
              }}
            >{notification.message}</Text>

            <TouchableHighlight
              style={modalStyles.openButton}
              onPress={() => setNotification({
                ...notification,
                show: false,
              })}>
              <Text style={modalStyles.textStyle}>Ok</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Colors.success,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.default
  },
})

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
