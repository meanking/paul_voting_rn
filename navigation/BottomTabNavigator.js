import * as React from 'react';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Loadable from 'react-loadable';
import Loading from './Loading';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import { StackActions } from '@react-navigation/native';

const HomeScreen = Loadable({
  loader: () => import('../screens/HomeScreen'),
  loading: Loading,
})
const LiveScreen = Loadable({
  loader: () => import('../screens/LiveScreen'),
  loading: Loading,
})
const TokensScreen = Loadable({
  loader: () => import('../screens/TokensScreen'),
  loading: Loading,
})
const VoteScreen = Loadable({
  loader: () => import('../screens/VoteScreen'),
  loading: Loading,
})
const ScoreboardScreen = Loadable({
  loader: () => import('../screens/ScoreboardScreen'),
  loading: Loading,
})
const ChatScreen = Loadable({
  loader: () => import('../screens/ChatScreen'),
  loading: Loading,
})

const LoginScreen = Loadable({
  loader: () => import('../screens/auth/LoginScreen'),
  loading: Loading,
})
const ForgotScreen = Loadable({
  loader: () => import('../screens/auth/ForgotScreen'),
  loading: Loading,
})
const SignupScreen = Loadable({
  loader: () => import('../screens/auth/SignupScreen'),
  loading: Loading,
})
const ScheduleScreen = Loadable({
  loader: () => import('../screens/ScheduleScreen'),
  loading: Loading,
})
const ParticipateScreen = Loadable({
  loader: () => import('../screens/ParticipateScreen'),
  loading: Loading,
})
const PastShowsScreen = Loadable({
  loader: () => import('../screens/PastShowsScreen'),
  loading: Loading,
})
const SponsorsScreen = Loadable({
  loader: () => import('../screens/SponsorsScreen'),
  loading: Loading,
})

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator(props) {
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
        listeners={{
          tabPress :(e)=>{
            e.preventDefault();
            props.navigation.dispatch(StackActions.replace(
              'MainHome', {
                screen: 'Home',
                params: {
                  screen: 'HomeScreen'
                }
              }
            ));
          }
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

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const HomeStack = createStackNavigator();

function HomeNavigator(props) {

  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown:false }}
      />
      <HomeStack.Screen
        name="LoginScreen"
        component={AuthNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ParticipateScreen"
        component={ParticipateScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PastShowsScreen"
        component={PastShowsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="SponsorsScreen"
        component={SponsorsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}

const AuthStact = createStackNavigator();
function AuthNavigator() {
  return (
    <AuthStact.Navigator initialRouteName="LoginScreen">
      <AuthStact.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <AuthStact.Screen
        name="ForgotScreen"
        component={ForgotScreen}
        options={{ headerShown: false }}
      />
      <AuthStact.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </AuthStact.Navigator>
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