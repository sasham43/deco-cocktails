import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import AppText from './AppText'
import { ShapeMap } from './Shapes'


export function Part(props) {
    if (props.last) {
        return (
            <View style={[props.style, { flexDirection: 'row' }]}>
                <ShapeMap parts={props.parts} last={props.last} />
            </View>
        )
    } else {
        return (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                <ShapeMap parts={props.parts} last={props.last} />
                <AppText>|</AppText>
            </View>
        )
    }
}
export function PartMap(props) {
    return (
        <View style={styles.part_map_container}>
            {props.ingredients.map((ingredient, i) => (
                <View style={styles.part_container} key={`part-${i}`}>
                    <Part parts={ingredient.parts} last={(i + 1 == props.ingredients.length)} />
                </View>
            ))}
        </View>
    )
} 

const styles = StyleSheet.create({
    part_map_container: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    part_container: {
        flexDirection: 'row',
    },
})