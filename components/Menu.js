import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import AppText from './AppText'

export default class Menu extends React.Component {
    render(){
        return (
            <View style={styles.menu}>
                <Link to="/about">
                    <AppText>About</AppText>
                </Link>
                <Link to="/">
                    <AppText>Cocktails</AppText>
                </Link>
                <Link to="/stock">
                    <AppText>Stock</AppText>
                </Link>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        // height: 1
    }
})