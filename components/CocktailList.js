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
    Keyboard,
    Platform,
    Alert
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
import { deleteCocktail, selectCocktail, deleteCocktails } from '../utils/CocktailActions'

import { useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)
// const viewHeight = 100
// console.log('view height', viewHeight, (titlePadding + footerHeight))


const mapStateToProps = (state) => {
    // console.log('state', state)
    const { cocktails, current, ui, stock } = state
    return { cocktails: cocktails, ui, stock }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        deleteCocktail,
        selectCocktail,
        deleteCocktails,
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(CocktailList)

function Name(props) {
    // const { isInStock } = useStock()

    // console.log('is in stock', isInStock)

    if (props.last) {
        return (
            <AppText style={{ color: props.in_stock ? props.theme.color : 'grey' }}> {props.ingredient_name}</AppText>
        )
    } else {
        return (
            <AppText style={{ color: props.in_stock ? props.theme.color : 'grey' }}> {props.ingredient_name} |</AppText>
        )
    }
}
function NameMap(props) {
    function isInStock(name){
        return props.current_stock.includes(name) 
    }
    return (
        <View style={styles.name_container}>
            {props.ingredients.map((ingredient, i) => (
                <View key={`part-${i}`}>
                    <Name theme={props.theme} in_stock={isInStock(ingredient.ingredient_name)} ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
                </View>
            ))}
        </View>
    )
}

function sortedIngredients(ingredients) {
    return _.orderBy(ingredients, 'parts', 'desc')
}


function CocktailListMap(props) {
    const navigation = useNavigation()
    // console.log('current stock', props.stock)
    const current_stock = props.stock.map(s=>{
        if(s.in_stock){
            return s.label
        }
    }).filter(s=>s) // remove nulls

    function selectCocktail(cocktail, currentMode) {
        console.log('selecting', currentMode, cocktail, props.deleteCocktail)

        if(currentMode == 'select'){
            navigation.navigate('ViewCocktail', {
                id: cocktail.id
            })
        } else if (currentMode == 'edit') {
            navigation.navigate('AddCocktail', {
                id: cocktail.id
            })
        }
    }
    
    return props.cocktails.map(cocktail =>
        (
            <View style={[styles.cocktail_container, {position: 'relative', overflow: 'visible'}]} key={cocktail.id}>
                <View style={[{flex: 1, position: 'absolute', left: -40}]}>
                    <CocktailToggle cocktail={cocktail} theme={props.theme} selectCocktail={props.selectCocktail} currentMode={props.currentMode} />
                </View>
                <Pressable 
                    disabled={props.currentMode != 'edit' && props.currentMode != 'delete' && props.currentMode != 'select'} 
                    onPress={() => selectCocktail(cocktail, props.currentMode)} 
                    style={[styles.cocktail, {flex:8}]} 
                    // key={cocktail.id}
                >
                    <View style={styles.cocktail_name_container}>
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
    var size = 35
    if(props.currentMode == 'delete'){
        return (
            <Pressable onPress={() => props.selectCocktail(props.cocktail.id)}>
                <AppText>{props.cocktail.selected}</AppText>
                <InStockIcon transform={[{ rotate: '-45deg' }]} width={size} height={size} fill={props.cocktail.selected ? props.theme.color : 'grey'} />
            </Pressable>
        )
    } else {
        return null
    }
}

function filterIngredients(i){
   return (i.parts != 0 && i.parts != 'dash' && i.parts != 'float')
}


function CocktailList(props){
    // console.log('list props', props.ui)
    // const navigation = props.navigation
    const cocktails = props.cocktails.current
    const { 
        // toggleFunctionMenu, 
        // showFunctionMenu, 
        currentMode, switchMode } = useFunctionMenu()
    const [cocktailSearch, setCocktailSearch] = useState('')
    const [filteredCocktails, setFilteredCocktails] = useState([])
    const [showFunctionMenu, setShowFunctionMenu] = useState(false)

    function toggleFunctionMenu() {
        setShowFunctionMenu(!showFunctionMenu)
    }

    useEffect(() => {
        filterCocktails()
    }, [cocktailSearch, cocktails])

    function filterCocktails() {
        if (cocktailSearch == '') {
            return setFilteredCocktails([...cocktails])
        }
        var filtered = cocktails.filter(c => {
            var match
            if (c.ingredients && c.ingredients.length > 0) {
                c.ingredients.forEach(i => {
                    if (i.ingredient_name.toLowerCase().includes(cocktailSearch.toLowerCase())) {
                        match = true
                    }
                })
            }
            if (c.name.toLowerCase().includes(cocktailSearch.toLowerCase())) {
                match = true
            }

            return match
        })

        setFilteredCocktails(filtered)
    }

    return (
        <View style={[props.ui.default_styles.viewStyles, props.ui.current_theme]}>
            <ScrollView style={styles.scroll_view}>
                <CocktailListMap stock={props.stock.current} theme={props.ui.current_theme} cocktails={filteredCocktails} deleteCocktail={props.deleteCocktail} selectCocktail={props.selectCocktail} currentMode={currentMode}></CocktailListMap>
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
            />

            <Footer 
                ui={props.ui} 
                deleteCocktails={props.deleteCocktails} 
                toggleFunctionMenu={toggleFunctionMenu} 
                currentMode={currentMode} 
                switchMode={switchMode} 
            />
        </View>
    )
}

function Footer(props){
    if(props.currentMode == 'delete'){
        function remove(){
            props.deleteCocktails()
            props.switchMode('')
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppButton press={remove} theme={props.ui.current_theme} border={props.ui.border_color}>
                    Remove
                </AppButton>
                <AppButton press={() => props.switchMode('')} theme={props.ui.current_theme} border={props.ui.border_color}>
                    Cancel
                </AppButton>
            </View> 
        )
    } else if (props.currentMode == 'edit'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>Change A Cocktail</AppText>
                <AppButton press={() => props.switchMode('')} theme={props.ui.current_theme} border={props.ui.border_color}>
                    Cancel
                </AppButton>
                {/* <Pressable onPress={()=>props.switchMode('')}>
                    <AppText style={styles.footer_button_text}>Change A Cocktail</AppText>
                </Pressable> */}
            </View> 
        )
    } else if (props.currentMode == 'select'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                {/* <Pressable onPress={() => props.switchMode('')}> */}
                <AppText style={styles.footer_button_text}>View A Cocktail</AppText>
                <AppButton press={()=>props.switchMode('')} theme={props.ui.current_theme} border={props.ui.border_color}>
                    Cancel
                </AppButton>
                {/* </Pressable> */}
                {/* <Pressable onPress={() => props.switchMode('')}>
                    <AppText style={styles.footer_button_text}>Cancel</AppText>
                </Pressable> */}
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
    const { panel, setPanel } = useFunctionMenu()
    const navigation = useNavigation()

    useEffect(()=>{
        if (props.showFunctionMenu) {
            if(panel)
                console.log('windowHeight', windowHeight, windowHeight / 2)
                var height = Math.max((windowHeight / 2), 450)
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
    
    return (
        <SlidingUpPanel showBackdrop={false} draggableRange={{ top: windowHeight - 135, bottom: 0}} ref={c=> setPanel(c)} onBottomReached={()=>props.setShowFunctionMenu(false)}>
            <View style={ [styles.panel_container, props.theme] }>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <View style={[ null, styles.function_menu_button]}>
                    <View style={{ opacity: 'search' == props.currentMode ? 1 : 0 }}>
                        <InStockIcon fill={props.theme.color} transform={[{ rotate: '-45deg' }]} width={25} height={25} />
                    </View>
                    <TextInput 
                        value={props.cocktailSearch} 
                        onChangeText={(text) => props.setCocktailSearch(text)} 
                        onFocus={()=>props.switchMode('search')} 
                        placeholder="Search cocktails..." 
                        placeholderTextColor={props.theme.color}
                        clearButtonMode={"always"} 
                        style={[styles.input, props.theme]} 
                    />
                </View>

                <FunctionMenuButton theme={props.theme} label={"Select A Cocktail"} mode="select" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Change A Cocktail"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <FunctionMenuButton theme={props.theme} label={"Remove Cocktails"} mode="delete" switchMode={props.switchMode} currentMode={props.currentMode} hidePanel={hidePanel} />
                <Pressable style={[{marginLeft: 25, marginTop: 20}]} onPress={()=>navigation.navigate('AddCocktail', {id:null})}>
                    <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
                </Pressable>
            </View>
        </SlidingUpPanel>        
    )
}

function FunctionMenuButton(props){
    // console.log('rops', props.theme)

    function changeMode(){
        props.switchMode(props.mode)
        if(props.mode != 'search'){
            props.hidePanel()
        }
    }
    return (
        <Pressable style={styles.function_menu_button} onPress={() => changeMode()}>
            <View style={{ opacity: props.mode == props.currentMode ? 1 : 0 }}>
                <InStockIcon fill={props.theme.color}  transform={[{ rotate: '-45deg' }]} width={25} height={25} />
            </View>
            <AppText style={styles.action_buttons}>{props.label}</AppText>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        borderStyle: 'dashed',
        borderWidth: 1
    },
    cocktail: {
        marginBottom: 60,
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10,
        color: '#fff',
    },
    delete_footer: {
        // paddingTop: 20,

        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        // alignContent: 'center',
        flexDirection: 'row',
        flex: 1,
        // width: windowWidth
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
        paddingLeft: 50,
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
        // color: '#fff'
    },
    function_menu_button: { 
        flexDirection: 'row', 
        // marginLeft: -20,
        alignItems: 'center',
        marginTop: 20
    }, 
    function_button_container: {
        // height: 120,
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        justifyContent: 'flex-start'
    },
    panel_container: {
        flex: 1,
        justifyContent: 'flex-start',
        shadowOffset: { width: 0, height: -5, },
        shadowColor: 'rgba(150,150,150,.5)',
        shadowOpacity: 1.0,
        width: windowWidth - 40,
        marginLeft: 20,
    },
    tab_icon_container: {
        alignItems: 'center',
        marginBottom: -20
    },
    cocktail_container: {
        flexDirection: 'row'
    }
})