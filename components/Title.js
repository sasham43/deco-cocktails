import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from './AppText'


export default class Title extends React.Component {

    render(){
        return (
            <View style={styles.title}>
                <AppText>
                    <Text style={styles.text}>
                        Crump Cocktails!
                    </Text>
                </AppText>
                {/* <Text style={styles.text}>Crump Cocktails!</Text> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        // borderBottom: 'solid 1px black'
        borderColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        alignSelf: 'center',
        marginTop: 20
    },
    text: {
        fontSize: 35
    }
})