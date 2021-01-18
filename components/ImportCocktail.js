import React from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import AppButton from './AppButton'
import {CompactView} from './CompactView'

const mapStateToProps = (state) => {
    const { ui, stock } = state
    return { ui, stock }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        // deleteCocktail
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ImportCocktail)

// export default 
function ImportCocktail(props){
    function importCocktail(){
        console.log('import')
    }
    function hideShareModal(){
        props.hide()
    }
    return (
        <View style={{padding: 50, justifyContent: 'center'}}>
            <AppText>Import Cocktail</AppText>
            <AppText>{props.cocktail.name}</AppText>
            <CompactView ui={props.ui} cocktail={props.cocktail} stock={props.stock.current}  />
            <View style={{ flexDirection: 'row' }}>
                <View style={[{ marginRight: 5, flex: 1 }]} >
                    <AppButton press={importCocktail}>
                        Import
                    </AppButton>
                </View>
                <View style={[{ marginLeft: 5, flex: 1 }]} >
                    <AppButton style={[{ marginLeft: 100 }]} press={hideShareModal}>
                        Cancel
                    </AppButton>
                </View>
            </View>
        </View>
    )
}