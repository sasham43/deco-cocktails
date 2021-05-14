import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import Image from 'react-native-scalable-image'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import AppText from './AppText'
import FunctionButtonIcon from '../assets/function-button'
import CornerIcon from '../assets/corner'
import { setTutorialComplete } from '../utils/UIActions'

const list = require('../assets/screenshots/list.png')
const fmb = require('../assets/screenshots/fmb.png')
const add = require('../assets/screenshots/add.png')
const cabinet = require('../assets/screenshots/cabinet.png')
const share = require('../assets/screenshots/share.png')
const code = require('../assets/screenshots/code.png')


const mapStateToProps = (state) => {
    const { cocktails, ui, stock } = state
    return { cocktails: cocktails, ui, stock }
}
const mapDispatchToProps = dispatch => (
    bindActionCreators({
        setTutorialComplete
    }, dispatch)
)
export default connect(mapStateToProps, mapDispatchToProps)(Intro)

function renderIntro(props) {    
    if(props.item.key == '0'){
        return <Welcome ui={props.ui} />
    }

    return (
        <IntroSlide item={props.item} />
    )
}

function IntroButton(props){
    const icon_size = 15
    return (
        <View style={[styles.button, {borderColor: props.ui.current_theme.borderColor}]}>
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={icon_size} height={icon_size} />
            <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={icon_size} height={icon_size} />
            <AppText style={styles.button_text}>{props.children}</AppText>
        </View>
    )
}

function doneButton(props) {
    return (
        <IntroButton ui={props.ui}>
            <AppText>Done</AppText>
        </IntroButton>
    )
}
function skipButton(props) {
    return (
        <IntroButton ui={props.ui}>
            <AppText>Skip</AppText>
        </IntroButton>
    )
}


function Intro(props) {
    function onIntroDone() {
        props.setTutorialComplete(true)
    }
   
    const intro = [
        {
            key: "0",
            title: 'Welcome to the Hotel Crump!',
            text: 'The premier menu for custom cocktails',
            image: '',
            backgroundColor: '#fff'
        },
        {
            key: '4',
            title: 'List',
            text: '',
            image: list,
            backgroundColor: '#fff'
        },
        {
            key: "1",
            title: 'Make your own cocktails',
            text: '',
            image: fmb,
            backgroundColor: '#fff'
        },
        {
            key: "2",
            title: 'Add custom cocktails!',
            text: '',
            // image: '',
            image: add,
            backgroundColor: '#fff'
        },
        {
            key: "6",
            title: 'Add custom cocktails!',
            text: '',
            image: share,
            backgroundColor: '#fff'
        },
        {
            key: "5",
            title: 'Add custom cocktails!',
            text: '',
            image: code,
            backgroundColor: '#fff'
        },
        {
            key: '3',
            title: 'Manage bar cabinet!',
            text: '',
            image: cabinet,
            backgroundColor: '#fff'
        },
    ]
    return (
        <AppIntroSlider
            renderItem={(data)=>renderIntro({...data, ui: props.ui})}
            data={intro}
            onDone={onIntroDone}
            activeDotStyle={{ backgroundColor: props.ui.current_theme.color }}
            showSkipButton={true}
            showNextButton={false}
            showPrevButton={false}
            renderDoneButton={(data)=>doneButton({...data, ui: props.ui})}
            renderSkipButton={(data)=>skipButton({...data, ui: props.ui})}
        />
    )
}



function Welcome(props) {
    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center', paddingTop: 200}}>
                <AppText style={{fontSize: 30}}>
                    Welcome To Hotel Crump!
                </AppText>
            </View>
            <View style={{ alignItems: 'center', paddingTop: 50, paddingLeft: 15, paddingRight: 15}}>
                <AppText style={{ fontSize: 20, textAlign: 'center' }}>
                    Home of the world-famous Crump Cocktails!
                </AppText>
            </View>
            <View style={{marginTop: 20}}>
                <FunctionButtonIcon fill={props.ui.current_theme.color} width={200} height={175} />
            </View>
        </View>
    )
}

function IntroSlide({ item }) {
    if (item.image) {
        return (
            <View style={styles.container}>
                <View style={[styles.image_container]}>
                    <Image
                        height={windowHeight - 200}
                        resizeMode={'contain'}
                        // background={true}
                        source={item.image}
                    />
                </View>
            </View>
        )
    }

    return (
        <View>
            <AppText>
                {item.title}
            </AppText>
        </View>
    )
}

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

const icon_distance = -1
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image_container: {
        paddingTop: 50,
        paddingBottom: 200,
    },
    image: {
        height: windowHeight,
        width: windowWidth,
        position: 'absolute',
        top: -100,
    },
    info_box: {
        position: 'absolute',
        bottom: 300,
        left: (windowWidth / 2) - 150,
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        shadowOffset: { width: -4, height: -4, },
        shadowOpacity: 0.3,
        elevation: 10, // for Android,
        padding: 25,
        width: 200,
    },
    curvedTailArrow: {
        backgroundColor: "transparent",
        overflow: "visible",
        width: 30,
        height: 25,
        transform: [{ scale: 2 }]
    },
    curvedTailArrowTriangle: {
        backgroundColor: "transparent",
        width: 0,
        height: 0,
        borderTopWidth: 9,
        borderTopColor: "transparent",
        borderRightWidth: 9,
        borderRightColor: "black",
        borderStyle: "solid",
        transform: [{ rotate: "10deg" }],
        position: "absolute",
        bottom: 9,
        right: 3,
        overflow: "visible",
    },
    curvedTailArrowTail: {
        backgroundColor: "transparent",
        position: "absolute",
        borderBottomColor: "transparent",
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 3,
        borderTopColor: "black",
        borderStyle: "solid",
        borderTopLeftRadius: 12,
        top: 1,
        left: 0,
        width: 20,
        height: 20,
        transform: [{ rotate: "45deg" }],
    },
    button_text: {
        fontSize: 23,
        textAlign: 'center'
    },
    button: {
        marginTop: 5,
        marginBottom: 5,
        borderWidth: 1,
        padding: 8,
        alignItems: 'center'
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: icon_distance, right: icon_distance },
    top_left: { top: icon_distance, left: icon_distance, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: icon_distance, right: icon_distance, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: icon_distance, left: icon_distance, transform: [{ rotate: '180deg' }] }
})