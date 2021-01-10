// modules
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable } from 'react-native'; 
import { AppLoading } from 'expo'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import {
  useFonts,
  PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ScreenOrientation from 'expo-screen-orientation'

import stockReducer from './utils/StockReducer'
import cocktailReducer from './utils/CocktailReducer'
import uiReducer from './utils/UIReducer'

// components
import Main from './components/Main'

const persistConfig = {
    key: 'root', 
    storage: AsyncStorage
}
const persistedReducer = persistReducer(persistConfig, combineReducers({
    stock: stockReducer,
    cocktails: cocktailReducer,
    ui: uiReducer
}))

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export default function App(props) {
  const [ui, setUI] = useState({})

  let [fontsLoaded] = useFonts({
    PoiretOne_400Regular,
  })

  var state = store.getState()

  useEffect(()=>{
    setUI(state.ui)
  },[state])
  
  store.subscribe(()=>{
    state = store.getState()
    setUI(state.ui)
  })

  // attempt to lock orientation for iPad
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP)

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nloading...', ui.tutorial_complete)

  if(!fontsLoaded){
    return <AppLoading />
  } else {
    return (
      <Provider store={store}>
        <SafeAreaView style={[styles.container, { fontFamily: 'PoiretOne_400Regular' }, ui.current_theme]}>
          <Main></Main>
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },
});
