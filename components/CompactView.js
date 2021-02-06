import React from 'react'
import { View, Dimensions } from 'react-native'

import AppText from './AppText'
import {AddedIngredientMap} from './AddedIngredients'
import {Directions} from './Directions'

export function CompactView(props) {
    var small_screen = Dimensions.get('window').height < 700
    var fontSize = small_screen ? 14 : 16
    // console.log('fjfkdls', props.stock)
    if(!props.cocktail){
        return null
    } else {
        return (
            <View style={{ justifyContent: 'flex-start', flex: 1, paddingTop: 5 }}>
                <View>
                    <View style={{ justifyContent: 'center' }}>
                        <AddedIngredientMap compact={true} name_style={{ fontSize: fontSize }} theme={props.ui.current_theme} addedCocktailIngredients={props.cocktail.ingredients} stock={props.stock} />
                    </View>
                </View>
                <View>
                    <Directions directions={props.cocktail.directions} style={{ fontSize }} />
                </View>
                <ShareAttribution share={props.share} />
            </View>
        )
    }
}
export function ShareAttribution(props) {
    if (props.share) {
        return (
            <View style={{ position: 'absolute', bottom: -15, flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <AppText style={{ fontSize: 10, color: 'grey' }}>Crump Cocktails</AppText>
                </View>
            </View>
        )
    } else {
        return null
    }
}