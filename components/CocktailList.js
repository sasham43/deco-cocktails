import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import AppText from './AppText'
import HalfCircle from '../assets/half-circle.svg'
import QuarterCircle from '../assets/quarter-circle.svg'
import ThreeQuarterCircle from '../assets/three-quarter-circle.svg'
import Circle from '../assets/circle.svg'

import {useCocktails} from '../utils/hooks'

function ClassListMap() {

        const { cocktails, addCocktail } = useCocktails()

        function Part(props){
            if(props.last){
                return (
                    <AppText> {props.parts}</AppText>
                )
            } else {
                if(props.parts == 0.25){
                    return (
                        <QuarterCircle />
                    )
                }
                if(props.parts == 0.5){
                    return (
                        <HalfCircle />
                    )
                }
                if(props.parts == 0.75){
                    return (
                        <ThreeQuarterCircle />
                    )
                }
                if(props.parts == 1){
                    return (
                        <Circle />
                    )
                }
                return (
                    <AppText> {props.parts} |</AppText>
                )
            }
        }
        function PartMap(props){
            return (
                <View style={styles.part_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View key={`part-${i}`}>
                            <Part parts={ingredient.parts} last={(i + 1 == props.ingredients.length)} />
                        </View>
                    )
                    )}
                </View>
            )
        } 
        function Name(props){
            if(props.last){
                return (
                    <AppText> {props.ingredient_name}</AppText>
                    // <HalfCircle />
                    // <ThreeQuarterCircle />
                )
            } else {
                return (
                    <AppText> {props.ingredient_name} |</AppText>
                    // <QuarterCircle />
                )
            }
        }
        function NameMap(props){
            return (
                <View style={styles.part_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View key={`part-${i}`}>
                            <Name parts={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                        </View>
                    )
                    )}
                </View>
            )
        } 
        
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
                    <PartMap ingredients={cocktail.ingredients} />
                    <NameMap ingredients={cocktail.ingredients} />
                    {/* <View>
                        {cocktail.ingredients.map((ingredient, i)=>(
                            <View key={`ingredient-${i}`}>
                                <AppText>{ingredient.ingredient_name}</AppText>
                            </View>
                            )
                        )}
                    </View> */}
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
    },
    part_container: {
        // flex: 1,
        flexDirection: 'row'
    }
})

export default ClassList