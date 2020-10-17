import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from './AppText'

import {useCocktails} from '../utils/hooks'

function ClassListMap() {

        const { cocktails, addCocktail } = useCocktails()
        
        return cocktails.map(cocktail=>
            (
                <View style={styles.cocktail} key={cocktail.id}>
                    <View>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <View>
                        {cocktail.ingredients.map(ingredient=>(
                            <View>
                                {/* <AppText>{ingredient.ingredient_name}</AppText> */}
                                <AppText>{ingredient.parts}</AppText>
                            </View>
                            )
                        )}
                    </View>
                    <View>
                        {cocktail.ingredients.map((ingredient, i)=>(
                            <View>
                                <AppText>{ingredient.ingredient_name}</AppText>
                                {/* <AppText>{ingredient.parts}</AppText> */}
                            </View>
                            )
                        )}
                    </View>
                </View>
            )
        )
}

function ClassList(){
    return (
        <View style={styles.view}>
            <ClassListMap></ClassListMap>
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
        marginTop: 10,
        // marginLeft: 10
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    }
})

export default ClassList