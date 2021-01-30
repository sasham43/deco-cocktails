import React, { useRef, useState, useEffect } from 'react'
import {View, PanResponder, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import AppText from './AppText'
import { Part } from './Parts'
import CornerIcon from '../assets/corner'

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

    return (
        <View>
            <View
                // {...panResponder.panHandlers}
                style={{ height: 30, borderColor: 'grey', borderWidth: 0, padding: 10, marginTop:0 }}
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

    return (
        <View style={{padding: 0, paddingLeft: 15}}>
            <Part style={{color:'blue'}} parts={props.ingredient.value} last={true} />
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