import React from 'react';
import {
  SafeAreaView,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { StackActions } from '@react-navigation/native';

const CustomSidebarMenu = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Login"
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.dispatch(
              StackActions.replace(
                'MainHome', {
                  screen: 'Home',
                  params: {
                    screen: 'LoginScreen'
                  }
                }
              )
            )
          }}
        />
        <DrawerItem
          label="Schedule"
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.dispatch(
              StackActions.replace(
                'MainHome', {
                  screen: 'Home',
                  params: {
                    screen: 'ScheduleScreen'
                  }
                }
              )
            )
          }}
        />
        <DrawerItem
          label="Participate"
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.dispatch(
              StackActions.replace(
                'MainHome', {
                  screen: 'Home',
                  params: {
                    screen: 'ParticipateScreen'
                  }
                }
              )
            )
          }}
        />
        <DrawerItem
          label="PastShows"
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.dispatch(
              StackActions.replace(
                'MainHome', {
                  screen: 'Home',
                  params: {
                    screen: 'PastShowsScreen'
                  }
                }
              )
            )
          }}
        />
        <DrawerItem
          label="Sponsors"
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.dispatch(
              StackActions.replace(
                'MainHome', {
                  screen: 'Home',
                  params: {
                    screen: 'SponsorsScreen'
                  }
                }
              )
            )
          }}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomSidebarMenu;
