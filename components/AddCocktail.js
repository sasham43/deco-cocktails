import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, PanResponder } from 'react-native'
import { generate } from 'shortid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'
import { useIsFocused } from '@react-navigation/native'
import _ from 'lodash'

import AppText from './AppText'
import AppButton from './AppButton'
import { Part } from './Parts'
import { AddedIngredientMap } from './AddedIngredients'
import IngredientSlider from './IngredientSlider'
import { useCocktails, newCocktail, useFunctionMenu } from '../utils/hooks'

import { addCocktail, updateCocktails } from '../utils/CocktailActions'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

// const titlePadding = 37 + 41 + 20
// const footerHeight = 25
// const viewHeight = windowHeight - (titlePadding + footerHeight)

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addCocktail,
        updateCocktails
    }, dispatch)
)
const mapStateToProps = (state) => {
    // console.log('mapping state', state)
    const { cocktails, current, ui } = state
    return { cocktails: cocktails, ui }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)

function Add(props){
    const cocktails = props.cocktails.current

    const [newCocktailIngredient, setNewCocktailIngredient] = useState({
        ingredient_name: '',
        parts: 0
    })
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [editIngredientId, setEditIngredientId] = useState('')
    const [editCocktailId, setEditCocktailId] = useState('')
    const isFocused = useIsFocused()

    function toggleEditIngredient(id) {
        if (editIngredientId == id) {
            setEditIngredientId('')
            setNewCocktailIngredient({
                ingredient_name: '',
                parts: 0
            })
        } else {
            editCocktailIngredient(id)
        }
    }

    function setName(name) {
        setNewCocktailIngredient({
            ingredient_name: name,
            parts: newCocktailIngredient.parts
        })
    }
    function setParts(parts) {
        setNewCocktailIngredient({
            ingredient_name: newCocktailIngredient.ingredient_name,
            parts
        })
    }
    function editCocktailIngredient(id) {
        var ingredient = addedCocktailIngredients.find(a => a.id == id)
        setNewCocktailIngredient(ingredient)
        setEditIngredientId(id)
    }

    function saveCocktail(){
        if(editCocktailId){
            // props.addCocktail(new_cocktail)
            props.updateCocktails({
                id: editCocktailId,
                name: newCocktailName,
                ingredients: addedCocktailIngredients
            })
        } else {
            props.addCocktail({
                id: generate(),
                name: newCocktailName,
                ingredients: addedCocktailIngredients
            })
        }
    }

    async function addIngredientToCocktail() {
        if (!newCocktailIngredient.ingredient_name)
            return // don't allow empty ingredient names

        // check if we're editing an ingredient or adding a new one
        if (editIngredientId) {
            var added = addedCocktailIngredients.map(a => {
                if (a.id == editIngredientId) {
                    return {
                        id: editIngredientId,
                        ingredient_name: newCocktailIngredient.ingredient_name,
                        parts: newCocktailIngredient.parts
                    }
                } else {
                    return a
                }
            })
        } else {
            var added = [{
                id: generate(),
                ingredient_name: newCocktailIngredient.ingredient_name,
                parts: newCocktailIngredient.parts
            }, ...addedCocktailIngredients]
        }

        setAddedCocktailIngredients(added)
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setEditIngredientId('')
    }

    async function removeIngredientFromCocktail(){
        console.log('oh no')
        var ingredients = addedCocktailIngredients.filter(i=>i.id!=editIngredientId)

        setAddedCocktailIngredients(ingredients)
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setEditIngredientId('')
    }

    function resetNewCocktail() {
        setEditCocktailId('')
        setNewCocktailName('')
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setAddedCocktailIngredients([])
    }
    const { navigation, route } = props
    const { currentMode, switchMode } = useFunctionMenu()
    
    // when cocktails load, check params and set
    useEffect(()=>{
        loadParams(route.params)
    },[cocktails])
    useEffect(()=>{
        loadParams(route.params)
    },[isFocused])

    function loadParams(params){
        // console.log('loading params', params)
        if(params && params.id){
            var cocktail = cocktails.find(c=>c.id == params.id)
            if(cocktail){
                setNewCocktailName(cocktail.name)
                setAddedCocktailIngredients(cocktail.ingredients)
                setEditCocktailId(params.id)
            } else {
                setNewCocktailName('')
                setAddedCocktailIngredients([])
                setEditCocktailId(null)
            }

            switchMode('edit')
        } else {
            setNewCocktailName('')
            setAddedCocktailIngredients([])
            setEditCocktailId(null)
        }
    }

    async function saveCocktailPress() {
        saveCocktail()
        resetNewCocktail()

        navigation.navigate('AddCocktail', {})
    }

    // const [sliderValue, setSliderValue] = useState(0)
    // const max = 275
    const ingredient_values = [
        {
            label: 'dash',
            value: 'dash'
        },
        {
            label: 'float',
            value: 'float'
        },
        {
            label: '1/4',
            value: 0.25
        },
        {
            label: '1/2',
            value: 0.5
        },
        {
            label: '3/4',
            value: 0.75
        },
        {
            label: '1',
            value: 1
        },
        {
            label: '1 1/4',
            value: 1.25
        },
        {
            label: '1 1/2',
            value: 1.5
        },
        {
            label: '1 3/4',
            value: 1.75
        },
        {
            label: '2',
            value: 2
        },
        {
            label: '2 1/4',
            value: 2.25
        },
        {
            label: '2 1/2',
            value: 2.5
        },
        {
            label: '2 3/4',
            value: 2.75
        },
        {
            label: '3',
            value: 3
        },
        {
            label: '3 1/4',
            value: 3.25
        },
        {
            label: '3 1/2',
            value: 3.5
        },
        {
            label: '3 3/4',
            value: 3.75
        },
    ]

    const placeholder = {
        label: 'Parts...',
        color: '#9EA0A4',
    };
    return (
        <View style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 40}]}>
            <View style={styles.new_ingredient_container}>
                <TextInput
                    value={newCocktailName}
                    onChangeText={text => setNewCocktailName(text)}
                    style={[styles.input, styles.cocktail_name, props.ui.current_theme]}
                    placeholder="New cocktail name..."
                    clearButtonMode={"always"}
                    placeholderTextColor={props.ui.current_theme.color}
                />

                <ScrollView style={{height: 300, paddingRight: 10}}>
                    <AddedIngredientMap theme={props.ui.current_theme} addedCocktailIngredients={addedCocktailIngredients} editIngredientId={editIngredientId} toggleEditIngredient={toggleEditIngredient} />
                </ScrollView>

                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[styles.new_ingredient, props.ui.current_theme]}>                   
                    <IngredientSlider
                        ingredient={newCocktailIngredient}
                        ingredient_values={ingredient_values} 
                        setParts={setParts}
                    />
                    <TextInput 
                        key={`newCocktailIngredientName`} 
                        clearButtonMode={"always"}  
                        value={newCocktailIngredient.ingredient_name} 
                        onChangeText={text => setName(text)} 
                        style={[styles.input, props.ui.current_theme]} 
                        placeholder="Ingredient..." 
                        placeholderTextColor={props.ui.current_theme.color} 
                    />
                    <RNPickerSelect
                        key={newCocktailIngredient.parts}
                        placeholder={placeholder}
                        useNativeAndroidPickerStyle={false}
                        style={{inputIOS: {...styles.inputIOS, color: props.ui.current_theme.color}}} 
                        value={newCocktailIngredient.parts}
                        onValueChange={(val) => setParts(val)} 
                        items={ingredient_values} 
                    />
                    
                    <View>
                        <AppButton press={addIngredientToCocktail} theme={props.ui.current_theme} border={props.ui.border_color}>
                            {editIngredientId ? "Save Ingredient" : "Add Ingredient"}
                        </AppButton>
                        {editIngredientId ? 
                            <AppButton press={removeIngredientFromCocktail} theme={props.ui.current_theme} border={props.ui.border_color}>
                                Remove Ingredient
                            </AppButton>
                            : null
                        }
                    </View>

                </KeyboardAvoidingView>
            </View>
            <View style={[props.ui.default_styles.footerStyles, styles.save_cocktail]}>

                <AppButton press={saveCocktailPress} theme={props.ui.current_theme} border={props.ui.border_color}>
                    {editCocktailId ? "Save Cocktail" : "Add Cocktail"}
                </AppButton>
            </View>
        </View>
    )
}

// function SliderIngredient(props){
//     // if(!props.ingredient) return null
//     // var slider = props.slider < 0 ? 0 : props.slider
//     var slider = 0
//     if(props.slider < 0){
//         slider = 0
//     } else if (props.slider > props.ingredient_values.length){
//         slider = props.ingredient_values.length
//     } else {
//         slider = props.slider
//     }

//     const ingredient = props.ingredient_values[slider]

//     // const label = props.ingredient.label
//     return (
//         <View>
//             <AppText>{ingredient.label}</AppText>
//         </View>
//     )
// }

const styles = StyleSheet.create({
    // view: {
    //     paddingTop: 10,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     // height: windowHeight - 100,
    //     height: viewHeight,
    //     marginTop: 50,
    //     // backgroundColor: '#000',
    //     // backgroundColor: '#fff',
    //     alignItems: 'center'
    // },
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderStyle: 'solid',
        fontSize: 18,
        width: windowWidth - 125,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        marginBottom: 5
    },
    add_button: {
        marginTop: 45,
        fontSize: 25,
        alignSelf: 'center',
    },
    add_ingredient_button: {
        marginTop: 15,
        fontSize: 23,
        alignSelf: 'center',
    },
    inputIOS: {
        fontFamily: 'PoiretOne_400Regular',
        borderColor: '#aaa',
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 5,
    },
    new_ingredient: {
        marginTop: 15,
        marginBottom: 110
    },
    cocktail_name: {
        marginBottom: 25,
        fontSize: 22
    },  
    new_ingredient_container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        height: windowHeight - 180
    },
    save_cocktail: {
        // bottom: -50,
        paddingLeft: 10,
        paddingRight: 10
    }
})