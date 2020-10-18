import React from 'react'
import { View, StyleSheet, Switch } from 'react-native'

import AppText from './AppText'
import { useStock } from '../utils/hooks'

// export default class Stock extends React.Component {

//     render(){
//         return (
//             <View style={[styles.stock, styles.view]}>
//                 <AppText>Stock page yeah yeah</AppText>
//             </View>
//         )
//     }
// }

export default function Stock(){
    const { stock, setStock, setInStock } = useStock()

    function StockBottle(props){
        return (
            <View style={styles.stock_bottle}>
                <View style={styles.switch_container}>
                    <Switch value={props.bottle.in_stock} trackColor={{false: 'grey', true: 'black'}}  onValueChange={(val)=>setInStock(props.bottle, val)} />
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
        paddingRight: 10
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
    }
})