import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import * as RootNavigation from '../utils/RootNavigation'


const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
} // export is at bottom

function Title(props){
    const [border, setBorder] = useState(props.ui.current_theme.backgroundColor)
    useEffect(()=>{
        setBorder(props.ui.current_theme.backgroundColor)
    }, [props.ui.dark_mode])

    function goToAbout(){
        RootNavigation.navigate('About')
    }
    function pressIn(){
        // console.log('shrink', props.ui.current_theme.color)
        setBorder(props.ui.current_theme.color)
    }
    function pressOut(){
        // console.log('grow')
        setBorder(props.ui.current_theme.backgroundColor)
    }
    return (
        <Pressable onPressIn={() => pressIn()} onPressOut={() => pressOut()} onLongPress={() => goToAbout()} style={[props.ui.current_theme, styles.title]}>
            <View style={{ borderColor: border, borderBottomWidth: 1 }}>
                <AppText style={[styles.text]}>
                    {props.ui.title ? props.ui.title : ''}
                </AppText>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    title: {
        alignItems: 'center',
        marginTop: 20,
        minHeight: 20,
        textAlign: 'center',
    },
    text: {
        fontSize: 35
    }
})

export default connect(mapStateToProps)(Title)