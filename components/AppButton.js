import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import CornerIcon from '../assets/corner.svg'


const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}

export default connect(mapStateToProps)(AppButton)

function AppButton(props) {
    const [pressed, setPressed] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const theme = props.ui.current_theme
    const border = props.ui.border_color

    useEffect(()=>{
        if (props.disabled != undefined) {
            setDisabled(props.disabled)
        }
    }, [props.disabled])
    
    function pressStyles(props) {
        var disabled_style = disabled ? {borderColor: 'rgba(0,0,0,0)'} : null
        if (!props.pressed) {
            return [styles.button, { borderColor: border, backgroundColor: theme.backgroundColor }, props.style, disabled_style]
        } else {
            return [styles.pressed_button, {borderColor: props.border, backgroundColor: theme.color}, props.style, disabled_style]
        }
    }
    function press(){
        if(props.press) props.press()
    }
    var icon_size = 15
    return (
        <Pressable disabled={disabled} pressDelay={'none'} style={pressStyles} onPressIn={() => setPressed(true)} onPressOut={() => setPressed(false)} onPress={() => press()}>
            <CornerIcon fill={theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <ButtonText pressed={pressed} theme={theme} style={disabled ? { color: 'grey' } : null}>{props.children}</ButtonText>
        </Pressable>
    )
}

function ButtonText(props) {
    if (props.pressed) {
        return (
            <AppText style={[styles.button_pressed_text, {color: props.theme.backgroundColor}, props.style]}>{props.children}</AppText>
        )
    } else {
        return (
            <AppText style={[styles.button_text, {color: props.theme.color}, props.style]}>{props.children}</AppText>
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
        borderWidth: 1,
        padding: 8,
        alignItems: 'center'
    },
    pressed_button: {
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        padding: 8,
        alignItems: 'center'
    },
    button_text: {
        fontSize: 20,
    },
    button_pressed_text: {
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