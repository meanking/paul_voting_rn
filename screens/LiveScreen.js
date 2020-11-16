import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';
const bg = {uri: require('../assets/images/Graphics_T10_Plain_BG.jpg')};

export default function LiveScreen() {
  return (
    <ImageBackground source={bg} style={styles.bg_image}>
      <iframe src="https://vimeo.com/event/30687/embed" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen style={{position:'absolute', top:0, left:0, width: '100%', height: '100%'}}></iframe>
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
})