import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import GestureRecognizer from 'react-native-swipe-gestures'

import AppText from './AppText'
import AppButton from './AppButton'
import { setDarkMode } from '../utils/UIActions'
import { resetDefaultCocktails } from '../utils/CocktailActions'
import { resetDefaultStock } from '../utils/StockActions'
import { setTitle, setTutorialComplete } from '../utils/UIActions'


const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDarkMode,
        resetDefaultCocktails,
        resetDefaultStock,
        setTitle,
        setTutorialComplete
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(About)

function About (props){
    function resetDefault(type) {
        var reset, title
        if(type == 'cocktails'){
            reset = props.resetDefaultCocktails
            title = 'Reset cocktails to default?'
            var msg = 'This will remove all new cocktails and cannot be undone'
        } else if (type == 'stock'){
            reset = props.resetDefaultStock
            title = 'Reset cabinet to default?'
            var msg = 'This will remove all new bottles from your cabinet and cannot be undone'
        }
        
        // var msg = ''
        var buttons = [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: reset
            }
        ]
        Alert.alert(title, msg, buttons)
    }
    const [menuTitle, setMenuTitle] = useState(props.ui.title ? props.ui.title : '')

    function save(){
        props.setTitle(menuTitle)
    }

    function swipeRight(state){
        if(state.x0 < 150){
            return props.navigation.goBack()
        }
    }

    return (
        <GestureRecognizer
            style={[props.ui.default_styles.viewStyles, styles.about, props.ui.current_theme]}
            onSwipeRight={(state)=>swipeRight(state)}
        >
            <KeyboardAwareScrollView>
                <View style={styles.about_content}>
                    <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                        <AppText style={styles.about_header}>Theme</AppText>
                    </View>
                    <View style={styles.button_container}>
                        <View style={styles.about_button}>
                            <AppButton  press={()=>props.setDarkMode(true)}>Dark</AppButton>
                        </View>
                        <View style={styles.about_button}>
                            <AppButton press={()=>props.setDarkMode(false)}>Light</AppButton>
                        </View>
                    </View>
                </View>
                <View style={styles.about_content}>
                    <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                        <AppText style={styles.about_header}>Title</AppText>
                    </View>
                    <View style={{justifyContent: 'flex-end', paddingLeft: 10, paddingRight: 10}}>
                        <View style={styles.button_container}>
                            <AppButton press={()=>save()}>Save</AppButton>
                            <TextInput 
                                value={menuTitle}
                                onChangeText={val => setMenuTitle(val)} 
                                onSubmitEditing={()=>save()}
                                style={[styles.input, props.ui.current_theme]}
                                placeholder={"Menu Title..."}
                                placeholderTextColor={"grey"}
                                maxLength={22}
                                autoCapitalize={"words"}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex:1}}>
                            <AppText style={{color: 'grey'}}>
                                {menuTitle.length} / 22 letters
                            </AppText>
                        </View>
                    </View>
                </View>
                <View style={styles.about_content}>
                    <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                        <AppText style={styles.about_header}>Reset Defaults</AppText>
                    </View>
                    <View style={styles.button_container}>
                        <View style={styles.about_button}>
                            <AppButton press={() => resetDefault('cocktails')}>Cocktails</AppButton>
                        </View>
                        <View style={styles.about_button}>
                            <AppButton press={() => resetDefault('stock')}>Cabinet</AppButton>
                        </View>
                    </View>
                </View>
                <View style={styles.about_content}>
                    <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                        <AppText style={styles.about_header}>Tutorial</AppText>
                    </View>
                    <View style={styles.button_container}>
                        <View style={styles.about_button}>
                            <AppButton press={() => props.setTutorialComplete(false)}>View</AppButton>
                        </View>
                    </View>
                </View>
                <View style={styles.about_content}>
                    <View style={[styles.about_header_container, { borderColor: props.ui.border_color }]}>
                        <AppText style={styles.about_header}>About</AppText>
                    </View>
                    <View style={styles.text_container}>
                        <AppText style={styles.text}>
                            This app was made in Crump House with loving assistance from Bongo and Gomez.
                        </AppText>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </GestureRecognizer>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderStyle: 'solid',
        fontSize: 18,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        marginBottom: 5,
        flex: 1,
        marginLeft: 10,
    },
    about: {
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 10
    },
    about_header: {
        fontSize: 25,
    },
    about_header_container: {
        borderBottomWidth: 1,
    },
    about_content: {
        marginBottom: 25,
        // paddingTop: 15,
    },
    text_container: {
        marginTop: 10
    },
    about_button: {
        flex: 1,
        margin: 10,
    },
    button_container: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 22,
    },
    button: {
        marginRight: 10,
        marginLeft: 10
    }
})