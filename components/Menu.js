import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

import AppText from './AppText'
import AppMenu from './AppMenu'
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

    const [currentPage, setCurrentPage] = useState(0)
    // var currentPage

    useEffect(()=>{
        console.log('state.index', props.route, navigation.isFocused())
        // if(navigation.isFocused()){
            console.log('props.route', props.route.name)
            for(var i in menuItems){
                if(menuItems[i].link == props.route.name){
                    console.log('i', i)
                    setCurrentPage(i)
                }
            }
        // }
        // console.log('currentPage', props.routes[props.routes.length-1].name)

        // if(carousel)
        // carousel.snapToItem(state.index)
    }, [props.route.name])

    // console.log()

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
            name: 'Create',
            link: 'AddCocktail'
        },
        {
            name: 'View',
            link: 'ViewCocktail'
        },
        {
            name: 'About',
            link: 'About'
        },
    ]

    // function pressItem(carousel, props){
    //     // console.log('press', props)
    //     carousel.snapToItem(props.index)
    // }
    function onSnap(carousel, index){
        // console.log('on snap', data)
        navigation.navigate(menuItems[index].link, {id:null})
    }

    // const carouse
    // const [carousel, setCarousel] = useState(null)
    // const icon_size = 90

    // function renderMenuItem(props){

    //     return (
    //         // <AppButton press={()=>pressItem(props)}>
    //         //     {props.item.name}
    //         // </AppButton>
    //         <Pressable onPress={()=>pressItem(props)} style={{justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
    //             <AppText style={{fontSize: 20}}>{props.item.name}</AppText>
    //         </Pressable>
    //     )
    // }
    const icon_size = 15

    return (
            <AppMenu
                style={styles.menu}
                index={currentPage}
                // index={state.index}
                items={menuItems}
                sliderWidth={props.ui.default_styles.window.width - 20}
                itemWidth={100}
                onSnap={onSnap}
                icon_size={icon_size}
                name={"Menu"}
            />
    )
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
        paddingTop: 20,
        // marginTop:10,
        // paddingLeft: 10,
        // marginLeft: 10,
        // paddingTop: 10,
        height: 50,
        // height: 45,
        // height: 100,
        position: 'absolute',
        // top: 0,
        left: 0,
        width: windowWidth,
        borderColor: '#000', borderTopWidth: 0,
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