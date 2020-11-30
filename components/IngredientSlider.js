import React, { useRef, useState, useEffect } from 'react'
import {View, PanResponder} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import { Part } from './Parts'
import { changeCocktailSlider } from '../utils/CocktailActions'

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        changeCocktailSlider
    }, dispatch)
)
const mapStateToProps = (state) => {
    // console.log('mapping state', state)
    const { cocktails, ui } = state
    return { slider: cocktails.slider }
}
export default connect(mapStateToProps, mapDispatchToProps)(IngredientSlider)

function IngredientSlider(props){

    const [sliderValue, setSliderValue] = useState(0)
    const [ingredient, setIngredient] = useState(null)
    // const sliderRef = useRef(0)
    // console.log('ingredient slider')
    var slider_value = 0
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
            var value = parseInt(gestureState.dx / 15)
            var direction = gestureState.vx > 0 ? 'right' : 'left'
            var slider_max = 1440
            // var slider_max = 480
            // console.log('slider value', slider_value, value)
            if((slider_value + value) > slider_max){
                slider_value = slider_max
            } else if ((slider_value - (value * -1)) < 0){
                slider_value = 0
            } else {
                if(gestureState.vx > 0){
                    slider_value = slider_value + value
                } else {
                    if(value.toString().includes("-")){
                        slider_value += value
                    } else {
                        slider_value -= value
                    }
                }
            }
            
            var constrained = constrain((slider_value / 30), 0, props.ingredient_values.length - 1)
            setSliderValue(constrained)

            const ingredient = props.ingredient_values[constrained]
            setIngredient(ingredient)
            props.setParts(ingredient.value)
        },
    })).current

    // if outside value changes, set inside value to match
    useEffect(()=>{
        if(props.parts != null){
            var value_obj = props.ingredient_values.find(v => v.value == props.parts)
            var label = value_obj ? value_obj.label : ''
            setIngredient({
                label: label,
                value: props.parts
            })
        }
    }, [props.parts])

    return (
        <View>
            <View
                {...panResponder.panHandlers}
                style={{ height: 30, borderColor: 'grey', borderWidth: 1, padding: 10, marginTop:-15 }}
            >
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