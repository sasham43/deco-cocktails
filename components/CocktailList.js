import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { generate } from 'shortid'

import AppText from './AppText'
import HalfCircle from '../assets/half-circle.svg'
import QuarterCircle from '../assets/quarter-circle.svg'
import ThreeQuarterCircle from '../assets/three-quarter-circle.svg'
import Circle from '../assets/circle.svg'

import {useCocktails} from '../utils/hooks'

function ClassListMap() {

        const { cocktails, addCocktail } = useCocktails()

        function buildPartArray(parts){
            var part_array = []

            var remainder = parts.toString().split('.')[1]

            if(parts >= 1){
                for (var i = 0; i < parts; i++){
                    part_array.push(1)
                }
            }
            if(remainder != undefined){
                remainder = Number("." + remainder)
                part_array.push(remainder)
            }

            console.log('part array', part_array, parts)

            return part_array
        }

        function Shape(props){
            // console.log("Shape props", props)
            if (props.part == 0.25) {
                return (
                    <QuarterCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 0.5) {
                return (
                    <HalfCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 0.75) {
                return (
                    <ThreeQuarterCircle width={props.width} height={props.height} />
                )
            }
            if (props.part == 1) {
                return (
                    <Circle width={props.width} height={props.height} />
                )
            }
            return null
        }
        function ShapeMap(props){
            var shape_array = buildPartArray(props.parts)
            return shape_array.map((part, i)=>{
                var key = generate()
                return (
                    <Shape height={25} width={25} key={key} part={part} />
                )
            })
        }

        function Part(props){
            if(props.last){
                return (
                    // <AppText> {props.parts}</AppText>
                    <ShapeMap parts={props.parts} />
                )
            } else {
                
                return (
                    // <AppText> {props.parts} |</AppText>
                    <ShapeMap parts={props.parts} />
                )
            }
        }
        function PartMap(props){
            return (
                <View style={styles.part_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View style={{width:25, height:25}} key={`part-${i}`}>
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
            // console.log('name', props.ingredients)
            return (
                <View style={styles.name_container}>
                    {props.ingredients.map((ingredient, i) => (
                        <View key={`part-${i}`}>
                            <Name ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                        </View>
                    )
                    )}
                </View>
            )
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
                    <PartMap ingredients={cocktail.ingredients} />
                    <NameMap ingredients={cocktail.ingredients} />
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
        paddingRight: 10
    },
    part_container: {
        flex: 1,
        flexDirection: 'row'
    },
    cocktail_name_container: {
        // flex: 1
    },
    name_container: {
        // flex: 1
        marginTop: 50,
        flexDirection: 'row'
    }
})

export default ClassList