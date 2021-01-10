import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
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
    }


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
            key: 0,
            title: 'Welcome to the Hotel Crump!',
            text: 'The premier menu for custom cocktails',
            image: '',
            backgroundColor: '#fff'
        },
        {
            key: 1,
            title: 'Make your own cocktails',
            text: '',
            image: '',
            backgroundColor: '#fff'
        },
        {
            key: 2,
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
        <View>
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

function FunctionMenuButton(item){
    return (
        <View>
            <Image src={item.image} />
            <View style={styles.info_box}>
                <AppText>
                    Press this icon to search, share, edit, and more!
                </AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }
})