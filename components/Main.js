import React from 'react'
import { StyleSheet, StatusBar, View, Dimensions } from 'react-native'
// import { NativeRouter, Route, Link } from "react-router-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator,TransitionSpecs } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'
import { connect} from 'react-redux'



import CurvedArrow from './Arrow'

// import stockReducer from '../utils/StockReducer'
// import cocktailReducer from '../utils/CocktailReducer'
// import uiReducer from '../utils/UIReducer'

import Title from './Title'
import CocktailList from './CocktailList'
import AppText from './AppText'
import About from './About'
import Stock from './Stock'
import Menu from './Menu'
import Add from './AddCocktail'
import AddStock from './AddStock'
import ViewCocktail from './ViewCocktail'
import { navigationRef } from '../utils/RootNavigation'
import Intro from './Intro'

import CornerIcon from '../assets/corner.svg'

const Tab = createBottomTabNavigator()

const mapStateToProps = (state) => {
    const {  ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Main)

function Main(props){
        var screen_options = {
            headerShown: true, 
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
            unmountOnBlur: true
        }


        const windowWidth = Dimensions.get('window').width
    function InfoBox() {
        return (
            <View style={{
                position: 'absolute',
                top: 90,
                // bottom: windowHeight,
                // top: windowHeight - (windowHeight / 2),
                // top: windowHeight - (375),
                left: (windowWidth / 2) - 100,
                // left: 50,
                backgroundColor: '#fff',
                borderColor: '#000',
                borderWidth: 1,
                shadowOffset: { width: -4, height: -4, },
                shadowOpacity: 0.3,
                elevation: 10, // for Android,
                padding: 15,
                width: 200,
                zIndex: 199
            }}>
                <View>
                    <AppText>
                        Press and hold on the title to switch to dark mode or change the title!
                    </AppText>
                </View>
                <CurvedArrow style={{ position: 'absolute', top: -30, right: 60, transform: [{ scaleY: -1 }] }} />
            </View>
        )
    }
        
        if(!props.ui.tutorial_complete){
            return (
                <Intro />
            )
        } else {
            return (
                <NavigationContainer ref={navigationRef}>
                    <View style={[styles.container, props.ui.current_theme]}>
                        <InfoBox />
                        <StatusBar barStyle={props.ui.dark_mode ? "dark-content": "light-content"}></StatusBar>
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={60} height={60} />
                        <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={60} height={60} />
                        <Title></Title>
                        <Tab.Navigator  tabBar={props=> <Menu {...props} />} backBehavior={"history"} >
                            <Tab.Screen options={screen_options} name="CocktailList" style={styles.screen} component={CocktailList}></Tab.Screen>
                            <Tab.Screen options={screen_options} name="About" style={styles.screen} component={About}></Tab.Screen>
                            <Tab.Screen options={screen_options} name="Stock" style={styles.screen} component={Stock}></Tab.Screen>
                            <Tab.Screen options={screen_options} name="AddCocktail" style={styles.screen} component={Add}></Tab.Screen>
                            <Tab.Screen options={screen_options} name="AddStock" style={styles.screen} component={AddStock}></Tab.Screen>
                            <Tab.Screen options={screen_options} name="ViewCocktail" style={styles.screen} component={ViewCocktail}></Tab.Screen>
                        </Tab.Navigator>
                        {/* <View style={{width:props.ui.default_styles.window.width, bottom: 0, position: 'absolute', height: 20, zIndex:1, backgroundColor:'rgba(0,0,0,0)'}}> */}
                        <View style={{width:props.ui.default_styles.window.width, bottom: 0, position: 'absolute', height: 20, zIndex:1, backgroundColor:props.ui.current_theme.backgroundColor}}>
    
                        </View>
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