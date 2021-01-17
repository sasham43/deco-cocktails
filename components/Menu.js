import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

import AppText from './AppText'
import InStockIcon from '../assets/in-stock'
// import MenuSelectIcon from '../assets/menu-select'
import CornerIcon from '../assets/corner'
// import HeaderIcon from './HeaderIcon'

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

    const menuItems = [
        {
            name: 'Cocktails',
            link: 'CocktailList'
        },
        {
            name: 'Cabinet',
            link: 'Stock'
        },
        {
            name: 'Add',
            link: 'AddCocktail'
        },
    ]

    function pressItem(props){
        console.log('press', props)
        carousel.snapToItem(props.index)
    }
    function onSnap(index){
        // console.log('on snap', data)
        navigation.navigate(menuItems[index].link)
    }

    // const carouse
    const [carousel, setCarousel] = useState(null)
    // const icon_size = 90

    function renderMenuItem(props){

        return (
            // <AppButton press={()=>pressItem(props)}>
            //     {props.item.name}
            // </AppButton>
            <Pressable onPress={()=>pressItem(props)} style={{justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <AppText style={{fontSize: 20}}>{props.item.name}</AppText>
            </Pressable>
        )
    }
    const icon_size = 15
    return (
        <View style={[styles.menu, {borderColor: '#000', borderWidth:0}, props.ui.current_theme]}>
            <Carousel
                data={menuItems}
                renderItem={renderMenuItem}
                itemWidth={100}
                itemHeight={icon_size + 20}
                sliderWidth={props.ui.default_styles.window.width}
                sliderHeight={icon_size + 20}
                ref={c => setCarousel(c)}
                onSnapToItem={onSnap}
            />
            <View style={{position: 'absolute', marginTop: 10, borderColor: props.ui.border_color,borderWidth:1, width:100, height: 40, top: 10, left: (props.ui.default_styles.window.width / 2)-50}}>
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
                <View style={{alignSelf: 'center', marginTop: -10}}>
                    <InStockIcon transform={[{ rotate: '45deg' }]} fill={props.ui.current_theme.color} height={20} width={20} />
                </View>
                {/* <MenuSelectIcon fill={props.ui.current_theme.color} height={icon_size} width={icon_size} transform={[{scaleX:1.2}]} /> */}
            </View>
        </View>
    )





    // return (
    //     <View style={[styles.menu, props.ui.current_theme]}>
    //         <View style={styles.link_container}>
    //             <Pressable style={styles.link} onPress={()=>navigation.navigate('CocktailList', {date: new Date().toString()})}>
    //                 <AppText style={styles.link_text}>Cocktails</AppText>
    //                 <HeaderIcon direction={'left'} anim={leftAnim} ui={props.ui} />
    //             </Pressable>
    //         </View>
    //         <View style={styles.link_container}>
    //             <Pressable style={styles.link} onPress={() => navigation.navigate('Stock', { date: new Date().toString() })}>
    //                 <HeaderIcon direction={'right'} anim={rightAnim} ui={props.ui} />
    //                 <AppText style={styles.link_text}>Cabinet</AppText>
    //             </Pressable>
    //         </View>
    //     </View>
    // )
}

const icon_distance = -1
const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        // paddingLeft: 50,
        // paddingRight: 50,
        paddingTop: 30,
        // height: 50,
        height: 100,
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
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] }
})