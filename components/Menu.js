import React, { useRef, useEffect } from 'react'
import { View, StyleSheet, Pressable, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import AppText from './AppText'
import InStockIcon from '../assets/in-stock'
import HeaderIcon from './HeaderIcon'

const windowWidth = Dimensions.get('window').width

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Menu)

function Menu(props) {
    const navigation = useNavigation()
    const state = navigation.dangerouslyGetState()
    // const navigation = navigation
    // const state = props.navigation.dangerouslyGetState()
    // const navigation = props.navigation
    var currentPage = state.routes[state.routes.length-1].name
    console.log('Menu', currentPage)
    var lastPage = state.routes[state.routes.length - 2] ? state.routes[state.routes.length - 2].name : ''
    if(currentPage == 'CocktailList'){
    // if(state.index == 0){
        // currentPage = 'CocktailList'
        var leftAnim = useRef(new Animated.Value(1)).current;
        var rightAnim = useRef(new Animated.Value(0)).current;
    } else if (currentPage == 'Stock'){
    // } else if (state.index == 2){
        // currentPage = 'Stock'
        var leftAnim = useRef(new Animated.Value(0)).current;
        var rightAnim = useRef(new Animated.Value(1)).current;
    } else {
        if(lastPage == 'Stock'){
            var leftAnim = useRef(new Animated.Value(0)).current;
            var rightAnim = useRef(new Animated.Value(1)).current;
        } else if (lastPage == 'CocktailList'){
            var leftAnim = useRef(new Animated.Value(1)).current;
            var rightAnim = useRef(new Animated.Value(0)).current;
        } else {
            // var leftAnim = useRef(new Animated.Value(1)).current;
            // var rightAnim = useRef(new Animated.Value(1)).current;
        }
    }

    function handleFade(){
        if (currentPage == 'CocktailList') {
            fadeLeftIn()
            fadeRightOut()
        } else if (currentPage == 'Stock') {
            fadeRightIn()
            fadeLeftOut()
        } else {
            if(lastPage == 'Stock'){
                fadeRightOut()
            } else if (lastPage == 'CocktailList'){
                fadeLeftOut()
            }
            // fadeLeftOut()
            // fadeRightOut()
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
        console.log('fadeRightin', rightAnim)
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
    // handleFade()
    useEffect(()=>{
        console.log('changing', currentPage, lastPage)
        handleFade()
    }, [currentPage])

    return (
        <View style={[styles.menu, props.ui.current_theme]}>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('CocktailList', {date: new Date().toString()})}>
                    <AppText style={styles.link_text}>Cocktails</AppText>
                    <HeaderIcon direction={'left'} anim={leftAnim} ui={props.ui} />
                    {/* <Animated.View style={[{ paddingLeft: 10 }, { opacity: leftAnim }]}>
                        <InStockIcon transform={[{ rotate: '135deg' }]} width={30} height={30} fill={props.ui.current_theme.color} />
                    </Animated.View> */}
                </Pressable>
            </View>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={() => navigation.navigate('Stock', { date: new Date().toString() })}>
                    <HeaderIcon direction={'right'} anim={rightAnim} ui={props.ui} />
                    {/* <Animated.View style={[{ paddingRight: 10 }, { opacity: rightAnim }]}>
                        <InStockIcon transform={[{ rotate: '-45deg' }]} width={30} height={30} fill={props.ui.current_theme.color} />
                    </Animated.View> */}
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
        // top: 0,
        left: 0,
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