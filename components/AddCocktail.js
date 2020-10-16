import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { generate } from 'shortid'

import AppText from './AppText'
import { useCocktails } from '../utils/hooks'

export default function Add(){
    const [ newCocktailName, setNewCocktailName ] = useState('')
    const { cocktails, addCocktail } = useCocktails([])

    function NewIngredient(){
        return (
            <View>
                <TextInput style={styles.input} placeholder="Parts..." keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Ingredient..." />
            </View>
        )
    }

    return (
        <View>
            {/* <AppText>Add a cocktail</AppText> */}
            <View>
                <TextInput
                    value={newCocktailName}
                    onChangeText={text => setNewCocktailName(text)}
                    style={styles.input}
                    placeholder="Cocktail name..."
                />
                <NewIngredient />

                <TouchableOpacity onPress={() => {
                    addCocktail({
                        id: generate(),
                        name: newCocktailName
                    })
                    setNewCocktailName('')
                }}>
                    <AppText style={styles.add_button}>Add Cocktail</AppText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid'
    },
    add_button: {
        marginTop: 45,
        fontSize: 23,
        alignSelf: 'center',
        // justifySelf: 'center'
    }
})