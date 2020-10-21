import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Link, useHistory } from 'react-router-native'
import _ from 'lodash'

import AppText from './AppText'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'


import { useCocktails, useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height




// function toggleFunctionScreen(){
//     set
// }

function ClassList(){
    const { toggleFunctionMenu, showFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const { cocktails, deleteCocktail } = useCocktails()
    const { isInStock } = useStock()
    const  history  = useHistory()

    function ClassListMap() {

        // const { currentMode } = useFunctionMenu()



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


    function FunctionMenu() {
        if (showFunctionMenu) {
            return (
                <View>
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
                </View>
            )
        } else {
            return null
        }
    }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scroll_view}>
                <ClassListMap></ClassListMap>
            </ScrollView>

            <FunctionMenu />

            <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionMenu()}>

                <FunctionButtonIcon width={100} height={75} />
            </TouchableOpacity>
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
    function_button_container: {
        height: 100,
        alignContent: 'center',
        alignItems: 'center'
        
    },
    scroll_view: {
        height: windowHeight - 200
    },
    action_buttons: {
        fontSize: 22
    }
})

export default ClassList