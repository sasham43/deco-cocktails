import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native'
import { generate } from 'shortid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'
import _ from 'lodash'

import AppText from './AppText'
import { Part } from './Parts'
import { useCocktails, newCocktail, useFunctionMenu } from '../utils/hooks'

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
    console.log('mapping state', state)
    const { cocktails, current } = state
    return { cocktails: cocktails }
}

export default connect(mapStateToProps, mapDispatchToProps)(Add)

//export default 
function Add(props){
    const {  
        // cocktails,
        // addCocktail,
        setFlag,
        // newCocktailName,
        // setNewCocktailName, 
        // newCocktailIngredient, 
        // addedCocktailIngredients, 
        // setName, 
        // setParts, 
        // addIngredientToCocktail,
        // setAddedCocktailIngredients, 
        // setNewCocktailIngredient, 
        // toggleEditIngredient,
        // editIngredientId,
        // setEditCocktailId,
        // newCocktailIngredients,
        // resetNewCocktail,
    } = useCocktails([])
    const cocktails = props.cocktails.current

    const [newCocktailIngredient, setNewCocktailIngredient] = useState({
        ingredient_name: '',
        parts: 0
    })
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [newCocktailName, setNewCocktailName] = useState('')
    const [editIngredientId, setEditIngredientId] = useState('')
    const [editCocktailId, setEditCocktailId] = useState('')

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

    // maybe not needed...
    function resetNewCocktail() {
        // console.log('resetting')
        setEditCocktailId('')
        setNewCocktailName('')
        setNewCocktailIngredient({
            ingredient_name: '',
            parts: 0
        })
        setAddedCocktailIngredients([])
    }

    // const params = useParams()
    // const history = useHistory()
    const { navigation, route } = props
    const { currentMode, switchMode } = useFunctionMenu()

    // console.log('add cockctail props', props)
    
    // when cocktails load, check params and set
    useEffect(()=>{
        // resetNewCocktail()
        loadParams(route.params)
        // console.log('navigation', navigation)
        // console.log('route', route)
    },[cocktails])

    function loadParams(params){
        if(params && params.id){
            var cocktail = cocktails.find(c=>c.id == params.id)
            if(cocktail){
                setNewCocktailName(cocktail.name)
                setAddedCocktailIngredients(cocktail.ingredients)
                setEditCocktailId(params.id)
            }

            switchMode('edit')
        }
    }

    function sortedIngredients(ingredients) {
        return _.orderBy(ingredients, 'parts', 'desc')
    }

    function translateParts(parts){
        var split = parts.toString().split('.')
        if(split[1]){
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

            if(split[0] != '0'){
                return `${split[0]} ${fraction}`
            } else {
                return fraction
            }
        }
        return split[0]
    }

    function AddedIngredient(props){
        var fractions = translateParts(props.parts)
        return (
            <TouchableOpacity style={[styles.added_ingredient, editIngredientId == props.id ? styles.selected_ingredient : null]} onPress={()=>toggleEditIngredient(props.id)}>
                <AppText>{props.ingredient_name}</AppText>
                <AppText>{fractions}</AppText>
                {/* <AppText>{props.parts}</AppText> */}
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
                <ScrollView style={{height: 300}}>
                    <TextInput
                        value={newCocktailName}
                        onChangeText={text => setNewCocktailName(text)}
                        style={styles.input}
                        placeholder="New cocktail name..."
                        clearButtonMode={"always"} 
                    />
                    {/* <ScrollView style={{height: 300}}> */}

                        <AddedIngredientMap />
                    {/* </ScrollView> */}
                </ScrollView>
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.new_ingredient}>
                    <TextInput key={`newCocktailIngredientName`} clearButtonMode={"always"}  value={newCocktailIngredient.ingredient_name} onChangeText={text => setName(text)} style={styles.input} placeholder="Ingredient..." />
                    <RNPickerSelect
                        key={newCocktailIngredient.parts}
                        placeholder={placeholder}
                        useNativeAndroidPickerStyle={false}
                        style={styles} 
                        value={newCocktailIngredient.parts}
                        onValueChange={(val) => setParts(val)} 
                        items={[
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
                        ]} 
                    />

                    <TouchableOpacity onPress={() => {
                        addIngredientToCocktail()
                    }}>
                        <AppText style={styles.add_ingredient_button}>+</AppText>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={async() => {
                        // props.addCocktail({
                        //     id: generate(),
                        //     name: newCocktailName,
                        //     ingredients: addedCocktailIngredients
                        // })
                        saveCocktail()
                        // setNewCocktailName('')
                        resetNewCocktail()

                        navigation.push('AddCocktail')
                        // history.push('/add-cocktail') // to refresh
                        // navi
                    }}>
                        <AppText style={styles.add_button}>Add Cocktail</AppText>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    // input: {
    //     fontFamily: 'PoiretOne_400Regular',
    //     paddingTop: 10,
    //     paddingBottom: 10,
    //     paddingLeft: 10,
    //     paddingRight: 10,
    //     borderWidth: 1,
    //     borderColor: '#eee',
    //     borderStyle: 'solid'
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
        // marginLeft: 10,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        marginBottom: 5
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
        borderColor: '#aaa',
        borderWidth: 1,
        // borderRadius: 5,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 18,
        // borderRightWidth: 0,
        // borderLeftWidth: 0,
        // borderTopWidth: 0,
        marginBottom: 5
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