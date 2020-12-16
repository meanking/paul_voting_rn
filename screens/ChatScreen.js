import * as React from 'react';
import { 
  StyleSheet,
  ImageBackground,
  Image
} from 'react-native';

import { Text } from '../components/Themed';
import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';

export default function ChatScreen() {
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Chat page</Text>
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
    width: Layout.logoWidth,
    height: Layout.logoWidth,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 70,
    color: Colors.title,
    fontFamily: Assets.fonts.pal,
    textShadowColor: Colors.white,
    textShadowOffset: {width: 1, height: 1}
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
