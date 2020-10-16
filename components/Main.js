import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { NativeRouter, Route, Link } from "react-router-native"

import Title from './Title'
import CocktailList from './CocktailList'
import AppText from './AppText'
import About from './About'

export default class Main extends React.Component {

    render() {
        return (
                <NativeRouter>
                    <View style={styles.container}>
                        <Title></Title>
                        <View>
                            <Link to="/about">
                                <AppText>About</AppText>
                            </Link>
                            <Link to="/">
                                <AppText>Cocktails</AppText>
                            </Link>
                        </View>

                        <Route exact path="/">
                            <CocktailList />
                        </Route>
                        <Route exact path="/about">
                            <About />
                        </Route>
                        {/* <Route exact path="/" component={CocktailList} />
                        <Route path="/about" component={About} /> */}
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
    }
})