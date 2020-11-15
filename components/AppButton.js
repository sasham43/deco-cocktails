import React, { useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import AppText from './AppText'
import CornerIcon from '../assets/corner.svg'



export default function AppButton(props) {
    const [pressed, setPressed] = useState(false)
    const theme = props.theme
    const border = props.border

    // console.log('button props', props, props.border)

    function pressStyles(props) {
        if (!props.pressed) {
            // console.log('btn', [styles.button, { borderColor: border, backgroundColor: theme.backgroundColor }])
            return [styles.button, {borderColor: border, backgroundColor: theme.backgroundColor}]
        } else {
            return [styles.pressed_button, {borderColor: props.border, backgroundColor: theme.color}]
        }
    }
    var icon_size = 15
    return (
        <Pressable pressDelay={'none'} style={pressStyles} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} onPress={() => props.press()}>
            <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <ButtonText pressed={pressed} theme={props.theme}>{props.children}</ButtonText>
        </Pressable>
    )
}

function ButtonText(props) {
    if (props.pressed) {
        return (
            <AppText style={[styles.button_pressed_text, {color: props.theme.backgroundColor}]}>{props.children}</AppText>
        )
    } else {
        return (
            <AppText style={[styles.button_text, {color: props.theme.color}]}>{props.children}</AppText>
        )
    }
}



var icon_distance = -1
const styles = StyleSheet.create({
    button_text: {
        fontSize: 23,
        textAlign: 'center'
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        // borderColor: '#333',
        borderWidth: 1,
        padding: 8,
        alignItems: 'center'
    },
    pressed_button: {
        marginTop: 5,
        marginBottom: 5,
        // borderColor: '#333',
        // backgroundColor: '#fff',
        borderWidth: 1,
        padding: 8,
        alignItems: 'center'
    },
    button_text: {
        // color: '#fff',
        fontSize: 20,
    },
    button_pressed_text: {
        // color: '#000',
        fontSize: 20,
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