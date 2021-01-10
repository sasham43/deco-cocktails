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
import AppIntroSlider from 'react-native-app-intro-slider'

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

  function renderIntro({item}){
    return (
      <View>
        <View>
          <Text>{item.title}</Text>
        </View>
        <View>
          <Text>{item.text}</Text>
        </View>
      </View>
    )
  }

  /*
    Intro
    1. Welcome
    2. Function Menu Button
      2.5 Function Menu example ?
    3. Add custom cocktails
    4. Manage cabinet
    5. About screen
  */
  const intro = [
    {
      key: 0,
      title: 'Welcome to the Hotel Crump!',
      text: 'The premier menu for custom cocktails',
      image: '',
      backgroundColor: '#fff'
    },
    {
      key: 1,
      title: 'Make your own cocktails',
      text: '',
      image: '',
      backgroundColor: '#fff'
    },
    {
      key: 2,
      title: 'Share cocktails with friends!',
      text: '',
      image: '',
      backgroundColor: '#fff'
    },
  ]
  function onIntroDone(){
    console.log('finished intro')
  }
  function doneButton(){
    return (
      <View>
        <Text>Done</Text>
      </View>
    )
  }
  function skipButton(){
    return (
      <View>
        <Text>Skip</Text>
      </View>
    )
  }

  console.log('\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nloading...', ui.first)

  if(!fontsLoaded){
    return <AppLoading />
  } else if (ui.first){
    return (
      <SafeAreaView style={[styles.container, { fontFamily: 'PoiretOne_400Regular' }, ui.current_theme]}>
        <AppIntroSlider
          renderItem={renderIntro}
          data={intro}
          onDone={onIntroDone}
          activeDotStyle={{ backgroundColor: '#000' }}
          showSkipButton={true}
          renderDoneButton={doneButton}
          renderSkipButton={skipButton}
        />
      </SafeAreaView>
    )
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
