import React from 'react'
import { Animated, View } from 'react-native'

// import AppText from './AppText'
import InStockIcon from '../assets/in-stock'

export default function HeaderIcon(props){
    var rotate = props.direction == 'left' ? '135deg' : '-45deg'
    var padding = props.direction == 'left' ? {paddingLeft: 10} : {paddingRight: 10}
    return (
        <Animated.View style={[padding, { opacity: props.anim }]}>
            <InStockIcon transform={[{ rotate: rotate }]} width={30} height={30} fill={props.ui.current_theme.color} />
        </Animated.View>
    )
}