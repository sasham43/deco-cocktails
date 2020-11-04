import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Pressable, Alert } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const titlePadding = 37 + 41 + 10
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)

const mapStateToProps = (state) => {
    // console.log('state', state)
    const { cocktails, current, ui } = state
    return { cocktails: cocktails, ui }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteCocktail
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ViewCocktail)

// export default 
function ViewCocktail(props){
    const navigation = useNavigation()
    const [cocktail, setCocktail] = useState({})

    useEffect(()=>{
        loadParams(props.route.params)
    }, [])

    function loadParams(params){
        if(params.id){
            console.log('props.cocktails', props.cocktails)
            var cocktail = props.cocktails.current.find(c=>c.id == params.id)
            setCocktail(cocktail)
        }
    }
    function editCocktail(){
        navigation.navigate('AddCocktail', {
            id: cocktail.id
        })
    }
    function removeCocktail(){
        var title = `Remove ${cocktail.name}?`
        var msg = ''
        var buttons = [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: removeThisCocktail
            }
        ]
        Alert.alert(title, msg, buttons)
    }

    function removeThisCocktail(){
        props.deleteCocktail(cocktail.id)
        navigation.navigate('CocktailList')
    }

    return (
        <View style={[styles.view, props.ui.current_theme]}>
            <View>
                <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
            </View>
            <ScrollView>
                <View style={ styles.category_title_container }>
                    <AppText style={styles.category_title}>Ingredients</AppText>
                </View>
                <AddedIngredientMap addedCocktailIngredients={cocktail.ingredients} />
            </ScrollView>
            <View style={styles.button_container}>
                <Pressable style={styles.button} onPress={()=>editCocktail()}>
                    <AppText style={styles.button_text}>Edit Cocktail</AppText>
                </Pressable>
                <Pressable style={styles.button} onPress={()=>removeCocktail()}>
                    <AppText style={styles.button_text}>Remove Cocktail</AppText>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40,
        height: viewHeight,
    },
    cocktail_title: {
        // alignItems: 'center',
        textAlign: 'center',
        fontSize: 22
    },
    category_title: { 
        fontSize: 19 
    },
    category_title_container: { 
        paddingLeft: 4, 
        width: 100, 
        marginTop: 10,
        marginBottom: 8,
        fontSize: 18,
        // borderBottomWidth: 1, 
        // borderBottomColor: '#000' 
    },
    button_container: {
        position: 'absolute',
        bottom: 20,
        width: windowWidth,
        paddingBottom: 40
        // textAlign: 'center'
    },
    button_text: {
        fontSize: 23,
        textAlign: 'center'
    },
    button: {
        marginTop: 5,
        marginBottom: 5
    }
})