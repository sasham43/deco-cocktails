import React from 'react'
import { StyleSheet, AsyncStorage, View } from 'react-native'
// import { NativeRouter, Route, Link } from "react-router-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack'
// import { Provider } from 'react-redux'
import { createStore, combineReducers} from 'redux'
import { connect} from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'

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

import CornerIcon from '../assets/corner.svg'

const Stack = createStackNavigator()

const persistConfig = {
    key: 'root', // maybe stock?
    storage: AsyncStorage
}

// finish setting up state before adding persistance, leads to weird stuff
//
// const persistedReducer = persistReducer(persistConfig, cocktailReducer)
// const persistedReducer = persistReducer(persistConfig, combineReducers({
//     stock: stockReducer,
//     cocktails: cocktailReducer
// }))
// const store = createStore(persistedReducer)



// const store = createStore(combineReducers({
//     stock: stockReducer,
//     cocktails: cocktailReducer,
//     ui: uiReducer,
// }))
// const persistor = persistStore(store) // not sure what to do with this
// const store = createStore(stockReducer)

const mapStateToProps = (state) => {
    // console.log('state', state)
    const {  ui } = state
    return { ui }
}
// const mapDispatchToProps = dispatch => (
//     bindActionCreators({
//         deleteCocktail
//     }, dispatch)
// )
export default connect(mapStateToProps)(Main)

// export default 
// class Main extends React.Component {

//     constructor(props) {
//         super(props)
//     }

    
//     render() {
function Main(props){
        // return (
        // console.log("transition spects", TransitionSpecs)
        var screen_options = {
            headerShown: true, 
            transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
            },            
            cardStyleInterpolator: ({ current, next, layouts }) => {
                // console.log('current, next ', current, next, layouts)
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
            // <Provider store={store}>
            // <View>
                <NavigationContainer>
                <View style={[styles.container, props.ui.current_theme]}>

                
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={60} height={60} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={60} height={60} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={60} height={60} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={60} height={60} />
                    <Title></Title>
                    <Stack.Navigator  screenOptions={{ header: (props) => <Menu props={{...props}} /> }}>
                        <Stack.Screen options={screen_options} name="CocktailList" style={styles.screen} component={CocktailList}></Stack.Screen>
                        <Stack.Screen options={screen_options} name="About" style={styles.screen} component={About}></Stack.Screen>
                        <Stack.Screen options={screen_options} name="Stock" style={styles.screen} component={Stock}></Stack.Screen>
                        <Stack.Screen options={screen_options} name="AddCocktail" style={styles.screen} component={Add}></Stack.Screen>
                        <Stack.Screen options={screen_options} name="AddStock" style={styles.screen} component={AddStock}></Stack.Screen>
                    </Stack.Navigator>
                </View>
                </NavigationContainer>

        )
    }
// }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'stretch',
        // marginTop: 50,
        // marginLeft: 50,
        // marginRight: 50,
        // paddingLeft: 50,
        // paddingRight: 50,
        // backgroundColor: '#fff',
        // backgroundColor: '#000',
    },
    screen: {
        flex: 1, 
        // width: 1000,
        marginTop: 20,
        paddingTop: 40,
        // paddingLeft: 20,
        // paddingRight: 20,
        // backgroundColor: '#fff',
        backgroundColor: '#000',
        paddingLeft: 50,
        paddingRight: 50,
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: 40, right: 10 },
    top_left: {  top: 40, left: 10, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: 30, right: 10, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: 30, left: 10, transform: [{ rotate: '180deg' }] }
})
// export default connect(mapStateToProps, null)(Main)