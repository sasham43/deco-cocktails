import React from 'react'
import { View, StyleSheet, Text, Switch, TextInput, Dimensions, TouchableOpacity } from 'react-native'

import AppText from './AppText'
import { useStock } from '../utils/hooks'

const windowHeight = Dimensions.get('window').height

export default function AddStock(){

    const { newStockName, setNewStockName, newStockIn, setNewStockIn, addToStock } = useStock()
  
    return (
        <View style={styles.view}>
            <View>
                <Switch value={newStockIn} trackColor={{ false: 'grey', true: 'black' }} onValueChange={(val) => setNewStockIn(val)} />
            </View>
            <View>
                <TextInput style={styles.input} value={newStockName} onChangeText={ text => setNewStockName(text)} placeholder="New stock..." />
            </View>
            <View>
                <TouchableOpacity onPress={async () => {
                    addToStock()
                }}>
                    <AppText style={styles.add_button}>Add Bottle To Stock</AppText>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100
    },
    text: {
        // fontSize: 50,
        // color: 'red',
        // textAlign: 'center'
    },
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid'
    },
})