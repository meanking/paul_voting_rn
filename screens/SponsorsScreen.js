import React, { useState } from 'react';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Checkbox } from 'react-native-paper';

import LineInput from '../components/LineInput';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';

export default function SponsorsScreen() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contestant, setContestant] = useState(false);
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>Sponsors</Text>
      <View>
        <LineInput
          placeholder={`Name`}
          value={name}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
          }}
          onChangeText={value => setName(value)}
        />
        <LineInput
          placeholder={`Company Name`}
          value={company}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setCompany(value)}
        />
        <LineInput
          placeholder={`Email`}
          value={email}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setEmail(value)}
        />
        <LineInput
          placeholder={`Phone`}
          value={phone}
          maxlen={40}
          encrypt={false}
          style={{
            width: Layout.window.width * 0.8,
            padding: 15,
            marginTop: 10,
          }}
          onChangeText={value => setPhone(value)}
        />
      </View>
      <View 
        style={{
          width: Layout.window.width * 0.8, 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexDirection: 'row', 
          alignItems: 'center',
          marginTop: 20,
        }}
      >
        <View 
          style={{
            backgroundColor: Colors.white,
            borderRadius: 3,
            opacity: 0.8
          }}
        >
          <Checkbox
            status={contestant? 'checked': 'unchecked'}
            onPress={() => setContestant(!contestant)}
          />
        </View>
        <Text style={styles.itemText}>I want to be a sponsor of the show.</Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            borderRadius: 3,
            opacity: 0.8,
            padding: 5,
          }}
        >
          <Entypo name="paper-plane" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: Layout.logoShow != 'none'? '': 'center',
  },
  logo_image: {
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
  listTitle: { 
    color: Colors.white, 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  itemText: {
    color: Colors.white,
    fontSize: 16,
  }
});
