import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import {
    useFonts,
    PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'
const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}

function AppText(props){
    return (
        <Text style={[{ fontFamily: 'PoiretOne_400Regular', color: props.ui.current_theme.color }, props.style]}>
            {props.children}
        </Text>
    )
}

export default connect(mapStateToProps, null)(AppText)
