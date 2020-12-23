import React from 'react'
import { StyleSheet, View } from 'react-native'

import AppText from './AppText'


export default function Directions(props){
    return (
        <View style={styles.directions}>
            <AppText style={styles.directions_text}>{props.directions}</AppText>
        </View>
    )
}

const styles = StyleSheet.create({
    directions: {
        padding: 20
    },
    directions_text: {
        fontSize: 17
    }
})