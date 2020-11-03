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
    return split[0]
}

function sortedIngredients(ingredients) {
    return _.orderBy(ingredients, 'parts', 'desc')
}

export function AddedIngredient(props) {

    var fractions = translateParts(props.parts)
    return (
        <TouchableOpacity style={[styles.added_ingredient, props.editIngredientId == props.id ? styles.selected_ingredient : null]} onPress={() => props.toggleEditIngredient(props.id)}>
            <AppText>{props.ingredient_name}</AppText>
            <AppText>{fractions}</AppText>
            <Part style={styles.added_parts} parts={props.parts} last={true} />
        </TouchableOpacity>
    )
}
export function AddedIngredientMap(props) {
    return sortedIngredients(props.addedCocktailIngredients).map(a => {
        return (
            <AddedIngredient key={a.id} id={a.id} ingredient_name={a.ingredient_name} parts={a.parts} editIngredientId={props.editIngredientId} toggleEditIngredient={props.toggleEditIngredient} />
        )
    })
}

const styles = StyleSheet.create({
    selected_ingredient: {
        borderWidth: 1,
        borderStyle: 'dashed'
    },
    added_ingredient: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 3,
        paddingRight: 3,
        marginLeft: 8
    },
    added_parts: {
        marginTop: 8,
        marginBottom: 4
    },
})