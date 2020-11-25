import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Switch, Dimensions, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import AppButton from './AppButton'
import AddStock from './AddStock'
import { useStock, useFunctionMenu } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import FunctionButtonIcon from '../assets/function-button.svg'
import { updateStock, selectStock, deleteStock, updateInStock, selectBottlesInStock } from '../utils/StockActions'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateStock,
        selectStock,
        deleteStock,
        updateInStock,
        selectBottlesInStock,
    }, dispatch)
)

const mapStateToProps = (state) => {
    const { stock, ui } = state
    return { stock, ui }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)

function StockBottle(props) {
    // console.log('stock bottle' ,props.editStockId)
    var icon_size = 35
    var show_icon = props.currentMode == 'edit' || props.currentMode == 'delete' ? 1 : 0
    function selectBottle(id){
        if(props.currentMode == 'name'){
            props.setEditId(id)
        }
    }
    return (
        <View style={[styles.stock_bottle]}>
            <View style={[styles.switch_container, {opacity: show_icon}]}>
                <TouchableOpacity 
                    onPress={()=>props.selectStock(props.bottle.id)}
                >
                    <InStockIcon 
                        transform={[{ rotate: '-45deg' }]} 
                        width={icon_size} 
                        height={icon_size} 
                        fill={props.bottle.selected ? props.theme.color : 'grey'}
                    />
                </TouchableOpacity>
            </View>
            <Pressable onPress={() => selectBottle(props.bottle.id)} style={[styles.label_container, props.theme, props.editStockId == props.bottle.id ? styles.selected_bottle : null]}>
                <AppText style={[styles.label_text, { color: props.bottle.in_stock ? props.theme.color : 'grey'}]}>{props.bottle.label}</AppText>
            </Pressable>
        </View>
    )
}

function StockMap(props) {
    return props.stock.map(bottle => {
        return (
            <StockBottle 
                theme={props.theme} 
                key={bottle.id} 
                bottle={bottle}  
                selectStock={props.selectStock}
                currentMode={props.currentMode} 
                setEditId={props.setEditId}
                editStockId={props.editStockId}
            />
        )
    })
}

function Footer(props) {
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
        function cancel(){
            props.switchMode('')
            props.setEditStockId(null)
        }
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>Change A Name</AppText>
                <AppButton press={cancel}>
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
    // const navigation = props.navigation
    const stock = props.stock.current
    const { toggleFunctionMenu, showFunctionMenu, setShowFunctionMenu, currentMode, switchMode } = useFunctionMenu()
    const [editStockId, setEditStockId] = useState()

    return (
        <View style={[styles.stock, props.ui.default_styles.viewStyles, props.ui.current_theme]}>
            <ScrollView style={styles.scroll_view}>
                <StockMap 
                    theme={props.ui.current_theme} 
                    stock={stock} 
                    selectStock={props.selectStock}
                    currentMode={currentMode}
                    setEditId={setEditStockId}
                    editStockId={editStockId}
                />
            </ScrollView>            

            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                theme={props.ui.current_theme}
                border={props.ui.border_color}
                dark_mode={props.ui.dark_mode}
                currentMode={currentMode}
                switchMode={switchMode}
                editStockId={editStockId}
                setEditId={setEditStockId}
                selectBottlesInStock={props.selectBottlesInStock}
            />

            <Footer
                ui={props.ui}
                deleteStock={props.deleteStock}
                updateInStock={props.updateInStock}
                toggleFunctionMenu={toggleFunctionMenu}
                currentMode={currentMode}
                switchMode={switchMode}
                setEditStockId={setEditStockId}
            />
        </View>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()

    // console.log('edit function menu', props)

    useEffect(() => {
        if (props.showFunctionMenu) {
            if (panel)
                // console.log('windowHeight', windowHeight, windowHeight / 2)
            var height = Math.max((windowHeight / 2), 475)
            panel.show(height)
        } else {
            if (panel)
                panel.hide()
        }
    }, [props.showFunctionMenu])

    function hidePanel() {
        if (panel) {
            panel.hide()
        }
    }

    var bottom_height = windowHeight < 700 ? 300 : 350

    function saveBottle(){
        props.setEditId(null)
        hidePanel()
        props.switchMode('')
    }

    const border_style = (Platform.OS == 'android' && props.dark_mode) ? { borderColor: props.theme.color, borderWidth: 1 } : null // add a border for Android in dark mode

    return (
        <SlidingUpPanel draggableRange={{ top: windowHeight - 135, bottom: props.editStockId ? bottom_height : 0 }} showBackdrop={false} ref={c => setPanel(c)} onBottomReached={() => props.setShowFunctionMenu(false)}>
            <View style={[styles.panel_container, props.theme, border_style]}>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <AddStock editStockId={props.editStockId} saveBottle={saveBottle} theme={props.theme} border={props.border} />

                <FunctionMenuButton mode={'name'} switchMode={props.switchMode} hidePanel={hidePanel}>Change Name</FunctionMenuButton>
                <FunctionMenuButton mode={'edit'} switchMode={props.switchMode} hidePanel={hidePanel} selectBottlesInStock={props.selectBottlesInStock}>Change Bottles</FunctionMenuButton>
                <FunctionMenuButton mode={'delete'} switchMode={props.switchMode} hidePanel={hidePanel}>Remove Bottles</FunctionMenuButton>
            </View>
        </SlidingUpPanel>
    )
}

function FunctionMenuButton(props){
    function changeMode() {
        if(props.mode == 'edit'){
            // console.log('selecting')
            props.selectBottlesInStock()
        }
        
        props.switchMode(props.mode)

        // if (props.mode != 'name') {
            props.hidePanel()
        // }
    }

    return (
        <View>
            <AppButton press={changeMode}>{props.children}</AppButton>
        </View>
    )
}

const styles = StyleSheet.create({
    stock: {
        paddingLeft: 40
    },
    scroll_view: {
        paddingTop: 15,
        height: windowHeight - 120,
    },
    stock_bottle: {
        flexDirection: 'row',
        marginBottom: 10
    },  
    label_container: {
        alignSelf: 'center',
        flex: 1,
        padding: 10
    },
    switch_container: {
        marginRight: 10
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
        // shadowOffset: { width: 0, height: -5, },
        // shadowColor: 'rgba(150,150,150,.5)',
        shadowColor: 'rgba(150,150,150,.1)',
        shadowOpacity: .4,
        // shadowOpacity: 1.0,
        width: windowWidth - 40,
        marginLeft: 20,
        padding: 20,
        elevation: 10 // for Android
    },
    tab_icon_container: {
        alignItems: 'center',
        marginBottom: -20
    }
})