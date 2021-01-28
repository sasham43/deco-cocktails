import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import AppText from './AppText'
import { ShapeMap, OpacityShapeMap } from './Shapes'


export function Part(props) {
    // console.log('Part', props.height)
    if (props.last) {
        return (
            <View style={[{ flexDirection: 'row' }, props.style]}>
                <ShapeMap height={props.height} width={props.width} parts={props.parts} last={props.last} style={props.shapeStyle} />
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <ShapeMap height={props.height} width={props.width} parts={props.parts} last={props.last} />
                <AppText>|</AppText>
            </View>
        )
    }
}
export function PartMap(props) {
    // console.log('PartMap', props.height)
    return (
        <View style={styles.part_map_container}>
            {props.ingredients.map((ingredient, i) => (
                <View style={styles.part_container} key={`part-${i}`}>
                    <Part height={props.height} width={props.width} parts={ingredient.parts} last={(i + 1 == props.ingredients.length)} />
                </View>
            ))}
        </View>
    )
} 

export function OpacityPart(props){
    return (
        <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly' }, props.style]}>
            <OpacityShapeMap max={props.max} height={props.height} width={props.width} parts={props.parts} last={props.last} style={props.shapeStyle} />
        </View>
    )
}

const styles = StyleSheet.create({
    part_map_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        flexWrap: "wrap"
    },
    part_container: {
        flexDirection: 'row',
    },
})