import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Link } from 'react-router-native'

import AppText from './AppText'

export default class Menu extends React.Component {
    render(){
        return (
            <View style={styles.menu}>
                <View style={styles.link}>
                    <Link to="/about">
                        <AppText>About</AppText>
                    </Link>
                </View>
                <View style={styles.link}>
                    <Link to="/">
                        <AppText>Cocktails</AppText>
                    </Link>
                </View>
                <View style={styles.link}>
                    <Link to="/stock">
                        <AppText>Stock</AppText>
                    </Link>
                </View>
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
    },
    link: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    }
})