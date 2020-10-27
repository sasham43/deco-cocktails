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
// import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'
import _ from 'lodash'
import SlidingUpPanel from 'rn-sliding-up-panel'

import AppText from './AppText'
import { PartMap } from './Parts'
import FunctionButtonIcon from '../assets/function-button.svg'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'

import { useCocktails,  useStock, useFunctionMenu } from '../utils/hooks'


const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

// const mapStateToProps = (state) => {
    const mapStateToProps = (state) => {
        console.log('mapping state', state)
        const { cocktails, current } = state
        return { cocktails: cocktails }
    }
    // const { cocktails } = state
    // return  cocktails
// }

export default connect(mapStateToProps)(CocktailList)

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

    function selectCocktail(cocktail, currentMode) {
        console.log('selecting', currentMode, cocktail)

        if (currentMode == 'edit') {
            // move location, pass data in through route params (defined in Route component in Main)
            // history.push(`/add-cocktail/${cocktail.id}`)
            navigation.navigate('AddCocktail', {
                id: cocktail.id
            })
        } else if (currentMode == 'delete') {
            var title = `Remove ${cocktail.name}?`
            var msg = ''
            var buttons = [
                {
                    text: 'Cancel',
                    // onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => deleteCocktail(cocktail.id)
                }
            ]
            Alert.alert(title, msg, buttons)
            // deleteCocktail(cocktail.id)
        }
    }


    console.log('map props', props.currentMode)
    // console.log('disabled', props.currentMode != 'edit' && props.currentMode != 'delete')
    return props.cocktails.map(cocktail =>
        (
            <Pressable disabled={props.currentMode != 'edit' && props.currentMode != 'delete'} onPress={() => selectCocktail(cocktail, props.currentMode)} style={styles.cocktail} key={cocktail.id}>
                <View style={styles.cocktail_name_container}>
                    <AppText>
                        <Text style={styles.cocktail_text}>
                            {cocktail.name}
                        </Text>
                    </AppText>
                </View>
                <PartMap ingredients={sortedIngredients(cocktail.ingredients.filter(i => i.parts != 0))} />
                <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
            </Pressable>
        )
    )
    // return filteredCocktails.map(cocktail =>
    //     (
    //         <Pressable disabled={props.currentMode != 'edit' && props.currentMode != 'delete'} onPress={()=>selectCocktail(cocktail)} style={styles.cocktail} key={cocktail.id}>
    //             <View style={styles.cocktail_name_container}>
    //                 <AppText>
    //                     <Text style={styles.cocktail_text}>
    //                         {cocktail.name}
    //                     </Text>
    //                 </AppText>
    //             </View>
    //             <PartMap ingredients={sortedIngredients(cocktail.ingredients.filter(i => i.parts != 0))} />
    //             <NameMap ingredients={sortedIngredients(cocktail.ingredients)} />
    //         </Pressable>
    //     )
    // )
}


function CocktailList(props){
    const navigation = props.navigation
    // const cocktails = props.cocktails.cocktails
    const cocktails = props.cocktails.current
    // console.log(' cl props', props)
    const { toggleFunctionMenu, showFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const { 
        deleteCocktail, 
        // cocktailSearch, 
        // setCocktailSearch, 
        // filteredCocktails 
    } = useCocktails()
    const [cocktailSearch, setCocktailSearch] = useState('')
    const [filteredCocktails, setFilteredCocktails] = useState([])

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

    // function selectCocktail(cocktail) {
    //     console.log('selecting', currentMode, cocktail)

    //     if(currentMode == 'edit'){
    //         // move location, pass data in through route params (defined in Route component in Main)
    //         // history.push(`/add-cocktail/${cocktail.id}`)
    //         navigation.navigate('AddCocktail', {
    //             id: cocktail.id
    //         })
    //     } else if (currentMode == 'delete'){
    //         var title = `Remove ${cocktail.name}?`
    //         var msg = ''
    //         var buttons = [
    //             {
    //                 text: 'Cancel',
    //                 // onPress: () => console.log('Cancel Pressed'),
    //                 style: 'cancel'
    //             },
    //             { 
    //                 text: 'OK', 
    //                 onPress: () => deleteCocktail(cocktail.id) 
    //             }
    //         ]
    //         Alert.alert(title, msg, buttons)
    //         // deleteCocktail(cocktail.id)
    //     }
    // }

    return (
        <View style={styles.view}>
            <ScrollView style={styles.scroll_view}>
                <CocktailListMap cocktails={filteredCocktails} currentMode={currentMode}></CocktailListMap>
                <View style={{marginTop:10, height: 20}}></View>
            </ScrollView>

            <FunctionMenu 
                showFunctionMenu={showFunctionMenu}
                currentMode={currentMode}
                cocktailSearch={cocktailSearch}
                setCocktailSearch={setCocktailSearch}
                switchMode={switchMode}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.function_button_container} onPress={()=>toggleFunctionMenu()}>
                    <FunctionButtonIcon width={100} height={75} />
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
            // slideUp()
            if(panel)
            panel.show(windowHeight / 2)
        } else {
            // slideDown()
            if(panel)
            panel.hide()
        }
        // panel.show()
    }, [props.showFunctionMenu])
    
    return (
        <SlidingUpPanel showBackdrop={false} ref={c=> setPanel(c)}>
            <View style={ styles.panel_container }>
                <View style={styles.tab_icon_container}>
                    <TabIcon height={65} width={65} />
                </View>
                <View style={[ null, styles.function_menu_button]}>
                    <View style={{ opacity: 'search' == props.currentMode ? 1 : 0 }}>
                        <InStockIcon transform={[{ rotate: '-45deg' }]} width={25} height={25} />
                    </View>
                    <TextInput value={props.cocktailSearch} onChangeText={(text) => props.setCocktailSearch(text)} onFocus={()=>props.switchMode('search')} placeholder="Search cocktails..." clearButtonMode={"always"} style={styles.input} />
                </View>

                <FunctionMenuButton label={"Edit A Cocktail"} mode="edit" switchMode={props.switchMode} currentMode={props.currentMode} />
                <FunctionMenuButton label={"Remove Cocktails"} mode="delete" switchMode={props.switchMode} currentMode={props.currentMode} />
                <Pressable style={[{marginLeft: 25, marginTop: 20}]} onPress={()=>navigation.navigate('AddCocktail')}>
                    <AppText style={styles.action_buttons}>Add A Cocktail</AppText>
                </Pressable>
            </View>
        </SlidingUpPanel>        
    )
}

function FunctionMenuButton(props){
    return (
        // <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
        <Pressable style={styles.function_menu_button} onPress={() => props.switchMode(props.mode)}>
            <View style={{ opacity: props.mode == props.currentMode ? 1 : 0 }}>
                <InStockIcon  transform={[{ rotate: '-45deg' }]} width={25} height={25} />
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
        // marginTop: 60
    },
    cocktail_text: {
        fontSize: 20,
        marginTop: 10
    },
    view: {
        paddingTop: 10,
        paddingLeft: 40,
        paddingRight: 40,
        height: windowHeight - 100,
        backgroundColor: '#fff',
        // width: windowWidth,flex:1
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
        height: windowHeight - 120,
        // paddingTop: 100
        // paddingBottom: 100
        // height: windowHeight - 120
        // height: windowHeight - 200
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
    function_menu: {
        justifyContent: 'space-between',
        height: 200,
        zIndex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        // bottom: 100,
        top: windowHeight - 430, // hacky...
    },
    function_menu_visible: {
        justifyContent: 'space-between',
        // height: 200,
        // top: 400,
        zIndex: 1,
        position: 'absolute',
        backgroundColor: '#fff',
        // bottom: 100,
        top: windowHeight - 600, // hacky...
        height: 1000, transform: [{ translateY: 1000 }] 
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
        // width: windowWidth,
        width: windowWidth - 40,
        marginLeft: 20,
        // width: windowWidth - 120, // because padding
        alignContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 10,
        height: 90,
        position: 'absolute',
        bottom: 10,
        // borderColor: '#000',
        // borderWidth: 2
    },
    panel_container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
        // borderTopWidth: 1,
        backgroundColor: '#fff',
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

// export default CocktailList