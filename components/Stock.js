import React from 'react'
import { View, StyleSheet, Switch, Dimensions, TouchableOpacity, Pressable } from 'react-native'
import { Route, Link, matchPath } from 'react-router-native'

import AppText from './AppText'
import { useStock } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'

const windowHeight = Dimensions.get('window').height

export default function Stock({navigation}){
    const { stock, setStock, setInStock } = useStock()

    function StockBottle(props){
        return (
            <View style={styles.stock_bottle}>
                <View style={styles.switch_container}>
                    <TouchableOpacity onPress={() => setInStock(props.bottle, !props.bottle.in_stock)}>
                        <InStockIcon transform={[{ rotate: '-45deg' }]} width={65} height={65} fill={props.bottle.in_stock ? 'black' : 'grey'} />
                    </TouchableOpacity>
                    {/* <Switch value={props.bottle.in_stock} trackColor={{false: 'grey', true: 'black'}}  onValueChange={(val)=>setInStock(props.bottle, val)} /> */}
                </View>
                <View style={styles.label_container}>
                    <AppText style={styles.label_text}>{props.bottle.label}</AppText>
                </View>
            </View>
        )
    }

    function StockMap() {
        return stock.map(bottle=>{
            return (
                <StockBottle key={bottle.id} bottle={bottle} />
            )
        })
    }


    return (
        <View style={[styles.stock, styles.view]}>
            {/* <AppText>Stock page yeah yeah</AppText> */}
            <StockMap />
            <View style={styles.link_container}>
                <Pressable onPress={()=>navigation.navigate('AddStock')}>
                    <View style={styles.link_container}>
                        <AppText style={styles.link_text}>Add Stock</AppText>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    stock: {
        justifyContent: 'flex-start'
    },
    view: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        height: windowHeight - 100,
        backgroundColor: '#fff'
    },
    stock_bottle: {
        // flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },  
    label_container: {
        // flex: 6
        alignSelf: 'center'
    },
    switch_container: {
        // flex: 1
        marginRight: 10
    },
    label_text: {
        fontSize: 22,
    },
    link_container: {
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        alignSelf: 'center',
        // justifySelf: 'center'
    },
    link_text: {
        fontSize: 22,
        // color: 'red',
        textAlign: 'center'
    }
})