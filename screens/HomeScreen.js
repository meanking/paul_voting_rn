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

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH  = Dimensions.get('window').width;

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logo_image: {
    marginTop: DEVICE_HEIGHT / 15,
    width: 250,
    height: 250,
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
    fontSize: 60, 
    fontWeight: 'bold' 
  },
  notice2: { 
    fontFamily: 'Calibrib', 
    color: '#7CF5FE', 
    fontSize: 80, 
    fontWeight: 'bold', 
    marginTop: -25 
  },
  notice3: { 
    fontFamily: 'PalookaBB', 
    color: '#FDFD00', 
    fontSize: 60, 
    fontWeight: 'bold', 
    marginTop: -15 
  },
  notice4: { 
    fontFamily: 'Calibri', 
    color: '#FFFFFF', 
    fontSize: 22
  }
});
