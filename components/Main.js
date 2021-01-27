import React, { useState, useEffect } from 'react'
import {
    StyleSheet, 
    StatusBar, 
    View,
    Modal
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionSpecs } from '@react-navigation/stack'
import { connect} from 'react-redux'
import * as Linking from 'expo-linking'
import * as SplashScreen from 'expo-splash-screen'

import Title from './Title'
import CocktailList from './CocktailList'
import AppText from './AppText'
import About from './About'
import Stock from './Stock'
import Menu from './Menu'
import Add from './AddCocktail'
import AddStock from './AddStock'
import ViewCocktail from './ViewCocktail'
import { navigationRef, isReadyRef } from '../utils/RootNavigation'
import Intro from './Intro'
import ImportCocktail from './ImportCocktail'


import CornerIcon from '../assets/corner.svg'

// const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const mapStateToProps = (state) => {
    const {  ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Main)



function Main(props){
    const [importModalVisible, setImportModalVisible] = useState(false) // handle links into app
    const [importCocktail, setImportCocktail] = useState({})
    Linking.addEventListener('url', handleUrl)

    useEffect(() => {
        fetchUrl()
    }, [])

    // can't stick async function in useEffect
    async function fetchUrl(){
        const url = await Linking.getInitialURL()
        console.log('url', url)
        if (url && url.url) {
            handleUrl(url)
        } else if (url.includes('?')){
            handleUrl({url})
        }
    }

    function handleUrl(data) {
        let { path, queryParams } = Linking.parse(data.url)
        console.log('opening from url', path, queryParams)
        setImportCocktail(queryParams)
        setImportModalVisible(true)
        SplashScreen.hideAsync()
    }
    function hideImportModal() {
        setImportModalVisible(false)
    }
        var screen_options = {
            headerShown: false, 
            transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
            },            
            cardStyleInterpolator: ({ current, next, layouts }) => {
                return {
                    cardStyle: {
                        opacity: current.progress.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,1]
                        })
                    },
                    overlayStyle: {}
                }
            },
            tabBarVisible: false,
            unmountOnBlur: true,
        }
        
        if(!props.ui.tutorial_complete){
            return (
                <Intro ui={props.ui} />
            )
        } else {
            return (
                <NavigationContainer 
                    ref={navigationRef} 
                    onReady={() => {
                        isReadyRef.current = true;
                    }}
                >
                    <View style={[styles.container, props.ui.current_theme]}>
                        <StatusBar barStyle={props.ui.dark_mode ? "dark-content": "light-content"}></StatusBar>
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={60} height={60} />
                        <Title></Title>
                        <Menu
                            isReady={isReadyRef.current}
                        ></Menu>
                        <Stack.Navigator 
                            headerMode={"float"}
                            backBehavior={"history"} 
                        >
                            <Stack.Screen options={screen_options} name="CocktailList" style={styles.screen}>
                                {(props) => <CocktailList {...props} handleUrl={handleUrl} />}
                            </Stack.Screen>
                            <Stack.Screen options={screen_options} name="About" style={styles.screen} component={About}></Stack.Screen>
                            <Stack.Screen options={screen_options} name="Stock" style={styles.screen} component={Stock}></Stack.Screen>
                            <Stack.Screen options={screen_options} name="AddCocktail" style={styles.screen} component={Add}></Stack.Screen>
                            <Stack.Screen options={screen_options} name="AddStock" style={styles.screen} component={AddStock}></Stack.Screen>
                            <Stack.Screen options={screen_options} name="ViewCocktail" style={styles.screen} component={ViewCocktail}></Stack.Screen>
                        </Stack.Navigator>
                        <View>
                            <Modal
                                animationType="slide"
                                visible={importModalVisible}
                            >
                                <ImportCocktail hide={hideImportModal} cocktail={importCocktail} />
                            </Modal>
                        </View>
                        {/* <View style={{width:props.ui.default_styles.window.width, bottom: 0, position: 'absolute', height: 20, zIndex:1, backgroundColor:'rgba(0,0,0,0)'}}> */}
                        <View style={{width:props.ui.default_styles.window.width, bottom: 0, position: 'absolute', height: 20, zIndex:1, backgroundColor:props.ui.current_theme.backgroundColor}}></View>
                    </View>
                </NavigationContainer>
            )
        }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginTop: 10
    },
    screen: {
        flex: 1, 
        marginTop: 20,
        paddingTop: 40,
        paddingLeft: 50,
        paddingRight: 50,
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: 0, right: 10 },
    top_left: {  top: 0, left: 10, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: 10, right: 10, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: 10, left: 10, transform: [{ rotate: '180deg' }] }
})