import React, { useState, useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { View, StyleSheet, Text, Switch, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import { generate } from 'shortid'

import { addStock, updateStock } from '../utils/StockActions'
import AppText from './AppText'
import AppButton from './AppButton'
import { useStock } from '../utils/hooks'
import InStockIcon from '../assets/in-stock'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const mapStateToProps = (state) => {
    const { stock, ui } = state
    return { stock, ui }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        addStock,
        updateStock,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(AddStock)

//export default 
function AddStock(props){
    const [newStockName, setNewStockName] = useState('')
    const [newStockIn, setNewStockIn] = useState(true)
    // console.log('add stock props', props)
    function toggleStockIn() {
        setNewStockIn(!newStockIn)
    }

    async function addBottle() {
        // addToStock()
        if(props.editStockId){
            props.updateStock({
                id: props.editStockId,
                label: newStockName,
                in_stock: newStockIn
            })
            props.saveBottle()
        } else {
            props.addStock({
                id: generate(),
                label: newStockName,
                in_stock: newStockIn
            })
        }
        setNewStockName('')
    }

    useEffect(()=>{
        if(props.editStockId){
            // console.log('edit id', props.editStockId)
            const edit_bottle = props.stock.current.find(s=>s.id == props.editStockId)
            setNewStockName(edit_bottle.label)
        } else {
            setNewStockName('')
        }
    }, [props.editStockId])
  
    return (
        <KeyboardAvoidingView contentContainerStyle={[styles.content_container, props.theme]} behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.view}>
            <View style={[styles.stock_form, props.theme]}>
                <View style={styles.switch_container}>
                    <TouchableOpacity onPress={()=>toggleStockIn()}>
                        <InStockIcon transform={[{rotate: '-45deg'}]} width={35} height={35} fill={newStockIn ? props.theme.color : 'grey'} />
                    </TouchableOpacity>
                </View>
                <View style={styles.input_container}>
                    <TextInput 
                        style={[styles.input, props.theme]} 
                        value={newStockName} 
                        onChangeText={text => setNewStockName(text)} 
                        placeholder="New bottle..." 
                        placeholderTextColor={"grey"}
                        onFocus={()=>props.onFocus()}
                    />
                </View>
            </View>
            <View style={styles.add_container}>
                <SaveButton editStockId={props.editStockId} press={addBottle} />
            </View>
        </KeyboardAvoidingView>
    )
}

function SaveButton(props){
    if(props.editStockId){
        return (
            <AppButton press={props.press}>
                Save Bottle To Cabinet
            </AppButton>
        )
    } else {
        return (
            <AppButton press={props.press}>
                Add Bottle To Cabinet
            </AppButton>
        )
    }
}

const styles = StyleSheet.create({

    view: {
        marginTop: 30,
        // paddingRight: 20,
        marginBottom: 20,
    },
    content_container: {
        // marginBottom: 200,
    },
    stock_form: {
        flexDirection: 'row',
        borderWidth: 1,
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
        borderStyle: 'solid',
        flexDirection: 'row',
        alignSelf: 'stretch',
        fontSize: 22
    },
    add_container: {
        // marginTop: 50,
        // paddingLeft: 20
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