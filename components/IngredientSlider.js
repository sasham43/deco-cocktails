import React, { useRef, useState, useEffect } from 'react'
import {View, PanResponder, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import Slider from 'react-native-slider'
import Slider from '@react-native-community/slider'

// import AppText from './AppText'
import { Part, OpacityPart } from './Parts'
import CornerIcon from '../assets/corner'
const in_stock = require('../assets/in-stock.png')

import { changeCocktailSlider } from '../utils/CocktailActions'

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        changeCocktailSlider
    }, dispatch)
)
const mapStateToProps = (state) => {
    const { cocktails } = state
    return { slider: cocktails.slider }
}
export default connect(mapStateToProps, mapDispatchToProps)(IngredientSlider)

function IngredientSlider(props){

    const [sliderValue, setSliderValue] = useState(0)
    const [ingredient, setIngredient] = useState(null)
    var slider_value = 0
    // const panResponder = useRef(PanResponder.create({
    //     onStartShouldSetPanResponder: (evt, gestureState) => true,
    //     onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponder: (evt, gestureState) => true,
    //     onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    //     onPanResponderMove: (evt, gestureState) => {
    //         var value = parseInt(gestureState.dx / 10)
    //         var direction = gestureState.vx > 0 ? 'right' : 'left'
    //         var slider_max = 1440
    //         if((slider_value + value) > slider_max){
    //             slider_value = slider_max
    //         } else if ((slider_value - (value * -1)) < 0){
    //             slider_value = 0
    //         } else {
    //             if(gestureState.vx > 0){
    //                 slider_value = slider_value + value
    //             } else {
    //                 if(value.toString().includes("-")){
    //                     slider_value += value
    //                 } else {
    //                     slider_value -= value
    //                 }
    //             }
    //         }
            
    //         var constrained = constrain((slider_value / 30), 0, props.ingredient_values.length - 1)
    //         setSliderValue(constrained)

    //         const ingredient = props.ingredient_values[constrained]
    //         setIngredient(ingredient)
    //         props.setParts(ingredient.value)
    //     },
    // })).current

    // if outside value changes, set inside value to match
    useEffect(()=>{
        if(props.parts != null){
            var value_obj = props.ingredient_values.find(v => v.value == props.parts)
            var label = value_obj ? value_obj.label : ''
            setIngredient({
                label: label,
                value: props.parts
            })
        } else {
            setIngredient({
                label: '',
                value: 0
            })
        }
    }, [props.parts])

    function onSliderChange(val){
        // console.log('slider change', val, props.ingredient_values.length)
        props.setParts(props.ingredient_values[Math.floor(val)].value)
    }

    return (
        <View>
            <View style={{marginBottom:20}}>
                <Slider
                    // style={{ width: 200, height: 40 }}
                    thumbImage={in_stock}
                    // thumbStyle={{width:40, height:40}}
                    // thumbTouchSize={{width:20, height:20}}
                    // minimumValue={0}
                    // maximumValue={1}
                    minimumTrackTintColor="rgba(0,0,0,0)"
                    maximumTrackTintColor="rgba(0,0,0,0)"
                    minimumValue={0}
                    maximumValue={props.ingredient_values.length-1}
                    onValueChange={(val)=>onSliderChange(val)}
                />
            </View>
            <View
                // {...panResponder.panHandlers}
                style={{ height: 30, borderColor: 'grey', borderWidth: 0, padding: 10, marginTop:-15 }}
            >
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={12} height={12} />
                <SliderDisplay ingredient={ingredient}></SliderDisplay>
            </View> 
        </View>
    )
}

function constrain(num, min=0, max){
    var floor = Math.max(min, num)
    var ceiling = Math.min(floor, max)

    return parseInt(ceiling)
}

function SliderDisplay(props) {
    if(!props.ingredient) return null
    // console.log('ingredient', props.ingredient.value)
    return (
        <View style={{ padding: 0, paddingLeft: 15,flex:1, 
        // flexDirection: 'row', justifyContent: 'space-around'
        }}
        >
            <OpacityPart style={{justifyContent: 'space-evenly', flexDirection:'row'}} parts={9.75} max={props.ingredient.value} last={true} shapeStyle={{justifyContent: 'space-between', flexDirection: 'row'}} />
        </View>
    )
}

const styles = StyleSheet.create({

    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: 0, right: 0 },
    top_left: { top: 0, left: 0, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: 0, right: 0, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: 0, left: 0, transform: [{ rotate: '180deg' }] }
})