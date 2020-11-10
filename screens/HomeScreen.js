import * as React from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Image,
  Text,
  View,
  Dimensions 
} from 'react-native';

const bg = {uri: require('../assets/images/Graphics_T10_Plain_BG.jpg')};
import logo from '../assets/images/Graphics_T10_Logo(Transparent)__10.png';

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH  = Dimensions.get('window').width;

let logoWidth = 250;
let notice1FontSize = 60;
let notice2FontSize = 80;
let notice3FontSize = 60;
if (DEVICE_HEIGHT >= 700 && DEVICE_HEIGHT < 736) {
  logoWidth = 230;
} else if (DEVICE_HEIGHT >= 640 && DEVICE_HEIGHT < 700) {
  logoWidth = 210;
  notice1FontSize = 50;
  notice2FontSize = 68;
  notice3FontSize = 50;
} else if (DEVICE_HEIGHT >= 600 && DEVICE_HEIGHT < 640) {
  logoWidth = 200;
  notice1FontSize = 45;
  notice2FontSize = 62;
  notice3FontSize = 45;
} else if (DEVICE_HEIGHT < 600) {
  logoWidth = 190;
  notice1FontSize = 40;
  notice2FontSize = 55;
  notice3FontSize = 40;
}

export default function HomeScreen() {
  return (
    <ImageBackground source={bg} style={styles.bg_image}>
      <Image source={logo} style={styles.logo_image} />
      <View style={styles.notice_view}>
        <Text style={styles.notice1}>
          {`Tune in live`.toUpperCase()}
        </Text>
        <Text style={styles.notice2}>
          {`8:00PM`.toUpperCase()}
        </Text>
        <Text style={styles.notice3}>
          {`EVERY THURSDAY`.toUpperCase()}
        </Text>
        <Text style={styles.notice4}>
          Join us to be a part of it
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logo_image: {
    marginTop: DEVICE_HEIGHT / 15,
    width: logoWidth,
    height: logoWidth,
  },
  notice_view: {
    marginTop: DEVICE_HEIGHT / 15, 
    flex:1, 
    width: '100%', 
    alignItems: 'center'
  },
  notice1: { 
    fontFamily: 'PalookaBB', 
    color: '#F727A0', 
    fontSize: notice1FontSize, 
    fontWeight: 'bold'
  },
  notice2: { 
    fontFamily: 'Calibrib', 
    color: '#7CF5FE', 
    fontSize: notice2FontSize, 
    fontWeight: 'bold', 
    marginTop: -20 
  },
  notice3: { 
    fontFamily: 'PalookaBB', 
    color: '#FDFD00', 
    fontSize: notice3FontSize, 
    fontWeight: 'bold', 
    marginTop: -10 
  },
  notice4: { 
    fontFamily: 'Calibri', 
    color: '#FFFFFF', 
    fontSize: 22
  }
});
