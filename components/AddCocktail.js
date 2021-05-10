import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, TextInput, Pressable, Dimensions, KeyboardAvoidingView, ScrollView, Keyboard, Animated } from 'react-native'
import { generate } from 'shortid'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import RNPickerSelect from 'react-native-picker-select'
import { useIsFocused } from '@react-navigation/native'
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import _ from 'lodash'

import AppText from './AppText'
import AppButton from './AppButton'
import AppPicker from './AppPicker'
import { Part } from './Parts'
import { AddedIngredientMap } from './AddedIngredients'
import IngredientSlider from './IngredientSlider'
import { useCocktails, newCocktail, useFunctionMenu } from '../utils/hooks'
import TabIcon from '../assets/tab.svg'
import HeaderIcon from './HeaderIcon'
import {DirectionsInput} from './Directions'

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
    // console.log('props', props.route)
    const cocktails = props.cocktails.current

    const [newCocktailIngredientName, setNewCocktailIngredientName] = useState('')
    const [newCocktailIngredientParts, setNewCocktailIngredientParts] = useState('')
    const [addedCocktailIngredients, setAddedCocktailIngredients] = useState([])
    const [addedCocktailDirections, setAddedCocktailDirections] = useState('')
    const [newCocktailName, setNewCocktailName] = useState('')
    const [editIngredientId, setEditIngredientId] = useState('')
    const [editCocktailId, setEditCocktailId] = useState('')
    const [contentMode, setContentMode] = useState('ingredients')
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
                ingredients: addedCocktailIngredients,
                directions: addedCocktailDirections
            })

            props.navigation.navigate('CocktailList')
        } else {
            props.addCocktail({
                id: generate(),
                name: newCocktailName,
                ingredients: addedCocktailIngredients,
                directions: addedCocktailDirections
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
        setAddedCocktailDirections('')
    }
    const { route } = props
    const { currentMode, switchMode } = useFunctionMenu()
    
    // when cocktails load, check params and set
    useEffect(()=>{
        loadParams(route.params)
    },[cocktails, route?.params?.id])

    var leftAnim = useRef(new Animated.Value(1)).current;
    var rightAnim = useRef(new Animated.Value(0)).current;

    function handleFade() {
        if (contentMode == 'ingredients') {
            fadeLeftIn()
            fadeRightOut()
        } else if (contentMode == 'directions') {
            fadeRightIn()
            fadeLeftOut()
        } else {
            fadeLeftOut()
            fadeRightOut()
        }
    }

    const fadeTime = 200
    const fadeLeftIn = () => {
        Animated.timing(leftAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightIn = () => {
        Animated.timing(rightAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeLeftOut = () => {
        Animated.timing(leftAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightOut = () => {
        Animated.timing(rightAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    handleFade()

    function loadParams(params){
        if(params && params.id){
            var cocktail = cocktails.find(c=>c.id == params.id)
            // console.log('cocktail', cocktail.name)
            if(cocktail){
                setNewCocktailName(cocktail.name)
                setAddedCocktailIngredients(cocktail.ingredients)
                setEditCocktailId(params.id)
                setAddedCocktailDirections(cocktail.directions)
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

        // navigation.navigate('AddCocktail', {})
    }

    const ingredient_values = [
        {
            label: 'parts...',
            value: 0
        },  
        {
            label: 'dash',
            value: 'dash'
        },
        {
            label: 'float',
            value: 'float'
        },
        {
            label: 'rinse',
            value: 'rinse'
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
    const [pickerOpen, setPickerOpen] = useState(false)

    useEffect(() => {
        Keyboard.addListener("keyboardWillShow", keyboardDidShow);
        Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        Keyboard.addListener("keyboardWillHide", keyboardDidHide);
        Keyboard.addListener("keyboardDidHide", keyboardDidHide);

        return function cleanup(){
            Keyboard.removeListener("keyboardWillShow", keyboardDidShow)
            Keyboard.removeListener("keyboardDidShow", keyboardDidShow)
            Keyboard.removeListener("keyboardWillHide", keyboardDidHide)
            Keyboard.removeListener("keyboardDidHide", keyboardDidHide)
        }
    })

    function keyboardDidShow(e){
        setMarginBottom(e.endCoordinates.height)
    }
    function keyboardDidHide(){
        setMarginBottom(60)
    }
    function onSwipeLeft(state){
        if(!pickerOpen)
            props.navigation.navigate('ViewCocktail')
    }
    function onSwipeRight(state){
        if(!pickerOpen)
            props.navigation.navigate('Stock')
    }

    useEffect(()=>{
        if(marginBottom < 60){
            setMarginBottom(60)
        }
    }, [marginBottom])

    function onCancel() {
        resetNewCocktail()
    }
    return (
        <GestureRecognizer
            onSwipeLeft={(state) => onSwipeLeft(state)}
            onSwipeRight={(state) => onSwipeRight(state)}
            style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 40}]}
        >
            <View style={styles.new_ingredient_container}>
                <TextInput
                    value={newCocktailName}
                    onChangeText={text => setNewCocktailName(text)}
                    style={[styles.input, styles.cocktail_name, props.ui.current_theme]}
                    placeholder="New cocktail name..."
                    clearButtonMode={"always"}
                    placeholderTextColor={"grey"}
                    autoCapitalize={"words"}
                    maxLength={50}
                />
                <View style={styles.header_buttons}>
                    <Pressable onPress={() => setContentMode('ingredients')} style={styles.category_title_container}>
                        <AppText style={styles.category_title}>Ingredients</AppText>
                        <HeaderIcon direction={'left'} ui={props.ui} anim={leftAnim} />
                    </Pressable>
                    <Pressable onPress={() => setContentMode('directions')} style={styles.category_title_container}>
                        <HeaderIcon direction={'right'} ui={props.ui} anim={rightAnim} />
                        <AppText style={styles.category_title}>Directions</AppText>
                    </Pressable>
                </View>

                <ScrollView style={{height: 300, paddingRight: currentMode == 'ingredients' ? 10 : 0}}>
                    <ScrollContent 
                        ui={props.ui}
                        addedCocktailIngredients={addedCocktailIngredients}
                        editIngredientId={editIngredientId}
                        toggleEditIngredient={toggleEditIngredient}
                        stock={props.stock}
                        addedCocktailDirections={addedCocktailDirections}
                        setAddedCocktailDirections={setAddedCocktailDirections}
                        mode={contentMode} 
                    />
                </ScrollView>

                <AddIngredientModal
                    newCocktailIngredientParts={newCocktailIngredientParts}
                    ingredient_values={ingredient_values}
                    setParts={setParts}
                    newCocktailIngredientName={newCocktailIngredientName}
                    setName={setName}
                    ui={props.ui}
                    addIngredientToCocktail={addIngredientToCocktail}
                    editIngredientId={editIngredientId}
                    removeIngredientFromCocktail={removeIngredientFromCocktail}
                    mode={contentMode}
                    marginBottom={marginBottom}
                    addedCocktailIngredients={addedCocktailIngredients}
                    setPickerOpen={setPickerOpen}
                />
            </View>
            <Footer 
                ui={props.ui}
                newCocktailName={newCocktailName}
                addedCocktailIngredients={addedCocktailIngredients}
                saveCocktailPress={saveCocktailPress}
                editCocktailId={editCocktailId}
                onCancel={onCancel}
            />
        </GestureRecognizer>            
    )
}

function AddIngredientModal(props){
    if(props.mode == 'ingredients'){
        function onSubmitEditing(){
            if (props.editIngredientId || props.addedCocktailIngredients.length < 8){
                props.addIngredientToCocktail()
            }
        }
        return (
            <View style={[styles.new_ingredient, { marginBottom: props.marginBottom }, props.ui.current_theme]}>                   
                <View style={{marginBottom: 10,borderWidth:1, borderColor: props.ui.border_color, flexDirection: 'row'}}>
                    <View style={{flex: 2}}>
                        <AppPicker
                            items={props.ingredient_values}
                            setParts={props.setParts}
                            parts={props.newCocktailIngredientParts}
                            numToRender={props.ingredient_values.length}
                        />
                    </View>
                    <View style={{flex: 6, flexDirection: 'column', justifyContent: 'center'}}>
                        <View style={{flex:1}}>
                            <IngredientSlider
                                parts={props.newCocktailIngredientParts}
                                ingredient_values={props.ingredient_values}
                                setParts={props.setParts}
                                ui={props.ui}
                            />
                        </View>
                        <View style={{flex:1}}>
                            <TextInput
                                key={`newCocktailIngredientName`}
                                clearButtonMode={"always"}
                                value={props.newCocktailIngredientName}
                                onChangeText={text => props.setName(text)}
                                style={[styles.input, { marginBottom: 2, borderBottomWidth: 0, paddingTop: 0, paddingBottom:0 }, props.ui.current_theme]}
                                placeholder="Ingredient..."
                                placeholderTextColor={"#aaa"}
                                autoCapitalize={"words"}
                                maxLength={100}
                                onSubmitEditing={onSubmitEditing}
                            />
                        </View>
                    </View>
                </View>

                <View style={{ marginBottom: 10}}>
                    <AppButton disabled={!props.editIngredientId && props.addedCocktailIngredients.length >= 8} press={props.addIngredientToCocktail} theme={props.ui.current_theme} border={props.ui.border_color}>
                        {props.editIngredientId ? "Save Ingredient" : "Add Ingredient"}
                    </AppButton>
                    {props.editIngredientId ?
                        <AppButton press={props.removeIngredientFromCocktail} theme={props.ui.current_theme} border={props.ui.border_color}>
                            Remove Ingredient
                        </AppButton>
                        : null
                    }
                </View>
            </View>
        )
    } else {
        return null
    }
}

function ScrollContent(props){
    if(props.mode == 'ingredients'){
        return (
            <AddedIngredientMap
                theme={props.ui.current_theme}
                addedCocktailIngredients={props.addedCocktailIngredients}
                editIngredientId={props.editIngredientId}
                toggleEditIngredient={props.toggleEditIngredient}
                stock={props.stock.current}
            />
        )
    } else {
        return (
            <DirectionsInput ui={props.ui} text={props.addedCocktailDirections} setText={props.setAddedCocktailDirections} />
        )
    }
}

function Footer(props){
    if(props.editCocktailId){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.save_cocktail, {flexDirection: 'row'}, props.ui.current_theme]}>
                <View  style={{flex:1}}>
                    <AppButton disabled={props.addedCocktailIngredients.length == 0 || !props.newCocktailName} press={props.saveCocktailPress} theme={props.ui.current_theme} border={props.ui.border_color}>
                        Save Cocktail
                    </AppButton>
                </View>
                <View style={{flex:1, marginLeft: 10}}>
                    <AppButton press={props.onCancel}>
                        Cancel
                    </AppButton>
                </View>
            </View>
        )
    }
    return (
        <View style={[props.ui.default_styles.footerStyles, styles.save_cocktail, {flexDirection: 'row'}, props.ui.current_theme]}>
            <View style={{flex:1}}>
                <AppButton disabled={props.addedCocktailIngredients.length == 0 || !props.newCocktailName} press={props.saveCocktailPress} theme={props.ui.current_theme} border={props.ui.border_color}>
                    Create Cocktail
                </AppButton>
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
                <AppButton press={props.onCancel}>
                    Cancel
                </AppButton>
            </View>
        </View>
    )
}

var mb = 80
if (windowHeight < 700){
    mb = 50
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
        borderRightWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 10,
        fontSize: 18,
        marginBottom: 5,
    },
    new_ingredient: {
        marginTop: 15,
        marginBottom: mb
        // marginBottom: 110
    },
    cocktail_name: {
        marginBottom: 10,
        fontSize: 22
    },  
    new_ingredient_container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        marginTop: 10,
        flex: 1
        // height: windowHeight - 180
    },
    save_cocktail: {
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 10
        // height: 75
    },
    tab_icon_container: {
        alignItems: 'center',
    },
    header_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 10
    },
    cocktail_title: {
        // alignItems: 'center',
        textAlign: 'center',
        fontSize: 22,
        // flex: 2,
    },
    category_title: {
        fontSize: 19
    },
    category_title_container: {
        paddingLeft: 4,
        width: 100,
        marginTop: 10,
        marginBottom: 8,
        fontSize: 18,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
})