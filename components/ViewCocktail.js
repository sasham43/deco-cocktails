import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Modal, ScrollView, Pressable, Alert, Animated, Share } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import GestureRecognizer from 'react-native-swipe-gestures'
// import { captureRef } from "react-native-view-shot"
import ViewShot from "react-native-view-shot"
// import Share from 'react-native-share'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'
import AppButton from './AppButton'
import {Directions} from './Directions'
import HeaderIcon from './HeaderIcon'
import CocktailListIndicator from './CocktailListIndicator'
import CornerIcon from '../assets/corner'

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
    const [sorted, setSorted] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [shareUri, setShareUri] = useState('')

    useEffect(()=>{
        loadParams(props.route.params)
    }, [])
    useEffect(()=>{
        loadParams(props.route.params)
    }, [isFocused])
    useEffect(()=>{
        loadParams(props.route.params)
    }, [props.route.params.id])

    useEffect(()=>{
        // console.log('ci', currentIndex)
    }, [currentIndex])
    useEffect(()=>{
        findCurrentIndex()
    })

    function loadParams(params){
        if(params.id){
            var cocktail = props.cocktails.current.find(c=>c.id == params.id)
            setCocktail(cocktail)

            setSorted(props.cocktails.current.sort(sortCocktails))
        }

    }
    function findCurrentIndex(){
        for(var i in sorted){
            var index = Number(i)
            if(sorted[index].id == cocktail.id){
                setCurrentIndex(index)
            }
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
    function findNextCocktail(id){
        // var sorted = props.cocktails.current.sort(sortCocktails)
        // console.log('sorted', sorted)
        for (var i in sorted) {
            var index = Number(i)
            // console.log('sorted item:', sorted[index], index, index+1)
            if (sorted[index].id == id) {
                // if (index == 0) return 0
                if (index == sorted.length - 1) return sorted[sorted.length - 1]
                return sorted[index + 1]
            }
        }
    }
    function findPreviousCocktail(id){
        // var sorted = props.cocktails.current.sort(sortCocktails)
        for (var i in sorted) {
            var index = Number(i)
            // console.log('sorted item:', sorted[index])
            if(sorted[index].id == id){
                if(index == 0) return 0
                // if(index == sorted.length-1) return sorted[sorted.length-1]
                return sorted[index-1]
            }
        }
    }
    function sortCocktails(a, b) {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 0
        }
    }

    var leftAnim = useRef(new Animated.Value(1)).current;
    var rightAnim = useRef(new Animated.Value(0)).current;

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

    function onSwipeLeft(state) {
        // go forward
        var nextCocktail = findNextCocktail(cocktail.id)
        navigation.navigate('ViewCocktail', {
            id: nextCocktail.id
        })
    }
    function onSwipeRight(state) {
        var previousCocktail = findPreviousCocktail(cocktail.id)
        navigation.navigate('ViewCocktail', {
            id: previousCocktail.id
        })
    }
    function showShareModal(){
        setModalVisible(true)
    }
    function hideShareModal(){
        setModalVisible(false)
    }
    function shareCocktail(){
        // console.log('share')
        Share.share({
            message: 'Cocktail by Crump Cocktails',
            url: shareUri
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            })
    }

    return (
        <GestureRecognizer 
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={()=>onSwipeRight()}
            style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 30}]}
        >
            <View style={styles.header}>
                <CocktailListIndicator
                    sorted={sorted}
                    selected={currentIndex}
                    theme={props.ui.current_theme}
                />
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
                <AppButton press={showShareModal}>
                    Share Cocktail
                </AppButton>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={editCocktail}>
                    Change Cocktail
                </AppButton>
                <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={removeCocktail}>
                    Remove Cocktail
                </AppButton>
            </View>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
            >
                <View style={{ backgroundColor: props.ui.current_theme.backgroundColor, paddingTop: 30, paddingLeft: 15, paddingRight: 15, paddingBottom: 15,  flex: 1 }}>
                    <ShareCocktail setShareUri={setShareUri} cocktail={cocktail} ui={props.ui} stock={props.stock} />
                    <View>
                        {/* <AppText>Share This Image</AppText> */}
                        <AppButton press={shareCocktail}>
                            Share Image
                        </AppButton>
                        <AppButton press={hideShareModal}>
                            Cancel
                        </AppButton>
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    )
}

// function shareCocktail(){

//     // var viewRef = useRef(ShareCocktail)
//     // console.log('share')
//     // captureRef(viewRef, {
//     //     format: "jpg",
//     //     quality: 0.8
//     // }).then(uri=>{
//     //     console.log('captured', uri)
//     // })
// }

function ShareCocktail(props){
    function onCapture(uri){
        console.log('captured', uri)
        props.setShareUri(uri)
    }
    var icon_size = 40
    return (
        <ViewShot 
            style={[{backgroundColor: props.ui.current_theme.backgroundColor, padding: 25, borderColor: props.ui.current_theme.color, borderWidth: 1}]}
            captureMode="mount"
            onCapture={onCapture}
        >
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <View>
                <AppText style={styles.cocktail_title}>{props.cocktail.name}</AppText>
            </View>
            <View>
                <AppText style={styles.category_title}>Ingredients</AppText>
                <AddedIngredientMap name_style={{fontSize: 16}} theme={props.ui.current_theme} addedCocktailIngredients={props.cocktail.ingredients} stock={props.stock.current} />
            </View>
            <View>
                <AppText style={styles.category_title}>Directions</AppText>
                <Directions directions={props.cocktail.directions} />
            </View>
        </ViewShot>
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
var icon_distance = 2
const styles = StyleSheet.create({
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
        // height: 120,
        padding: 8
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] }
})