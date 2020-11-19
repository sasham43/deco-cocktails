import React, { useRef, useState } from 'react'
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
            if((slider_value + value) > 480){
                slider_value = 480
            } else if ((slider_value - (value * -1)) < 0){
                slider_value = 0
            } else {
                if(gestureState.vx > 0){
                    // console.log('right')
                    slider_value = slider_value + value
                } else {
                    // console.log('left', value, (value * -1))
                    if(value.toString().includes("-")){
                        slider_value += value
                    } else {
                        slider_value -= value
                    }
                    // slider_value = slider_value - (value*-1)
                }
            }
            
            // console.log('slider_value', direction, slider_value)
            // var constrained = constrain((slider_value), 0, props.ingredient_values.length - 1)
            var constrained = constrain((slider_value / 30), 0, props.ingredient_values.length - 1)
            setSliderValue(constrained)

            // get ingredient
            // var slider = 0
            // if (props.slider < 0) {
            //     slider = 0
            // } else if (props.slider > props.ingredient_values.length) {
            //     slider = props.ingredient_values.length - 1
            // } else {
            //     slider = props.slider
            // }

            const ingredient = props.ingredient_values[constrained]
            // console.log('ingredient', ingredient, constrained)
            setIngredient(ingredient)
            props.setParts(ingredient.value)
        },
        // onPanResponderRelease: (evt, gestureState) => {
        //     // props.setSliderValue(sliderValue)
        //     // The user has released all touches while this view is the
        //     // responder. This typically means a gesture has succeeded
        // },
    })).current

    return (
        <View>
            <View style={{ height: 50, borderColor: '#000', borderWidth: 1 }}>
                <AppText>{sliderValue}</AppText>

                <SliderDisplay ingredient={ingredient} />
                {/* <SliderDisplay setParts={props.setParts} ingredient_values={props.ingredient_values} slider={sliderValue} /> */}
            </View>
            {/* <Slider setSliderValue={props.changeCocktailSlider} sliderValue={props.slider} /> */}
            <View
                {...panResponder.panHandlers}
                style={{ height: 50, borderColor: '#000', borderWidth: 1 }}
            >
                <AppText>Slider</AppText>
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
    // if(!props.ingredient) return null
    // var slider = props.slider < 0 ? 0 : props.slider
    // var slider = 0
    // if (props.slider < 0) {
    //     slider = 0
    // } else if (props.slider > props.ingredient_values.length) {
    //     slider = props.ingredient_values.length - 1
    // } else {
    //     slider = props.slider
    // }

    // const ingredient = props.ingredient_values[slider]
    if(!props.ingredient) return null
    console.log('display', props.slider, props.ingredient)
    // props.setParts(ingredient.value)

    return (
        <View style={{paddingLeft: 30}}>
            <AppText>{props.ingredient.label}</AppText>
            <Part style={{color:'blue'}} parts={props.ingredient.value} last={true} />
        </View>
    )
}