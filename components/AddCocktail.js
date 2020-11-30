import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView, Keyboard, PanResponder } from 'react-native'
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
import TabIcon from '../assets/tab.svg'

import { addCocktail, updateCocktails } from '../utils/CocktailActions'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addCocktail,
        updateCocktails
    }, dispatch)
)
const mapStateToProps = (state) => {
    const { cocktails, ui, stock } = state
    return { cocktails: cocktails, ui, stock }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)

function Add(props){
    const cocktails = props.cocktails.current

    const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState('')
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [editIngredientId, setEditIngredientId] = useState('')
    const [editCocktailId, setEditCocktailId] = useState('')
    const isFocused = useIsFocused()

    function toggleEditIngredient(id) {
        if (editIngredientId == id) {
            setEditIngredientId('')
            setNewCocktailIngredientName('')
            setNewCocktailIngredientParts(0)
        } else {
            editCocktailIngredient(id)
        }
    }

    function setName(name) {
        setNewCocktailIngredientName(name)
    }
    function setParts(parts) {
        setNewCocktailIngredientParts(parts)
    }
    function editCocktailIngredient(id) {
        var ingredient = addedCocktailIngredients.find(a => a.id == id)
        setNewCocktailIngredientName(ingredient.ingredient_name)
        setNewCocktailIngredientParts(ingredient.parts)
        setEditIngredientId(id)
    }

    function saveCocktail(){
        if(editCocktailId){
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
        if (!newCocktailIngredientName)
            return // don't allow empty ingredient names

        // check if we're editing an ingredient or adding a new one
        if (editIngredientId) {
            var added = addedCocktailIngredients.map(a => {
                if (a.id == editIngredientId) {
                    return {
                        id: editIngredientId,
                        ingredient_name: newCocktailIngredientName,
                        parts: newCocktailIngredientParts
                    }
                } else {
                    return a
                }
            })
        } else {
            var added = [{
                id: generate(),
                ingredient_name: newCocktailIngredientName,
                parts: newCocktailIngredientParts
            }, ...addedCocktailIngredients]
        }

        setAddedCocktailIngredients(added)
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
        setEditIngredientId('')
    }

    async function removeIngredientFromCocktail(){
        var ingredients = addedCocktailIngredients.filter(i=>i.id!=editIngredientId)

        setAddedCocktailIngredients(ingredients)
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
        setEditIngredientId('')
    }

    function resetNewCocktail() {
        setEditCocktailId('')
        setNewCocktailName('')
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
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
        setNewCocktailIngredientName('')
        setNewCocktailIngredientParts(0)
    }

    async function saveCocktailPress() {
        saveCocktail()
        resetNewCocktail()

        navigation.navigate('AddCocktail', {})
    }

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
        {
            label: '4',
            value: 4
        },
        {
            label: '4 1/4',
            value: 4.25
        },
        {
            label: '4 1/2',
            value: 4.5
        },
        {
            label: '4 3/4',
            value: 4.75
        },
        {
            label: '5',
            value: 5
        },
        {
            label: '5 1/4',
            value: 5.25
        },
        {
            label: '5 1/2',
            value: 5.5
        },
        {
            label: '5 3/4',
            value: 5.75
        },
        {
            label: '6',
            value: 6
        },
        {
            label: '6 1/4',
            value: 6.25
        },
        {
            label: '6 1/2',
            value: 6.5
        },
        {
            label: '6 3/4',
            value: 6.75
        },
        {
            label: '7',
            value: 7
        },
        {
            label: '7 1/4',
            value: 7.25
        },
        {
            label: '7 1/2',
            value: 7.5
        },
        {
            label: '7 3/4',
            value: 7.75
        },
        {
            label: '8',
            value: 8
        },
        {
            label: '8 1/4',
            value: 8.25
        },
        {
            label: '8 1/2',
            value: 8.5
        },
        {
            label: '8 3/4',
            value: 8.75
        },
        {
            label: '9',
            value: 9
        },
        {
            label: '9 1/4',
            value: 9.25
        },
        {
            label: '9 1/2',
            value: 9.5
        },
        {
            label: '9 3/4',
            value: 9.75
        },
    ]
    const [marginBottom, setMarginBottom] = useState(10)

    Keyboard.addListener("keyboardWillShow", keyboardDidShow);
    Keyboard.addListener("keyboardDidShow", keyboardDidShow);
    Keyboard.addListener("keyboardWillHide", keyboardDidHide);
    Keyboard.addListener("keyboardDidHide", keyboardDidHide);

    function keyboardDidShow(){
        setMarginBottom(100)
    }
    function keyboardDidHide(){
        setMarginBottom(10)
    }

    const placeholder = {
        label: 'Parts...',
        color: 'grey',
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
                    placeholderTextColor={"grey"}
                    // placeholderTextColor={props.ui.current_theme.color}
                />

                <ScrollView style={{height: 300, paddingRight: 10}}>
                    <AddedIngredientMap 
                        theme={props.ui.current_theme} 
                        addedCocktailIngredients={addedCocktailIngredients} 
                        editIngredientId={editIngredientId} 
                        toggleEditIngredient={toggleEditIngredient} 
                        stock={props.stock.current}
                    />
                </ScrollView>

                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={[styles.new_ingredient, props.ui.current_theme]}>                   
                    <IngredientSlider
                        parts={newCocktailIngredientParts}
                        ingredient_values={ingredient_values} 
                        setParts={setParts}
                    />
                    <TextInput 
                        key={`newCocktailIngredientName`} 
                        clearButtonMode={"always"}  
                        value={newCocktailIngredientName} 
                        onChangeText={text => setName(text)} 
                        style={[styles.input, {marginBottom: marginBottom}, props.ui.current_theme]} 
                        placeholder="Ingredient..." 
                        placeholderTextColor={"grey"}
                    />
                    <RNPickerSelect
                        key={newCocktailIngredientParts}
                        placeholder={placeholder}
                        useNativeAndroidPickerStyle={false}
                        style={{inputIOS: {...styles.inputIOS, color: props.ui.current_theme.color}}} 
                        value={newCocktailIngredientParts}
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
            <View style={[props.ui.default_styles.footerStyles, styles.save_cocktail, props.ui.current_theme]}>
                <AppButton press={saveCocktailPress} theme={props.ui.current_theme} border={props.ui.border_color}>
                    {editCocktailId ? "Save Cocktail" : "Add Cocktail"}
                </AppButton>
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
        borderColor: '#aaa',
        borderStyle: 'solid',
        fontSize: 18,
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
        paddingLeft: 10,
        paddingRight: 10
    },
    tab_icon_container: {
        alignItems: 'center',
    },
})