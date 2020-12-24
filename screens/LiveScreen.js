import * as React from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Layout from '../constants/Layout';
import Assets from '../constants/Assets';

export default function LiveScreen() {
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <iframe src="https://player.vimeo.com/video/494026428" width={Layout.window.width} height={Layout.window.height} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
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