import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  ImageBackground
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import bg from '../assets/images/Graphics_T10_Plain_BG.jpg';

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Login"
          onPress={() => props.navigation.navigate("LoginScreen")}
        />
        <DrawerItem
          label="Schedule"
          onPress={() => props.navigation.navigate("ScheduleScreen")}
        />
        <DrawerItem
          label="Participate"
          onPress={() => props.navigation.navigate("ParticipateScreen")}
        />
        <DrawerItem
          label="PastShows"
          onPress={() => props.navigation.navigate("PastShowsScreen")}
        />
        <DrawerItem
          label="Sponsors"
          onPress={() => props.navigation.navigate("SponsorsScreen")}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
