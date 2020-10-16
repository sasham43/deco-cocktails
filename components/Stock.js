import React from 'react'
import {View, StyleSheet} from 'react-native'

import AppText from './AppText'

export default class Stock extends React.Component {

    render(){
        return (
            <View style={[styles.stock, styles.view]}>
                <AppText>Stock page yeah yeah</AppText>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    stock: {
        justifyContent: 'flex-start'
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    }
})