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
        <View style={styles.directions_input_container}>
            <TextInput
                style={[styles.directions_input, props.ui.current_theme]}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => props.setText(text)}
                value={props.text} />
        </View>
    )
}

const styles = StyleSheet.create({
    // directions_input_container: {

    // },
    directions_input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        flexDirection: 'column',
        height: 150,
        flex: 1,
        alignItems: 'stretch',
    },
    directions: {
        padding: 20
    },
    directions_text: {
        fontSize: 17
    }
})