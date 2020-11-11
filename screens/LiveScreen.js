import * as React from 'react';
import { 
  StyleSheet,
  ImageBackground 
} from 'react-native';

import { Text, View } from '../components/Themed';
const bg = {uri: require('../assets/images/Graphics_T10_Plain_BG.jpg')};

export default function LiveScreen() {
  return (
    <ImageBackground source={bg} style={styles.bg_image}>
      <Text style={styles.title}>Live page</Text>
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
