import React from 'react'
import { View, StyleSheet, Dimensions, Pressable } from 'react-native'

import AppText from './AppText'
import {setDarkMode } from '../utils/UIActions'

const windowWidth = Dimensions.get('window').width
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
        <View style={[styles.about, styles.view, props.ui.current_theme]}>
            <AppText style={styles.text}>
                This app was made in Crump House with an assist from 

            </AppText>
                <Pressable style={styles.button} onPress={()=>props.setDarkMode(false)}>
                    <AppText style={styles.text}>Bongo</AppText>
                </Pressable>
            <AppText style={styles.text}>and </AppText>
                <Pressable style={styles.button} onPress={()=>props.setDarkMode(true)}>
                    <AppText style={styles.text}>Gomez.</AppText>
                </Pressable>
        </View>
    )
}
// export default class About extends React.Component {
//     render(){
//         return (
//             <View style={styles.about}>
//                 <AppText>This app was made in Crump House with an assist from Bongo and Gomez.</AppText>
//             </View>
//         )
//     }
// }

const styles = StyleSheet.create({
    about: {
        // marginTop: 10,
        flex: 1,
        alignSelf: 'center',
        // backgroundColor: '#fff'
        // backgroundColor: '#000',
        // color: '#fff'
    },
    view: {
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
        width: windowWidth,
        // backgroundColor: '#000',
        // color: '#fff',
        // backgroundColor: '#fff',
        alignItems: 'center'
    },
    text: {
        fontSize: 22,
    },
    button: {
        marginRight: 10,
        marginLeft: 10
    }
})