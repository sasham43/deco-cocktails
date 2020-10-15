import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default class CocktailList extends React.Component {



    render(){
        const cocktails = [
            {
                id: 0,
                name: 'Manhattan'
            },
            {
                id: 1,
                name: 'Old Fashioned'
            }
        ]
        function List(){
            console.log('cocktails', cocktails)
            return cocktails.map(cocktail=>
                (<Text style={styles.cocktail} key={cocktail.id}>{cocktail.name}</Text>)
            )
        }
        return (
            <View style={styles.list}>
                <View>
                    <List />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    cocktail: {
        marginTop: 10,
        marginLeft: 10
    }
})