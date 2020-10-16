import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from './AppText'

import {useCocktails} from '../utils/hooks'

function ClassListMap() {
        // const [cocktails] = useState([
        //     {
        //         id: 0,
        //         name: 'Manhattan'
        //     },
        //     {
        //         id: 1,
        //         name: 'Old Fashioned'
        //     }
        // ])

        const { cocktails, addCocktail } = useCocktails()

    // console.log(cocktails, addCocktail)

        // setTimeout(()=>{
        //     console.log(addCocktail)
        //     addCocktail({
        //         id: 0, 
        //         name: 'Manhattan'
        //     })
        //     setTimeout(() => {
        //         console.log(addCocktail)
        //         addCocktail({
        //             id: 1,
        //             name: 'Old Fashioned'
        //         })
        //     }, 3000)
        // }, 3000)
        
        return cocktails.map(cocktail=>
            (
                <View style={styles.cocktail} key={cocktail.id}>
                    <AppText>
                        <Text style={styles.cocktail_text}>
                            {cocktail.name}
                        </Text>
                    </AppText>
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