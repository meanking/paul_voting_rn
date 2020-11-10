import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

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

export default CustomSidebarMenu;
