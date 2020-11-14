import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Pressable, Alert, Text } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'

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
            // console.log('props.cocktails', props.cocktails)
            var cocktail = props.cocktails.current.find(c=>c.id == params.id)
            setCocktail(cocktail)
        }
    }
    function editCocktail(){
        console.log('editin this cocktail', cocktail.id)
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
        <View style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 30}]}>
            <View>
                <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
            </View>
            <ScrollView>
                <View style={ styles.category_title_container }>
                    <AppText style={styles.category_title}>Ingredients</AppText>
                </View>
                <AddedIngredientMap theme={props.ui.current_theme} addedCocktailIngredients={cocktail.ingredients} />
            </ScrollView>
            <View style={[props.ui.default_styles.footerStyles, styles.button_container, props.ui.current_theme]}>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={editCocktail}>
                    Change Cocktail
                </AppButton>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={removeCocktail}>
                    Remove Cocktail
                </AppButton>
                {/* <Pressable style={styles.button} onPress={()=>editCocktail()}>
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
                    <AppText style={styles.button_text}>Change Cocktail</AppText>
                </Pressable> */}
                {/* <Pressable style={styles.button} onPress={()=>removeCocktail()}>
                    <AppText style={styles.button_text}>Remove Cocktail</AppText>
                </Pressable> */}
            </View>
        </View>
    )
}

// function AppButton(props) {
//     const [pressed, setPressed] = useState(false)

//     function pressStyles(props) {
//         if (!props.pressed) {
//             // setPressed(false)
//             return styles.button
//         } else {
//             // setPressed(true)
//             return styles.pressed_button
//         }
//     }
//     var icon_size = 15
//     return (
//         <Pressable style={pressStyles} onPressIn={()=>setPressed(true)} onPressOut={()=>setPressed(false)} onPress={() => props.press()}>
//             <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
//             <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
//             <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
//             <CornerIcon fill={props.theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
//             {/* <AppText style={pressed ? styles.button_pressed_text : styles.button_text}>{props.label}</AppText> */}
//             <ButtonText pressed={pressed}>{props.label}</ButtonText>
//         </Pressable>
//     )
// }

// function ButtonText(props){
//     if(props.pressed){
//         // console.log('pressed button text', styles.button_pressed_text)
//         return (
//             <AppText style={styles.button_pressed_text}>{props.children}</AppText>
//         )
//     } else {
//         // console.log('not pressed button text', styles.button_text)
//         return (
//             <AppText style={styles.button_text}>{props.children}</AppText>
//         )
//     }
// }

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
        // position: 'absolute',
        // bottom: 20,
        // width: windowWidth,
        // paddingBottom: 40
        // textAlign: 'center'
        marginBottom: 100,
        padding: 8
    },
})