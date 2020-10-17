import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { generate } from 'shortid'
// import { Picker } from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select'

import AppText from './AppText'
import { useCocktails, newCocktail } from '../utils/hooks'

export default function Add(){
    // const [ newCocktailName, setNewCocktailName ] = useState('')
    // const [ newCocktailIngredientName, setNewCocktailIngredientName ] = useState('')
    // const [ newCocktailIngredientParts, setNewCocktailIngredientParts ] = useState(0)
    // const [ addedCocktailIngredients, setAddedCocktailIngredients ] = useState([])
    // const [ newCocktailIngredients, setNewCocktailIngredients ] = useState([{
    //     id: generate(),
    //     ingredient_name: '',
    //     parts: 0
    // }])

    // const { newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, setName, setParts, addIngredientToCocktail, resetNewCocktail } = newCocktail()

    const { setFlag, newCocktailName, setNewCocktailName, cocktails, addCocktail, newCocktailIngredientName, newCocktailIngredientParts, addedCocktailIngredients, setName, setParts, addIngredientToCocktail, resetNewCocktail } = useCocktails([])

    function AddedIngredient(props){
        return (
            <View>
                <AppText>{props.ingredient_name}</AppText>
                <AppText>{props.parts}</AppText>
            </View>
        )
    }
    function AddedIngredientMap(){
        return addedCocktailIngredients.map(a=>{
            return (
                <AddedIngredient key={a.id} ingredient_name={a.ingredient_name} parts={a.parts} />
            )
        })
    }

    // function NewIngredient(props) {
    //     const placeholder = {
    //         label: 'Parts...',
    //         value: null,
    //         color: '#9EA0A4',
    //     };
    //     return (
    //         <View style={styles.new_ingredient} key={props.id}>
    //             <RNPickerSelect
    //                 placeholder={placeholder}
    //                 useNativeAndroidPickerStyle={false}
    //             style={styles} onValueChange={(val)=>console.log(val)} items={[
    //                 {
    //                     label: '1',
    //                     value: 1
    //                 },
    //                 {
    //                     label: '2',
    //                     value: 2
    //                 },
    //                 {
    //                     label: '3',
    //                     value: 3
    //                 },
    //             ]} />
    //             <TextInput key={`newCocktailIngredientName`} value={newCocktailIngredientName} onChangeText={text=>setNewCocktailIngredientName(text)} style={styles.input} placeholder="Ingredient..." />
    //         </View>
    //     )
    // }

    // function addIngredientToCocktail(){
    //     var added = [{
    //         id: generate(),
    //         ingredient_name: newCocktailIngredientName,
    //         parts: newCocktailIngredientParts
    //     }, ...addedCocktailIngredients]

    //     setAddedCocktailIngredients(added)
    //     setNewCocktailIngredientName('')
    //     setNewCocktailIngredientParts(0)
    // }

    // function NewIngredientMap(){
    //     return newCocktailIngredients.map(ingredient=>{
    //         return (
    //             <NewIngredient id={ingredient.id} ingredient_name={ingredient.name} parts={ingredient.parts} />
    //         )
    //     })
    // }
    const placeholder = {
        label: 'Parts...',
        // value: null,
        color: '#9EA0A4',
    };
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
                <AddedIngredientMap />
                <View style={styles.new_ingredient}>
                    <RNPickerSelect
                        key={newCocktailIngredientParts}
                        placeholder={placeholder}
                        useNativeAndroidPickerStyle={false}
                        style={styles} 
                        value={newCocktailIngredientParts}
                        onValueChange={(val) => setParts(val)} 
                        items={[
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
                        ]} 
                    />
                    <TextInput key={`newCocktailIngredientName`} value={newCocktailIngredientName} onChangeText={text => setName(text)} style={styles.input} placeholder="Ingredient..." />
                </View>
                {/* <NewIngredient /> */}
                <TouchableOpacity onPress={()=>{
                    addIngredientToCocktail()
                    // var added = [{
                    //     id: generate(),
                    //     ingredient_name: newCocktailIngredientName,
                    //     parts: newCocktailIngredientParts
                    // }, ...addedCocktailIngredients]

                    // setAddedCocktailIngredients(added)
                    // setNewCocktailIngredientName('')
                    // setNewCocktailIngredientParts(0)
                }}>
                    <AppText style={styles.add_ingredient_button}>+</AppText>
                </TouchableOpacity>

                <TouchableOpacity onPress={async() => {
                    console.log(newCocktailIngredientName, newCocktailIngredientParts, newCocktailIngredientName != '' && newCocktailIngredientParts != null)
                    if(newCocktailIngredientName != '' && newCocktailIngredientParts != null){
                        console.log('addingingredient')
                        await addIngredientToCocktail()
                    }

                    console.log('setting flag', addedCocktailIngredients)
                    // addCocktail({
                    //     id: generate(),
                    //     name: newCocktailName,
                    //     ingredients: addedCocktailIngredients
                    // })
                    setFlag(true)
                    setNewCocktailName('')

                    resetNewCocktail()
                    // setNewCocktailIngredientName('')
                    // setNewCocktailIngredientParts(0)
                    // setAddedCocktailIngredients([])
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
    },
    new_ingredient: {
        marginTop: 15
    }
})