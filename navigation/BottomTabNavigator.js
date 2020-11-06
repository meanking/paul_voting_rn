import { TouchableOpacity } from 'react-native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import HomeScreen from '../screens/HomeScreen';
import LiveScreen from '../screens/LiveScreen';
import TokensScreen from '../screens/TokensScreen';
import VoteScreen from '../screens/VoteScreen';
import ScoreboardScreen from '../screens/ScoreboardScreen';
import ChatScreen from '../screens/ChatScreen';

import LoginScreen from '../screens/LoginScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ParticipateScreen from '../screens/ParticipateScreen';
import PastShowsScreen from '../screens/PastShowsScreen';
import SponsorsScreen from '../screens/SponsorsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint, style: {backgroundColor: '#000000'} }}>
      <BottomTab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Live"
        component={LiveNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="play" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Tokens"
        component={TokensNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="money" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Vote"
        component={VoteNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="thumbs-o-up" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Scoreboard"
        component={ScoreboardNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="sort-numeric-asc" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="aliwangwang-o1" size={24} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown:false
        }}
      />
      <VoteStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <VoteStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <VoteStack.Screen
        name="ParticipateScreen"
        component={ParticipateScreen}
        options={{ headerShown: false }}
      />
      <VoteStack.Screen
        name="PastShowsScreen"
        component={PastShowsScreen}
        options={{ headerShown: false }}
      />
      <VoteStack.Screen
        name="SponsorsScreen"
        component={SponsorsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const LiveStack = createStackNavigator();

function LiveNavigator() {
  return (
    <LiveStack.Navigator>
      <LiveStack.Screen
        name="LiveScreen"
        component={LiveScreen}
        options={{ headerShown: false }}
      />
    </LiveStack.Navigator>
  );
}

const TokensStack = createStackNavigator();

function TokensNavigator() {
  return (
    <TokensStack.Navigator>
      <TokensStack.Screen
        name="TokensScreen"
        component={TokensScreen}
        options={{ headerShown: false }}
      />
    </TokensStack.Navigator>
  );
}

const VoteStack = createStackNavigator();

function VoteNavigator() {
  return (
    <VoteStack.Navigator>
      <VoteStack.Screen
        name="VoteScreen"
        component={VoteScreen}
        options={{ headerShown: false }}
      />
    </VoteStack.Navigator>
  );
}

const ScoreboardStack = createStackNavigator();

function ScoreboardNavigator() {
  return (
    <ScoreboardStack.Navigator>
      <ScoreboardStack.Screen
        name="ScoreboardScreen"
        component={ScoreboardScreen}
        options={{ headerShown: false }}
      />
    </ScoreboardStack.Navigator>
  );
}

const ChatStack = createStackNavigator();

function ChatNavigator() {
  return (
    <ChatStack.Navigator>
      <ChatStack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
}