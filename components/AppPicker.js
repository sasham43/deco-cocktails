import React, { useState, useEffect } from 'react'
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
    const [scrolling, setScrolling] = useState(false)
    var snapInterval
    // console.log('defaults', defaults.items)

    function renderItem({item}){
        // console.log('rendering', item.label)
        return (
            <View style={{height: default_height, borderWidth:0, justifyContent: 'center'}} key={item.value}>
                <AppText style={{textAlign: 'center'}}>{item.label}</AppText>
            </View>
        )
    }

    // useEffect(()=>{
    //     if(flatList){
    //         // console.log('fl', flatList.getScrollResponder())
    //     }
    // }, [flatList])

    function onScroll({nativeEvent}){
        // console.log('scrolling', nativeEvent.contentOffset.y)
        // setScrolling(true)
        // console.log('evt', Object.keys(event))
        // console.log('contentOffset.y', nativeEvent.contentOffset.y)
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        // var index = Math.floor(offset / 15)
        // console.log('selected', defaults.items[index]?.label)
        props.setParts(defaults.items[index]?.value)
        // console.log('contentSize', nativeEvent.contentSize.height)
        // console.log('zoomScale', nativeEvent.zoomScale)
        // console.log('layoutMeasurement', nativeEvent.layoutMeasurement.height)
        // console.log('contentInset', nativeEvent.contentInset.bottom, nativeEvent.contentInset.top)
    }

    function onScrollBeginDrag({nativeEvent}){
        console.log('onScrollBeginDrag')
        // setScrolling(true)
    }

    function snapScroll(index){
        // set scroll
        flatList.scrollToIndex({
            index,
            viewPosition: 0.5
        })
        // clearInterval(snapInterval)
        setScrolling(false)
    }

    function onScrollDragEnd({nativeEvent}){
        // console.log('scrollDragEnd', scrolling)
        // if(scrolling) return

        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        props.setParts(defaults.items[index]?.value)

        snapInterval = setTimeout(()=>{
            snapScroll(index)
        })

        // // set scroll
        // flatList.scrollToIndex({
        //     index,
        //     viewPosition: 0.5
        // })
        // setScrolling(false)
    }

    function onMomentumScrollBegin({nativeEvent}){
        console.log('momentumScrollBegin')
        setScrolling(true)
        clearInterval(snapInterval)
    }

    function onScrollMomentumEnd({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        props.setParts(defaults.items[index]?.value)
        console.log('scrollMomentumEnd', offset, offset / default_height)

        // console.log('scrollEnd', index)

        // set scroll
        // snapScroll(index)
        if(scrolling)
        snapInterval = setTimeout(() => {
            snapScroll(index)
        })
        // flatList.scrollToIndex({
        //     index,
        //     viewPosition: 0.5
        // })
        // setScrolling(false)
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
        <View style={[{ height: defaults.height, borderWidth:0, borderColor: props.ui.current_theme.color}]}>
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={12} height={12} />
            <FlatList
                data={defaults.items}
                renderItem={renderItem}
                initialNumToRender={defaults.numToRender}
                onScroll={onScroll}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onScrollMomentumEnd}
                onScrollBeginDrag={onScrollBeginDrag}
                onScrollEndDrag={onScrollDragEnd}
                ListFooterComponent={<PickerFooter/>}
                ListHeaderComponent={<PickerHeader/>}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index)=>`item-${index}`}
                ref={f => setFlatList(f)}
            />
            {/* <AppText>Picker</AppText> */}
            {/* {defaults.items.map(item=>{
                return (
                    <View style={{borderWidth:1, backgroundColor:'red'}}>
                        <AppText style={{color: props.ui.current_theme.color, fontSize: 10}}>{item.label}l</AppText>
                    </View>
                )
            })} */}
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