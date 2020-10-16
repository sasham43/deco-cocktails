import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Route, Link, matchPath } from 'react-router-native'
import PropTypes from "prop-types"

import AppText from './AppText'


// export default function Menu(){
//     return (
//         <View style={styles.menu}>
//             {/* <Route path="/:page" render={(routeProps)=>{
//                     // const match = routeProps.match
//                     console.log('menu match', routeProps.location)
//                 }} /> */}
//             <View style={styles.link}>
//                 <Link to="/about">
//                     <AppText>About</AppText>
//                 </Link>
//             </View>
//             <View style={styles.link}>
//                 <Link to="/cocktails">
//                     <AppText>Cocktails</AppText>
//                 </Link>
//             </View>
//             <View style={styles.link}>
//                 <Link to="/stock">
//                     <AppText>Stock</AppText>
//                 </Link>
//             </View>
//         </View>
//     )
// }

// class ShowTheLocation extends React.Component {
//     static propTypes = {
//         match: PropTypes.object.isRequired,
//         location: PropTypes.object.isRequired,
//         history: PropTypes.object.isRequired
//     };

//     render() {
//         const { match, location, history } = this.props;

//         return <AppText>You are now at {location.pathname}</AppText>;
//     }
// }

function ShowTheLocation(props){
    // const propTypes = {
    //     match: PropTypes.object.isRequired,
    //     location: PropTypes.object.isRequired,
    //     history: PropTypes.object.isRequired
    // };

    return props
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
// const ShowTheLocationWithRouter = withRouter(ShowTheLocation)

export default class Menu extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            currentPage: ''
        }
    }


    render(){
        // const match = matchPath('/:page')
        // console.log('match', match)
        // console.log('match ', withRouter(({match})=>{
        //     console.log('insdie match', match)
        // }))
        var currentPage = 'cocktails'
        return (
            <View>
                {/* <ShowTheLocationWithRouter /> */}
                <Route render={(routeProps)=>{
                    // const match = routeProps.match
                    // console.log('menu match', routeProps.match, routeProps.location)
                    var currentPage = ''
                    switch (routeProps.location.pathname){
                        case '/stock':
                            currentPage = 'stock'
                            break;
                        case '/about':
                            currentPage = 'about'
                            break;
                        case '/':
                            currentPage = 'cocktails'
                            break;
                        // default:
                        //     currentPage = 'cocktails'
                    }

                    console.log('current page', currentPage == 'about')

                    // this.setState({
                    //     currentPage
                    // })
                    return (
                        <View style={styles.menu}>
                        <View style={[styles.link, ]}>
                            <Link to="/about">
                                <View style={currentPage == 'about' ? styles.selected : null}>
                                    <AppText>About</AppText>
                                </View>
                            </Link>
                        </View>
                        <View style={styles.link}>
                            <Link to="/">
                                <View style={currentPage == 'cocktails' ? styles.selected : null}>
                                    <AppText>Cocktails</AppText>
                                </View>
                            </Link>
                        </View>
                        <View style={styles.link}>
                            <Link to="/stock">
                                <View style={currentPage == 'stock' ? styles.selected : null}>
                                <AppText>Stock</AppText>
                                </View>
                            </Link>
                        </View>
                        </View>
                    )
                }} />
                {/* <View style={[styles.link, ]}>
                    <Link to="/about">
                        <View style={currentPage == 'cocktails' ? styles.selected : null}>


                            <AppText>About</AppText>
                        </View>
                    </Link>
                </View>
                <View style={styles.link}>
                    <Link to="/">
                        <View style={currentPage == 'cocktails' ? styles.selected : null}>
                            <AppText>Cocktails</AppText>
                        </View>
                    </Link>
                </View>
                <View style={styles.link}>
                    <Link to="/stock">
                        <View style={currentPage == 'stock' ? styles.selected : null}>
                        <AppText>Stock</AppText>
                        </View>
                    </Link>
                </View> */}
            </View>
        )
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