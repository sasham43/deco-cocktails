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
// class Title extends React.Component {
//     constructor(props){
//         super(props)
//     }

//     goToAbout = ()=>{
//         // console.log('navigate')
//         RootNavigation.navigate('About')
//     }

//     shrinkText = () => {

//     }

//     render(){
//         return (
//             // <View style={styles.title}>

//                 <Pressable onPressIn={()=>shrinkText()} onPressOut={()=>growText()} onLongPress={()=>this.goToAbout()} style={[this.props.ui.current_theme, styles.title]}>
//                     <AppText style={styles.text}>
//                         {/* <Text> */}
//                             {this.props.ui.title ? this.props.ui.title : ''}
//                         {/* </Text> */}
//                     </AppText>
//                 </Pressable>
//         )
//     }
// }

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
        // <View style={styles.title}>

        <Pressable onPressIn={() => shrinkText()} onPressOut={() => growText()} onLongPress={() => goToAbout()} style={[props.ui.current_theme, styles.title]}>
            <AppText style={[styles.text, {borderColor: border, borderBottomWidth: 1}]}>
                {props.ui.title ? props.ui.title : ''}
            </AppText>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    title: {
        // borderColor: 'black',
        // borderBottomWidth: 1,
        // borderStyle: 'solid',
        // alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        // marginBottom: 50, // space for menu
        // minHeight: 100,
        minHeight: 20,
        // backgroundColor: 'red',
        // minWidth: '40%',
        textAlign: 'center',
        // flex: 1,
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black'
    },
    text: {
        fontSize: 35
    }
})

export default connect(mapStateToProps)(Title)