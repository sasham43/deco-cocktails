import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button } from 'react-native'
import { generate } from 'shortid'

import AppText from './AppText'
import { useCocktails } from '../utils/hooks'

export default function Add(){
    const [ newCocktailName, setNewCocktailName ] = useState('')
    const { cocktails, addCocktail } = useCocktails([])

    return (
        <View>
            <AppText>Add a cocktail</AppText>
            <View>
                <TextInput
                    value={newCocktailName}
                    onChangeText={text => setNewCocktailName(text)}
                    style={styles.input}
                />
                <Button style={styles.input} title="Add" onPress={()=>{
                    addCocktail({
                        id: generate(),
                        name: newCocktailName
                    })
                    setNewCocktailName('')
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid'
    }
})