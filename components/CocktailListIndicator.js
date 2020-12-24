import React from 'react'
import {Pressable, View, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import InStockIcon from '../assets/in-stock'
import AppText from './AppText'

export default function CocktailListIndicator(props){
    var selection = []
    var selected = 0
    var space_left = false
    var space_right = false
    var chunk = 10
    if(props.sorted.length > chunk){
        var data = splitSorted(props.sorted, props.selected, chunk)
        selection = data.split
        selected = props.selected % chunk
        space_left = data.space_left
        space_right = data.space_right
    } else {
        selection = props.sorted
        selected = props.selected
    }
    return (
        <View style={styles.container}>
            {space_left ? <AppText>...</AppText> : null}
            <IndicatorMap sorted={selection} theme={props.theme} selected={selected} />
            {space_right ? <AppText>...</AppText> : null}
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
    var data = {
        split: [],
        space_left: false,
        space_right: false
    }
    for(var i = 0; i < sorted.length; i+=chunk_size){
        // console.log('chunks', i, current)
        
        if(current >= i && current < i+chunk_size){
            if (i >= chunk_size) {
                data.space_left = true
            }
            if (i < (sorted.length - 1) - chunk_size) {
                data.space_right = true
            }
            data.split = sorted.slice(i, i + chunk_size)
            // console.log('split', i, chunk_size, (sorted.length - 1) - chunk_size )
        }
    }

    return data
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