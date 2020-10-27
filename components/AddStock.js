import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Switch, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'

import { addStock } from '../utils/StockActions'
import AppText from './AppText'
import { useStock } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addStock,
    }, dispatch)
)

export default connect(null, mapDispatchToProps)(AddStock);

//export default 
function AddStock(props){
    console.log('add stock props', props)

    const { newStockName, setNewStockName, newStockIn, setNewStockIn, addToStock, toggleStockIn } = useStock()
  
    return (
        <KeyboardAvoidingView contentContainerStyle={styles.content_container} behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.view}>
            <View style={styles.stock_form}>
                <View style={styles.switch_container}>
                    <TouchableOpacity onPress={()=>toggleStockIn()}>
                        <InStockIcon transform={[{rotate: '-45deg'}]} width={45} height={45} fill={newStockIn ? 'black' : 'grey'} />
                    </TouchableOpacity>
                    {/* <Switch value={newStockIn} trackColor={{ false: 'grey', true: 'black' }} onValueChange={(val) => setNewStockIn(val)} /> */}
                </View>
                <View style={styles.input_container}>
                    <TextInput style={styles.input} value={newStockName} onChangeText={text => setNewStockName(text)} placeholder="New stock..." />
                </View>
            </View>
            <View style={styles.add_container}>
                <TouchableOpacity onPress={async () => {
                    // addToStock()
                    props.addStock({
                        label: newStockName,
                        in_stock: newStockIn
                    })
                    setNewStockName('')
                }}>
                    <AppText style={styles.link_text}>Add Bottle To Stock</AppText>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({

    view: {
        // paddingTop: 10,
        // paddingLeft: 10,
        // paddingRight: 10,
        // height: windowHeight - 100,
        // backgroundColor: '#fff'
        // flexDirection: 'row',
        // flex: 1,
        // position: 'absolute',
        // left: 20,
        // bottom: 30,
        width: windowWidth - 40,
        // width: windowWidth,
        // alignItems: 'center'
        // alignContent: 'flex-start',
        // alignItems: 'flex-start'
        marginTop: 30,
        paddingRight: 20,
        marginBottom: 20,
    },
    content_container: {
        // marginBottom: 200,
    },
    stock_form: {
        flexDirection: 'row',
        // flexDirection: 'column',
        // alignContent: 'center',
        // justifyContent: 'flex-end'
        // flex: 1
    },  
    text: {
        // fontSize: 50,
        // color: 'red',
        // textAlign: 'center'
    },
    input: {
        fontFamily: 'PoiretOne_400Regular',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 1,
        borderColor: '#eee',
        borderStyle: 'solid',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 22
        // width: windowWidth - 150
    },
    add_container: {
        marginTop: 50
    },  
    link_text: {
        fontSize: 22,
        // color: 'red',
        textAlign: 'center'
    },
    switch_container: {
        alignSelf: 'center'
    },
    input_container: {
        alignSelf: 'center',
        flex: 1,
        marginLeft: 10
        // flexDirection: 'row',
        // flex: 1
    }
})