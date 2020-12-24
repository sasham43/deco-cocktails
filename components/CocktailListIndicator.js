import React from 'react'
import {Pressable, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import InStockIcon from '../assets/in-stock'

export default function CocktailListIndicator(props){
    var selection = []
    var selected = 0
    if(props.sorted.length > 10){
        selection = splitSorted(props.sorted, props.selected, 10)
        selected = props.selected % 10
    } else {
        selection = props.sorted
        selected = props.selected
    }
    return (
        <View style={styles.container}>
            <IndicatorMap sorted={selection} theme={props.theme} selected={selected} />
        </View>
    )
}

function IndicatorMap(props){
    const navigation = useNavigation()
    function goToCocktail(id){
        navigation.navigate('ViewCocktail', {
            id: id
        })
    }
    return props.sorted.map((c, i) => {
        // console.log
        return (
            <Pressable onPress={()=>{goToCocktail(c.id)}} key={i}>
                <InStockIcon transform={[{ rotate: '-135deg' }]} width={15} height={15} fill={i==props.selected ? props.theme.color : 'grey'} />
            </Pressable>
        )
    })
}

function splitSorted(sorted, current, chunk_size){
    for(var i = 0; i < sorted.length; i+=chunk_size){
        // console.log('chunks', i, current)
        if(current >= i && current < i+chunk_size){
            return sorted.slice(i, i + chunk_size)
        }
    }
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingLeft: 25,
        paddingRight: 25,
        marginBottom: 10,
        marginTop: -10
    }
})