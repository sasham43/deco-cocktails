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
import { updateStock } from '../utils/StockActions'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const titlePadding = 37 + 41 + 20
const footerHeight = 25
const viewHeight = windowHeight - (titlePadding + footerHeight)


const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateStock,
    }, dispatch)
)

const mapStateToProps = (state) => {
    const { stock, ui } = state
    return { stock, ui }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)

function StockBottle(props) {
    var icon_size = 35
    return (
        <View style={styles.stock_bottle}>
            <View style={styles.switch_container}>
                <TouchableOpacity onPress={() => props.updateStock({id: props.bottle.id, label: props.bottle.label, in_stock: !props.bottle.in_stock})}>
                    <InStockIcon transform={[{ rotate: '-45deg' }]} width={icon_size} height={icon_size} fill={props.bottle.in_stock ? props.theme.color : 'grey'} />
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
            <StockBottle theme={props.theme} key={bottle.id} bottle={bottle} updateStock={props.updateStock} />
        )
    })
}

//export default 
function Stock(props){
    const navigation = props.navigation
    const stock = props.stock.current
    const { toggleFunctionMenu, showFunctionMenu, setShowFunctionMenu } = useFunctionMenu()

    return (
        <View style={[styles.stock, props.ui.default_styles.viewStyles, props.ui.current_theme]}>
            <ScrollView style={styles.scroll_view}>
                <StockMap theme={props.ui.current_theme} stock={stock} updateStock={props.updateStock} />
            </ScrollView>            

            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
                setShowFunctionMenu={setShowFunctionMenu}
                theme={props.ui.current_theme}
                border={props.ui.border_color}
            />

            <View style={[props.ui.default_styles.footerStyles, props.ui.current_theme]}>
                <TouchableOpacity style={styles.function_button_container} onPress={() => toggleFunctionMenu()}>
                    <FunctionButtonIcon fill={props.ui.current_theme.color} width={100} height={75} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()

    useEffect(() => {
        if (props.showFunctionMenu) {
            if (panel)
                panel.show(windowHeight / 2)
        } else {
            if (panel)
                panel.hide()
        }
    }, [props.showFunctionMenu])

    function edit(){

    }

    return (
        <SlidingUpPanel draggableRange={{ top: windowHeight - 135, bottom: 0 }} showBackdrop={false} ref={c => setPanel(c)} onBottomReached={() => props.setShowFunctionMenu(false)}>
            <View style={[styles.panel_container, props.theme]}>
                <View style={styles.tab_icon_container}>
                    <TabIcon fill={props.theme.color} height={65} width={65} />
                </View>
                <AddStock theme={props.theme} border={props.border} />
                <View>
                    <AppButton press={edit}>Change Bottles</AppButton>
                </View>
            </View>
        </SlidingUpPanel>
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