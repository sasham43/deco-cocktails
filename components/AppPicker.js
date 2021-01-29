import React, { useState, useEffect } from 'react'
import { View, Animated, FlatList } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(AppPicker)
// export default 
function AppPicker(props){
    // const [flatList, setFlatList] = useState()
    const defaults = {
        height: props.height ? props.height : 45,
        width: props.width ? props.width : 100,
        items: props.items ? props.items : [],
        numToRender: props.numToRender ? props.numToRender : 4
    }
    // console.log('defaults', defaults.items)

    function renderItem({item}){
        // console.log('rendering', item.label)
        return (
            <View style={{height: 15}} key={item.value}>
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
        // console.log('evt', Object.keys(event))
        console.log('contentOffset.y', nativeEvent.contentOffset.y)
        var offset = nativeEvent.contentOffset.y
        var index = Math.floor(offset / 15)
        console.log('selected', defaults.items[index]?.label)
        props.setParts(defaults.items[index]?.value)
        // console.log('contentSize', nativeEvent.contentSize.height)
        // console.log('zoomScale', nativeEvent.zoomScale)
        // console.log('layoutMeasurement', nativeEvent.layoutMeasurement.height)
        // console.log('contentInset', nativeEvent.contentInset.bottom, nativeEvent.contentInset.top)
    }

    function onScrollEnd({nativeEvent}){
        var offset = nativeEvent.contentOffset.y
        var index = Math.floor(offset / 15)
        props.setParts(defaults.items[index]?.value)
    }



    return (
        <View style={[{ height: defaults.height, borderWidth:1, borderColor: props.ui.current_theme.color}]}>
            <FlatList
                data={defaults.items}
                renderItem={renderItem}
                initialNumToRender={defaults.numToRender}
                onScroll={onScroll}
                onScrollEndDrag={onScrollEnd}
                ListFooterComponent={<PickerFooter/>}
                ListHeaderComponent={<PickerFooter/>}
                // ref={f => setFlatList(f)}
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
        <View key={'footer'} style={{height:15}}>

        </View>
    )
}