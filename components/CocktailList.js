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
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import { deleteCocktail } from '../utils/CocktailActions'

import { useCocktails,  useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)
// const viewHeight = 100
// console.log('view height', viewHeight, (titlePadding + footerHeight))


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
export default connect(mapStateToProps, mapDispatchToProps)(CocktailList)

function Name(props) {
    const { isInStock } = useStock()
    if (props.last) {
        return (
            <AppText style={{ color: isInStock(props.ingredient_name) ? 'black' : 'grey' }}> {props.ingredient_name}</AppText>
        )
    } else {
        return (
            <AppText style={{ color: isInStock(props.ingredient_name) ? 'black' : 'grey' }}> {props.ingredient_name} |</AppText>
        )
    }
}
function NameMap(props) {
    return (
        <View style={styles.name_container}>
            {props.ingredients.map((ingredient, i) => (
                <View key={`part-${i}`}>
                    <Name ingredient_name={ingredient.ingredient_name} last={(i + 1 == props.ingredients.length)} />
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

    // console.log('props map', props)

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
        } else if (currentMode == 'delete') {
            var title = `Remove ${cocktail.name}?`
            var msg = ''
            var buttons = [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => props.deleteCocktail(cocktail.id)
                }
            ]
            Alert.alert(title, msg, buttons)
        }
    }
    
    return props.cocktails.map(cocktail =>
        (
            <Pressable disabled={props.currentMode != 'edit' && props.currentMode != 'delete' && props.currentMode != 'select'} onPress={() => selectCocktail(cocktail, props.currentMode)} style={styles.cocktail} key={cocktail.id}>
                <View style={styles.cocktail_name_container}>
                    <AppText>
                        <Text style={[styles.cocktail_text, props.theme]}>
                            {cocktail.name}
                        </Text>
                    </AppText>
                </View>
                <PartMap ingredients={sortedIngredients(cocktail.ingredients.filter(filterIngredients))} />
                <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
            </Pressable>
        )
    )
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
        <View style={[styles.view, props.ui.current_theme]}>
            <ScrollView style={styles.scroll_view}>
                <CocktailListMap theme={props.ui.current_theme} cocktails={filteredCocktails} deleteCocktail={props.deleteCocktail} currentMode={currentMode}></CocktailListMap>
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

            <View style={[styles.footer, props.ui.current_theme]}>
                <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()
    const navigation = useNavigation()

    useEffect(()=>{
        if (props.showFunctionMenu) {
            if(panel)
                panel.show(windowHeight / 2)
        } else {
            if(panel)
               panel.hide()
        }
    }, [props.showFunctionMenu])
    
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

                <FunctionMenuButton theme={props.theme} label={"Select A Cocktail"} mode="select" switchMode={props.switchMode} currentMode={props.currentMode} />
                <FunctionMenuButton theme={props.theme} label={"Edit A Cocktail"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} />
                <FunctionMenuButton theme={props.theme} label={"Remove Cocktails"} mode="delete" switchMode={props.switchMode} currentMode={props.currentMode} />
                <Pressable style={[{marginLeft: 25, marginTop: 20}]} onPress={()=>navigation.navigate('AddCocktail')}>
                    <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
                </Pressable>
            </View>
        </SlidingUpPanel>        
    )
}

function FunctionMenuButton(props){
    // console.log('rops', props.theme)
    return (
        <Pressable style={styles.function_menu_button} onPress={() => props.switchMode(props.mode)}>
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
    view: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40,
        height: viewHeight,
        marginTop: 50, // account for menu
    },
    cocktail_name_container: {
        // flex: 1
    },
    name_container: {
        marginTop: 10,
        flexDirection: 'row',
        flexWrap: "wrap"
    },
    scroll_view: {
        marginBottom: 25
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
    footer: {
        width: windowWidth - 40,
        marginLeft: 20,
        alignContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 10,
        height: 200,
        position: 'absolute',
        bottom: -60,
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
    }
})