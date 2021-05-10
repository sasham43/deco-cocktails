import React, { useState, useEffect } from 'react'
import {View, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { OpacityPart } from './Parts'
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
    }, [props.parts])

    return (
        <View>
            <View
                style={{ height: 26, borderColor: 'grey', borderWidth: 0, padding: 8, marginTop:0 }}
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

function SliderDisplay(props) {
    if(!props.ingredient) return null

    return (
        <View style={{padding: 0, paddingLeft: 0, flex: 1}}>
            <OpacityPart style={{ color: 'blue' }} parts={9.75} max={props.ingredient.value} last={true} style={{justifyContent: 'space-evenly', flexDirection: 'row'}} />
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