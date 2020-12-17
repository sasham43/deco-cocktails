import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import AppText from './AppText'
import { Part } from './Parts'
import { sortedIngredients } from '../utils/sort'


function translateParts(parts) {
    var split = parts.toString().split('.')
    if (split[1]) {
        var fraction = ''
        switch (split[1]) {
            case '25':
                fraction = '1/4'
                break;
            case '5':
                fraction = '1/2'
                break;
            case '75':
                fraction = '3/4'
                break;
        }

        if (split[0] != '0') {
            return `${split[0]} ${fraction}`
        } else {
            return fraction
        }
    }
    return split[0]
}

export function AddedIngredient(props) {
    var fractions = translateParts(props.parts)
    if(fractions == 0){
        fractions = '' // don't show a 0 for ingredients
    }
    const ingredient_height = typeof fractions == 'string' ? { height: 0 } : null

    return (
        <TouchableOpacity 
            disabled={!props.toggleEditIngredient} 
            style={[
                styles.added_ingredient, 
                props.theme,
                props.editIngredientId == props.id ? { ...styles.selected_ingredient, shadowColor: props.theme.shadowColor, borderColor: props.theme.borderColor} : {borderWidth: 1, borderColor: props.theme.backgroundColor}, 
            ]} 
            onPress={() => props.toggleEditIngredient(props.id)}
        >
            <AppText style={[styles.ingredient_text, styles.ingredient_name, { color: props.in_stock ? props.theme.color : 'grey' }]}>{props.ingredient_name}</AppText>
            <AppText style={[styles.inset, styles.ingredient_text]}>{fractions}</AppText>
            <Part style={[styles.inset, styles.added_parts, ingredient_height]} parts={props.parts} last={true} />
        </TouchableOpacity>
    )
}
export function AddedIngredientMap(props) {
    var stock = props.stock ? props.stock : []
    return sortedIngredients(props.addedCocktailIngredients).map(a => {
        var found = stock.find(s=>s.label.trim() == a.ingredient_name.trim())
        var in_stock = found ? found.in_stock : false

        return (
            <AddedIngredient 
                theme={props.theme} 
                key={a.id} id={a.id} 
                ingredient_name={a.ingredient_name} 
                parts={a.parts} editIngredientId={props.editIngredientId} 
                toggleEditIngredient={props.toggleEditIngredient} 
                in_stock={in_stock}
            />
        )
    })
}

const styles = StyleSheet.create({
    selected_ingredient: {
        borderWidth: 1,
        shadowOffset: { width: -4, height: -4, },
        shadowOpacity: 0.3,
        elevation: 10 // for Android
    },
    added_ingredient: {
        paddingTop: 6,
        paddingBottom: 10,
        paddingLeft: 6,
        paddingRight: 6,
        marginLeft: 8,
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between',
    },
    ingredient_name: {
      fontSize: 19,
    },
    ingredient_text: {
      fontSize: 17,
    //   marginTop: 4
    },
    inset: {
        marginLeft: 7
    },
    added_parts: {
        marginTop: 10,
        marginBottom: 4
    },
})