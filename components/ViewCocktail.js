import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'

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
export default connect(mapStateToProps)(ViewCocktail)

// export default 
function ViewCocktail(props){
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

    return (
        <View style={[styles.view, props.ui.current_theme]}>
            {/* <AppText>Select</AppText> */}
            <View>
                <AppText>{cocktail.name}</AppText>
            </View>
            <View>
                <AddedIngredientMap addedCocktailIngredients={cocktail.ingredients} />
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
    }
})