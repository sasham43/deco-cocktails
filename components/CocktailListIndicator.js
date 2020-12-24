import React from 'react'
import {View} from 'react-native'

import InStockIcon from '../assets/in-stock'

export default function CocktailListIndicator(props){
    return (
        <View style={{flexDirection: 'row'}}>
            <IndicatorMap sorted={props.sorted} theme={props.theme} selected={props.selected} />
        </View>
    )
}

function IndicatorMap(props){
    return props.sorted.map((c, i) => {
        return (
            <View key={i}>
                <InStockIcon transform={[{ rotate: '-135deg' }]} width={15} height={15} fill={i==props.selected ? props.theme.color : 'grey'} />
            </View>
        )
    })
}