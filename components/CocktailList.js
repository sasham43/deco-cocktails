import React, { useEffect, useState, useRef } from 'react'
import { 
    ScrollView, 
    View, 
    Text, 
    StyleSheet, 
    Dimensions, 
    TouchableOpacity, 
    TextInput, 
    Animated, 
    Pressable, 
    KeyboardAvoidingView,
    Share,
    Platform,
    Modal
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash'
import SlidingUpPanel from 'rn-sliding-up-panel'
import GestureRecognizer from 'react-native-swipe-gestures'
import ViewShot from "react-native-view-shot"

import AppText from './AppText'
import AppButton from './AppButton'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import CornerIcon from '../assets/corner'
import { deleteCocktail, selectCocktail, deleteCocktails, unselectAllCocktails } from '../utils/CocktailActions'
import { setShareMenuMax } from '../utils/UIActions'
import PhotoScan from './PhotoScan'

import { useStock, useFunctionMenu } from '../utils/hooks'
import { sortedIngredients } from '../utils/sort'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

// const screenHeight = Dimensions.get('screen').height

const titlePadding = 37 + 41 + 20
const footerHeight = 25
// const viewHeight = windowHeight - (titlePadding + footerHeight)


const mapStateToProps = (state) => {
    const { cocktails, ui, stock } = state
    return { cocktails: cocktails, ui, stock }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteCocktail,
        selectCocktail,
        deleteCocktails,
        unselectAllCocktails,
        setShareMenuMax
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(CocktailList)

function Name(props) {
    if (props.last) {
        return (
            <View style={styles.name}>
                <AppText style={{ fontSize: props.fontSize, color: props.in_stock ? props.theme.color : 'grey' }}> {props.ingredient_name}</AppText><AppText> </AppText>
            </View>
        )
    } else {
        return (
            <View style={styles.name}>
                <AppText style={{ fontSize: props.fontSize, color: props.in_stock ? props.theme.color : 'grey' }}> {props.ingredient_name}</AppText><AppText> |</AppText>
            </View>
        )
    }
}
function NameMap(props) {
    function isInStock(name){
        return props.current_stock.includes(name.trim()) 
    }
    
    return (
        <View style={[styles.name_container, props.size == 'small' ? {marginTop: 6} : null]}>
            {props.ingredients.map((ingredient, i) => (
                <View key={`part-${i}`}>
                    <Name fontSize={props.fontSize} theme={props.theme} in_stock={isInStock(ingredient.ingredient_name)} ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                </View>
            ))}
        </View>
    )
}


function CocktailListMap(props) {
    const navigation = useNavigation()
    const [maxHeight, setMaxHeight] = useState(0)
    const [marginBottom, setMarginBottom] = useState(35)

    useEffect(()=>{
        if(props.share == true){
            // console.log('setting margin bottom')
            setMarginBottom(10)
        }
    }, [])
    useEffect(()=>{
        if(props.setShareMenuMax){
            props.setShareMenuMax(Math.floor((props.ui.default_styles.window.height - 117) / (maxHeight+10)))
        }
    }, [maxHeight])

    const current_stock = props.stock.map(s=>{
        if(s.in_stock){
            return s.label
        }
    }).filter(s=>s) // remove nulls

    function selectCocktail(cocktail, currentMode) {
        if(currentMode == 'select'){
            navigation.navigate('ViewCocktail', {
                id: cocktail.id
            })
        } else if (currentMode == 'edit') {
            navigation.navigate('AddCocktail', {
                id: cocktail.id
            })
        } else if (currentMode == 'delete'){
            props.selectCocktail(cocktail.id)
        } else if (currentMode == 'share'){
            if(props.selected < props.max){
                props.selectCocktail(cocktail.id)
            } else if (props.selected >= props.max && cocktail.selected){
                props.selectCocktail(cocktail.id)
            }
        }
    }

    const [pressFlag, setPressFlag] = useState(null)
    function longPress(cocktail, currentMode){
        if(currentMode == '' || currentMode == 'select'){
            setPressFlag(cocktail.id)
        }

    }
    function pressOut(cocktail){
        if(pressFlag){
            navigation.navigate('ViewCocktail', {
                id: cocktail.id
            })
            setPressFlag(null) // might not be necessary if navigating
        }
    }

    function sortCocktails(a,b){
        if(a.name > b.name){
            return 1
        } else if (a.name < b.name){
            return -1
        } else {
            return 0
        }
    }
    
    function layout(evt, cocktail){
        if (evt.nativeEvent.layout.height > maxHeight) {
            setMaxHeight(evt.nativeEvent.layout.height)
        }
    }
    
    // sort cocktails and return a View for each
    return props.cocktails.sort(sortCocktails).map(cocktail =>
        
        (
        <View 
            onLayout={(evt) => layout(evt, cocktail)} 
            style={[styles.cocktail_container, { marginBottom: marginBottom, marginTop: 10 }, props.theme, { position: 'relative', overflow: 'visible', shadowColor: props.theme.shadowColor, borderColor: props.theme.backgroundColor }, pressFlag == cocktail.id ? styles.selected_cocktail : null, pressFlag == cocktail.id ? { borderColor: props.theme.borderColor } : null]} 
            key={cocktail.id}
        >
                <View style={[{flex: 1, position: 'absolute', left: -40}]}>
                    <CocktailToggle cocktail={cocktail} theme={props.theme} selectCocktail={selectCocktail} currentMode={props.currentMode} />
                </View>
                <Pressable 
                    onPress={() => selectCocktail(cocktail, props.currentMode)} 
                    style={[styles.cocktail, {flex:8}]} 
                    onLongPress={()=>longPress(cocktail, props.currentMode)}
                    onPressOut={()=>pressOut(cocktail)}
                >
                    <View style={[styles.cocktail_name_container]}>
                        <AppText>
                            <Text style={[styles.cocktail_text, props.theme]}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap ingredients={sortedIngredients(cocktail.ingredients.filter(filterIngredients))} />
                    <NameMap theme={props.theme} current_stock={current_stock} ingredients={sortedIngredients(cocktail.ingredients)} />
                </Pressable>
            </View>
        )
    )
}

function CocktailToggle(props){
    // console.log('CocktailToggle', props.disabled)
    var size = 35

    if(props.currentMode == 'delete' || props.currentMode == 'share'){
        return (
            <Pressable onPress={() => props.selectCocktail(props.cocktail, props.currentMode)}>
                <AppText>{props.cocktail.selected}</AppText>
                <InStockIcon transform={[{ rotate: '-45deg' }]} width={size} height={size} fill={props.cocktail.selected ? props.theme.color : 'grey'} />
            </Pressable>
        )
    } else {
        return null
    }
}

function filterIngredients(i){
   return (i.parts != 0 && i.parts != 'dash' && i.parts != 'float' && i.parts != 'rinse')
}


function CocktailList(props){
    const cocktails = props.cocktails.current
    const selectedCocktails = props.cocktails.selected ? props.cocktails.selected : []
    const { 
        currentMode, 
        switchMode 
    } = useFunctionMenu()
    const [cocktailSearch, setCocktailSearch] = useState('')
    const [filteredCocktails, setFilteredCocktails] = useState([])
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)

    const navigation = useNavigation()

    const [shareModalVisible, setShareModalVisible] = useState(false)
    const [scanModalVisible, setScanModalVisible] = useState(false)
    const [shareUri, setShareUri] = useState('')

    const shareMax = props.ui.share.menu_max

    function toggleFunctionMenu() {
        setShowFunctionMenu(!showFunctionMenu)
    }

    useEffect(() => {
        filterCocktails()
    }, [cocktailSearch, cocktails])
    useEffect(()=>{
        filterCocktails()
    }, [props.route.params])

    useEffect(()=>{
        if(currentMode == 'scan'){
            showScanModal()
        }
    }, [currentMode])
  
    function filterCocktails() {
        if (cocktailSearch == '') {
            return setFilteredCocktails([...cocktails])
        }
        var filtered = cocktails.filter(c => {
            var match
            if (c.ingredients && c.ingredients.length > 0) {
                c.ingredients.forEach(i => {
                    if (i.ingredient_name.toLowerCase().includes(cocktailSearch.toLowerCase().trim())) {
                        match = true
                    }
                })
            }
            // console.log('c',c)
            if (c.name && c.name.toLowerCase().includes(cocktailSearch.toLowerCase().trim())) {
                match = true
            }

            return match
        })

        setFilteredCocktails(filtered)
    }

    function onSwipeLeft(){
        if(shareModalVisible || scanModalVisible) return // don't change pages while modals are up
        
        // cabinet
        navigation.navigate('Stock')
    }
    function onSwipeRight(state){
        if(shareModalVisible || scanModalVisible) return // don't change pages while modals are up
        
        if(state.x0 < 150){
            return navigation.goBack()
        }
        navigation.navigate('CocktailList')
    }
    const gestureConfig = {
        gestureIsClickThreshold: 90
    }
    function showShareModal(){
        setShareModalVisible(true)
    }
    function hideShareModal(){
        // console.log('hideShareModal')
        setShareModalVisible(false)
    }
    function showScanModal(){
        setScanModalVisible(true)
    }
    function hideScanModal(){
        // console.log('hideScanModal')
        setScanModalVisible(false)
        switchMode('')
    }
    function shareMenu(){
            // console.log('share')
        // var title = props.ui.title == 'Crump Cocktails' ? 'Menu by Crump Cocktails' : 
        var title
        switch(props.ui.title){
            case 'Crump Cocktails':
            case '':
                title = 'Menu by Crump Cocktails'
                break
            default:
                title = `${props.ui.title} by Crump Cocktails`
        }
        Share.share({
            message: title,
            url: shareUri
        })
        .then((res) => {
            hideShareModal()
        })
        .catch((err) => {
            hideShareModal()
        })
    }

    return (
        <GestureRecognizer
            config={gestureConfig}
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={(state)=>onSwipeRight(state)}
            style={[props.ui.default_styles.viewStyles, props.ui.current_theme]}
        > 
            <ScrollView style={[styles.scroll_view, currentMode == 'delete' || currentMode == 'share' ? {paddingLeft: 50}:null]}>
                <CocktailListMap 
                    fontSize={styles.cocktail_text.fontSize} 
                    stock={props.stock.current} 
                    theme={props.ui.current_theme} 
                    cocktails={filteredCocktails} 
                    deleteCocktail={props.deleteCocktail} 
                    selectCocktail={props.selectCocktail} 
                    currentMode={currentMode}
                    max={shareMax}
                    selected={selectedCocktails.length}
                    ui={props.ui}
                    setShareMenuMax={props.setShareMenuMax}
                ></CocktailListMap>
                <View style={{marginTop:50, height: 20}}></View>
            </ScrollView>

            <FunctionMenu 
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                currentMode={currentMode}
                cocktailSearch={cocktailSearch}
                setCocktailSearch={setCocktailSearch}
                switchMode={switchMode}
                theme={props.ui.current_theme}
                dark_mode={props.ui.dark_mode}
                unselectAllCocktails={props.unselectAllCocktails}
            />

            <Footer 
                ui={props.ui} 
                deleteCocktails={props.deleteCocktails} 
                toggleFunctionMenu={toggleFunctionMenu} 
                currentMode={currentMode} 
                switchMode={switchMode} 
                shareMenu={showShareModal}
                selected={selectedCocktails}
                max={shareMax}
            />

            <View>
                <Modal
                    animationType="slide"
                    visible={scanModalVisible}
                >
                    <PhotoScan hideModal={hideScanModal} handleUrl={props.handleUrl} ui={props.ui} />
                </Modal>
            </View>

            <Modal
                animationType="slide"
                visible={shareModalVisible}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: props.ui.current_theme.backgroundColor, paddingTop: 30, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, flex: 1 }}>
                    <ShareMenu ui={props.ui} setShareUri={setShareUri} cocktails={cocktails} title={props.ui.title} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.share_btn, { marginRight: 5, flex: 1 }]} >
                            <AppButton press={shareMenu}>
                                Share
                            </AppButton>
                        </View>
                        <View style={[styles.share_btn, { marginLeft: 5, flex: 1 }]} >
                            <AppButton style={[styles.share_btn, { marginLeft: 100 }]} press={hideShareModal}>
                                Cancel
                            </AppButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </GestureRecognizer>
    )
}

function getShareStyle(ui, length){
    var width = ui.default_styles.window.width
    const style = {}


    // small, e.g. iPhone 8
    if(width < 700){
        style.menu_width = 350
    } else if (width > 1000){
        style.menu_width = 700
    }

    return style
}

function ShareMenu(props){
    var filteredCocktails = props.cocktails.filter(c=>c.selected)
    var cocktailStock = []
    filteredCocktails.forEach(c=>{
        c.ingredients.forEach(i=>{
            var present = cocktailStock.find(cs=>cs.label == i.ingredient_name)
            if(!present){
                cocktailStock.push({
                    label: i.ingredient_name,
                    in_stock: true
                })
            }
        })
    })
    function onCapture(uri){
        props.setShareUri(uri)
    }
    var icon_size = 50 // generate this below?
    const share_style = getShareStyle(props.ui, filteredCocktails.length)
    return (
        <ViewShot
            style={[{ backgroundColor: props.ui.current_theme.backgroundColor, margin: 10, padding: 25, borderColor: props.ui.current_theme.color, borderWidth: 1, flex: 1, width: share_style.menu_width }]}
            captureMode="mount"
            onCapture={onCapture}
        >
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                <TitleText title={props.title} theme={props.ui.current_theme} />
            </View>
            <View style={{justifyContent: 'space-around', flexDirection: 'column', flex:1}}>
                <CocktailListMap share={true} stock={cocktailStock} theme={props.ui.current_theme} cocktails={filteredCocktails}></CocktailListMap>

                <View style={{ position: 'absolute', bottom: -15, flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <AppText style={{ fontSize: 10, color: 'grey' }}>Crump Cocktails</AppText>
                    </View>
                </View>
            </View>
        </ViewShot>
    )
}
function TitleText(props) {
    if (props.title == '') {
        return (
            <View style={{ height: 50, marginTop: -10 }}>
                <TabIcon fill={props.theme.color} height={65} width={65} />
            </View>
        )
    } else {
        return (
            <AppText style={[{fontSize: 30, textAlign: 'center'}]}>
                {props.title ? props.title : ''}
            </AppText>
        )
    }
}

function Footer(props){
    if(props.currentMode == 'delete'){
        function remove(){
            props.deleteCocktails()
            props.switchMode('')
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppButton press={remove}>
                    Remove
                </AppButton>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View> 
        )
    } else if (props.currentMode == 'edit'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>
                    Change Cocktail
                </AppText>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View> 
        )
    } else if (props.currentMode == 'select'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>
                    View Cocktail
                </AppText>
                <AppButton press={()=>props.switchMode('')}>
                    Cancel
                </AppButton>
            </View>
        )
    } else if (props.currentMode == 'share'){
        function share(){
            props.shareMenu()
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppButton disabled={props.selected == 0} press={share}>Share Menu ({props.selected.length}/{props.max})</AppButton>
                <AppButton press={()=>props.switchMode('')}>Cancel</AppButton>
            </View>
        )
    } else {
        return (
            <View style={[props.ui.default_styles.footerStyles, props.ui.current_theme]}>
                <TouchableOpacity style={styles.function_button_container} onPress={() => props.toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </TouchableOpacity>
            </View>
        )
    }
}

function FunctionMenu(props) {
    const [searchFocus, setSearchFocus] = useState(false)
    const { panel, setPanel } = useFunctionMenu()
    const navigation = useNavigation()
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    useEffect(()=>{
        if (props.showFunctionMenu) {
            if(panel)
                var height = Math.max((windowHeight / 2), 470)
                panel.show(height)
        } else {
            if(panel)
               panel.hide()
        }
    }, [props.showFunctionMenu])

    function hidePanel(){
        if(panel){
            panel.hide()
        }
    }

    function navigateToAdd(){
        navigation.navigate('AddCocktail', { id: null })
        hidePanel()
    }

    function removeMode(){
        props.unselectAllCocktails()
        props.switchMode('delete')
    }
    function shareMode(){
        props.unselectAllCocktails()
        props.switchMode('share')
    }
    function onBottomReached(){
        if(navigation.isFocused())
            props.setShowFunctionMenu(false)
    }

    const border_style = (Platform.OS == 'android' && props.dark_mode) ? { borderColor: props.theme.color, borderWidth: 1 } : null // add a border for Android in dark mode

    
    var top_height = (windowHeight - 210) > 0 ? windowHeight - 210 : 0
    if(windowHeight < 700){
        top_height = 510
    }
    
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
                <View style={[ null, styles.function_menu_button]}>
                    <View style={{ opacity: searchFocus ? 1 : 0 }}>
                        <InStockIcon fill={props.theme.color} transform={[{ rotate: '-45deg' }]} width={25} height={25} />
                    </View>
                    <TextInput 
                        value={props.cocktailSearch} 
                        onChangeText={(text) => props.setCocktailSearch(text)} 
                        onFocus={()=>setSearchFocus(true)}
                        onBlur={()=>setSearchFocus(false)} 
                        placeholder="Search cocktails..." 
                        placeholderTextColor={"grey"}
                        clearButtonMode={"always"} 
                        style={[styles.input, props.theme]} 
                    />
                </View>

                <FunctionMenuButton theme={props.theme} label={"View"} mode="select" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Change"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Remove"} mode="delete" switchMode={removeMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Scan"} mode="scan" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Share Menu"} mode="share" switchMode={shareMode} currentMode={props.currentMode} hidePanel={hidePanel} />
            </View>
        </SlidingUpPanel>        
    )
}

function FunctionMenuButton(props){
    function changeMode(){
        if(props.mode == 'add'){
            props.switchMode()
        } else {
            props.switchMode(props.mode)
            if(props.mode != 'search'){
                props.hidePanel()
            }
        }
    }
    return (
        <AppButton press={changeMode}>{props.label}</AppButton>
    )
}
const icon_distance = 10
const styles = StyleSheet.create({
    list: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    cocktail: {
        // marginBottom: 60,
        // borderWidth: 1
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10,
        color: '#fff',
    },
    delete_footer: {
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        height: 75
    },  
    footer_button_text: {
        marginTop: 10,
        fontSize: 22
    },  
    name_container: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    scroll_view: {
        marginBottom: 25,
        // paddingLeft: 50,
        paddingLeft: 15,
        paddingRight: 10,
    },
    action_buttons: {
        fontSize: 22,
        marginLeft: 10
    },
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderStyle: 'solid',
        fontSize: 18,
        width: windowWidth - 125,
        marginLeft: 10,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    function_menu_button: { 
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    }, 
    function_button_container: {
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        justifyContent: 'flex-start'
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
    tab_icon_container: {
        alignItems: 'center',
        marginBottom: -20
    },
    cocktail_container: {
        flexDirection: 'row',
        padding: 10,
        marginBottom: 35,
        marginLeft: 5,
        borderWidth: 1
    },
    selected_cocktail: {
        shadowOffset: { width: -4, height: -4, },
        shadowOpacity: 0.3,
        elevation: 10, // for Android,
        borderWidth: 1,
    },
    name: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] },
})