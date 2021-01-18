import React, { useState, useEffect, useRef } from 'react'
import { View, StyleSheet, Modal, ScrollView, Pressable, Alert, Animated, Share, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import GestureRecognizer from 'react-native-swipe-gestures'
import ViewShot from "react-native-view-shot"
import SlidingUpPanel from 'rn-sliding-up-panel'
import QRCode from 'react-native-qrcode-svg'
import * as Linking from 'expo-linking'

import AppText from './AppText'
import AppMenu from './AppMenu'
// import { AddedIngredientMap } from './AddedIngredients'
import { deleteCocktail } from '../utils/CocktailActions'
import AppButton from './AppButton'
// import {Directions} from './Directions'
// import HeaderIcon from './HeaderIcon'
// import CocktailListIndicator from './CocktailListIndicator'
import CornerIcon from '../assets/corner'
import { useFunctionMenu } from '../utils/hooks'
import FunctionButtonIcon from '../assets/function-button.svg'
import TabIcon from '../assets/tab'
import {CompactView, ShareAttribution} from './CompactView'

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
    // const [contentMode, setContentMode] = useState('ingredients')
    const [sorted, setSorted] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [shareUri, setShareUri] = useState('')
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)
    const {
        currentMode,
        switchMode
    } = useFunctionMenu()
    const [params, setParams] = useState(props.route.params ? props.route.params : {id:null})
    const [shareIndex, setShareIndex] = useState(0)

    useEffect(()=>{
        // console.log('view []')
        loadParams(params)
    }, [])
    useEffect(()=>{
        // console.log('view isFocused')
        loadParams(params)
    }, [isFocused])
    useEffect(()=>{
        // console.log('view params.id')
        loadParams(params)
    }, [params.id])

    useEffect(()=>{
        // console.log('ci', currentIndex)
    }, [currentIndex])
    useEffect(()=>{
        findCurrentIndex()
    })

    function loadParams(params){
        // console.log('loading params', params.id)
        if(params.id){
            var cocktail = props.cocktails.current.find(c=>c.id == params.id)
            setCocktail(cocktail)

            setSorted(props.cocktails.current.sort(sortCocktails))
            // findCurrentIndex()
        } else {
            var cocktail = props.cocktails.current[0]
            setCocktail(cocktail)

            setSorted(props.cocktails.current.sort(sortCocktails))
            // findCurrentIndex()
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

    // function changeContentMode(mode){
    //     setContentMode(mode)
    // }

    function removeThisCocktail(){
        navigation.navigate('CocktailList')
        props.deleteCocktail(cocktail.id)
    }
    // function findNextCocktail(id){
    //     for (var i in sorted) {
    //         var index = Number(i)
    //         if (sorted[index].id == id) {
    //             if (index == sorted.length - 1) return sorted[sorted.length - 1]
    //             return sorted[index + 1]
    //         }
    //     }
    // }
    // function findPreviousCocktail(id){
    //     // var sorted = props.cocktails.current.sort(sortCocktails)
    //     for (var i in sorted) {
    //         var index = Number(i)
    //         // console.log('sorted item:', sorted[index])
    //         if(sorted[index].id == id){
    //             if(index == 0) return 0
    //             // if(index == sorted.length-1) return sorted[sorted.length-1]
    //             return sorted[index-1]
    //         }
    //     }
    // }
    function sortCocktails(a, b) {
        if (a.name > b.name) {
            return 1
        } else if (a.name < b.name) {
            return -1
        } else {
            return 0
        }
    }
    function onSwipeLeft(state) {
        // go forward
        navigation.navigate('About')
    }
    function onSwipeRight(state) {
        if(state.x0 < 150){
            return navigation.goBack()
        }
        navigation.navigate('AddCocktail')
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

    function onSnap(carousel, index){
        var cocktail = sorted[index]
        loadParams(cocktail)
    }

    const shareItems = [
        {
            name: 'Picture'
        },
        {
            name: 'QR Code'
        }
    ]
    function shareSnap(carousel, index){
        setShareIndex(index)
    }

    return (
        <GestureRecognizer 
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={(state)=>onSwipeRight(state)}
            style={[props.ui.default_styles.viewStyles, props.ui.current_theme, {paddingLeft: 10}]}
        >
            <View style={styles.header}>
                <AppMenu 
                    onSnap={onSnap}
                    itemStyle={{width: 175, fontSize:16, textAlign: 'center', marginLeft:0, paddingTop:2, flexWrap: 'wrap'}}
                    style={{height:52,  position: 'relative', flexDirection: 'row', paddingTop:20}}
                    sliderWidth={props.ui.default_styles.window.width-50}
                    itemWidth={175}
                    index={currentIndex} 
                    items={sorted} 
                    icon_size={15}
                    name={"View"}
                />
            </View>
            <ScrollView style={{padding: 20}}>
                <CompactView ui={props.ui} cocktail={cocktail} stock={props.stock.current} />
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
                    <View>
                        <AppMenu
                            onSnap={shareSnap}
                            itemStyle={{ width: 100, fontSize: 16, textAlign: 'center', marginLeft: 0, paddingTop: 2, flexWrap: 'wrap' }}
                            itemWidth={100}
                            style={{height:50, position: 'relative', flexDirection: 'row', paddingTop: 20, marginLeft: 20}}
                            sliderWidth={props.ui.default_styles.window.width}
                            items={shareItems}
                            name={"Share"}
                            icon_size={15}
                            index={shareIndex}
                        />
                    </View>
                    <ShareContainer index={shareIndex} setShareUri={setShareUri} cocktail={cocktail} ui={props.ui} stock={props.stock} />
                    {/* <ShareCocktail setShareUri={setShareUri} cocktail={cocktail} ui={props.ui} stock={props.stock} /> */}
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

function ShareContainer(props){
    console.log('share container', props.index)
    if(props.index == 0){
        return (
            <ShareCocktail setShareUri={props.setShareUri} cocktail={props.cocktail} ui={props.ui} stock={props.stock} />
        )
    } else {
        return (
            <ShareQR setShareUri={props.setShareUri} cocktail={props.cocktail} ui={props.ui} />
        )
    }
}

function translateCocktail(cocktail){
    var new_cocktail = {}
    var include = [
        'directions',
        'name'
    ]

    for(var prop in cocktail){
        if(prop == 'ingredients'){
            for(var i in cocktail.ingredients){
                new_cocktail[`${i}n`] = cocktail.ingredients[i].ingredient_name
                new_cocktail[`${i}p`] = cocktail.ingredients[i].parts
            }
        } else if (include.includes(prop)) {
            // new_cocktail[prop] = cocktail[prop]
            switch(prop){
                case 'name':
                    new_cocktail['n'] = cocktail[prop]
                    break;
                case 'directions':
                    new_cocktail['d'] = cocktail[prop]
                    break;
            }
        } else {
            console.log('not include?', prop, prop in include)
        }
    }

    console.log('translated', new_cocktail)

    return new_cocktail
}

function ShareQR(props){
    function onCapture(uri){
        props.setShareUri(uri)
    }
    var small_screen = Dimensions.get('window').height < 700
    var fontSize = small_screen ? 14 : 16
    // console.log('window', Dimensions.get('window').height, fontSize)
    var modal_style = small_screen ? styles.small_share_modal : styles.large_share_modal
    const icon_size = 40

    const link = Linking.makeUrl('', translateCocktail(props.cocktail))

    return (
        <ViewShot 
            style = { [{ position: 'relative', backgroundColor: props.ui.current_theme.backgroundColor, margin: 10, padding: 25, borderColor: props.ui.current_theme.color, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }, modal_style]}
            captureMode = "mount"
            onCapture = { onCapture }
        >
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <View style={[{ position: 'absolute', top: 25 }]}>
                <AppText style={[styles.cocktail_title]}>{props.cocktail.name}</AppText>
                <View style={{marginTop: 50, padding: 20}}>
                    <AppText style={{ textAlign: 'center'}}>
                        Scan this code to import {props.cocktail.name} into Crump Cocktails!
                    </AppText>
                </View>
            </View>

            <QRCode
                value={link}
                size={props.ui.default_styles.window.width - 200}
            />
            <View style={{position: 'absolute', bottom: 25, flex:1, flexDirection:'row', alignItems: 'center', left: (props.ui.default_styles.window.width / 2) - 40}} >
                <ShareAttribution share={true} />
            </View>
        </ViewShot>
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

// function CompactView(props){
//     var small_screen = Dimensions.get('window').height < 700
//     var fontSize = small_screen ? 14 : 16
//     // console.log('fjfkdls', props.stock)
//     return (
//         <View style={{ justifyContent: 'flex-start', flex: 1, paddingTop: 5 }}>
//             <View>
//                 <View style={{ justifyContent: 'center' }}>
//                     <AddedIngredientMap compact={true} name_style={{ fontSize: fontSize }} theme={props.ui.current_theme} addedCocktailIngredients={props.cocktail.ingredients} stock={props.stock} />
//                 </View>
//             </View>
//             <View>
//                 <Directions directions={props.cocktail.directions} style={{ fontSize }} />
//             </View>
//             <ShareAttribution share={props.share} />
//         </View>
//     )
// }

// function ShareAttribution(props){
//     if(props.share){
//         return (
//             <View style={{ position: 'absolute', bottom: -15, flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
//                 <View style={{ flex: 1, alignItems: 'center' }}>
//                     <AppText style={{ fontSize: 10, color: 'grey' }}>Crump Cocktails</AppText>
//                 </View>
//             </View>
//         )
//     } else {
//         return null
//     }
// }

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
            <CompactView ui={props.ui} cocktail={props.cocktail} stock={cocktail_stock} share={true} />
        </ViewShot>
    )
}


var icon_distance = 2
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    header: {
        marginTop: 20,
        marginLeft: 10,
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