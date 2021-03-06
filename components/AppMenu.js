import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'
import Carousel from 'react-native-snap-carousel'

import AppText from './AppText'
import InStockIcon from '../assets/in-stock'
import CornerIcon from '../assets/corner'

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(AppMenu)


function AppMenu(props){
    const [carousel, setCarousel] = useState(null)
    const itemStyle = props.itemStyle ? props.itemStyle : {}

    useEffect(() => {
        if (carousel){
            window.setTimeout(()=>{
                carousel.snapToItem(props.index, props.name == "View" ? false : true)
            },100)
        }
    }, [props.index])

    function pressItem(props) {
        carousel.snapToItem(props.index)
    }
    

    function renderMenuItem(props) {
        const fontSize = props.item.name.length < 25 ? 20 : 16
        return (
            <Pressable onPress={() => pressItem(props)} style={[{ justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }, itemStyle]}>
                <AppText style={[{ fontSize: 20, flexShrink:1 }, itemStyle, {fontSize}]}>{props.item.name}</AppText>
            </Pressable>
        )
    }

    function onSnap(index){
        props.onSnap(carousel, index)
    }

    return (
        <View style={[props.style, props.ui.current_theme]}>
            <Carousel
                data={props.items}
                renderItem={renderMenuItem}
                itemWidth={props.itemWidth}
                itemHeight={props.icon_size + 20}
                sliderWidth={props.sliderWidth}
                sliderHeight={props.icon_size + 20}
                ref={c => setCarousel(c)}
                onSnapToItem={index=> onSnap(index)}
                containerCustomStyle={{ zIndex: 10, marginRight: 20, marginLeft: 20 }}
                contentContainerCustomStyle={{marginLeft:-10}}
                inactiveSlideScale={0.7}
                initialNumToRender={props.items.length}
            />
            <View style={{
                position: 'absolute',
                borderLeftWidth: 0,
                borderRightWidth: 0,
                marginTop: 10,
                borderColor: props.ui.border_color,
                borderWidth: 1,
                marginLeft: 10,
                width: props.sliderWidth,
                height: props.style.height-10,
                top: 0,
                zIndex: -1,
            }}>
                <View style={{ position: 'absolute', width: props.itemWidth+5, height: props.style.height-12, alignSelf: 'center' }}>
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={props.icon_size} height={props.icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={props.icon_size} height={props.icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={props.icon_size} height={props.icon_size} />
                    <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={props.icon_size} height={props.icon_size} />
                </View>
                <View style={{ alignSelf: 'center', marginTop: -10, backgroundColor: props.ui.current_theme.backgroundColor }}>
                    <InStockIcon transform={[{ rotate: '45deg' }]} fill={props.ui.current_theme.color} height={20} width={20} />
                </View>
            </View>
        </View>
    )
}

const icon_distance = -1
const styles = StyleSheet.create({
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] }
})