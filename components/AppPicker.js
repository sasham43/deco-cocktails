import React, { useState, useRef, useEffect } from 'react'
import { View, Animated, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import CornerIcon from '../assets/corner'

const default_height = 25

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(AppPicker)
// export default 
function AppPicker(props){
    const [flatList, setFlatList] = useState()
    const defaults = {
        height: props.height ? props.height : (default_height * 3),
        width: props.width ? props.width : 100,
        items: props.items ? props.items : [],
        numToRender: props.numToRender ? props.numToRender : 4
    }
    // const [scrolling, setScrolling] = useState(false)
    var snapInterval
    const scrollY = useRef(new Animated.Value(0)).current
    // console.log('defaults', defaults.items)
    const interpolators = []

    const [scrollHandler, setScrollHandler] = useState(null)

    useEffect(()=>{
        // console.log('defaults.items.length', defaults.items.length)
        for(var item in defaults.items){
            // console.log('here we go adding stuff')
            interpolators.push(new Animated.Value(1))
        }
        setAnimatedScrollHandler()
    }, [])

    function getAnimatedStyle(animatedValue){
        if(!animatedValue) return
        console.log('getting animated style')
        return {
            transform: [{
                scale: animatedValue.interpolate({
                    inputRange: [0,1],
                    outputRange: [0,1]
                })
            }]
        }
    }

    function renderItem({item, index}){
        // console.log('renderItem', index, interpolators[index])
        // console.log('rendering', item.label)

        const animatedStyle = getAnimatedStyle(interpolators[index])

        return (
            <Animated.View style={[{height: default_height, borderWidth:0, justifyContent: 'center'}, animatedStyle]} key={item.value}>
                {/* <Animated.Text> */}

                    <AppText style={{textAlign: 'center'}}>{item.label}</AppText>
                {/* </Animated.Text> */}
            </Animated.View>
        )
    }

    function setAnimatedScrollHandler(){
        var scrollPos = new Animated.Value(0)
        const argMapping = [{
            nativeEvent: { contentOffset: { y: scrollPos } }
        }]

        // animations
        // return  Animated.event(argMapping, {
        //     listener: scrollEventListener,
        //     useNativeDriver: true
        // })
        setScrollHandler(Animated.event(argMapping, {
            listener: scrollEventListener,
            useNativeDriver: true
        }))
    }

    function onScroll({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        props.setParts(defaults.items[index]?.value)

        // var scrollPos = new Animated.Value(0)
        // const argMapping = [{
        //     nativeEvent: {contentOffset: {y: scrollPos}}
        // }]

        // // animations
        // // return 
        // Animated.event(argMapping, {
        //     listener: scrollEventListener,
        //     useNativeDriver: true
        // })
    }

    function scrollEventListener(event){
        console.log('scrollEventListener', event)
    }

    // function onScrollBeginDrag({nativeEvent}){
    //     console.log('onScrollBeginDrag')
    //     // setScrolling(true)
    // }

    function snapScroll(index){
        flatList.scrollToIndex({
            index,
            viewPosition: 0.5
        })
        // clearInterval(snapInterval)
    }

    function onScrollDragEnd({nativeEvent}){
        // console.log('scrollDragEnd')
        // if(scrolling) return

        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        props.setParts(defaults.items[index]?.value)

        // store interval so we can cancel if it glides
        snapInterval = setTimeout(()=>{
            snapScroll(index)
        })
    }

    function onMomentumScrollBegin({nativeEvent}){
        console.log('momentumScrollBegin')
        clearInterval(snapInterval)
    }

    function onScrollMomentumEnd({nativeEvent}){
        console.log('scrollMomentumEnd')
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        props.setParts(defaults.items[index]?.value)

        // console.log('scrollEnd', index)

        // set scroll
        snapScroll(index)
    }

    function getIndex(offset){
        var index = Math.round(offset / default_height)
        if(index < 0){
            return 0
        } else {
            return index
        }
    }



    return (
        <View style={[{ height: defaults.height, borderWidth:1, borderColor: props.ui.current_theme.color}]}>
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={12} height={12} />
            <Animated.FlatList
                data={defaults.items}
                renderItem={renderItem}
                initialNumToRender={defaults.numToRender}
                // onScroll={onScroll}
                // onScroll={setScrollHandler()}
                onScroll={Animated.event([{
                    nativeEvent: { contentOffset: { y: scrollY } }
                }],{
                    listener: onScroll,
                    // useNativeDriver: true
                    useNativeDriver: false
                })}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onScrollMomentumEnd}
                // onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollDragEnd}
                ListFooterComponent={<PickerFooter/>}
                ListHeaderComponent={<PickerHeader/>}
                showsVerticalScrollIndicator={false}
                ref={f => setFlatList(f)}
                keyExtractor={(item, index)=> `item${index}`}
            />
        </View>
    )
}

function PickerFooter(){
    return (
        <View key={'footer'} style={{height:default_height}}>

        </View>
    )
}

function PickerHeader(){
    return (
        <View key={'header'} style={{height:default_height}}>

        </View>
    )
}

const styles = StyleSheet.create({

    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: default_height, right: 0 },
    top_left: { top: default_height, left: 0, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: default_height, right: 0, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: default_height, left: 0, transform: [{ rotate: '180deg' }] }
})