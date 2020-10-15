// modules
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native'; 
import {AppLoading} from 'expo'
import {
  useFonts,
  PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'

// components
import Main from './components/Main'

export default function App() {
  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  })

  if(!fontsLoaded){
    return <AppLoading />
  } else {
    return (
      <View style={[styles.container, { fontFamily: 'PoiretOne_400Regular' }]}>
        {/* <Text>Crump Cocktails</Text> */}
        <StatusBar style="auto" />
        <Main></Main>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: 'PoiretOne_400Regular'
  },
});
