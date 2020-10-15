import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    useFonts,
    PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'


class AppText extends React.Component {
   
    render() {
        return (
            <Text style={{ fontFamily: 'PoiretOne_400Regular' }}>
                {this.props.children}
            </Text>
        )
    }
}

export default AppText
