import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { generate } from 'shortid'
// import { Picker } from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select'

import AppText from './AppText'
import { useCocktails } from '../utils/hooks'

export default function Add(){
    const [ newCocktailName, setNewCocktailName ] = useState('')
    const [ newCocktailIngredients, setNewCocktailIngredients ] = useState([{
        id: generate(),
        ingredient_name: '',
        parts: 0
    }])

    const { cocktails, addCocktail } = useCocktails([])

    function NewIngredient(props) {
        const placeholder = {
            label: 'Parts...',
            value: null,
            color: '#9EA0A4',
        };
        return (
            <View key={props.id}>
                <RNPickerSelect
                    placeholder={placeholder}
                    useNativeAndroidPickerStyle={false}
                style={styles} onValueChange={(val)=>console.log(val)} items={[
                    {
                        label: '1',
                        value: 1
                    },
                    {
                        label: '2',
                        value: 2
                    },
                    {
                        label: '3',
                        value: 3
                    },
                ]} />

                {/* </RNPickerSelect> */}
                <TextInput style={styles.input} placeholder="Ingredient..." />
            </View>
        )
    }

    function NewIngredientMap(){
        return newCocktailIngredients.map(ingredient=>{
            return (
                <NewIngredient id={ingredient.id} ingredient_name={ingredient.name} parts={ingredient.parts} />
            )
        })
    }

    return (
        <View>
            {/* <AppText>Add a cocktail</AppText> */}
            <View>
                <TextInput
                    value={newCocktailName}
                    onChangeText={text => setNewCocktailName(text)}
                    style={styles.input}
                    placeholder="New cocktail name..."
                />
                <NewIngredientMap />
                <TouchableOpacity onPress={()=>setNewCocktailIngredients([...newCocktailIngredients, {
                    id: generate(),
                    ingredient_name: '',
                    parts: 0
                }])}>
                    <AppText style={styles.add_ingredient_button}>+</AppText>
                </TouchableOpacity>

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
    },
    add_ingredient_button: {
        marginTop: 15,
        fontSize: 23,
        alignSelf: 'center',
        // justifySelf: 'center'
    },
    inputIOS: {
        fontFamily: 'PoiretOne_400Regular',
        borderColor: '#eee',
        borderWidth: 1,
        // borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
    }
})