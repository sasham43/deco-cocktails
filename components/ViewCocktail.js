import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Pressable, Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'
import AppButton from './AppButton'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const titlePadding = 37 + 41 + 10
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)

const mapStateToProps = (state) => {
    const { cocktails, ui, stock } = state
    return { cocktails: cocktails, ui, stock }
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
    const isFocused = useIsFocused()
    const [cocktail, setCocktail] = useState({})

    useEffect(()=>{
        loadParams(props.route.params)
    }, [])
    useEffect(()=>{
        loadParams(props.route.params)
    }, [isFocused])

    function loadParams(params){
        if(params.id){
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
        navigation.navigate('CocktailList')
        props.deleteCocktail(cocktail.id)
    }

    return (
        <View style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 30}]}>
            <View>
                <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
            </View>
            <ScrollView>
                <View style={ styles.category_title_container }>
                    <AppText style={styles.category_title}>Ingredients</AppText>
                </View>
                <AddedIngredientMap theme={props.ui.current_theme} addedCocktailIngredients={cocktail.ingredients} stock={props.stock.current} />
            </ScrollView>
            <View style={[props.ui.default_styles.footerStyles, styles.button_container, props.ui.current_theme]}>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={editCocktail}>
                    Change Cocktail
                </AppButton>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={removeCocktail}>
                    Remove Cocktail
                </AppButton>
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
    },
    button_container: {
        marginBottom: 60,
        padding: 8
    },
})