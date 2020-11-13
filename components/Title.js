import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'
import * as RootNavigation from '../utils/RootNavigation'

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
} // export is at bottom
class Title extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <Pressable onLongPress={()=>RootNavigation.navigate('About')} style={[styles.title, this.props.ui.current_theme]}>
                <AppText>
                    <Text style={styles.text}>
                        Crump Cocktails
                    </Text>
                </AppText>
            </Pressable>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        // borderColor: 'black',
        // borderBottomWidth: 1,
        // borderStyle: 'solid',
        alignSelf: 'center',
        marginTop: 30,
        // marginBottom: 50, // space for menu
    },
    text: {
        fontSize: 35
    }
})

export default connect(mapStateToProps)(Title)