import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default class Title extends React.Component {

    render(){
        return (
            <View style={styles.title}>
                <Text style={styles.text}>Crump Cocktails!</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        // borderBottom: 'solid 1px black'
        borderColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid'
    },
    text: {
        fontSize: 35
    }
})