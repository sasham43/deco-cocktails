import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Modal, ScrollView, Pressable, Alert, Animated, Share, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import GestureRecognizer from 'react-native-swipe-gestures'
import ViewShot from "react-native-view-shot"
import SlidingUpPanel from 'rn-sliding-up-panel'

import AppText from './AppText'
import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'
import AppButton from './AppButton'
import {Directions} from './Directions'
import HeaderIcon from './HeaderIcon'
import CocktailListIndicator from './CocktailListIndicator'
import CornerIcon from '../assets/corner'
import { useFunctionMenu } from '../utils/hooks'
import FunctionButtonIcon from '../assets/function-button.svg'
import TabIcon from '../assets/tab'

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
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)
    const {
        currentMode,
        switchMode
    } = useFunctionMenu()
    // const [params, setParams] = useState(props.route.params)

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
        } else {
            var cocktail = props.cocktails.current[0]
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
        for (var i in sorted) {
            var index = Number(i)
            if (sorted[index].id == id) {
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
        if(state.x0 < 150){
            return navigation.goBack()
        }
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
            message: `${cocktail.name} by Crump Cocktails`,
            url: shareUri
        })
        .then((res) => {
            // console.log(res);
            hideShareModal()
        })
        .catch((err) => {
            // err && console.log(err);
            hideShareModal()
        })
    }
    function toggleFunctionMenu() {
        setShowFunctionMenu(!showFunctionMenu)
        // console.log('toggle', showFunctionMenu)
    }

    return (
        <GestureRecognizer 
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={(state)=>onSwipeRight(state)}
            style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 30}]}
        >
            <View style={styles.header}>
                <AppMenu items={sorted} />
                {/* <CocktailListIndicator
                    sorted={sorted}
                    selected={currentIndex}
                    theme={props.ui.current_theme}
                /> */}
                <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
                <View style={styles.header_buttons}>
                    <Pressable onPress={()=>changeContentMode('ingredients')} style={[styles.category_title_container, {alignItems: 'center'}]}>
                        <AppText style={styles.category_title}>Ingredients</AppText>
                        <HeaderIcon style={{alignSelf: 'center'}} direction={'left'} ui={props.ui} anim={leftAnim} />
                    </Pressable>
                    <Pressable onPress={()=>changeContentMode('directions')} style={[styles.category_title_container, {alignItems: 'center'}]}>
                        <HeaderIcon style={{ alignSelf: 'center' }} direction={'right'} ui={props.ui} anim={rightAnim} />
                        <AppText style={styles.category_title}>Directions</AppText>
                    </Pressable>
                </View>
            </View>
            <ScrollView>
                <ScrollContent ui={props.ui} cocktail={cocktail} stock={props.stock} mode={contentMode} />
                <View style={{ marginTop: 120, height: 20 }}></View>
            </ScrollView>
            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                currentMode={currentMode}
                showShareModal={showShareModal}
                editCocktail={editCocktail}
                removeCocktail={removeCocktail}
                ui={props.ui}
                theme={props.ui.current_theme}
                dark_mode={props.ui.dark_mode}
            />
            <View style={[props.ui.default_styles.footerStyles, props.ui.current_theme]}>
                <Pressable style={styles.function_button_container} onPress={() => toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
            >
                <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: props.ui.current_theme.backgroundColor, paddingTop: 30, paddingLeft: 15, paddingRight: 15, paddingBottom: 15,  flex: 1 }}>
                    <ShareCocktail setShareUri={setShareUri} cocktail={cocktail} ui={props.ui} stock={props.stock} />
                    <View style={{ flexDirection: 'row'}}>
                        <View style={[styles.share_btn, { marginRight: 5, flex: 1 }]} >
                            <AppButton press={shareCocktail}>
                                Share
                            </AppButton>
                        </View>
                        <View style={[styles.share_btn, { marginLeft: 5, flex: 1 }]} >
                            <AppButton style={[styles.share_btn, {marginLeft: 100}]} press={hideShareModal}>
                                Cancel
                            </AppButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    )
}

function FunctionMenu(props){
    const { panel, setPanel } = useFunctionMenu()
    const navigation = useNavigation()
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    useEffect(() => {
        if (props.showFunctionMenu) {
            if (panel)
                var height = Math.max((windowHeight / 2), 470)
            panel.show(height)
        } else {
            if (panel)
                panel.hide()
        }
    }, [props.showFunctionMenu])

    function onBottomReached() {
        if (navigation.isFocused())
            props.setShowFunctionMenu(false)
    }

    var windowHeight = props.ui.default_styles.window.height
    var top_height = (windowHeight - 210) > 0 ? windowHeight - 210 : 0
    const border_style = (Platform.OS == 'android' && props.dark_mode) ? { borderColor: props.theme.color, borderWidth: 1 } : null // add a border for Android in dark mode
    return (
        <SlidingUpPanel 
            showBackdrop={false} 
            draggableRange={{ top: top_height, bottom: 0}} 
            ref={c=> setPanel(c)} 
            onBottomReached={()=>onBottomReached()}
            animatedValue={animatedValue}
        >
            <View style={ [styles.panel_container, props.theme, border_style] }>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <View style={[ styles.button_container, props.ui.current_theme]}>
                    <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={props.editCocktail}>
                        Change Cocktail
                    </AppButton>
                    <AppButton theme={props.ui.current_theme} border={props.ui.border_color} press={props.removeCocktail}>
                        Remove Cocktail
                    </AppButton>
                    <AppButton press={props.showShareModal}>
                        Share Cocktail
                    </AppButton>
                </View> 
            </View>
        </SlidingUpPanel>
    )
}

function ShareCocktail(props){
    function onCapture(uri){
        // console.log('captured', uri)
        props.setShareUri(uri)
    }
    var icon_size = 40
    var cocktail_stock = props.cocktail.ingredients.map(i=>{
        return {
            label: i.ingredient_name,
            in_stock: true
        }
    })
    var small_screen = Dimensions.get('window').height < 700
    var fontSize = small_screen ? 14 : 16
    // console.log('window', Dimensions.get('window').height, fontSize)
    var modal_style = small_screen ? styles.small_share_modal : styles.large_share_modal
    return (
        <ViewShot 
            style={[{ backgroundColor: props.ui.current_theme.backgroundColor,margin: 10, padding: 25, borderColor: props.ui.current_theme.color, borderWidth: 1}, modal_style]}
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
            <View style={{justifyContent: 'flex-start', flex: 1, paddingTop: 5}}>
                <View>
                    <View style={{justifyContent: 'center'}}>
                        <AddedIngredientMap compact={true} name_style={{fontSize: fontSize}} theme={props.ui.current_theme} addedCocktailIngredients={props.cocktail.ingredients} stock={cocktail_stock} />
                    </View>
                </View>
                <View>
                    <Directions directions={props.cocktail.directions} style={{fontSize}} />
                </View>
                <View style={{ position: 'absolute', bottom: -15, flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <AppText style={{fontSize: 10, color: 'grey'}}>Crump Cocktails</AppText>
                    </View>
                </View>
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
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    header: {
        marginTop: 20
    },
    header_buttons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
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
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] },
    small_share_modal: {
        // maxHeight: 575,
        // maxWidth: 400,
        // minHeight: 500,
        // minWidth: 350
        height: 550,
        width: 350
    },
    large_share_modal: {
        height: 600,
        width: 350
    },  
    share_btn: {
        // flex: 1,
    },
    panel_container: {
        flex: 1,
        justifyContent: 'flex-start',
        shadowColor: 'rgba(150,150,150,.1)',
        shadowOpacity: .4,
        width: windowWidth - 40,
        marginLeft: 20,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 10 // for Android
    },
    function_button_container: {
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        justifyContent: 'flex-start'
    },
    tab_icon_container: {
        alignItems: 'center',
        marginBottom: -20
    },
})