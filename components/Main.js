import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { NativeRouter, Route, Link } from "react-router-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack'

import Title from './Title'
import CocktailList from './CocktailList'
import AppText from './AppText'
import About from './About'
import Stock from './Stock'
import Menu from './Menu'
import Add from './AddCocktail'
import AddStock from './AddStock'

import CornerIcon from '../assets/corner.svg'

const Stack = createStackNavigator()

export default class Main extends React.Component {

    
    render() {
        // console.log("transition spects", TransitionSpecs)
        var screen_options = {
            headerShown: true, 
            transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
            },            
            cardStyleInterpolator: ({ current, next, layouts }) => {
                console.log('current, next ', current, next, layouts)
                return {
                    cardStyle: {
                        opacity: current.progress.interpolate({
                            inputRange: [0,1],
                            outputRange: [0,1]
                        })
                    },
                    overlayStyle: {}
                }
            }
        }
        return (
            <NavigationContainer style={styles.container}>
                <CornerIcon style={styles.top_right} width={60} height={60} />
                <CornerIcon style={styles.top_left} width={60} height={60} />
                <CornerIcon style={styles.bottom_right} width={60} height={60} />
                <CornerIcon style={styles.bottom_left} width={60} height={60} />
                <Title></Title>
                <Stack.Navigator  screenOptions={{ header: (props) => <Menu props={{...props}} /> }}>
                    <Stack.Screen options={screen_options} name="CocktailList" style={styles.screen} component={CocktailList}></Stack.Screen>
                    <Stack.Screen options={screen_options} name="About" style={styles.screen} component={About}></Stack.Screen>
                    <Stack.Screen options={screen_options} name="Stock" style={styles.screen} component={Stock}></Stack.Screen>
                    <Stack.Screen options={screen_options} name="AddCocktail" style={styles.screen} component={Add}></Stack.Screen>
                    <Stack.Screen options={screen_options} name="AddStock" style={styles.screen} component={AddStock}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        marginTop: 50,
        marginLeft: 50,
        marginRight: 50,
        // paddingLeft: 50,
        // paddingRight: 50,
        backgroundColor: '#fff'
    },
    screen: {
        flex: 1, 
        // width: 1000,
        marginTop: 20,
        paddingTop: 40,
        // paddingLeft: 20,
        // paddingRight: 20,
        backgroundColor: '#fff',
        paddingLeft: 50,
        paddingRight: 50,
    },
    top_right: { position: 'absolute', top: 20, right: 10 },
    top_left: { position: 'absolute', top: 20, left: 10, transform: [{ rotate: '-90deg' }] },
    bottom_right: { zIndex: 10, position: 'absolute', bottom: 10, right: 10, transform: [{ rotate: '90deg' }] },
    bottom_left: { zIndex: 10, position: 'absolute', bottom: 10, left: 10, transform: [{ rotate: '180deg' }] }
})