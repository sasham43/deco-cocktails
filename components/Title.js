import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import TabIcon from '../assets/tab'
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
        // setBorder(props.ui.current_theme.color)
    }
    function pressOut(){
        setBorder(props.ui.current_theme.backgroundColor)
    }
    return (
        <Pressable onPressIn={() => pressIn()} onPressOut={() => pressOut()} onPress={()=>goToAbout()} onLongPress={() => goToAbout()} style={[props.ui.current_theme, styles.title]}>
            <View style={{ borderColor: border, borderBottomWidth: 1 }}>
                {/* <AppText style={[styles.text]}>
                    {props.ui.title ? props.ui.title : ''}
                </AppText> */}
                <TitleText title={props.ui.title} theme={props.ui.current_theme} />
            </View>
        </Pressable>
    )
}

function TitleText(props){
    if(props.title == ''){
        return (
            <View style={{height:50, marginTop: -10}}>
                <TabIcon fill={props.theme.color} height={65} width={65}  />
            </View>
        )
    } else {
        return (
            <AppText style={[styles.text]}>
                {props.title ? props.title : ''}
            </AppText>
        )
    }
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