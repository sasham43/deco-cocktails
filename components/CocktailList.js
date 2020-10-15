import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AppText from './AppText'

function ClassList() {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         cocktails: [
    //             {
    //                 id: 0,
    //                 name: 'Manhattan'
    //             },
    //             {
    //                 id: 1,
    //                 name: 'Old Fashioned'
    //             }
    //         ]
    //     };
    // }


    // render(){
        const [cocktails] = useState([
            {
                id: 0,
                name: 'Manhattan'
            },
            {
                id: 1,
                name: 'Old Fashioned'
            }
        ])
        // const cocktails = [
        //     {
        //         id: 0,
        //         name: 'Manhattan'
        //     },
        //     {
        //         id: 1,
        //         name: 'Old Fashioned'
        //     }
        // ]
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
        // function List(){
        //     // console.log('cocktails', this.state)
        //     return cocktails.map(cocktail=>
        //         (
        //             <View style={styles.cocktail} key={cocktail.id}>
        //                 <AppText>
        //                     <Text style={styles.cocktail_text}>
        //                         {cocktail.name}
        //                     </Text>
        //                 </AppText>
        //             </View>
        //         )
        //     )
        // }
        // return (
        //     <View style={styles.list}>
        //         <View>
        //             <List />
        //         </View>
        //     </View>
        // )
    // }
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

export default ClassList