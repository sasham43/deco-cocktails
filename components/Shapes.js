import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { generate } from 'shortid'

import HalfCircle from '../assets/half-circle.svg'
import HalfCircleLight from '../assets/half-circle-light.svg'
import QuarterCircle from '../assets/quarter-circle.svg'
import ThreeQuarterCircle from '../assets/three-quarter-circle.svg'
import ThreeQuarterCircleLight from '../assets/three-quarter-circle-light.svg'
import Circle from '../assets/circle.svg'

import AppText from './AppText'

function buildPartArray(parts) {
    var part_array = []

    var remainder = parts.toString().split('.')[1]

    if (parts >= 1) {
        for (var i = 1; i <= parts; i++) {
            part_array.push(1)
        }
    }
    if (remainder != undefined) {
        remainder = Number("." + remainder)
        part_array.push(remainder)
    }

    return part_array
}
const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export const ConnectedShape = connect(mapStateToProps)(Shape)

function Shape(props) {
    if (props.part == 0.25) {
        return (
            <QuarterCircle transform={[{ rotate: '-90deg' }]} stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
        )
    }
    if (props.part == 0.5) {
        if(props.ui.dark_mode){
            return (
                <HalfCircle transform={[{ rotate: '180deg' }]} stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        } else {
            return (
                <HalfCircleLight transform={[{ rotate: '180deg' }]} stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        }
    }
    if (props.part == 0.75) {
        if(props.ui.dark_mode){
            return (
                <ThreeQuarterCircle transform={[{rotate: '90deg'}]} stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        } else {
            return (
                <ThreeQuarterCircleLight transform={[{ rotate: '90deg' }]} stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        }
    }
    if (props.part == 1) {
        return (
            <Circle stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
        )
    }

    // console.log('empty?', props.part, props.opacity)
    if(props.part == 0 && props.opacity){
        return (
            <View style={{width:props.width, height: props.height, opacity: 0, borderWidth:1}}></View>
        )
    }
    
    return null
}
export function ShapeMap(props) {
    var shape_array = buildPartArray(props.parts)
    var height = props.height ? props.height : 9
    var width = props.width ? props.width : 9
    
    return shape_array.map((part, i) => {
        var key = generate()
        return (
            <View key={key} style={[styles.shape_container, getShapeMargin(part), props.style]}>
                <ConnectedShape height={height} width={width} part={part} />
            </View>
        )
    })
}

function getShapeMargin(part) {
    return 25
}

export function OpacityShapeMap(props){
    var shape_array = buildPartArrayOpacity(props.max, props.parts)
    var height = props.height ? props.height : 9
    var width = props.width ? props.width : 9

    // console.log('opacity', props.style, props.max, props.parts, shape_array)
    return shape_array.map((part, i)=>{
        var key = generate()
        // console.log('i',i, part, props.max)
        return (
            <View key={key} style={[styles.shape_container, {opacity: i < props.max ? 1 : 0}, getShapeMargin(part), props.style]}>
                <ConnectedShape height={height} width={width} part={part} opacity={true} />
            </View>
        )
    })
}
function buildPartArrayOpacity(parts, limit) {
    var part_array = []

    var remainder = parts.toString().split('.')[1]

    if (parts >= 1) {
        for (var i = 1; i <= parts; i++) {
            part_array.push(1)
        }
    }
    if (remainder != undefined) {
        remainder = Number("." + remainder)
        part_array.push(remainder)
    }
    for(var i = 1; i <= limit; i++){
        if(!part_array[i]){
            part_array.push(0)
        }
    }

    return part_array
}


const styles = StyleSheet.create({
    shape_container: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
    }
})