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
    function shrinkText(){
        setBorder(props.ui.current_theme.color)
    }
    function growText(){
        setBorder(props.ui.current_theme.backgroundColor)
    }
    return (
        <Pressable onPressIn={() => shrinkText()} onPressOut={() => growText()} onLongPress={() => goToAbout()} style={[props.ui.current_theme, styles.title]}>
            <AppText style={[styles.text, {borderColor: border, borderBottomWidth: 1}]}>
                {props.ui.title ? props.ui.title : ''}
            </AppText>
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