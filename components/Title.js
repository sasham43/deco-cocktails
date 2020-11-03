import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import AppText from './AppText'

const mapStateToProps = (state) => {
    // console.log('state', state)
    const { ui } = state
    return { ui }
}
// export default connect(mapStateToProps)(Title)

// export default 
class Title extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <View style={[styles.title, this.props.ui.current_theme]}>
                <AppText>
                    <Text style={styles.text}>
                        Crump Cocktails!
                    </Text>
                </AppText>
                {/* <Text style={styles.text}>Crump Cocktails!</Text> */}
            </View>
        )
    }
}


const styles = StyleSheet.create({
    title: {
        // borderBottom: 'solid 1px black'
        borderColor: 'black',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        alignSelf: 'center',
        marginTop: 30
    },
    text: {
        fontSize: 35
    }
})

export default connect(mapStateToProps)(Title)