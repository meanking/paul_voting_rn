import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Font from 'expo-font';
import { useFonts } from '@use-expo/font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AppLoading } from 'expo';

const customFonts = {
  Calibri: require('./assets/fonts/calibri.woff'),
  PalookaBBital: require('./assets/fonts/PalookaBB_ital.woff'),
  PalookaBB: require('./assets/fonts/PalookaBB.woff'),
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [isLoded] = useFonts(customFonts);

  if (!isLoded) {
    return <AppLoading />;
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
