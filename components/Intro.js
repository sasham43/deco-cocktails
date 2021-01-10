import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'

import AppText from './AppText'

function renderIntro({ item }) {
    if(item.key == 0){
        return (
            <Welcome item={item} />
        )
    } else if (item.key == 1){
        return (
            <FunctionMenuButton item={item} />
        )
    } else if(item.key == 2){
        return (
            <View>
                <View>
                    <Text>{item.title}</Text>
                </View>
                <View>
                    <Text>{item.text}</Text>
                </View>
            </View>
        )
    }


}

function onIntroDone() {
    console.log('finished intro')
}
function doneButton() {
    return (
        <View>
            <AppText>Done</AppText>
        </View>
    )
}
function skipButton() {
    return (
        <View>
            <AppText>Skip</AppText>
        </View>
    )
}

export default function Intro(props){

/*
  Intro
  1. Welcome
  2. Function Menu Button
    2.5 Function Menu example ?
  3. Add custom cocktails
  4. Manage cabinet
  5. About screen
*/
    const intro = [
        {
            key: "0",
            title: 'Welcome to the Hotel Crump!',
            text: 'The premier menu for custom cocktails',
            image: '',
            backgroundColor: '#fff'
        },
        {
            key: "1",
            title: 'Make your own cocktails',
            text: '',
            image: require('../assets/screenshots/Welcome.png'),
            backgroundColor: '#fff'
        },
        {
            key: "2",
            title: 'Share cocktails with friends!',
            text: '',
            image: '',
            backgroundColor: '#fff'
        },
    ]
    return (
        <AppIntroSlider
            renderItem={renderIntro}
            data={intro}
            onDone={onIntroDone}
            activeDotStyle={{ backgroundColor: '#000' }}
            showSkipButton={true}
            renderDoneButton={doneButton}
            renderSkipButton={skipButton}
        />
    )
}



function Welcome(){
    return (
        <View style={styles.container}>
            <View>
                <AppText>
                    Welcome To Hotel Crump!
                </AppText>
            </View>
            <View>
                <AppText>
                    Home of the world famous Crump Cocktails!
                </AppText>
            </View>
        </View>
    )
}

function FunctionMenuButton({item}){
    // console.log('item.image', item.image)
    return (
        <View style={styles.container}>
            {/* <Image style={styles.image} source={{uri: "../assets/screenshots/Welcome.png"}} /> */}
            <View style={[styles.image_container]}>
                {/* <Image source={require("../assets/screenshots/Welcome.png")} /> */}
                <Image style={styles.image} resizeMode={'contain'} source={item.image} />
            </View>
            <View style={styles.info_box}>
                <AppText>
                    Press this icon to search, share, edit, and more!
                </AppText>
            </View>
            <View style={{position: 'absolute', top: windowHeight - 275, left: 150}}>
                <CurvedTailArrow />
            </View>
        </View>
    )
}
const CurvedTailArrow = () => {
    return (
        <View style={styles.curvedTailArrow}>
            <View style={styles.curvedTailArrowTail} />
            <View style={styles.curvedTailArrowTriangle} />
        </View>
    );
};

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

// console.log('windowHeight', windowHeight)
// console.log('windowWidth', windowWidth)
const styles = StyleSheet.create({
    container: {
        position: 'relative',
        // padding: 10,
        // height: windowHeight
    },
    image_container: {
        // flex: 1
        // width: windowWidth,
        // height: windowHeight,
    },
    image: {
        // width: null,
        // height: null,
        // flex: 1,
        // resizeMode: 'contain'
        // height: 100,
        // width: 100,
        height: windowHeight,
        // transform: [{scale: .9}],
        width: windowWidth,
        position: 'absolute',
        top: -100,
        // aspectRatio: 1
    },
    info_box: {
        position: 'absolute',
        // bottom: 10,
        // bottom: windowHeight,
        top: windowHeight - 375,
        left: 50,
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
        transform: [{scale: 2}]
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
})