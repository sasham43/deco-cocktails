import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'

import AppText from './AppText'

const mapStateToProps = (state) => {
    // console.log('state', state)
    const { ui } = state
    return { ui }
}
export default connect(mapStateToProps)(Menu)
// export default 
function Menu(data) {
    var props = data.props // it's nested for some reason, idk
    // console.log('menu props', data.ui)
    const navigation = props.navigation
    const route = props.scene.route
    // const navigation = useNavigation()
    
    var currentPage = route.name
    // console.log('scrren', currentPage) // this doesn't quite work, styles aren't updating

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
        // backgroundColor: '#000',
        // color: '#fff',
        // height: 1
    },
    link: {
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
    },
    selected: {
        borderBottomWidth: 1,
        // borderColor: '#fff',
        // borderColor: 'black',
        borderStyle: 'solid'
    }
})