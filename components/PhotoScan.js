import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, Animated, Easing, SafeAreaView } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Linking from 'expo-linking'
import * as ImagePicker from 'expo-image-picker'


import AppText from './AppText'
import AppButton from './AppButton'
import AppMenu from './AppMenu'
import FunctionButtonIcon from '../assets/function-button'
import CornerIcon from '../assets/corner'
// import {translateForImport} from '../utils/translate'


export default function PhotoScan(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // const parsed = Linking.parse(data)
        // console.log(parsed)
        // console.log('data', data)

        // props.addCocktail(parsed)
        // props.showImportModal(parsed)
        props.handleUrl({url: data})
        props.hideModal()
    }

    if (hasPermission === null) {
        return <AppText>Requesting for camera permission</AppText>;
    }
    if (hasPermission === false) {
        return <AppText>No access to camera</AppText>;
    }

    function onSnap(carousel, index){
        setCurrentIndex(index)
    }
    const items = [{
        name: 'Scan'
    }, {
        name: 'Import Photo'
    }]

    return (
        <SafeAreaView style={[{padding: 50, flex: 1}, props.ui.current_theme]}>
            <View style={{padding:40, flex: 1}}>
                <View style={styles.header}>
                    <AppMenu
                        onSnap={onSnap}
                        itemStyle={{ width: 120, fontSize: 16, textAlign: 'center', marginLeft: 0, paddingTop: 2, flexWrap: 'wrap' }}
                        style={{ height: 52, position: 'relative', flexDirection: 'row', paddingTop: 20 }}
                        sliderWidth={props.ui.default_styles.window.width - 60}
                        itemWidth={120}
                        index={currentIndex}
                        items={items}
                        icon_size={15}
                        name={"Scan"}
                    />
                </View>
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={60} height={60} />
                {/* <View>
                    <AppText>Scan</AppText>
                </View> */}
                <ScanContent 
                    index={currentIndex} 
                    ui={props.ui} 
                    setScanned={setScanned} 
                    handleBarCodeScanned={handleBarCodeScanned} 
                    scanned={scanned} 
                    // handleUrl={props.handleUrl}
                />
                <View style={{marginTop: 100}}>
                    <AppButton press={props.hideModal}>Cancel</AppButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

function ScanContent(props){
    if(props.index == 0){
        return (
            <View>
                <BarCodeScanner
                    onBarCodeScanned={props.scanned ? undefined : props.handleBarCodeScanned}
                    style={{ height: 300, width: 300 }}
                />
                {/* {scanned && <AppButton title={'Tap to Scan Again'} press={() => setScanned(false)}>Scan Again</AppButton>} */}
                <ScanText ui={props.ui} fill={props.ui.current_theme.color} scanned={props.scanned} setScanned={() => props.setScanned(false)} />
            </View>
        )
    } else {
        return (
            <View >
                {/* <AppText>Import</AppText> */}
                <ImportImage handleBarCodeScanned={props.handleBarCodeScanned} />
            </View>
        )
    }
}

function ImportImage(props){
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                // says this function is undefined, not sure why it doesn't exist
                //
                // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                // if (status !== 'granted') {
                //     alert('Sorry, we need camera roll permissions to make this work!');
                // }
            }
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
            base64: true
        });

        console.log(result.base64);

        if (!result.cancelled) {
            setImage(result.uri);
            // setImage(`data:image/jpeg;base64,${result.base64}`);
            console.log('image:', image)
            const qr = await BarCodeScanner.scanFromURLAsync(result.uri)

            // console.log('qr result', qr, image)
            if(qr.length > 0){
                props.handleBarCodeScanned(qr[0])
            }
        }
    };

    return (
        <View>
            <AppButton press={pickImage}>Select Photo</AppButton>
            {/* <Image style={{ flex: 1, borderWidth: 1, width: 200, height: 200 }} source={{ uri: image}} resizeMode={'contain'} /> */}
        </View>
    )
}

function ScanText(props){
    if(props.scanned){
        return (
            <AppButton press={props.setScanned}>Scan Again</AppButton>
        )
    } else {
        const [position, setPosition] = useState(new Animated.ValueXY(0, 0))
        // const [position, setPosition] = useState(new Animated.ValueXY(0, 0))
        // Animated.timing(position, {
        //     toValue: { x: 200, y: 0 },
        //     duration: 2000,
        //     useNativeDriver: true
        // }).start()
        Animated.loop(
            Animated.sequence([
                Animated.timing(position, {
                    toValue: { x: 180, y: 0 },
                    duration: 8000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }),
                Animated.timing(position, {
                    toValue: { x: -50, y: 0 },
                    duration: 8000,
                    easing: Easing.linear,
                    useNativeDriver: true
                })
            ])
        ).start()

        return (
            <View style={{padding: 10, textAlign: 'center'}}>
                <AppText style={{textAlign: 'center', fontSize: 18}}>Scanning...</AppText>
                <View style={{position: 'relative'}}>
                    <Animated.View
                        // style={position}
                        style={
                            {
                                transform: position.getTranslateTransform()
                            }
                        }
                        // transform={[{translateX: position.x}]}
                    >
                        <View style={{
                            // backgroundColor: 'rgba(250,250,250,1)',
                            backgroundColor: props.ui.current_theme.backgroundColor,
                            // backgroundColor: 'rgba(0,50,50,1)',
                            // backgroundColor: '#000000',
                            // borderTopWidth:1,
                            borderColor: '#000',
                            marginTop: 10,
                            height: 120,
                            width: 120,
                            // height: 35,
                            // width: 35,
                            position: 'absolute',
                            zIndex: 20,
                        }}
                        ></View>
                    </Animated.View>
                    <View style={{zIndex:-11, flex: 1, alignItems: 'center'}}>
                        <FunctionButtonIcon style={{zIndex:1}} fill={props.fill} width={100} height={100} />
                    </View>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        marginTop: -20,
        marginLeft: -20,
        marginBottom: 20
    },
    corner_icon: {
        zIndex: 10,
        position: 'absolute'
    },
    top_right: { top: 0, right: 10 },
    top_left: { top: 0, left: 10, transform: [{ rotate: '-90deg' }] },
    bottom_right: { bottom: 10, right: 10, transform: [{ rotate: '90deg' }] },
    bottom_left: { bottom: 10, left: 10, transform: [{ rotate: '180deg' }] }
})