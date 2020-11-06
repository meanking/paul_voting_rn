import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              Home: {
                screens: {
                  Home: {
                    screens: {
                      HomeScreen: 'home',
                    },
                    screens: {
                      LoginScreen: 'login',
                    },
                    screens: {
                      ScheduleScreen: 'schedule',
                    },
                    screens: {
                      ParticipateScreen: 'participate',
                    },
                  },
                  Live: {
                    screens: {
                      LiveScreen: 'live',
                    },
                  },
                  Tokens: {
                    screens: {
                      TokensScreen: 'tokens',
                    },
                  },
                  Vote: {
                    screens: {
                      VoteScreen: 'vote',
                    },
                  },
                  Scoreboard: {
                    screens: {
                      ScoreboardScreen: 'scoreboard',
                    },
                  },
                  Chat: {
                    screens: {
                      ChatScreen: 'chat',
                    },
                  },
                }
              }
            }
          }
        },
      }
    },
  },
};
