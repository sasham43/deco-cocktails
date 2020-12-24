import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import AppText from './AppText'


export function Directions(props){
    return (
        <View style={styles.directions}>
            <AppText style={styles.directions_text}>{props.directions}</AppText>
        </View>
    )
}

export function DirectionsInput(props){
    return (
        <View>
            <TextInput
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => props.setText(text)}
                value={props.text} />
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