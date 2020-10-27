import React, { useEffect } from 'react'
import { View, StyleSheet, Switch, Dimensions, TouchableOpacity, Pressable, ScrollView } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import AddStock from './AddStock'
import { useStock, useFunctionMenu } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'
import TabIcon from '../assets/tab'
import FunctionButtonIcon from '../assets/function-button.svg'
import { updateStock } from '../utils/StockActions'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        updateStock,
    }, dispatch)
)

const mapStateToProps = (state) => {
    const { stock } = state
    return { stock }
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock)

function StockBottle(props) {
    return (
        <View style={styles.stock_bottle}>
            <View style={styles.switch_container}>
                <TouchableOpacity onPress={() => props.updateStock({id: props.bottle.id, label: props.bottle.label, in_stock: !props.bottle.in_stock})}>
                    <InStockIcon transform={[{ rotate: '-45deg' }]} width={45} height={45} fill={props.bottle.in_stock ? 'black' : 'grey'} />
                </TouchableOpacity>
                {/* <Switch value={props.bottle.in_stock} trackColor={{false: 'grey', true: 'black'}}  onValueChange={(val)=>setInStock(props.bottle, val)} /> */}
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
            <StockBottle key={bottle.id} bottle={bottle} updateStock={props.updateStock} />
        )
    })
}

//export default 
function Stock(props){
    const navigation = props.navigation
    const stock = props.stock.current
    // console.log('props', props)
    // const { stock, setStock, setInStock } = useStock()
    const { toggleFunctionMenu, showFunctionMenu } = useFunctionMenu()



    return (
        <View style={[styles.stock, styles.view]}>
            {/* <AppText>Stock page yeah yeah</AppText> */}
            <ScrollView style={styles.scroll_view}>
                <StockMap stock={stock} updateStock={props.updateStock} />
            </ScrollView>
            

            <FunctionMenu
                showFunctionMenu={showFunctionMenu}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={styles.function_button_container} onPress={() => toggleFunctionMenu()}>
                    <FunctionButtonIcon width={100} height={75} />
                </TouchableOpacity>
            </View>
            {/* <AddStock /> */}
        </View>
    )
}

function FunctionMenu(props) {
    const { panel, setPanel } = useFunctionMenu()

    useEffect(() => {
        if (props.showFunctionMenu) {
            // slideUp()
            if (panel)
                panel.show(windowHeight / 2)
        } else {
            // slideDown()
            if (panel)
                panel.hide()
        }
        // panel.show()
    }, [props.showFunctionMenu])

    return (
        <SlidingUpPanel showBackdrop={false} ref={c => setPanel(c)}>
            <View style={styles.panel_container}>
                <View style={styles.tab_icon_container}>
                    <TabIcon height={65} width={65} />
                </View>
                <AddStock />
            </View>
        </SlidingUpPanel>
    )
}

const styles = StyleSheet.create({
    stock: {
        // justifyContent: 'flex-start'
        // alignItems: 'center'
        // marginLeft: 20
        paddingLeft: 40
    },
    view: {
        paddingTop: 10,
        paddingLeft: 30,
        paddingRight: 10,
        height: windowHeight - 100,
        backgroundColor: '#fff',
        // justifyContent: 'space-between'
        // width: windowWidth - 100
    },
    scroll_view: {
        height: windowHeight - 120,
    },
    stock_bottle: {
        // flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },  
    label_container: {
        // flex: 6
        alignSelf: 'center'
    },
    switch_container: {
        // flex: 1
        marginRight: 10
    },
    label_text: {
        fontSize: 22,
    },
    link_container: {
        // flexDirection: 'column',
        // justifyContent: 'flex-end',
        alignSelf: 'center',
        // justifySelf: 'center'
    },
    link_text: {
        fontSize: 22,
        // color: 'red',
        textAlign: 'center'
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