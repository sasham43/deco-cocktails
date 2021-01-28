import React, { useRef, useState, useEffect } from 'react'
import {View, PanResponder, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Slider } from 'react-native-elements'
// import Slider from 'react-native-custom-slider'
// import Slider from 'react-native-slider'
// import Slider from '@react-native-community/slider'

// import AppText from './AppText'
import { Part, OpacityPart } from './Parts'
import CornerIcon from '../assets/corner'

// import { SvgUri } from 'react-native-svg'
// const in_stock = require('../assets/slider_icon.png')
import InStock from '../assets/in-stock'


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


        if(ingredient && ingredient.value){
            for(var i in props.ingredient_values){
                if(props.ingredient_values[i] && props.ingredient_values[i].value){
                    // console.log('i',i)
                    if(props.ingredient_values[i].value == ingredient.value){
                        console.log('i',i)
                        setSliderValue(Number(i))
                    }
                }
            }
        }
    }, [props.parts])

    useEffect(()=>{
        // props.setParts(props.ingredient_values[Math.floor(sliderValue)].value)
    }, [sliderValue])

    function onSliderChange(val){
        console.log('slider change', val, props.ingredient_values.length)
        props.setParts(props.ingredient_values[Math.floor(val)].value)
        // setSliderValue(val)
    }

    return (
        <View>
            <View
                // {...panResponder.panHandlers}
                style={{ height: 30, borderColor: 'grey', borderWidth: 0, padding: 10, marginTop: -15 }}
            >
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={12} height={12} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={12} height={12} />
                <SliderDisplay ingredient={ingredient}></SliderDisplay>
            </View> 
            <View style={{marginBottom:20}}>
                <Slider
                    // style={{ width: 200, height: 40 }}
                    // thumbImage={in_stock}
                    // customThumb={
                    //     <View style={{marginTop:20}}>
                    //         <InStock  transform={ [{ rotate: '45deg' }]} width={30} height={30}  fill={props.ui.current_theme.color} t />
                    //     </View>
                    // }
                    // thumbProps={{
                    //     children: (
                    //         <View style={{marginTop:20}}>
                    //             <InStock  transform={ [{ rotate: '45deg' }]} width={30} height={30}  fill={props.ui.current_theme.color} t />
                    //         </View>
                    //     )
                    // }}
                    // thumbImage={InStock}
                    // thumbStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                    // thumbStyle={{ top:20, left:0, transform:[{scaleX:0.5}],backgroundColor: 'rgba(0,0,0,0)'}}
                    // thumbStyle={{width:40, height:40}}
                    thumbTouchSize={{width:100, height:100}}
                    // minimumValue={0}
                    // maximumValue={1}
                    step={1}
                    minimumTrackTintColor="rgba(0,0,0,0)"
                    maximumTrackTintColor="rgba(0,0,0,0)"
                    minimumValue={0}
                    maximumValue={props.ingredient_values.length-1}
                    // onValueChange={onSliderChange}
                    onValueChange={(val)=>onSliderChange(val)}
                    value={sliderValue}
                />
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