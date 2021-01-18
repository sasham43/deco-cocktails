import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'

const mapStateToProps = (state) => {
    const { ui } = state
    return { ui }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        // deleteCocktail
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ImportCocktail)

// export default 
function ImportCocktail(props){
    return (
        <View style={{padding: 50, justifyContent: 'center'}}>
            <AppText>Import Cocktail</AppText>
            <AppText>{props.cocktail.name}</AppText>
        </View>
    )
}