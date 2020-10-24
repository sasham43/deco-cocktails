import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
// import { Route, Link, matchPath } from 'react-router-native'
// import PropTypes from "prop-types"
import { useNavigation } from '@react-navigation/native'

import AppText from './AppText'

function LilMenu(routeProps) {
    const navigation = useNavigation()
    var currentPage = ''
    // switch (routeProps.location.pathname) {
    //     case '/stock':
    //         currentPage = 'stock'
    //         break;
    //     case '/about':
    //         currentPage = 'about'
    //         break;
    //     case '/add-cocktail':
    //         currentPage = 'add-cocktail'
    //         break;
    //     case '/':
    //         currentPage = 'cocktails'
    //         break;
    //     // default:
    //     //     currentPage = 'cocktails'
    // }

    return (
        <View style={styles.menu}>
            <View style={[styles.link,]}>
                <Pressable onPress={()=>navigation.navigate('About')}>
                    <View style={currentPage == 'about' ? styles.selected : null}>
                        <AppText>About</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('CocktailList')}>
                    <View style={currentPage == 'cocktails' ? styles.selected : null}>
                        <AppText>Cocktails</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable to="/stock">
                    <View style={currentPage == 'stock' ? styles.selected : null}>
                        <AppText>Stock</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable to="/add-cocktail">
                    <View style={currentPage == 'add-cocktail' ? styles.selected : null}>
                        <AppText>Add</AppText>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default class Menu extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            currentPage: ''
        }
    }


    render(){

        var currentPage = 'cocktails'
        return (<LilMenu />)
    //     return (
    //         <View>
    //             <Route render={(routeProps)=>{
    //                 var currentPage = ''
    //                 switch (routeProps.location.pathname){
    //                     case '/stock':
    //                         currentPage = 'stock'
    //                         break;
    //                     case '/about':
    //                         currentPage = 'about'
    //                         break;
    //                     case '/add-cocktail':
    //                         currentPage = 'add-cocktail'
    //                         break;
    //                     case '/':
    //                         currentPage = 'cocktails'
    //                         break;
    //                     // default:
    //                     //     currentPage = 'cocktails'
    //                 }

    //                 return (
    //                     <View style={styles.menu}>
    //                         <View style={[styles.link, ]}>
    //                             <Link to="/about">
    //                                 <View style={currentPage == 'about' ? styles.selected : null}>
    //                                     <AppText>About</AppText>
    //                                 </View>
    //                             </Link>
    //                         </View>
    //                         <View style={styles.link}>
    //                             <Link to="/">
    //                                 <View style={currentPage == 'cocktails' ? styles.selected : null}>
    //                                     <AppText>Cocktails</AppText>
    //                                 </View>
    //                             </Link>
    //                         </View>
    //                         <View style={styles.link}>
    //                             <Link to="/stock">
    //                                 <View style={currentPage == 'stock' ? styles.selected : null}>
    //                                     <AppText>Stock</AppText>
    //                                 </View>
    //                             </Link>
    //                         </View>
    //                         <View style={styles.link}>
    //                             <Link to="/add-cocktail">
    //                                 <View style={currentPage == 'add-cocktail' ? styles.selected : null}>
    //                                     <AppText>Add</AppText>
    //                                 </View>
    //                             </Link>
    //                         </View>
    //                     </View>
    //                 )
    //             }} />
    //         </View>
    //     )
    }
}


const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
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
        borderColor: 'black',
        borderStyle: 'solid'
    }
})