import React from 'react'
import { StyleSheet, View, TextInput } from 'react-native'

import AppText from './AppText'
import CornerIcon from '../assets/corner'

export function Directions(props){
    return (
        <View style={styles.directions}>
            <AppText style={styles.directions_text}>{props.directions}</AppText>
        </View>
    )
}

export function DirectionsInput(props){
    var icon_size = 15
    return (
        <View style={styles.directions_input_container}>
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <TextInput
                style={[styles.directions_input, props.ui.current_theme]}
                multiline={true}
                numberOfLines={10}
                onChangeText={(text) => props.setText(text)}
                value={props.text} 
                placeholder={"Directions..."}
                placeholderTextColor={"grey"}
                />
        </View>
    )
}
var icon_distance = 0
const styles = StyleSheet.create({
    directions_input_container: {
        marginTop: 25
    },
    directions_input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        // flexDirection: 'column',
        height: 150,
        flex: 1,
        alignItems: 'stretch',
    },
    directions: {
        padding: 20
    },
    directions_text: {
        fontSize: 17
    },

    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] }
})