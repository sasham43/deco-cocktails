import React, { useEffect, useState, useRef } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, Animated, Pressable, KeyboardAvoidingView } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import _ from 'lodash'

import AppText from './AppText'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'
import InStockIcon from '../assets/in-stock'


import { useCocktails, useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


function CocktailList(){
    const { toggleFunctionMenu, showFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const { cocktails, deleteCocktail, cocktailSearch, setCocktailSearch, filteredCocktails } = useCocktails()
    const { isInStock } = useStock()
    const  history  = useHistory()

    function CocktailListMap(props) {
        // console.log('disabled', props.currentMode != 'edit' && props.currentMode != 'delete')
        return filteredCocktails.map(cocktail =>
            (
                <Pressable disabled={props.currentMode != 'edit' && props.currentMode != 'delete'} onPress={()=>selectCocktail(cocktail)} style={styles.cocktail} key={cocktail.id}>
                    <View style={styles.cocktail_name_container}>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap ingredients={sortedIngredients(cocktail.ingredients)} />
                    <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
                </Pressable>
            )
        )
    }

    function Name(props) {
        if (props.last) {
            return (
                <AppText style={{ color: isInStock(props.ingredient_name) ? 'black' : 'grey' }}> {props.ingredient_name}</AppText>
            )
        } else {
            return (
                <AppText style={{ color: isInStock(props.ingredient_name) ? 'black' : 'grey' }}> {props.ingredient_name} |</AppText>
            )
        }
    }
    function NameMap(props) {
        return (
            <View style={styles.name_container}>
                {props.ingredients.map((ingredient, i) => (
                    <View key={`part-${i}`}>
                        <Name ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                    </View>
                ))}
            </View>
        )
    }

    function sortedIngredients(ingredients) {
        return _.orderBy(ingredients, 'parts', 'desc')
    }

    function selectCocktail(cocktail) {
        console.log('selecting', currentMode, cocktail)

        if(currentMode == 'edit'){
            // move location, pass data in through route params (defined in Route component in Main)
            history.push(`/add-cocktail/${cocktail.id}`)
        } else if (currentMode == 'delete'){
            deleteCocktail(cocktail.id)
        }
    }

    // const slideAnim = useRef(new Animated.Value(100)).current
    // function slideUp(){
    //     Animated.timing(slideAnim, {
    //         toValue: 100,
    //         duration: 500,
    //         useNativeDriver: false
    //     }).start();
    // }
    // function slideDown(){
    //     Animated.timing(slideAnim, {
    //         toValue: 0,
    //         duration: 500,
    //         useNativeDriver: false
    //     }).start();
    // }


    // function FunctionMenu() {
    //     return (
    //         <Animated.View style={[styles.function_menu, {transform: [{translateY: slideAnim}]}]}>
    //             <AppText>Functions - {currentMode}</AppText>

    //             <TouchableOpacity onPress={()=>switchMode('edit')}>
    //                 <AppText style={styles.action_buttons}>Edit A Cocktail</AppText>
    //             </TouchableOpacity>
    //             <TouchableOpacity onPress={()=>switchMode('delete')}>
    //                 <AppText style={styles.action_buttons}>Remove Cocktails</AppText>
    //             </TouchableOpacity>
    //             <Link to="/add-cocktail">
    //                 <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
    //             </Link>
    //         </Animated.View>
    //     )
    // }

    // function toggle(){
    //     toggleFunctionMenu()
    //     if(showFunctionMenu){

    //         slideUp()
    //     } else {
    //         slideDown()
    //     }
    // }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scroll_view}>
                <CocktailListMap currentMode={currentMode}></CocktailListMap>
            </ScrollView>

            <FunctionMenu 
                showFunctionMenu={showFunctionMenu}
                currentMode={currentMode}
                cocktailSearch={cocktailSearch}
                setCocktailSearch={setCocktailSearch}
                switchMode={switchMode}
            />

            <View style={styles.footer}>
                {/* <TouchableOpacity style={styles.function_button_container} onPress={()=>toggle()}> */}
                <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionMenu()}>

                    <FunctionButtonIcon width={100} height={75} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function FunctionMenu(props) {
    const slideAnim = useRef(new Animated.Value(0)).current
    function slideUp() {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    function slideDown() {
        Animated.timing(slideAnim, {
            toValue: 600,
            duration: 500,
            useNativeDriver: false
        }).start();
    }

    useEffect(()=>{
        // function toggle() {
            // toggleFunctionMenu()
            if (props.showFunctionMenu) {
                // console.log('props')

                slideUp()
            } else {
                slideDown()
            }
        // }
    }, [props.showFunctionMenu])
    // if (props.showFunctionMenu) {
        return (
            <Animated.View style={[styles.function_menu, { transform: [{ translateY: slideAnim }] }]}>
                {/* <AppText>Functions - {props.currentMode}</AppText> */}
                <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.function_menu_button}>
                    <View style={{ opacity: 'search' == props.currentMode ? 1 : 0 }}>
                        <InStockIcon transform={[{ rotate: '-45deg' }]} width={25} height={25} />
                    </View>
                    <TextInput value={props.cocktailSearch} onChangeText={(text) => props.setCocktailSearch(text)} onFocus={()=>props.switchMode('search')} placeholder="Search cocktails..." clearButtonMode={"always"} style={styles.input} />
                </KeyboardAvoidingView>

                {/* <TouchableOpacity style={{flexDirection: 'row', marginLeft: -20}} onPress={() => props.switchMode('edit')}>
                    <InStockIcon transform={[{ rotate: '-45deg' }]} width={25} height={25} />
                    <AppText style={styles.action_buttons}>Edit A Cocktail</AppText>
                </TouchableOpacity> */}
                <FunctionMenuButton label={"Edit A Cocktail"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} />
                <FunctionMenuButton label={"Remove Cocktails"} mode="delete" switchMode={props.switchMode} currentMode={props.currentMode} />
                {/* <TouchableOpacity onPress={() => props.switchMode('delete')}>
                    <AppText style={styles.action_buttons}>Remove Cocktails</AppText>
                </TouchableOpacity> */}
                <Link style={{marginLeft: 5}} to="/add-cocktail">
                    <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
                </Link>
            </Animated.View>
        )
    // } else {
    //     return null
    // }
}

function FunctionMenuButton(props){
    return (
        <Pressable style={styles.function_menu_button} onPress={() => props.switchMode(props.mode)}>
            <View style={{ opacity: props.mode == props.currentMode ? 1 : 0 }}>
                <InStockIcon  transform={[{ rotate: '-45deg' }]} width={25} height={25} />
            </View>
            <AppText style={styles.action_buttons}>{props.label}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    cocktail: {
        marginBottom: 60,
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100
    },
    cocktail_name_container: {
        // flex: 1
    },
    name_container: {
        marginTop: 10,
        flexDirection: 'row'
    },
    function_button_container: {
        height: 120,
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    scroll_view: {
        height: windowHeight - 0
        // height: windowHeight - 120
        // height: windowHeight - 200
    },
    action_buttons: {
        fontSize: 22,
        marginLeft: 10
    },
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
        marginLeft: 10,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    function_menu: {
        justifyContent: 'space-between',
        height: 200,
        zIndex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        // bottom: 100,
        top: windowHeight - 430, // hacky...
    },
    function_menu_button: { 
        flexDirection: 'row', 
        marginLeft: -20,
        alignItems: 'center'
    }, 
    footer: {
        width: windowWidth - 120, // because padding
        alignContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 10,
        marginBottom: 10
    }
})

export default CocktailList