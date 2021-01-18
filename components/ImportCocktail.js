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
        <View>
            <AppText>Import Cocktail</AppText>
        </View>
    )
}