import React from 'react'
import { View, StyleSheet, Dimensions, Pressable } from 'react-native'

import AppText from './AppText'
import AppButton from './AppButton'
import {setDarkMode } from '../utils/UIActions'

// const windowWidth = Dimensions.get('window').width
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const mapStateToProps = (state) => {
    // console.log('state', state)
    const { ui } = state
    return { ui }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setDarkMode,
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(About)
// export default 
function About (props){
    return (
        <View style={[props.ui.default_styles.viewStyles, styles.about, props.ui.current_theme]}>
            <View style={styles.about_content}>
                <View style={styles.about_header_container}>
                    <AppText style={styles.about_header}>About</AppText>
                </View>
                <View style={styles.text_container}>
                    <AppText style={styles.text}>
                        This app was made in Crump House with loving assistance from Bongo and Gomez.
                    </AppText>
                </View>
            </View>
            <View style={styles.about_content}>
                <View style={styles.about_header_container}>
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


                {/* <Pressable style={styles.button} onPress={()=>props.setDarkMode(false)}>
                    <AppText style={styles.text}>Bongo</AppText>
                </Pressable>
            <AppText style={styles.text}>and </AppText>
                <Pressable style={styles.button} onPress={()=>props.setDarkMode(true)}>
                    <AppText style={styles.text}>Gomez.</AppText>
                </Pressable> */}
        </View>
    )
}

const styles = StyleSheet.create({
    about: {
        // marginTop: 10,
        // flex: 1,
        // alignSelf: 'center',
        // backgroundColor: '#fff'
        // backgroundColor: '#000',
        // color: '#fff'
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
        marginTop: 25,
        // paddingTop: 15,
    },
    text_container: {
        marginTop: 10
    },
    about_button: {
        flex: 1,
        margin: 10
        // alignSelf: 'stretch',
        // flexGrow: 1
    },
    button_container: {
        marginTop: 10,
        flexDirection: 'row',
        // justifyContent: 'center' 
        justifyContent: 'space-between',
        // flexGrow: 1
    },
    text: {
        fontSize: 22,
    },
    button: {
        marginRight: 10,
        marginLeft: 10
    }
})