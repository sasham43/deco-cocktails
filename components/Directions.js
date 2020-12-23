import React from 'react'
import { Text, View } from 'react-native'

import AppText from './AppText'


export default function Directions(props){
    return (
        <View>
            <AppText>{props.directions}</AppText>
        </View>
    )
}