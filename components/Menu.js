import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
// import { Route, Link, matchPath } from 'react-router-native'
// import PropTypes from "prop-types"
import { useNavigation } from '@react-navigation/native'

import AppText from './AppText'

export default function Menu(data) {
    var props = data.props // it's nested for some reason, idk
    // console.log('menu props', props)
    const navigation = props.navigation
    const route = props.scene.route
    // const navigation = useNavigation()
    
    var currentPage = route.name
    // console.log('scrren', currentPage) // this doesn't quite work, styles aren't updating

    return (
        <View style={styles.menu}>
            <View style={[styles.link,]}>
                <Pressable onPress={()=>navigation.navigate('About')}>
                    <View style={currentPage == 'About' ? styles.selected : null}>
                        <AppText>About</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('CocktailList')}>
                    <View style={currentPage == 'CocktailList' ? styles.selected : null}>
                        <AppText>Cocktails</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('Stock')}>
                    <View style={currentPage == 'Stock' ? styles.selected : null}>
                        <AppText>Stock</AppText>
                    </View>
                </Pressable>
            </View>
            <View style={styles.link}>
                <Pressable onPress={() => navigation.navigate('AddCocktail')}>
                    <View style={currentPage == 'AddCocktail' ? styles.selected : null}>
                        <AppText>Add</AppText>
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

// export default class Menu extends React.Component {

//     constructor(props){
//         super(props)

//         this.state = {
//             currentPage: ''
//         }
//     }


//     render(){

//         var currentPage = 'cocktails'
//         return (<LilMenu />)
//     //     return (
//     //         <View>
//     //             <Route render={(routeProps)=>{
//     //                 var currentPage = ''
//     //                 switch (routeProps.location.pathname){
//     //                     case '/stock':
//     //                         currentPage = 'stock'
//     //                         break;
//     //                     case '/about':
//     //                         currentPage = 'about'
//     //                         break;
//     //                     case '/add-cocktail':
//     //                         currentPage = 'add-cocktail'
//     //                         break;
//     //                     case '/':
//     //                         currentPage = 'cocktails'
//     //                         break;
//     //                     // default:
//     //                     //     currentPage = 'cocktails'
//     //                 }

//     //                 return (
//     //                     <View style={styles.menu}>
//     //                         <View style={[styles.link, ]}>
//     //                             <Link to="/about">
//     //                                 <View style={currentPage == 'about' ? styles.selected : null}>
//     //                                     <AppText>About</AppText>
//     //                                 </View>
//     //                             </Link>
//     //                         </View>
//     //                         <View style={styles.link}>
//     //                             <Link to="/">
//     //                                 <View style={currentPage == 'cocktails' ? styles.selected : null}>
//     //                                     <AppText>Cocktails</AppText>
//     //                                 </View>
//     //                             </Link>
//     //                         </View>
//     //                         <View style={styles.link}>
//     //                             <Link to="/stock">
//     //                                 <View style={currentPage == 'stock' ? styles.selected : null}>
//     //                                     <AppText>Stock</AppText>
//     //                                 </View>
//     //                             </Link>
//     //                         </View>
//     //                         <View style={styles.link}>
//     //                             <Link to="/add-cocktail">
//     //                                 <View style={currentPage == 'add-cocktail' ? styles.selected : null}>
//     //                                     <AppText>Add</AppText>
//     //                                 </View>
//     //                             </Link>
//     //                         </View>
//     //                     </View>
//     //                 )
//     //             }} />
//     //         </View>
//     //     )
//     }
// }


const styles = StyleSheet.create({
    menu: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'flex-start',
        paddingLeft: 50,
        paddingRight: 50,
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