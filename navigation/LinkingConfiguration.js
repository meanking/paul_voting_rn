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
                      LoginScreen: 'login',
                      ScheduleScreen: 'schedule',
                      ParticipateScreen: 'participate',
                      PastShowsScreen: 'pastshows',
                      Sponsors: 'sponsors',
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
