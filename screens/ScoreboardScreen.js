import React, { useEffect, useState } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Avatar } from 'react-native-elements';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  FlatList,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import Notification from '../components/Notification';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import constants from '../constants/Constants';

export default function ScoreboardScreen() {
  const navigation = useNavigation()

  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const [token, setToken] = useState('');
  const [episode, setEpisode] = useState('');
  const [contestants, setContestants] = useState([]);

  useEffect(() => {
    if (Cookies.get('vote_user')) {
      let u = JSON.parse(Cookies.get('vote_user'))
      setInitCount(u.token_count)
    } else {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please login first.',
      })
      setTimeout(() => {
        setNotification({
          ...notification,
          show: false,
        })
        navigation.dispatch(
          StackActions.replace(
            'MainHome', {
              screen: 'Home',
              params: {
                screen: 'LoginScreen'
              }
            }
          )
        )
      }, 1500);
    }
    if (Cookies.get('vote_token')) {
      let vote_token = Cookies.get('vote_token')
      setToken(vote_token)

      axios({
        method: 'GET',
        url: constants.api_url + '/vote/result',
        headers: {
          Authorization: 'Bearer ' + vote_token
        },
      })
        .then(response => {
          let data = response.data;
          console.log('response data :: ', data);
          setEpisode(data.data.episode);
          setContestants(data.data.contestants);
        })
        .catch(error => {
          console.error('error :: ', error);
          setNotification({
            ...notification,
            show: true,
            color: Colors.danger,
            message: error.response.statusText,
          })
        })
    }
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 10,
            alignItems: 'center',
          }}
        >
          <View
            style={{
              marginRight: 25,
            }}
          >
            <Avatar
              source={Assets.images[`d${index + 1}`]}
              size="medium"
            />
          </View>
          <View
            style={{
              marginRight: 20,
            }}
          >
            <Avatar
              rounded
              source={{
                uri: item.candidate.profile_image,
              }}
              size="medium"
            />
          </View>
          <View
            style={{
              marginRight: 20,
            }}
          >
            <Text
              style={{
                color: Colors.white,
                fontSize: 18,
                fontFamily: Assets.fonts.cal,
              }}
            >{item.candidate.name}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row'
            }}
          >
            <AntDesign name="star" size={20} color={Colors.yellow} />{` `}
            <Text
              style={{
                marginLeft: 10,
                color: Colors.gold,
                fontSize: 18,
                fontFamily: Assets.fonts.cal,
              }}
            >{item.token_count}</Text>
          </View>
        </View>
      </>
    )
  }
  
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Image source={Assets.images.logo} style={styles.logo_image} />
      <Text style={styles.title}>{episode.name}</Text>
      <View
       style={{
         height: Layout.window.height * 0.45,
       }}
      >
        <FlatList 
          data={contestants}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <Notification 
        visible={notification.show} 
        color={notification.color} 
        message={notification.message} 
        onPress={() => setNotification({
          ...notification,
          show: false,
        })} 
      />
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
    fontSize: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
});
