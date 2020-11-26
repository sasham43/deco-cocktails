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
    const state = props.navigation.dangerouslyGetState()
    const navigation = props.navigation
    var currentPage
    if(state.index == 0){
        currentPage = 'CocktailList'
        var leftAnim = useRef(new Animated.Value(1)).current;
        var rightAnim = useRef(new Animated.Value(0)).current;
    } else if (state.index == 2){
        currentPage = 'Stock'
        var leftAnim = useRef(new Animated.Value(0)).current;
        var rightAnim = useRef(new Animated.Value(1)).current;
    } else {
        var leftAnim = useRef(new Animated.Value(1)).current;
        var rightAnim = useRef(new Animated.Value(1)).current;
    }

    function handleFade(){
        if (currentPage == 'CocktailList') {
            fadeLeftIn()
            fadeRightOut()
        } else if (currentPage == 'Stock') {
            fadeRightIn()
            fadeLeftOut()
        } else {
            fadeLeftOut()
            fadeRightOut()
        }
    }
        
    const fadeTime = 1000
    const fadeLeftIn = () => {
        Animated.timing(leftAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightIn = () => {
        Animated.timing(rightAnim, {
            toValue: 1,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeLeftOut = () => {
        Animated.timing(leftAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    const fadeRightOut = () => {
        Animated.timing(rightAnim, {
            toValue: 0,
            duration: fadeTime,
            useNativeDriver: true,
        }).start()
    }
    handleFade()

    return (
        <View style={[styles.menu, props.ui.current_theme]}>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('CocktailList', {date: new Date().toString()})}>
                    <AppText style={styles.link_text}>Cocktails</AppText>
                    <Animated.View style={[{ paddingLeft: 10 }, { opacity: leftAnim }]}>
                        <InStockIcon transform={[{ rotate: '135deg' }]} width={30} height={30} fill={props.ui.current_theme.color} />
                    </Animated.View>
                </Pressable>
            </View>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('Stock')}>
                    <Animated.View style={[{ paddingRight: 10 }, { opacity: rightAnim }]}>
                        <InStockIcon transform={[{ rotate: '-45deg' }]} width={30} height={30} fill={props.ui.current_theme.color} />
                    </Animated.View>
                    <AppText style={styles.link_text}>Cabinet</AppText>
                </Pressable>
            </View>
        </View>
    )
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