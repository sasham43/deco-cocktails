import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { connect } from 'react-redux'
import { generate } from 'shortid'

import HalfCircle from '../assets/half-circle.svg'
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

    // console.log('part array', part_array, parts)

    return part_array
}
const mapStateToProps = (state) => {
    // console.log('state', state)
    const { ui } = state
    return { ui }
}
export const ConnectedShape = connect(mapStateToProps)(Shape)
// export ConnectedShape

// export 
function Shape(props) {
    // console.log("Shape props", props)
    // if(props.ui.dark_mode){
        if (props.part == 0.25) {
            return (
                <QuarterCircle stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        }
        if (props.part == 0.5) {
            return (
                <HalfCircle stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        }
        if (props.part == 0.75) {
            if(props.ui.dark_mode){
                return (
                    <ThreeQuarterCircle stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
                )
            } else {
                return (
                    <ThreeQuarterCircleLight stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
                )
            }
        }
        if (props.part == 1) {
            return (
                <Circle stroke={props.ui.current_theme.color} fill={props.ui.current_theme.color} width={props.width} height={props.height} />
            )
        }
    // } else {
    //     if (props.part == 0.25) {
    //         return (
    //             <QuarterCircle stroke={"#fff"} fill={"#fff"} width={props.width} height={props.height} />
    //         )
    //     }
    //     if (props.part == 0.5) {
    //         return (
    //             <HalfCircle stroke={"#fff"} fill={"#fff"} width={props.width} height={props.height} />
    //         )
    //     }
    //     if (props.part == 0.75) {
    //         return (
    //             <ThreeQuarterCircle stroke={"#fff"} fill={"#fff"} width={props.width} height={props.height} />
    //         )
    //     }
    //     if (props.part == 1) {
    //         return (
    //             <Circle stroke={"#fff"} fill={"#fff"} width={props.width} height={props.height} />
    //         )
    //     }
    // }
    
    return null
}
export function ShapeMap(props) {
    var shape_array = buildPartArray(props.parts)
    return shape_array.map((part, i) => {
        var key = generate()
        return (
            <View key={key} style={[styles.shape_container, getShapeMargin(part)]}>
                <ConnectedShape height={9} width={9} part={part} />
            </View>
        )
    })
}
function getShapeMargin(part) {
    // console.log('width for part', part)
    if (part == 0.25 || part == 0.25) {
        return {
            marginLeft: -10
        }
    }
    return 25
}



const styles = StyleSheet.create({
    shape_container: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
        // width: 100
        // flex: 3
    }
})