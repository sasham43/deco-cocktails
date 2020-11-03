// modules
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native'; 
import {AppLoading} from 'expo'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {
  useFonts,
  PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'

import stockReducer from './utils/StockReducer'
import cocktailReducer from './utils/CocktailReducer'
import uiReducer from './utils/UIReducer'

// components
import Main from './components/Main'

const store = createStore(combineReducers({
  stock: stockReducer,
  cocktails: cocktailReducer,
  ui: uiReducer,
}))

export default function App(props) {
  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  })

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nloading...')

  if(!fontsLoaded){
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
      <SafeAreaView style={[styles.container, { fontFamily: 'PoiretOne_400Regular' }]}>
        {/* <Text>Crump Cocktails</Text> */}
        <StatusBar barStyle={"light-content"} />
        <Main></Main>
      </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    // backgroundColor: '#fff',
    // marginTop: 10
    // alignItems: 'center',
    // justifyContent: 'center',
    // fontFamily: 'PoiretOne_400Regular'
  },
});
