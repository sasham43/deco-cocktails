import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, ScrollView, Pressable, Alert, Animated } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'
import AppButton from './AppButton'
import Directions from './Directions'
import HeaderIcon from './HeaderIcon'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
// const titlePadding = 37 + 41 + 10
// const footerHeight = 25
// const viewHeight = windowHeight - (titlePadding + footerHeight)

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
    const [contentMode, setContentMode] = useState('ingredients')

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

    function changeContentMode(mode){
        setContentMode(mode)
    }

    function removeThisCocktail(){
        navigation.navigate('CocktailList')
        props.deleteCocktail(cocktail.id)
    }

    // if (state.index == 0) {
        // currentPage = 'CocktailList'
        var leftAnim = useRef(new Animated.Value(1)).current;
        var rightAnim = useRef(new Animated.Value(0)).current;
    // } else if (state.index == 2) {
    //     // currentPage = 'Stock'
    //     var leftAnim = useRef(new Animated.Value(0)).current;
    //     var rightAnim = useRef(new Animated.Value(1)).current;
    // } else {
    //     var leftAnim = useRef(new Animated.Value(1)).current;
    //     var rightAnim = useRef(new Animated.Value(1)).current;
    // }

    function handleFade() {
        if (contentMode == 'ingredients') {
            fadeLeftIn()
            fadeRightOut()
        } else if (contentMode == 'directions') {
            fadeRightIn()
            fadeLeftOut()
        } else {
            fadeLeftOut()
            fadeRightOut()
        }
    }

    const fadeTime = 1000
    const fadeLeftIn = () => {
        Animated.timing(leftAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightIn = () => {
        Animated.timing(rightAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeLeftOut = () => {
        Animated.timing(leftAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightOut = () => {
        Animated.timing(rightAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    handleFade()

    return (
        <View style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 30}]}>
            <View style={styles.header}>
                <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
                <View style={styles.header_buttons}>
                    <Pressable onPress={()=>changeContentMode('ingredients')} style={styles.category_title_container}>
                        <AppText style={styles.category_title}>Ingredients</AppText>
                        <HeaderIcon direction={'left'} ui={props.ui} anim={leftAnim} />
                    </Pressable>
                    <Pressable onPress={()=>changeContentMode('directions')} style={styles.category_title_container}>
                        <HeaderIcon direction={'right'} ui={props.ui} anim={rightAnim} />
                        <AppText style={styles.category_title}>Directions</AppText>
                    </Pressable>
                </View>
            </View>
            <ScrollView>
                {/* <AddedIngredientMap theme={props.ui.current_theme} addedCocktailIngredients={cocktail.ingredients} stock={props.stock.current} /> */}
                <ScrollContent ui={props.ui} cocktail={cocktail} stock={props.stock} mode={contentMode} />
                <View style={{ marginTop: 120, height: 20 }}></View>
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

function ScrollContent(props){
    if(props.mode == 'ingredients'){
        return (
            <AddedIngredientMap theme={props.ui.current_theme} addedCocktailIngredients={props.cocktail.ingredients} stock={props.stock.current} />
        )
    } else {
        // var test = 'Mix ingredients, stir, ice'
        return (
            <Directions directions={props.cocktail.directions} />
        )
    }
}

const styles = StyleSheet.create({
    // view: {
    //     flex: 1,
    //     paddingTop: 10,
    //     paddingLeft: 40,
    //     paddingRight: 40,
    //     height: viewHeight,
    // },
    header_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },  
    cocktail_title: {
        // alignItems: 'center',
        textAlign: 'center',
        fontSize: 22,
        // flex: 2,
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button_container: {
        // marginBottom: 60,
        // marginBottom: 45,
        height: 120,
        padding: 8
    },
})