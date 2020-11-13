import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
const bg = {uri: require('../assets/images/Graphics_T10_Plain_BG.jpg')};

const DEVICE_HEIGHT = Dimensions.get('window').height;
const DEVICE_WIDTH  = Dimensions.get('window').width;

export default function LiveScreen() {
  return (
    <ImageBackground source={bg} style={styles.bg_image}>
      <iframe src="https://player.vimeo.com/video/474213316" width={DEVICE_WIDTH} height={DEVICE_HEIGHT} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
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