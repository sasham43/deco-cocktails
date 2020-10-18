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
            <View>
                <Switch value={props.bottle.in_stock} trackColor={{false: 'grey', true: 'black'}}  onValueChange={(val)=>setInStock(props.bottle, val)} />
                <AppText>{props.bottle.label}</AppText>
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
    }
})