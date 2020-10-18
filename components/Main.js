import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeRouter, Route, Link } from "react-router-native"

import Title from './Title'
import CocktailList from './CocktailList'
import AppText from './AppText'
import About from './About'
import Stock from './Stock'
import Menu from './Menu'
import Add from './AddCocktail'

export default class Main extends React.Component {

    render() {
        return (
            <NativeRouter>
                <View style={styles.container}>
                    <Title></Title>

                    <Menu></Menu>


                    <Route exact path="/">
                        <CocktailList style={styles.view} />
                    </Route>
                    <Route exact path="/about">
                        <About />
                    </Route>
                    <Route exact path="/stock">
                        <Stock style={styles.view} />
                    </Route>
                    <Route exact path="/add-cocktail">
                        <Add style={styles.view} />
                    </Route>
                </View>
            </NativeRouter>
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
        marginRight: 50
    },
})