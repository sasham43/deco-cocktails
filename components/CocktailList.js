import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from './AppText'

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
            // console.log('cocktails', cocktails)
            return cocktails.map(cocktail=>
                (
                    <View style={styles.cocktail} key={cocktail.id}>
                        <AppText>
                            <Text style={styles.cocktail_text}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                )
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
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10
    }
})