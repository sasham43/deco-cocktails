import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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

    goToAbout = ()=>{
        // console.log('navigate')
        RootNavigation.navigate('About')
    }

    render(){
        return (
            // <View style={styles.title}>

                <Pressable onLongPress={()=>this.goToAbout()} style={[this.props.ui.current_theme, styles.title]}>
                    <AppText style={styles.text}>
                        {/* <Text> */}
                            {this.props.ui.title ? this.props.ui.title : ''}
                        {/* </Text> */}
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
        // alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        // marginBottom: 50, // space for menu
        // minHeight: 100,
        minHeight: 20,
        // backgroundColor: 'red',
        // minWidth: '40%',
        textAlign: 'center',
        // flex: 1,
        // flexDirection: 'row',
        // borderWidth: 1,
        // borderColor: 'black'
    },
    text: {
        fontSize: 35
    }
})

export default connect(mapStateToProps)(Title)