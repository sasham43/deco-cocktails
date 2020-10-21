import React, { useState, useRef } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity, Animated, Image, Button } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import _ from 'lodash'

import AppText from './AppText'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'


import { useCocktails, useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height


function CocktailList(){
    const { toggleFunctionMenu, showFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const { cocktails, deleteCocktail } = useCocktails()
    const { isInStock } = useStock()
    const  history  = useHistory()

    function CocktailListMap() {
        return cocktails.map(cocktail =>
            (
                <TouchableOpacity onPress={()=>selectCocktail(cocktail)} style={styles.cocktail} key={cocktail.id}>
                    <View style={styles.cocktail_name_container}>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap ingredients={sortedIngredients(cocktail.ingredients)} />
                    <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
                </TouchableOpacity>
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

    const slideAnim = useRef(new Animated.Value(0)).current
    function slideUp(){
        Animated.timing(slideAnim, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false
        }).start();
    }
    function slideDown(){
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
        }).start();
    }


    function FunctionMenu() {
        // if (showFunctionMenu) {
            console.log('slide', slideAnim)
            return (
                <Animated.View style={[styles.function_menu, {transform: [{translateY: slideAnim}]}]}>
                    <AppText>Functions - {currentMode}</AppText>

                    <TouchableOpacity onPress={()=>switchMode('edit')}>
                        <AppText style={styles.action_buttons}>Edit A Cocktail</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>switchMode('delete')}>
                        <AppText style={styles.action_buttons}>Remove Cocktails</AppText>
                    </TouchableOpacity>
                    <Link to="/add-cocktail">
                        <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
                    </Link>
                </Animated.View>
            )
        // } else {
        //     return null
        // }
    }

    function toggle(){
        toggleFunctionMenu()
        if(showFunctionMenu){
            slideUp()
        } else {
            slideDown()
        }
    }

    // const inkAnim = useRef(new Animated.Value(10)).current
    const slideAnim2 = useRef(new Animated.Value(0)).current
    var ink_bool = true
    function slideInk(){
        if(ink_bool){

            Animated.timing(slideAnim2, {
                toValue: -2500,
                duration: 5000,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(slideAnim2, {
                toValue: 0,
                duration: 5000,
                useNativeDriver: false
            }).start();
        }
        ink_bool = !ink_bool
        console.log('fun')
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scroll_view}>
                <CocktailListMap></CocktailListMap>
            </ScrollView>

            <View>
                <Button onPress={()=>slideInk()} title="Ink">Ink</Button>
                <AppText>ink</AppText>
                {/* <Animated.View style={{ transform: [{ translateY: slideAnim2 }] }}> */}
                <Animated.Image style={{ height: 100, width: 2500, transform: [{ translateX: slideAnim2 }] }} source={require('../assets/ink.png')} />
                {/* </Animated.View> */}
                <AppText>/ink</AppText>
            </View>

            <FunctionMenu />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.function_button_container} onPress={()=>toggle()}>
                {/* <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionMenu()}> */}

                    <FunctionButtonIcon width={100} height={75} />
                </TouchableOpacity>
            </View>
        </View>
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
        // marginLeft: 10
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
    part_map_container: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
        // width: 100,
        // height:100
    },
    part_container: {
        // flex: 1,
        flexDirection: 'row',
        // width: 100,
        // height:100
    },
    cocktail_name_container: {
        // flex: 1
    },
    name_container: {
        // flex: 1
        marginTop: 10,
        flexDirection: 'row'
    },
    shape_container: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: 'center'
        // width: 100
        // flex: 3
    },
    // function_menu_container: {
    //     width: windowWidth,
    //     alignContent: 'center',
    //     alignItems: 'center',
    //     zIndex: 3
    // },  
    function_button_container: {
        height: 100,
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2
    },
    scroll_view: {
        height: windowHeight - 200
    },
    action_buttons: {
        fontSize: 22
    },
    function_menu: {
        zIndex: 1,
        // xPos: slideAnim
    },
    footer: {
        width: windowWidth - 120, // because padding
        alignContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 10
    },
    ink_container: {
        width: 100,
        
    }
})

export default CocktailList