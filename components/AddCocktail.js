import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { generate } from 'shortid'
// import { Picker } from '@react-native-community/picker'
import RNPickerSelect from 'react-native-picker-select'
import _ from 'lodash'
import { useParams, useHistory } from 'react-router-native'

import AppText from './AppText'
import { Part } from './Parts'
import { useCocktails, newCocktail, useFunctionMenu } from '../utils/hooks'

const windowHeight = Dimensions.get('window').height

export default function Add(){
    const {  
        cocktails,
        addCocktail,
        setFlag,
        newCocktailName,
        setNewCocktailName, 
        newCocktailIngredient, 
        addedCocktailIngredients, 
        setName, 
        setParts, 
        addIngredientToCocktail,
        setAddedCocktailIngredients, 
        setNewCocktailIngredient, 
        toggleEditIngredient,
        editIngredientId,
        setEditCocktailId,
    } = useCocktails([])

    const params = useParams()
    const history = useHistory()
    const { currentMode, switchMode } = useFunctionMenu()
    
    // when cocktails load, check params and set
    useEffect(()=>{
        // resetNewCocktail()
        loadParams(params)
    },[cocktails])

    // useEffect(()=>{
    //     resetNewCocktail()
    // }, [cocktails])

    // function resetNewCocktail() {
    //     console.log('resetting')
    //     setNewCocktailName('')
    //     setNewCocktailIngredient({
    //         ingredient_name: '',
    //         parts: 0
    //     })
    //     setAddedCocktailIngredients([])
    // }

    function loadParams(params){
        // if(params.name){
        //     setNewCocktailName(params.name)
        // }
        // if(params.ingredients){
        //     setAddedCocktailIngredients(JSON.parse(params.ingredients))
        // }
        console.log('params', params)
        if(params.id){
            var cocktail = cocktails.find(c=>c.id == params.id)
            if(cocktail){
                setNewCocktailName(cocktail.name)
                setAddedCocktailIngredients(cocktail.ingredients)
                setEditCocktailId(params.id)
            }
            // console.log('cocktail', cocktail, cocktails)


            switchMode('edit')
        }
    }

    function sortedIngredients(ingredients) {
        return _.orderBy(ingredients, 'parts', 'desc')
    }

    function AddedIngredient(props){
        return (
            <TouchableOpacity style={[styles.added_ingredient, editIngredientId == props.id ? styles.selected_ingredient : null]} onPress={()=>toggleEditIngredient(props.id)}>
                <AppText>{props.ingredient_name}</AppText>
                <AppText>{props.parts}</AppText>
                <Part style={styles.added_parts} parts={props.parts} last={true} />
            </TouchableOpacity>
        )
    }
    function AddedIngredientMap(){
        return sortedIngredients(addedCocktailIngredients).map(a=>{
            return (
                <AddedIngredient key={a.id} id={a.id} ingredient_name={a.ingredient_name} parts={a.parts} />
            )
        })
    }

    const placeholder = {
        label: 'Parts...',
        color: '#9EA0A4',
    };
    return (
        <View style={styles.view}>
            <View style={styles.new_ingredient_container}>
                <View>
                    <TextInput
                        value={newCocktailName}
                        onChangeText={text => setNewCocktailName(text)}
                        style={styles.input}
                        placeholder="New cocktail name..."
                    />

                    <AddedIngredientMap />
                </View>
                <View style={styles.new_ingredient}>
                    <TextInput key={`newCocktailIngredientName`} value={newCocktailIngredient.ingredient_name} onChangeText={text => setName(text)} style={styles.input} placeholder="Ingredient..." />
                    <RNPickerSelect
                        key={newCocktailIngredient.parts}
                        placeholder={placeholder}
                        useNativeAndroidPickerStyle={false}
                        style={styles} 
                        value={newCocktailIngredient.parts}
                        onValueChange={(val) => setParts(val)} 
                        items={[
                            {
                                label: '0.25',
                                value: 0.25
                            },
                            {
                                label: '0.5',
                                value: 0.5
                            },
                            {
                                label: '0.75',
                                value: 0.75
                            },
                            {
                                label: '1',
                                value: 1
                            },
                            {
                                label: '1.25',
                                value: 1.25
                            },
                            {
                                label: '1.5',
                                value: 1.5
                            },
                            {
                                label: '1.75',
                                value: 1.75
                            },
                            {
                                label: '2',
                                value: 2
                            },
                            {
                                label: '2.25',
                                value: 2.25
                            },
                            {
                                label: '2.5',
                                value: 2.5
                            },
                            {
                                label: '2.75',
                                value: 2.75
                            },
                            {
                                label: '3',
                                value: 3
                            },
                            {
                                label: '3.25',
                                value: 3.25
                            },
                            {
                                label: '3.5',
                                value: 3.5
                            },
                            {
                                label: '3.75',
                                value: 3.75
                            },
                        ]} 
                    />

                    <TouchableOpacity onPress={() => {
                        addIngredientToCocktail()
                    }}>
                        <AppText style={styles.add_ingredient_button}>+</AppText>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={async() => {
                        // if(newCocktailIngredient.ingredient_name != '' && newCocktailIngredient.parts != null){
                        //     addIngredientToCocktail()
                        // }

                        // setFlag(true)
                        addCocktail()
                        history.push('/add-cocktail') // to refresh
                    }}>
                        <AppText style={styles.add_button}>Add Cocktail</AppText>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100
    },
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
    },
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
        // alignSelf: 'center'
        // justifyContent: 'center'
    },
    new_ingredient_container: {
        flexDirection: 'column',
        // alignContent: 'flex-end',
        // justifyContent: 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',

        height: windowHeight - 180
    }
})