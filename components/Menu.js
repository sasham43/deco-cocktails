import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'

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
            <View style={[styles.link]}>
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
    },
    link: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    selected: {
        borderBottomWidth: 1,
        borderStyle: 'solid'
    }
})