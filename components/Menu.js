import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import InStockIcon from '../assets/in-stock'

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Menu)

function Menu(data) {
    var props = data.props // it's nested for some reason, idk
    const navigation = props.navigation
    const route = props.scene.route
    
    var currentPage = route.name

    return (
        <View style={[styles.menu, data.ui.current_theme]}>
            {/* <View style={[styles.link]}>
                <Pressable onPress={()=>navigation.navigate('About')}>
                    <View style={currentPage == 'About' ? [styles.selected, {borderColor: data.ui.current_theme.color}] : null}>
                        <AppText>About</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('CocktailList')}>
                    <View style={currentPage == 'CocktailList' ? [styles.selected, {borderColor: data.ui.current_theme.color}] : null}>
                        <AppText>Cocktails</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('Stock')}>
                    <View style={currentPage == 'Stock' ? [styles.selected, {borderColor: data.ui.current_theme.color}] : null}>
                        <AppText>Stock</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('AddCocktail')}>
                    <View style={currentPage == 'AddCocktail' ? [styles.selected, {borderColor: data.ui.current_theme.color}] : null}>
                        <AppText>Add</AppText>
                    </View>
                </Pressable>
            </View> */}
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('CocktailList')}>
                    <AppText style={styles.link_text}>Cocktails</AppText>
                    <SelectedIcon theme={data.ui.current_theme} position={'left'} selected={currentPage == 'CocktailList'}></SelectedIcon>
                </Pressable>
            </View>
            <View style={styles.link_container}>
                <Pressable style={styles.link} onPress={()=>navigation.navigate('Stock')}>
                    <SelectedIcon theme={data.ui.current_theme} position={'right'} selected={currentPage == 'Stock'}></SelectedIcon>
                    <AppText style={styles.link_text}>Stock</AppText>
                </Pressable>
            </View>
        </View>
    )
}

function SelectedIcon(props){
    console.log('selected?', props)
    if(props.selected){
        const transform_props = props.position == 'left' ? [{ rotate: '135deg' }] : [{ rotate: '-45deg' }]
        const container_style = props.position == 'left' ? {paddingLeft: 10} : {paddingRight: 10}
        return (
            <View style={container_style}>
                <InStockIcon transform={transform_props} width={30} height={30} fill={props.theme.color} />
            </View>
        )
    } else {
        return null
    }
}

const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingLeft: 50,
        paddingRight: 50,
        height: 50
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