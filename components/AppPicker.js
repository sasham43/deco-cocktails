import React, { useState, useEffect } from 'react'
import { View, Animated, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import CornerIcon from '../assets/corner'
import InStockIcon from '../assets/in-stock'

const default_height = 25

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(AppPicker)

function AppPicker(props){
    const [flatList, setFlatList] = useState()
    const defaults = {
        height: props.height ? props.height : (default_height * 3),
        width: props.width ? props.width : 100,
        items: props.items ? props.items : [],
        numToRender: props.numToRender ? props.numToRender : 4
    }
    const [scrolling, setScrolling] = useState(false)
    const [snapID, setSnapID] = useState(null)
    const [selectedValue, setSelectedValue] = useState(null)
    var auto = false

    useEffect(()=>{
        if (props.parts === 0) {
            setSelectedValue(null)
        }

        if(!auto && props.parts != selectedValue){
            for(var i in defaults.items){
                if(defaults.items[i].value == props.parts){
                    var index = i == 0 ? 0 : Number(i)
                    auto = true
                    setTimeout(()=>{
                        snapScroll(index)
                    })
                }
            }
        }
    }, [props.parts])

    useEffect(()=>{
        if(!selectedValue !== null){
            props.setParts(selectedValue)
        }
    }, [selectedValue])

    function renderItem({item}){
        var split = item.label.split(' ')
        return (
            <View style={{height: default_height, borderWidth:0, justifyContent: 'center', flexDirection:'row', alignItems: 'center'}} key={item.value}>
                <AppText style={{textAlign: 'center', color: split[0] == 'parts...' ? 'grey' : props.ui.current_theme.color}}>{split[0]}</AppText>
                {split[1] ? <AppText style={{textAlign: 'center', marginLeft: 4, fontSize: 12}}>{split[1]}</AppText> : null}
            </View>
        )
    }

    function setParts(value){
        if(!auto){
            setSelectedValue(value)
        }
    }

    function onScroll({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        setParts(defaults.items[index]?.value)
    }

    function snapScroll(index){
        if(!flatList) return 

        setTimeout(()=>{
            // set scroll
            flatList.scrollToIndex({
                index,
                viewPosition: 0.5
            })
            setScrolling(false)
        })
    }

    function onScrollDragEnd({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        setParts(defaults.items[index]?.value)

        setSnapID(setTimeout(()=>{
            snapScroll(index)
            if(!scrolling){
                auto = false
            }
        },100))
    }

    function onMomentumScrollBegin({nativeEvent}){
        setScrolling(true)
        clearTimeout(snapID)
    }

    function onScrollMomentumEnd({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = getIndex(offset)
        setParts(defaults.items[index]?.value)

        // set scroll
        if(scrolling)
        setSnapID(setTimeout(() => {
            snapScroll(index)
            if(!scrolling){
                auto = false
            }
        }))
    }

    function getIndex(offset){
        var index = Math.round(offset / default_height)
        if(index < 0){
            return 0
        } else if (index > (props.items.length - 1)){
            return props.items.length - 1
        } else {
            return index
        }
    }



    return (
        <View style={[{ height: defaults.height, borderLeftWidth:0, borderRightWidth:1, borderColor: props.ui.border_color}]}>
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={12} height={12} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={12} height={12} />
            <View style={{position: 'absolute', left:-6, top: (defaults.height / 2) - 6}}>
                <InStockIcon transform={[{ rotate: '-45deg' }]}  fill={props.ui.current_theme.color} width={12} height={12} />
            </View>
            <FlatList
                data={defaults.items}
                renderItem={renderItem}
                initialNumToRender={defaults.numToRender}
                onScroll={onScroll}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onMomentumScrollEnd={onScrollMomentumEnd}
                onScrollEndDrag={onScrollDragEnd}
                ListFooterComponent={<PickerFooter/>}
                ListHeaderComponent={<PickerHeader/>}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index)=>`item-${index}`}
                ref={f => setFlatList(f)}
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