import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Pressable, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import InStockIcon from '../assets/in-stock'

const windowWidth = Dimensions.get('window').width

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Menu)

function Menu(props) {
    console.log('props',props.navigation, props.navigation.dangerouslyGetState())
    const state = props.navigation.dangerouslyGetState()
    // var props = data.props // it's nested for some reason, idk
    const navigation = props.navigation
    var currentPage = state.index == 0 ? 'CocktailList' : 'Stock'
    // const route = props.scene.route
    // var currentPage = 'CocktailList'
    
    // var currentPage = route.name

    // fade
    const leftAnim = useRef(new Animated.Value(1)).current;
    const rightAnim = useRef(new Animated.Value(0)).current;
    function handleFade(){
        if (currentPage == 'CocktailList') {
            selectLeft()
            // selectRight()
        } else if (currentPage == 'Stock') {
            selectRight()
            // selectLeft()
        }
    }

    // useEffect(()=>{
        // handleFade()
    // }, [])


    const selectLeft = () => {
        // console.log('selecting left', leftAnim, rightAnim)
        Animated.timing(leftAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()
        Animated.timing(rightAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }
    const selectRight = () => {
        // console.log('selecting right', leftAnim, rightAnim)
        Animated.timing(leftAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start()
        Animated.timing(rightAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start()
    }

    handleFade()

    return (
        <View style={[styles.menu, props.ui.current_theme]}>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('CocktailList')}>
                    <AppText style={styles.link_text}>Cocktails</AppText>
                    <SelectedIcon fadeAnim={leftAnim} theme={props.ui.current_theme} position={'left'} selected={currentPage == 'CocktailList'}></SelectedIcon>
                </Pressable>
            </View>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('Stock')}>
                    <SelectedIcon fadeAnim={rightAnim} theme={props.ui.current_theme} position={'right'} selected={currentPage == 'Stock'}></SelectedIcon>
                    <AppText style={styles.link_text}>Stock</AppText>
                </Pressable>
            </View>
        </View>
    )
}

function SelectedIcon(props){
    // if(props.selected){
        const transform_props = props.position == 'left' ? [{ rotate: '135deg' }] : [{ rotate: '-45deg' }]
        const container_style = props.position == 'left' ? {paddingLeft: 10} : {paddingRight: 10}
        console.log('fadeAnim', props.fadeAnim)
        return (
            <Animated.View style={[container_style, {opacity: props.fadeAnim}]}>
                <InStockIcon transform={transform_props} width={30} height={30} fill={props.theme.color} />
            </Animated.View>
        )
    // } else {
    //     return null
    // }
}

const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingLeft: 50,
        paddingRight: 50,
        height: 50,
        position: 'absolute',
        top: 0,
        width: windowWidth,
    },
    link_container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        // marginRight: 10
    },
    link: {
        flexDirection: 'row',
    },
    link_text: {
        fontSize: 22
    },
    selected: {
        borderBottomWidth: 1,
        borderStyle: 'solid'
    }
})