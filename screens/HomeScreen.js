import * as React from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Image,
  Text,
  View
} from 'react-native';

import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import Assets from '../constants/Assets';

let logoWidth = 320;
let notice1FontSize = 60;
let notice2FontSize = 80;
let notice3FontSize = 60;
if (Layout.window.height >= 700 && Layout.window.height < 736) {
  logoWidth = 310;
} else if (Layout.window.height >= 640 && Layout.window.height < 700) {
  logoWidth = 290;
  notice1FontSize = 50;
  notice2FontSize = 68;
  notice3FontSize = 50;
} else if (Layout.window.height >= 600 && Layout.window.height < 640) {
  logoWidth = 280;
  notice1FontSize = 45;
  notice2FontSize = 62;
  notice3FontSize = 45;
} else if (Layout.window.height < 600) {
  logoWidth = 270;
  notice1FontSize = 40;
  notice2FontSize = 55;
  notice3FontSize = 40;
}

export default function HomeScreen() {
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
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
    marginTop: Layout.window.height * 0.01,
    width: logoWidth,
    height: logoWidth,
  },
  notice_view: {
    marginTop: Layout.window.height * 0.02, 
    flex:1, 
    width: '100%', 
    alignItems: 'center'
  },
  notice1: { 
    fontFamily: Assets.fonts.pal, 
    color: Colors.purple, 
    fontSize: notice1FontSize, 
    fontWeight: 'bold'
  },
  notice2: { 
    fontFamily: Assets.fonts.calB, 
    color: Colors.sky, 
    fontSize: notice2FontSize, 
    fontWeight: 'bold', 
    marginTop: -20 
  },
  notice3: { 
    fontFamily: Assets.fonts.pal, 
    color: Colors.yellow, 
    fontSize: notice3FontSize, 
    fontWeight: 'bold', 
    marginTop: -10 
  },
  notice4: { 
    fontFamily: 'Calibri', 
    color: Colors.white, 
    fontSize: 22
  }
});
