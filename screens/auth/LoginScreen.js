import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Login/Profile</Text>
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
          <TouchableOpacity onPress={()=>navigation.navigate('ForgotScreen')}>
            <Text style={styles.forgottext}>{`Forgot password ?`}</Text>
          </TouchableOpacity>
        </View>
        <RoundButton
          style={styles.login}
          textStyle={styles.loginText}
          text={`Login`.toUpperCase()}
        />
        <View style={styles.footer}>
          <Text style={styles.dont}>{`Don't have an account?`}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={styles.signup}>{`Sign Up`}</Text>
          </TouchableOpacity>
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
