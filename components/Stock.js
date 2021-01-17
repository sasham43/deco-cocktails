import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useNavigation } from '@react-navigation/native'

import AppText from './AppText'
import AppButton from './AppButton'
import AddStock from './AddStock'
import { useStock, useFunctionMenu } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import FunctionButtonIcon from '../assets/function-button.svg'
import { updateStock, selectStock, deleteStock, updateInStock, selectBottlesInStock, unselectAllBottles } from '../utils/StockActions'
import GestureRecognizer from 'react-native-swipe-gestures'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateStock,
        selectStock,
        deleteStock,
        updateInStock,
        selectBottlesInStock,
        unselectAllBottles,
    }, dispatch)
)

const mapStateToProps = (state) => {
    const { stock, ui } = state
    return { stock, ui }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)

function StockToggle(props){
    if(props.currentMode != 'delete' && props.currentMode != 'edit') return null

    return (
        <Pressable
            onPress={() => props.selectStock(props.bottle.id)}
        >
            <InStockIcon
                transform={[{ rotate: '-45deg' }]}
                width={props.icon_size}
                height={props.icon_size}
                fill={props.bottle.selected ? props.theme.color : 'grey'}
            />
        </Pressable>
    )
}

function StockBottle(props) {
    var icon_size = 35
    var show_icon = props.currentMode == 'edit' || props.currentMode == 'delete' ? 1 : 0
    function selectBottle(id, long){
        if(long){
            // console.log('edit id', id)
            props.switchMode('name')
            return props.setEditId(id)
        }

        if(props.currentMode == 'name'){
            props.setEditId(id)
        } else if (props.currentMode == 'edit'){
            props.selectStock(id)
        } else if (props.currentMode == 'delete'){
            props.selectStock(id)
        }
    }
    var text_color
    if(props.currentMode == 'edit'){
        if(props.bottle.selected){
            text_color = props.theme.color
        } else {
            text_color = 'grey'
        }
    } else {
        if(props.bottle.in_stock){
            text_color = props.theme.color
        } else {
            text_color = 'grey'
        }
    }

    return (
        <View style={[styles.stock_bottle]}>
            <View style={[styles.switch_container, {opacity: show_icon}]}>
                <StockToggle 
                    selectStock={props.selectStock}
                    icon_size={icon_size}
                    bottle={props.bottle}
                    theme={props.theme}
                    currentMode={props.currentMode}
                />
            </View>
            <Pressable onLongPress={()=>selectBottle(props.bottle.id, true)} onPress={() => selectBottle(props.bottle.id)} style={[styles.label_container, props.theme, props.editStockId == props.bottle.id ? styles.selected_bottle : null]}>
                <AppText style={[styles.label_text, { color: text_color}]}>{props.bottle.label}</AppText>
            </Pressable>
        </View>
    )
}

function StockMap(props) {
    function sortStock(a,b){
        if(a.label > b.label){
            return 1
        } else if (a.label < b.label){
            return -1
        } else {
            return 0
        }
    }
    return props.stock.sort(sortStock).map(bottle => {
        return (
            <StockBottle 
                theme={props.theme} 
                key={bottle.id} 
                bottle={bottle}  
                selectStock={props.selectStock}
                currentMode={props.currentMode} 
                setEditId={props.setEditId}
                editStockId={props.editStockId}
                switchMode={props.switchMode}
            />
        )
    })
}

function Footer(props) {
    // console.log('footer styles', props.ui.default_styles.footerStyles)
    if (props.currentMode == 'delete') {
        function remove() {
            props.deleteStock()
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
    } else if (props.currentMode == 'edit') {
        function change() {
            props.updateInStock()
            props.switchMode('')
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppButton press={change}>Change Bottles In Stock</AppButton>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View>
        )
    } else if (props.currentMode == 'name'){
        // function cancel(){
        //     props.switchMode('')
        //     props.setEditStockId(null)
        //     // window.setTimeout(()=>{
        //         props.hidePanel()
        //     // })
        // }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>Change Name</AppText>
                <AppButton press={props.cancel}>
                    Cancel
                </AppButton>
            </View>
        )
    }
    else {
        return (
            <View style={[props.ui.default_styles.footerStyles, props.ui.current_theme]}>
                <TouchableOpacity style={styles.function_button_container} onPress={() => props.toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </TouchableOpacity>
            </View>
        )
    }
}

function Stock(props){
    const stock = props.stock.current
    const { toggleFunctionMenu, showFunctionMenu, setShowFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const [editStockId, setEditStockId] = useState()
    const navigation = useNavigation()

    function onSwipeLeft(){
        navigation.navigate('AddCocktail')
    }
    function onSwipeRight(state){
        if(state.x0 < 150){
            return navigation.goBack()
        }
        navigation.navigate('CocktailList')
    }
    function cancel(){
        setEditStockId(null)
        switchMode('')
        setShowFunctionMenu(false)
        // console.log('hide', showFunctionMenu)
    }

    return (
        <GestureRecognizer 
            onSwipeLeft={()=>onSwipeLeft()}
            onSwipeRight={(state)=>onSwipeRight(state)}
            style={[styles.stock, props.ui.default_styles.viewStyles, props.ui.current_theme]}
        >
            <ScrollView style={styles.scroll_view}>
                <StockMap 
                    theme={props.ui.current_theme} 
                    stock={stock} 
                    selectStock={props.selectStock}
                    currentMode={currentMode}
                    setEditId={setEditStockId}
                    editStockId={editStockId}
                    switchMode={switchMode}
                />
                <View style={{ marginTop: 150, height: 20 }}></View>
            </ScrollView>            

            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                ui={props.ui}
                theme={props.ui.current_theme}
                border={props.ui.border_color}
                dark_mode={props.ui.dark_mode}
                currentMode={currentMode}
                switchMode={switchMode}
                editStockId={editStockId}
                setEditId={setEditStockId}
                selectBottlesInStock={props.selectBottlesInStock}
                unselectAllBottles={props.unselectAllBottles}
            />

            <Footer
                ui={props.ui}
                deleteStock={props.deleteStock}
                updateInStock={props.updateInStock}
                toggleFunctionMenu={toggleFunctionMenu}
                currentMode={currentMode}
                switchMode={switchMode}
                setEditStockId={setEditStockId}
                // hidePanel={hidePanel}
                cancel={cancel}
            />
        </GestureRecognizer>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()
    const navigation = useNavigation()
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    useEffect(() => {
        if (props.showFunctionMenu) {
            if (panel) {
                var height = Math.max((windowHeight / 2), 500)
                panel.show(height)
            }
        } else {
            if (panel)
                panel.hide() 
        }
        // console.log('hideinfunctionmenu',props.showFunctionMenu, bottom_height, props.editStockId)
    }, [props.showFunctionMenu])

    function hidePanel() {
        if (panel) {
            panel.hide()
        }
    }
    useEffect(()=>{
        if(!props.showFunctionMenu){
            hidePanel()
        }
    }, [props.editStockId])

    var bottom_height = windowHeight < 700 ? 300 : 350

    function saveBottle(){
        props.setEditId(null)
        props.switchMode('')
        // wait for mode to be switched
        window.setTimeout(()=>{
            hidePanel()
        })
    }

    function onFocus(){
        panel.show()
    }
    function onBottomReached() {
        if (navigation.isFocused())
            props.setShowFunctionMenu(false)
    }

    const border_style = (Platform.OS == 'android' && props.dark_mode) ? { borderColor: props.theme.color, borderWidth: 1 } : null // add a border for Android in dark mode
    var top_height = (windowHeight - 210) > 0 ? windowHeight - 210 : 0

    return (
        <SlidingUpPanel 
            draggableRange={{ top: top_height, bottom: props.editStockId ? bottom_height : 0 }} 
            showBackdrop={false} 
            ref={c => setPanel(c)} 
            onBottomReached={() => onBottomReached()}
            animatedValue={animatedValue}
        >
            <View style={[styles.panel_container, props.theme, border_style]}>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <AddStock 
                    editStockId={props.editStockId} 
                    saveBottle={saveBottle} 
                    theme={props.theme} 
                    border={props.border} 
                    onFocus={onFocus}
                />

                <FunctionMenuButton 
                    mode={'name'} 
                    switchMode={props.switchMode} 
                    hidePanel={hidePanel}
                    disabled={props.currentMode == 'name'}
                >Change Name</FunctionMenuButton>
                <FunctionMenuButton 
                    mode={'edit'} 
                    switchMode={props.switchMode} 
                    hidePanel={hidePanel} 
                    // selectBottlesInStock={props.selectBottlesInStock}
                    preSwitch={props.selectBottlesInStock}
                    disabled={props.currentMode == 'name'}
                >Change Bottles</FunctionMenuButton>
                <FunctionMenuButton 
                    mode={'delete'} 
                    switchMode={props.switchMode} 
                    hidePanel={hidePanel}
                    preSwitch={props.unselectAllBottles}
                    disabled={props.currentMode == 'name'}
                >Remove Bottles</FunctionMenuButton>
            </View>
        </SlidingUpPanel>
    )
}

function FunctionMenuButton(props){
    function changeMode() {
        if(props.mode == 'edit' || props.mode == 'delete'){
            props.preSwitch()
            // props.selectBottlesInStock()
        }
        
        props.switchMode(props.mode)

        props.hidePanel()
    }
    return (
        <View>
            <AppButton disabled={props.disabled} press={changeMode}>{props.children}</AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    stock: {
        // paddingLeft: 40
        paddingLeft: 10
    },
    scroll_view: {
        paddingTop: 15,
        height: windowHeight - 120,
    },
    stock_bottle: {
        flexDirection: 'row',
        marginBottom: 10,
        // borderBottomWidth: 1
    },  
    label_container: {
        alignSelf: 'center',
        flex: 1,
        padding: 10
    },
    switch_container: {
        marginTop: 5,
        marginRight: 10,
        marginLeft: 8
    },
    label_text: {
        fontSize: 22,
    },
    link_container: {
        alignSelf: 'center',
    },
    link_text: {
        fontSize: 22,
        textAlign: 'center'
    },
    function_button_container: {
        alignContent: 'center',
        alignItems: 'center',
        zIndex: 2,
        justifyContent: 'flex-start'
    },
    delete_footer: {
        alignItems: 'flex-start',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flex: 1,
        height: 75
        // paddingBottom: 25
    }, 
    footer_button_text: {
        marginTop: 10,
        fontSize: 22
    }, 
    selected_bottle: {
        borderWidth: 1,
        shadowOffset: { width: -4, height: -4, },
        shadowOpacity: 0.3,
        elevation: 10 // for Android
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
    }
})