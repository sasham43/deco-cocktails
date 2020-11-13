import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import _ from 'lodash'

import AppText from './AppText'
import { Part } from './Parts'


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
    // if(split[0] == '0'){

    // }
    return split[0]
}

function sortedIngredients(ingredients) {
    return _.orderBy(ingredients, 'parts', 'desc')
}

export function AddedIngredient(props) {
    console.log('added ingredient', props)

    var fractions = translateParts(props.parts)
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
            <AppText style={[styles.ingredient_text, styles.ingredient_name]}>{props.ingredient_name}</AppText>
            <AppText style={[styles.inset, styles.ingredient_text]}>{fractions}</AppText>
            <Part style={[styles.inset, styles.added_parts]} parts={props.parts} last={true} />
        </TouchableOpacity>
    )
}
export function AddedIngredientMap(props) {
    return sortedIngredients(props.addedCocktailIngredients).map(a => {
        return (
            <AddedIngredient theme={props.theme} key={a.id} id={a.id} ingredient_name={a.ingredient_name} parts={a.parts} editIngredientId={props.editIngredientId} toggleEditIngredient={props.toggleEditIngredient} />
        )
    })
}

const styles = StyleSheet.create({
    selected_ingredient: {
        borderWidth: 1,
        // borderStyle: 'dashed'

        shadowOffset: { width: -4, height: -4, },
        // shadowColor: 'rgba(150,150,150,.5)',
        shadowOpacity: 0.3,
    },
    added_ingredient: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 6,
        paddingRight: 6,
        marginLeft: 8,
        marginBottom: 10,
        marginTop: 5,
        justifyContent: 'space-between',
        height: 90
        // fontSize: 20
    },
    ingredient_name: {
      fontSize: 19,
    },
    ingredient_text: {
      fontSize: 17,
    },
    inset: {
        marginLeft: 7
    },
    added_parts: {
        marginTop: 8,
        marginBottom: 4
    },
})