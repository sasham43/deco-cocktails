import React from 'react'
import { View, StyleSheet, Text, Switch, TextInput, Dimensions, TouchableOpacity } from 'react-native'

import AppText from './AppText'
import { useStock } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export default function AddStock(){

    const { newStockName, setNewStockName, newStockIn, setNewStockIn, addToStock, toggleStockIn } = useStock()
  
    return (
        <View style={styles.view}>
            <View style={styles.stock_form}>
                <View style={styles.switch_container}>
                    <TouchableOpacity onPress={()=>toggleStockIn()}>
                        <InStockIcon transform={[{rotate: '-45deg'}]} width={65} height={65} fill={newStockIn ? 'black' : 'grey'} />
                    </TouchableOpacity>
                    {/* <Switch value={newStockIn} trackColor={{ false: 'grey', true: 'black' }} onValueChange={(val) => setNewStockIn(val)} /> */}
                </View>
                <View style={styles.input_container}>
                    <TextInput style={styles.input} value={newStockName} onChangeText={text => setNewStockName(text)} placeholder="New stock..." />
                </View>
            </View>
            <View style={styles.add_container}>
                <TouchableOpacity onPress={async () => {
                    addToStock()
                }}>
                    <AppText style={styles.link_text}>Add Bottle To Stock</AppText>
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
        height: windowHeight - 100,
        // flexDirection: 'row'
    },
    stock_form: {
        flexDirection: 'row',
        // flexDirection: 'column',
        alignContent: 'center',
        // justifyContent: 'flex-end'
        // flex: 1
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
        borderStyle: 'solid',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 22
        // width: windowWidth - 150
    },
    add_container: {
        marginTop: 50
    },  
    link_text: {
        fontSize: 22,
        // color: 'red',
        textAlign: 'center'
    },
    switch_container: {
        alignSelf: 'center'
    },
    input_container: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: 10
        // flexDirection: 'row',
        // flex: 1
    }
})