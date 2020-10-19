import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import { Link } from 'react-router-native'
import _ from 'lodash'

import AppText from './AppText'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'


import { useCocktails, useStock, useFunctionScreen } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function ClassListMap() {

        const { cocktails } = useCocktails()
        const { isInStock } = useStock()
        function Name(props){
            if(props.last){
                return (
                    <AppText style={{color: isInStock(props.ingredient_name) ? 'black' : 'grey'}}> {props.ingredient_name}</AppText>
                )
            } else {
                return (
                    <AppText style={{color: isInStock(props.ingredient_name) ? 'black' : 'grey'}}> {props.ingredient_name} |</AppText>
                )
            }
        }
        function NameMap(props){
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

        function sortedIngredients(ingredients){
            return _.orderBy(ingredients, 'parts', 'desc')
        }
        
        return cocktails.map(cocktail=>
            (
                <View style={styles.cocktail} key={cocktail.id}>
                    <View style={styles.cocktail_name_container}>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap ingredients={sortedIngredients(cocktail.ingredients)} />
                    <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
                </View>
            )
        )
}


// function toggleFunctionScreen(){
//     set
// }

function ClassList(){
    const { toggleFunctionScreen, showFunctionScreen } = useFunctionScreen()


    function FunctionScreen() {
        if (showFunctionScreen) {
            return (
                <View>
                    <AppText>Functions</AppText>

                    <TouchableOpacity>
                        <AppText>Edit A Cocktail</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AppText>Remove Cocktails</AppText>
                    </TouchableOpacity>
                    <Link to="/add-cocktail">
                        <AppText>Add A Cocktail</AppText>
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

            <FunctionScreen />

            <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionScreen()}>

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
    }
})

export default ClassList