import * as React from 'react';
import { 
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image
} from 'react-native';

import { Text, View } from '../components/Themed';
const bg = {uri: require('../assets/images/Graphics_T10_Plain_BG.jpg')};
import logo from '../assets/images/Graphics_T10_Logo(Transparent)__10.png';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH  = Dimensions.get('window').width;

let logoWidth = 320;
if (DEVICE_HEIGHT >= 700 && DEVICE_HEIGHT < 736) {
  logoWidth = 310;
} else if (DEVICE_HEIGHT >= 640 && DEVICE_HEIGHT < 700) {
  logoWidth = 290;
} else if (DEVICE_HEIGHT >= 600 && DEVICE_HEIGHT < 640) {
  logoWidth = 280;
} else if (DEVICE_HEIGHT < 600) {
  logoWidth = 270;
}

export default function LoginScreen() {
  return (
    <ImageBackground source={bg} style={styles.bg_image}>
      <Image source={logo} style={styles.logo_image} />
      <Text style={styles.title}>Login page</Text>
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
    marginTop: -160,
    width: logoWidth,
    height: logoWidth,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    color: '#23BC9D',
    fontFamily: 'palookabb',
    textShadowColor: '#FFFFFF',
    textShadowOffset: {width: 1, height: 1}
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
