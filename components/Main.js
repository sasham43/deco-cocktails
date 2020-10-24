import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { NativeRouter, Route, Link } from "react-router-native"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

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
        return (
            <NavigationContainer style={styles.container}>
                <Title></Title>
                <Stack.Navigator screenOptions={{ header: () => <Menu /> }}>
                    {/* <Menu></Menu> */}
                    <Stack.Screen options={{ headerShown: true, }} name="CocktailList" style={styles.screen} component={CocktailList}></Stack.Screen>
                    <Stack.Screen options={{headerShown: true}} name="About" style={styles.screen} component={About}></Stack.Screen>
                    <Stack.Screen options={{headerShown: true}} name="Stock" style={styles.screen} component={Stock}></Stack.Screen>
                    <Stack.Screen options={{headerShown: true}} name="AddCocktail" style={styles.screen} component={Add}></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>

            // <NativeRouter>
            //     <View style={styles.container}>
            //         <CornerIcon style={{position: 'absolute', top: -10, right: -30}} width={60} height={60} />
            //         <CornerIcon style={{position: 'absolute', top: -10, left: -30, transform:[{rotate: '-90deg'}]}} width={60} height={60} />
            //         <CornerIcon style={{position: 'absolute', bottom: 30, right: -30,transform:[{rotate: '90deg'}]}} width={60} height={60} />
            //         <CornerIcon style={{position: 'absolute', bottom: 30, left: -30,transform:[{rotate: '180deg'}]}} width={60} height={60} />

            //         <Title></Title>

            //         <Menu></Menu>


            //         <Route exact path="/">
            //             <CocktailList style={styles.view} />
            //         </Route>
            //         <Route exact path="/about">
            //             <About />
            //         </Route>
            //         <Route exact path="/stock">
            //             <Stock style={styles.view} />
            //         </Route>
            //         <Route path={["/add-cocktail/:id", "/add-cocktail"]}>
            //             <Add style={styles.view} />
            //         </Route>
            //         {/* <Route path="/add-cocktail/:name/:ingredients">
            //             <Add style={styles.view} />
            //         </Route> */}
            //         <Route exact path="/add-stock">
            //             <AddStock style={styles.view} />
            //         </Route>
            //     </View>
            // </NativeRouter>
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
        backgroundColor: '#fff'
    },
    screen: {
        flex: 1, 
        // width: 1000,
        marginTop: 20,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff'
    }
})