import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'

import AppText from './AppText'

const windowWidth = Dimensions.get('window').width


export default function About (){
    return (
        <View style={[styles.about, styles.view]}>
            <AppText>This app was made in Crump House with an assist from Bongo and Gomez.</AppText>
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
        flex: 1,
        alignSelf: 'center',

        // backgroundColor: '#fff'
        backgroundColor: '#000',
        color: '#fff'
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        width: windowWidth,
        backgroundColor: '#000',
        color: '#fff',
        // backgroundColor: '#fff',
        alignItems: 'center'
    }
})