import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { generate } from 'shortid'

import AppText from './AppText'
import AppButton from './AppButton'
import {CompactView} from './CompactView'
import CornerIcon from '../assets/corner'
import {translateForImport} from '../utils/translate'

import { addCocktail } from '../utils/CocktailActions'

const mapStateToProps = (state) => {
    const { ui, stock } = state
    return { ui, stock }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        // deleteCocktail
        addCocktail
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(ImportCocktail)

// export default 
function ImportCocktail(props){
    const [cocktail, setCocktail] = useState(translateForImport(props.cocktail))

    var small_screen = Dimensions.get('window').height < 700
    var modal_style = small_screen ? styles.small_share_modal : styles.large_share_modal
    function importCocktail(){
        console.log('import')
        props.hide()
        props.addCocktail(cocktail)
    }
    const icon_size = 40
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: props.ui.current_theme.backgroundColor, paddingTop: 30, paddingLeft: 15, paddingRight: 15, paddingBottom: 15, flex: 1 }}>
            {/* <AppText>Import Cocktail</AppText>
            <AppText>{props.cocktail.name}</AppText> */}
            <View style={[{ backgroundColor: props.ui.current_theme.backgroundColor, margin: 10, padding: 25, borderColor: props.ui.current_theme.color, borderWidth: 1 }, modal_style]}>
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
                <View>
                    <AppText style={styles.cocktail_title}>{cocktail.name}</AppText>
                </View>
                <CompactView ui={props.ui} cocktail={cocktail} stock={props.stock.current}  />
            </View>


            <View style={{ flexDirection: 'row' }}>
                <View style={[{ marginRight: 5, flex: 1 }]} >
                    <AppButton press={importCocktail}>
                        Import
                    </AppButton>
                </View>
                <View style={[{ marginLeft: 5, flex: 1 }]} >
                    <AppButton style={[{ marginLeft: 100 }]} press={props.hide}>
                        Cancel
                    </AppButton>
                </View>
            </View>
        </View>
    )
}
const icon_distance = 2
const styles = StyleSheet.create({
    small_share_modal: {
        height: 550,
        width: 350
    },
    large_share_modal: {
        height: 600,
        width: 350
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] },

    cocktail_title: {
        // alignItems: 'center',
        textAlign: 'center',
        fontSize: 22,
        // flex: 2,
    },
})