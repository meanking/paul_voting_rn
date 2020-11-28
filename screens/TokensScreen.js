import React, { useEffect, useState } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';

import Notification from '../components/Notification';
import LineInput from '../components/LineInput';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import constants from '../constants/Constants';

const init = [];
for (let index = 0; index < 1000; index++) {
  init.push(index + 1)
}

export default function TokensScreen() {
  const navigation = useNavigation();
  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const [token, setToken] = useState('')
  const [data, setData] = useState(init);
  const [initCount, setInitCount] = useState('')
  const [buyCount, setBuyCount] = useState('')
  const [showList, setShowList] = useState(false)
  const [calculatedCount, setCalculatedCount] = useState('')

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
      setToken(Cookies.get('vote_token'))
    }
  }, [])

  const Item = ({ title }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => {
        onChangeCount(Number(title));
        setShowList(false);
      }}>
        <Text>{title}</Text>
      </TouchableOpacity>
    )
  }

  const updateToken = () => {
    if (!buyCount) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please select a pack count.',
      })
      return
    }
    
    axios({
      method: 'POST',
      url: constants.api_url + '/user/token',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        token_count: Number(buyCount) * 1000 + Number(initCount),
        price: buyCount,
        new_token_count: Number(buyCount) * 1000,
      }
    })
      .then(response => {
        let data = response.data;
        console.log('response data :: ', data);
        let user = data.data;
        setBuyCount('');
        setCalculatedCount('');
        setInitCount(user.token_count);
        Cookies.set('vote_token', token, {expires: 1/12});
        Cookies.set('vote_user', JSON.stringify(user), {expires: 1/12});

        setNotification({
          ...notification,
          show: true,
          color: Colors.success,
          message: data.message
        })
      })
      .catch(error => {
        console.error('error :: ', error.response);
        setNotification({
          ...notification,
          show: true,
          color: Colors.danger,
          message: error.response.statusText,
        })
      })
  }

  const onChangeCount = (val) => {
    setBuyCount(val)
    let newData
    if (val == '') {
      newData = init
    } else {
      newData = init.filter(item => {
        return String(item).includes(val)
      })
    }
    let calculated = Number(val) * 1000
    setCalculatedCount(calculated)
    setData(newData)
  }
  
  return (
    <TouchableWithoutFeedback onPress={() => setShowList(false)}>
      <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
        <Image source={Assets.images.tokenBack} style={styles.token_image} />
        <View
          style={{
            flexDirection: 'row',
            marginTop: Layout.logoWidth * 0.1,
          }}
        >
          <Text style={styles.title}> Buy </Text>
          <Text style={styles.title1}> more </Text>
          <Text style={styles.title}> tokens </Text>
          <Text style={styles.title1}> $1 </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={styles.title2}> For pack of </Text>
          <Text style={styles.title3}> 1000 </Text>
          <Text style={styles.title2}> tokens </Text>
        </View>
        <View
          style={{
            marginTop: 10,
            zIndex: 2,
            marginTop: Layout.logoWidth * 0.1,
          }}
        >
          <LineInput
            placeholder={`Pack count`}
            value={buyCount}
            maxlen={4}
            encrypt={false}
            onChangeText={(val) => onChangeCount(val)}
            onFocus={() => setShowList(true)}
            style={{}}
          />
          <View
            style={{
              position: 'absolute',
              height: 160,
              width: '100%',
              top: 40,
              display: showList? 'flex': 'none'
            }}
          >
            <FlatList
              data={data}
              style={{}}
              renderItem={({ item }) => (
                <Item title={item} />
              )}
              keyExtractor={item => item.toString()}
            />
          </View>
        </View>
        <View
          style={{
            alignItems: 'flex-start',
          }}
        >
          <Text style={{
            color: Colors.white
          }}>x 1000 {calculatedCount? `= ${calculatedCount}`: ``}</Text>
        </View>
        <View
          style={{
            marginTop: Layout.logoWidth * 0.05,
          }}
        >
          <Text style={styles.title4}>Total {initCount}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 20,
            zIndex: 1,
            marginTop: 10,
            width: Layout.logoWidth * 0.8,
            alignItems: 'center',
          }}
          onPress={() => updateToken()}
        >
          <Text
            style={{
              color: Colors.purple,
            }}
          >{`Buy Now`.toUpperCase()}</Text>
        </TouchableOpacity>
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
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bg_image: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: Layout.logoShow != 'none'? '': 'center',
  },
  token_image: {
    width: Layout.logoWidth * 0.8,
    height: Layout.logoWidth * 0.8,
    display: Layout.logoShow,
    marginTop: Layout.logoWidth * 0.2,
    borderRadius: Layout.logoWidth * 0.5,
  },
  title: {
    fontSize: 40,
    color: Colors.title,
    fontFamily: Assets.fonts.pal,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 1, height: 1 }
  },
  title1: {
    fontSize: 30,
    color: Colors.gold,
    fontFamily: Assets.fonts.calB,
  },
  title2: {
    fontSize: 30,
    color: Colors.title,
    fontFamily: Assets.fonts.calB,
  },
  title3: {
    fontSize: 35,
    color: Colors.gold,
    fontFamily: Assets.fonts.pal,
    textShadowColor: Colors.white,
    textShadowOffset: { width: 1, height: 1 }
  },
  title4: {
    fontSize: 20,
    color: Colors.purple,
    fontFamily: Assets.fonts.cal,
  },
  item: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.darkWhite,
    padding: 5,
    marginHorizontal: 12,
    borderRadius: 3,
  },
});
