import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import AppText from './AppText'


export default function AddStock(){
    return (
        <View style={styles.container}>
            {/* <AppText style={styles.text}> */}
                <Text style={styles.text}>Add Stock</Text>
            {/* </AppText> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        // justifySelf: 'center'
    },
    text: {
        fontSize: 50,
        color: 'red',
        textAlign: 'center'
    }
})