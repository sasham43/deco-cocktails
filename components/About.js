<<<<<<< Updated upstream
import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
=======
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, Alert, TextInput } from 'react-native'
>>>>>>> Stashed changes
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import AppButton from './AppButton'
import { setDarkMode, setNewTitle } from '../utils/UIActions'
import { resetDefaultCocktails } from '../utils/CocktailActions'
import { resetDefaultStock } from '../utils/StockActions'


const mapStateToProps = (state) => {
    // console.log('state', state)
    const { ui } = state
    return { ui }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDarkMode,
        resetDefaultCocktails,
        resetDefaultStock,
        setNewTitle
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(About)
// export default 
function About (props){
    const [title, setTitle] = useState('title')

    useEffect(()=>{
        // setTitle(props.ui.title)
        console.log('set tile', title, props.ui.title)
    } ,[])

    useEffect(()=>{
        // setNew
        console.log('title', title)
    }, [title])

    function newTitle(text){
        console.log('newTitle', text)
        setTitle(text)
    }


    function resetDefault(type) {
        console.log('removing cocktail', type)
        var reset, title
        if(type == 'cocktails'){
            reset = props.resetDefaultCocktails
            title = 'Reset cocktails to default?  This will remove all new cocktails and cannot be undone'
        } else if (type == 'stock'){
            reset = props.resetDefaultStock
            title = 'Reset cabinet to default?  This will remove all new bottles from cabinet and cannot be undone'
        }

        var msg = ''
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
    return (
        <ScrollView style={[props.ui.default_styles.viewStyles, styles.about, props.ui.current_theme]}>
            <View style={styles.about_content}>
                <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                    <AppText style={styles.about_header}>About</AppText>
                </View>
                <View style={styles.text_container}>
                    <AppText style={styles.text}>
                        This app was made in Crump House with loving assistance from Bongo and Gomez.
                    </AppText>
                </View>
            </View>
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
                <View style={styles.button_container}>
                    <AppButton press={() => setNewTitle(title)}>Save</AppButton>
                    <TextInput
                        value={title}
                        onChangeText={text => newTitle(text)}
                        style={[styles.input, props.ui.current_theme]}
                        placeholder="Menu title..."
                        clearButtonMode={"always"}
                        placeholderTextColor={props.ui.current_theme.color}
                    />
                </View>
            </View>
            <View style={styles.about_content}>
                <View style={[styles.about_header_container, {borderColor: props.ui.border_color}]}>
                    <AppText style={styles.about_header}>Reset Defaults</AppText>
                </View>
                <View style={styles.button_container}>
                    <View style={styles.about_button}>
<<<<<<< Updated upstream
                        <AppButton press={() => props.resetDefaultCocktails()}>Cocktails</AppButton>
                    </View>
                    <View style={styles.about_button}>
                        <AppButton press={() => props.resetDefaultStock()}>Cabinet</AppButton>
=======
                        <AppButton press={() => resetDefault('cocktails')}>Cocktails</AppButton>
                    </View>
                    <View style={styles.about_button}>
                        <AppButton press={() => resetDefault('stock')}>Cabinet</AppButton>
>>>>>>> Stashed changes
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    about: {
        paddingLeft: 40,
        paddingRight: 40,
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
    },
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
        // width: windowWidth - 125,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        marginBottom: 5,
        flex: 1
    },
})