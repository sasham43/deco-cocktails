import React, { useRef, useEffect, useState } from 'react'
import { View, StyleSheet, Pressable, Animated, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import AppMenu from './AppMenu'

import * as navigation from '../utils/RootNavigation'

const windowWidth = Dimensions.get('window').width

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Menu)

function Menu(props) {
    const [routeName, setRouteName] = useState('')
    const [current, setCurrent] = useState(navigation.navigationRef.current)

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(()=>{
        if(props.isReady)
            for(var i in menuItems){
                if(menuItems[i].link == routeName){
                    setCurrentPage(i)
                }
            }
    }, [routeName])

    useEffect(()=>{
        setCurrent(navigation.navigationRef.current)
        current?.addListener('state', navEvent)
    }, [props.isReady])

    useEffect(()=>{
        if(current){
            current?.addListener('state', navEvent)
        }
    }, [current])

    function navEvent(data){
        setRouteName(current?.getCurrentRoute().name)
    }

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
            name: 'Style',
            link: 'About'
        },
    ]
    function onSnap(carousel, index){
        navigation.navigate(menuItems[index].link, {id:null})
    }
    
    const icon_size = 15

    return (
            <AppMenu
                style={styles.menu}
                index={currentPage}
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingTop: 20,
        height: 50,
        left: 0,
        width: windowWidth,
        borderColor: '#000', borderTopWidth: 0,
    },
    link_container: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
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