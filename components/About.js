import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import AppButton from './AppButton'
import { setDarkMode } from '../utils/UIActions'
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
        resetDefaultStock
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(About)
// export default 
function About (props){
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
                    <AppText style={styles.about_header}>Reset Defaults</AppText>
                </View>
                <View style={styles.button_container}>
                    <View style={styles.about_button}>
                        <AppButton press={() => props.resetDefaultCocktails()}>Cocktails</AppButton>
                    </View>
                    <View style={styles.about_button}>
                        <AppButton press={() => props.resetDefaultStock()}>Cabinet</AppButton>
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
        marginTop: 25,
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