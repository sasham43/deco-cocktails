import React, { useRef, useState } from 'react'
import {View, PanResponder} from 'react-native'

import AppText from './AppText'

export default function IngredientSlider(props){

    const [sliderValue, setSliderValue] = useState(0)
    const sliderRef = useRef(0)
    console.log('ingredient slider')

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) =>
            true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
            true,

        onPanResponderGrant: (evt, gestureState) => {
            // console.log('grant', gestureState)
            console.log('grant', sliderRef, sliderValue)
            // The gesture has started. Show visual feedback so the user knows
            // what is happening!
            // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
            // console.log('move', gestureState.dx)
            var value = parseInt(gestureState.dx / 15)
            setSliderValue(sliderRef.current + value)
            // The most recent move distance is gestureState.move{X,Y}
            // The accumulated gesture distance since becoming responder is
            // gestureState.d{x,y}
        },
    })).current

    return (
        <View>
            <View style={{ height: 50, borderColor: '#000', borderWidth: 1 }}>
                <AppText>{sliderValue}</AppText>

                <SliderDisplay ingredient_values={props.ingredient_values} slider={sliderValue} />
            </View>
            <View
                {...panResponder.panHandlers}
                style={{ height: 50, borderColor: '#000', borderWidth: 1 }}
            >
                <AppText>Slider</AppText>
            </View> 
            {/* <View style={{height: 50, borderColor: '#000', borderWidth: 1}}>
                        <AppText>{sliderValue}</AppText>
                
                <SliderIngredient ingredient_values={props.ingredient_values} slider={sliderValue}/>
            </View>
            <IngredientSlider />
            <View
                {...panResponder.panHandlers}
                style={{ height: 50, borderColor: '#000', borderWidth: 1 }}
            >
                <AppText>Slider</AppText>
            </View> */}
        </View>
    )
}

function SliderDisplay(props) {
    // if(!props.ingredient) return null
    // var slider = props.slider < 0 ? 0 : props.slider
    var slider = 0
    if (props.slider < 0) {
        slider = 0
    } else if (props.slider > props.ingredient_values.length) {
        slider = props.ingredient_values.length
    } else {
        slider = props.slider
    }

    const ingredient = props.ingredient_values[slider]
    if(!ingredient) return null
    // console.log('display')

    // const label = props.ingredient.label
    return (
        <View>
            <AppText>{ingredient.label}</AppText>
        </View>
    )
}