import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet, Dimensions } from 'react-native'
import { generate } from 'shortid'
import _ from 'lodash'

import AppText from './AppText'
import { Part, PartMap } from './Parts'
// import HalfCircle from '../assets/half-circle.svg'
// import QuarterCircle from '../assets/quarter-circle.svg'
// import ThreeQuarterCircle from '../assets/three-quarter-circle.svg'
// import Circle from '../assets/circle.svg'


import { useCocktails, useStock } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function ClassListMap() {

        const { cocktails } = useCocktails()
        const { isInStock } = useStock()

        // function buildPartArray(parts){
        //     var part_array = []

        //     var remainder = parts.toString().split('.')[1]

        //     if(parts >= 1){
        //         for (var i = 1; i <= parts; i++){
        //             part_array.push(1)
        //         }
        //     }
        //     if(remainder != undefined){
        //         remainder = Number("." + remainder)
        //         part_array.push(remainder)
        //     }

        //     // console.log('part array', part_array, parts)

        //     return part_array
        // }

        // function Shape(props){
        //     // console.log("Shape props", props)
        //     if (props.part == 0.25) {
        //         return (
        //             <QuarterCircle width={props.width} height={props.height} />
        //         )
        //     }
        //     if (props.part == 0.5) {
        //         return (
        //             <HalfCircle width={props.width} height={props.height} />
        //         )
        //     }
        //     if (props.part == 0.75) {
        //         return (
        //             <ThreeQuarterCircle width={props.width} height={props.height} />
        //         )
        //     }
        //     if (props.part == 1) {
        //         return (
        //             <Circle width={props.width} height={props.height} />
        //         )
        //     }
        //     return null
        // }
        // function ShapeMap(props){
        //     var shape_array = buildPartArray(props.parts)
        //     return shape_array.map((part, i) => {
        //         var key = generate()
        //         return (
        //             <View key={key} style={[styles.shape_container, getShapeMargin(part)]}>
        //                 <Shape height={9} width={9} part={part} />
        //             </View>
        //         )
        //     })
        // }
        // function getShapeMargin(part){
        //     // console.log('width for part', part)
        //     if(part == 0.25 || part == 0.25){
        //         return {
        //             marginLeft: -10
        //         }
        //     }
        //     return 25
        // }

        // function Part(props){
        //     if(props.last){
        //         return (
        //             <View style={{flexDirection:'row'}}>
        //                 <ShapeMap parts={props.parts} last={props.last} />
        //             </View>
        //         )
        //     } else {
        //         return (
        //             <View style={{ flexDirection: 'row', marginRight: 10 }}>
        //                 <ShapeMap parts={props.parts} last={props.last} />
        //                 <AppText>|</AppText>
        //             </View>
        //         )
        //     }
        // }
        // function PartMap(props){
        //     return (
        //         <View style={styles.part_map_container}>
        //             {props.ingredients.map((ingredient, i) => (
        //                 <View style={styles.part_container} key={`part-${i}`}>
        //                     <Part parts={ingredient.parts} last={(i + 1 == props.ingredients.length)} />
        //                 </View>
        //             ))}
        //         </View>
        //     )
        // } 
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

function ClassList(){
    return (
        <ScrollView style={styles.view}>
            <ClassListMap></ClassListMap>
        </ScrollView>
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
    }
})

export default ClassList