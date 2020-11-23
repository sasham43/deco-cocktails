import React, { useEffect } from 'react'
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
import { updateStock, selectStock, deleteStock } from '../utils/StockActions'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateStock,
        selectStock,
        deleteStock
    }, dispatch)
)

const mapStateToProps = (state) => {
    const { stock, ui } = state
    return { stock, ui }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)

function StockBottle(props) {
    var icon_size = 35
    var show_icon = props.currentMode == 'edit' || props.currentMode == 'delete' ? 1 : 0
    return (
        <View style={styles.stock_bottle}>
            <View style={[styles.switch_container, {opacity: show_icon}]}>
                <TouchableOpacity 
                    // onPress={() => props.updateStock({id: props.bottle.id, label: props.bottle.label, in_stock: !props.bottle.in_stock})}
                    onPress={()=>props.selectStock(props.bottle.id)}
                >
                    <InStockIcon 
                        transform={[{ rotate: '-45deg' }]} 
                        width={icon_size} 
                        height={icon_size} 
                        // fill={props.bottle.in_stock ? props.theme.color : 'grey'} 
                        fill={props.bottle.selected ? props.theme.color : 'grey'}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.label_container}>
                <AppText style={styles.label_text}>{props.bottle.label}</AppText>
            </View>
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
                // updateStock={props.updateStock} 
                selectStock={props.selectStock}
                currentMode={props.currentMode} 
            />
        )
    })
}

function Footer(props) {
    if (props.currentMode == 'delete') {
        function remove() {
            // props.deleteCocktails()
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
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>Change A Bottle</AppText>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View>
        )
    } else if (props.currentMode == 'name'){
        return (
            <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
                <AppText style={styles.footer_button_text}>Change A Name</AppText>
                <AppButton press={() => props.switchMode('')}>
                    Cancel
                </AppButton>
            </View>
        )
    }
    // else if (props.currentMode == 'select') {
    //     return (
    //         <View style={[props.ui.default_styles.footerStyles, styles.delete_footer, props.ui.current_theme]}>
    //             <AppText style={styles.footer_button_text}>View A Cocktail</AppText>
    //             <AppButton press={() => props.switchMode('')}>
    //                 Cancel
    //             </AppButton>
    //         </View>
    //     )
    // } 
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

//export default 
function Stock(props){
    const navigation = props.navigation
    const stock = props.stock.current
    const { toggleFunctionMenu, showFunctionMenu, setShowFunctionMenu, currentMode, switchMode } = useFunctionMenu()

    return (
        <View style={[styles.stock, props.ui.default_styles.viewStyles, props.ui.current_theme]}>
            <ScrollView style={styles.scroll_view}>
                {/* <AppText>{currentMode}</AppText> */}
                <StockMap 
                    theme={props.ui.current_theme} 
                    stock={stock} 
                    // updateStock={props.updateStock} 
                    selectStock={props.selectStock}
                    currentMode={currentMode}
                />
            </ScrollView>            

            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                theme={props.ui.current_theme}
                border={props.ui.border_color}
                currentMode={currentMode}
                switchMode={switchMode}
            />

            <Footer
                ui={props.ui}
                // deleteCocktails={props.deleteCocktails}
                deleteStock={props.deleteStock}
                toggleFunctionMenu={toggleFunctionMenu}
                currentMode={currentMode}
                switchMode={switchMode}
            />
            {/* <View style={[props.ui.default_styles.footerStyles, props.ui.current_theme]}>
                <TouchableOpacity style={styles.function_button_container} onPress={() => toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()

    useEffect(() => {
        if (props.showFunctionMenu) {
            if (panel)
                // console.log('windowHeight', windowHeight, windowHeight / 2)
            var height = Math.max((windowHeight / 2), 450)
            panel.show(height)
        } else {
            if (panel)
                panel.hide()
        }
    }, [props.showFunctionMenu])

    // function edit(){
    //     props.switchMode('edit')
    // }
    // function remove(){
    //     props.switchMode('delete')
    // }
    // function name(){
    //     props.switchMode('name')
    // }
    function hidePanel() {
        if (panel) {
            panel.hide()
        }
    }

    return (
        <SlidingUpPanel draggableRange={{ top: windowHeight - 135, bottom: 0 }} showBackdrop={false} ref={c => setPanel(c)} onBottomReached={() => props.setShowFunctionMenu(false)}>
            <View style={[styles.panel_container, props.theme]}>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <AddStock theme={props.theme} border={props.border} />

                <FunctionMenuButton mode={'name'} switchMode={props.switchMode} hidePanel={hidePanel}>Change Name</FunctionMenuButton>
                <FunctionMenuButton mode={'edit'} switchMode={props.switchMode} hidePanel={hidePanel}>Change Bottles</FunctionMenuButton>
                <FunctionMenuButton mode={'delete'} switchMode={props.switchMode} hidePanel={hidePanel}>Remove Bottles</FunctionMenuButton>
            </View>
        </SlidingUpPanel>
    )
}

function FunctionMenuButton(props){
    function changeMode() {
        props.switchMode(props.mode)
        if (props.mode != 'name') {
            props.hidePanel()
        }
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
    // view: {
    //     paddingTop: 10,
    //     paddingLeft: 30,
    //     paddingRight: 10,
    //     height: viewHeight,
    //     marginTop: 50,
    // },
    scroll_view: {
        height: windowHeight - 120,
    },
    stock_bottle: {
        flexDirection: 'row',
        marginBottom: 10
    },  
    label_container: {
        alignSelf: 'center'
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
    // footer: {
    //     width: windowWidth - 40,
    //     marginLeft: 20,
    //     alignContent: 'center',
    //     zIndex: 10,
    //     height: 200,
    //     position: 'absolute',
    //     bottom: -60,
    // },
    panel_container: {
        flex: 1,
        justifyContent: 'flex-start',
        shadowOffset: { width: 0, height: -5, },
        shadowColor: 'rgba(150,150,150,.5)',
        shadowOpacity: 1.0,
        width: windowWidth - 40,
        marginLeft: 20,
        padding: 20
    },
    tab_icon_container: {
        alignItems: 'center',
        marginBottom: -20
    }
})