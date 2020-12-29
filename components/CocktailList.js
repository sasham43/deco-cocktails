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

import AppText from './AppText'
import AppButton from './AppButton'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import CornerIcon from '../assets/corner'
import { deleteCocktail, selectCocktail, deleteCocktails, unselectAllCocktails } from '../utils/CocktailActions'
import GestureRecognizer from 'react-native-swipe-gestures'
import ViewShot from "react-native-view-shot"

import { useStock, useFunctionMenu } from '../utils/hooks'
import { sortedIngredients } from '../utils/sort'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const screenHeight = Dimensions.get('screen').height

const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)


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
    // var fontSize = props.fontSize ? props.fontSize : null // ??
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

// function sortedIngredients(ingredients) {
//     return _.orderBy(ingredients, 'parts', 'desc')
// }


function CocktailListMap(props) {
    const navigation = useNavigation()
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
    // var nameSize = props.fontSize - 2
    var marginBottom, fontSize, nameSize, shapeSize
    if(props.size == 'extra_small'){
        nameSize = 8
        marginBottom = 2
        fontSize = 10
        shapeSize = 4
    } else if(props.size == 'small'){
        nameSize = 9
        marginBottom = 5
        fontSize = 12
        shapeSize = 5
    } else {
        marginBottom = 30
        fontSize = 20
        nameSize = 14
        shapeSize = 9
    }
    
    // sort cocktails and return a View for each
    return props.cocktails.sort(sortCocktails).map(cocktail =>
        
        (
            <View style={[styles.cocktail_container, {marginBottom: marginBottom}, props.theme, { position: 'relative', overflow: 'visible', shadowColor: props.theme.shadowColor, borderColor: props.theme.borderColor }, pressFlag == cocktail.id ? styles.selected_cocktail : null]} key={cocktail.id}>
                <View style={[{flex: 1, position: 'absolute', left: -40}]}>
                    <CocktailToggle disabled={props.selected >= props.max} cocktail={cocktail} theme={props.theme} selectCocktail={props.selectCocktail} currentMode={props.currentMode} />
                </View>
                <Pressable 
                    onPress={() => selectCocktail(cocktail, props.currentMode)} 
                    style={[styles.cocktail, {flex:8}]} 
                    onLongPress={()=>longPress(cocktail, props.currentMode)}
                    onPressOut={()=>pressOut(cocktail)}
                >
                    <View style={[styles.cocktail_name_container]}>
                        <AppText>
                            <Text style={[styles.cocktail_text, {fontSize: fontSize}, props.theme]}>
                                {cocktail.name}
                            </Text>
                        </AppText>
                    </View>
                    <PartMap height={shapeSize} width={shapeSize} ingredients={sortedIngredients(cocktail.ingredients.filter(filterIngredients))} />
                    <NameMap size={props.size} fontSize={nameSize} theme={props.theme} current_stock={current_stock} ingredients={sortedIngredients(cocktail.ingredients)} />
                </Pressable>
            </View>
        )
    )
}

function CocktailToggle(props){
    // console.log('CocktailToggle', props.disabled)
    var size = 35
    var disabled = props.disabled ? props.disabled : false
    function selectCocktail(id){
        if(!disabled){
            props.selectCocktail(id)
        } else if (props.cocktail.selected && disabled){
            props.selectCocktail(id)
        }
        // console.log('disabled?', disabled, props.cocktail.selected)
    }
    if(props.currentMode == 'delete' || props.currentMode == 'share'){
        return (
            <Pressable onPress={() => selectCocktail(props.cocktail.id)}>
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
    // console.log('props.cocktails', props.cocktails.selected)
    const selectedCocktails = props.cocktails.selected ? props.cocktails.selected : []
    const { 
        currentMode, 
        switchMode 
    } = useFunctionMenu()
    const [cocktailSearch, setCocktailSearch] = useState('')
    const [filteredCocktails, setFilteredCocktails] = useState([])
    // const [selectedCocktailsLength, setSelectedCocktailsLength] = useState([])
    const [shareMax, setShareMax] = useState(0)
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)

    const navigation = useNavigation()

    const [modalVisible, setModalVisible] = useState(false)
    const [shareUri, setShareUri] = useState('')

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
        var screen_size = getScreenSize(props.ui)
        var max = getShareMax(screen_size)
        setShareMax(max)
    }, [selectedCocktails])
    // useEffect(()=>{
    //     setSelectedCocktailsLength(filteredCocktails.filter(f => f.selected).length)
    // }, [])

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
        // setSelectedCocktails(filtered.filter(f=>f.selected))
    }

    function getScreenSize(ui){
        var width = ui.default_styles.window.width
        if(width < 700){
            return 'small'
        } else if (width >= 700 && width < 850){
            return 'medium'
        } else {
            return 'large'
        }
    }
    function getShareMax(screen_size){
        switch(screen_size){
            case 'extra_small':
                return 4
            case 'small':
                return 7
            case 'medium':
                return 10
            case 'large':
                return 15
        }
    }
    function onSwipeLeft(){
        // cabinet
        navigation.navigate('Stock')
    }
    function onSwipeRight(){
        navigation.navigate('CocktailList')
    }
    const gestureConfig = {
        gestureIsClickThreshold: 90
    }
    function showShareModal(){
        setModalVisible(true)
    }
    function hideShareModal(){
        setModalVisible(false)
    }
    function shareMenu(){
            // console.log('share')
        Share.share({
            message: `Menu by Crump Cocktails`,
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
            config={gestureConfig}
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={()=>onSwipeRight()}
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
                selected={selectedCocktails.length}
                max={shareMax}
            />

            <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
            >
                <View style={{ flexDirection: 'column', alignItems: 'center', backgroundColor: props.ui.current_theme.backgroundColor, paddingTop: 30, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, flex: 1 }}>
                    {/* <ShareCocktail setShareUri={setShareUri} cocktail={cocktail} ui={props.ui} stock={props.stock} /> */}
                    <ShareMenu ui={props.ui} setShareUri={setShareUri} cocktails={cocktails} title={props.ui.title} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.share_btn, { marginRight: 5, flex: 1 }]} >
                            <AppButton press={shareMenu}>
                                Share Image
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
    var height = ui.default_styles.window.height
    const style = {}

    var small_font = 14
    var large_font = 20
    var small_margin = 20

    // small, e.g. iPhone 8
    if(width < 700){
        if(length <= 4) {
            style.fontSize = large_font
        } else {
            style.fontSize = small_font
            style.marginBottom = small_margin
            style.size = 'extra_small'
        }
        style.menu_width = 350
    } else if (width > 1000){
        style.fontSize = small_font
        style.menu_width = 700
    } else {
        style.fontSize = small_font
        style.size = 'small'
    }
    
    if(style.fontSize == small_font){
        style.shape_size = 7
    } else {
        style.shape_size = 9
    }
    if(style.size == 'extra_small'){
        style.titleSize = 20
    } else if (style.size == 'small'){
        style.titleSize = 25
    } else {
        style.titleSize = 30
    }
    console.log('style', style)

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
        // console.log('captured menu uri', uri)
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
                <AppText style={{fontSize: share_style.titleSize}}>{props.title}</AppText>
            </View>
            <CocktailListMap size={share_style.size} marginBottom={share_style.marginBottom} fontSize={share_style.fontSize} shapeSize={share_style.shape_size} stock={cocktailStock} theme={props.ui.current_theme} cocktails={filteredCocktails}></CocktailListMap>
        </ViewShot>
    )
}

function Footer(props){
    // console.log('Footer', props.currentMode)
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
                <AppText style={styles.footer_button_text}>Change A Cocktail</AppText>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View> 
        )
    } else if (props.currentMode == 'select'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>View A Cocktail</AppText>
                <AppButton press={()=>props.switchMode('')}>
                    Cancel
                </AppButton>
            </View>
        )
    } else if (props.currentMode == 'share'){
        // console.log('sharefooter')
        function share(){
            props.shareMenu()
            // props.switchMode('')
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppButton press={share}>Share Menu ({props.selected}/{props.max})</AppButton>
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
    
    return (
        <SlidingUpPanel showBackdrop={false} draggableRange={{ top: top_height, bottom: 0}} ref={c=> setPanel(c)} onBottomReached={()=>onBottomReached()}>
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

                <FunctionMenuButton theme={props.theme} label={"View A Cocktail"} mode="select" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Change A Cocktail"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Remove Cocktails"} mode="delete" switchMode={removeMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Add A Cocktail"} mode="add" switchMode={navigateToAdd} currentMode={props.currentMode} />
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
        marginLeft: 5
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