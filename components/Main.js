import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Title from './Title'
import CocktailList from './CocktailList'

export default class Main extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Title></Title>
                {/* <Text>Main component</Text> */}
                <CocktailList></CocktailList>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 50
    }
})