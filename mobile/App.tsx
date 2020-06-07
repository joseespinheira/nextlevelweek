import React, { Fragment } from 'react';
import { AppLoading } from 'expo'
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'
import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'

import Routes from './src/routes';

export default function App() {
  const [fontLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontLoaded){
    return <AppLoading />
  }

  return (
    <Fragment>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
      <Routes />
    </Fragment>
  );
}

