import React, { useEffect, useState } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AntDesign } from '@expo/vector-icons';
import {
  StyleSheet,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
  TextInput,
} from 'react-native';

import Notification from '../components/Notification';

import Layout from '../constants/Layout';
import Assets from '../constants/Assets';
import Colors from '../constants/Colors';
import constants from '../constants/Constants';

export default function VoteScreen() {
  const navigation = useNavigation()
  const [notification, setNotification] = useState({
    show: false,
    color: Colors.secondary,
    message: '',
  })

  const [token, setToken] = useState('')
  const [contestants, setContestants] = useState([])
  const [initCount, setInitCount] = useState('')
  const [voteToken, setVoteToken] = useState('')
  const [voteModal, setVoteModal] = useState({
    show: false,
    data: {},
  })

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
        url: constants.api_url + '/vote/contestants',
        headers: {
          Authorization: 'Bearer ' + vote_token
        },
      })
        .then(response => {
          let data = response.data
          console.log('response data :: ', data)
          setContestants(data.data)
        })
        .catch(error => {
          console.error('error :: ', error.response)
          setNotification({
            ...notification,
            show: true,
            color: Colors.danger,
            message: error.response.statusText,
          })
        })
    }
  }, [])

  const renderItem = (props) => {
    return (
      <View style={styles.item}>
        <Avatar 
          rounded
          source={{
            uri: props.item.candidate.profile_image,
          }}
          size={120}
        />
        <Text
          style={{
            fontFamily: Assets.fonts.calB,
            fontSize: 18,
            color: Colors.white,
            marginTop: 10,            
          }}
        >
          {props.item.candidate.name}
        </Text>
        <Text
          style={{
            fontFamily: Assets.fonts.cal,
            fontSize: 18,
            color: Colors.gold,
            marginTop: 10,            
          }}
        >
          <AntDesign name="star" size={20} color={Colors.yellow} />{` `}
          {props.item.token_count_user}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.white,
            padding: 10,
            borderRadius: 20,
            zIndex: 1,
            marginTop: 10,
            width: Layout.window.width * 0.35,
            alignItems: 'center',
          }}
          onPress={() => setVoteModal({
            ...voteModal,
            show: true,
            data: props.item,
          })}
        >
          <Text
            style={{
              color: Colors.purple,
            }}
          >{`Vote`.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const vote = () => {
    if (!voteToken) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill vote.',
      })
      return
    }

    if (!Number.isInteger(Number(voteToken))) {
      setNotification({
        ...notification,
        show: true,
        color: Colors.purple,
        message: 'Please fill with number value.',
      })
      return
    }
    
    axios({
      method: 'POST',
      url: constants.api_url + '/vote/vote',
      headers: {
        Authorization: 'Bearer ' + token
      },
      data: {
        contestantId: voteModal.data.id,
        voteTokenCount: voteToken
      }
    })
      .then(response => {
        let data = response.data;
        console.log('response data :: ', data);
        let user = data.data.user;
        setContestants(data.data.contestants)
        setInitCount(user.token_count)
        setVoteToken('')
        Cookies.set('vote_token', token, {expires: 1/12})
        Cookies.set('vote_user', JSON.stringify(user), {expires: 1/12})

        setNotification({
          ...notification,
          show: true,
          color: Colors.success,
          message: data.message
        })

        setVoteModal({
          ...voteModal,
          show: false,
          data: {},
        })
      })
      .catch(error => {
        setVoteModal({
          ...voteModal,
          show: false,
          data: {},
        })
        console.error('error :: ', error.response);
        setNotification({
          ...notification,
          show: true,
          color: Colors.danger,
          message: error.response.statusText,
        })
      })
  }
  
  return (
    <ImageBackground source={Assets.images.bg} style={styles.bg_image}>
      <Text
        style={{
          fontFamily: Assets.fonts.cal,
          fontSize: 24,
          color: Colors.white,
          marginTop: Layout.window.width * 0.1,
        }}
      >
        You have {initCount} tokens for now.
      </Text>
      <SafeAreaView
        style={{
          height: Layout.window.height * 0.65,
        }}
      >
        <FlatList 
          data={contestants}
          numColumns={2}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={voteModal.show}
        onRequestClose={() => console.log('Vote Modal has been closed.')}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Avatar
              rounded
              source={{
                uri: voteModal.data && voteModal.data.candidate ? voteModal.data.candidate.profile_image : '',
              }}
              size={120}
            />
            <Text
              style={{
                fontFamily: Assets.fonts.calB,
                fontSize: 18,
                color: Colors.black,
                marginTop: 10,
              }}
            >
              {voteModal.data && voteModal.data.candidate ? voteModal.data.candidate.name : ''}
            </Text>
            <View
              style={{
                minHeight: Layout.window.height * 0.3,
                marginTop: Layout.window.height * 0.05,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Assets.fonts.calLi,
                }}
              >
                {voteModal.data ? voteModal.data.description : ''}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <TextInput
                placeholder={`Vote`}
                placeholderTextColor={Colors.darkWhite}
                style={styles.input}
                onChangeText={(val) => setVoteToken(val)}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.white,
                  padding: 10,
                  borderRadius: 25,
                  borderWidth: 1,
                  borderColor: Colors.purple,
                  zIndex: 1,
                  marginTop: 10,
                  width: Layout.window.width * 0.33,
                  alignItems: 'center',
                  margin: 5,
                }}
                onPress={() => vote()}
              >
                <AntDesign name="like1" size={24} color={Colors.purple} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.purple,
                  padding: 10,
                  borderRadius: 25,
                  zIndex: 1,
                  marginTop: 10,
                  width: Layout.window.width * 0.7,
                  alignItems: 'center',
                  margin: 5,
                }}
                onPress={() => setVoteModal({
                  ...voteModal,
                  show: false,
                })}
              >
                <AntDesign name="logout" size={24} color={Colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  item: {
    borderWidth: 1,
    alignItems: 'center',
    borderColor: Colors.darkWhite,
    padding: 15,
    marginHorizontal: 12,
    borderRadius: 3,
    marginVertical: 10,
  },
  input: {
    height: 40,
    width: Layout.window.width * 0.33,
    alignSelf: 'center',
    fontFamily: 'clibri',
    fontSize: 18,
    textAlignVertical: 'center',
    paddingHorizontal: 10,
    textAlign: 'left',
    color: Colors.black,
    borderBottomColor: Colors.purple,
    borderBottomWidth: 1,
    margin: 5,
  },
})

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: Colors.success,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    marginTop: 20,
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: Colors.default
  },
})
