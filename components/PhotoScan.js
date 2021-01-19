import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Animated, Easing } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Linking from 'expo-linking'


import AppText from './AppText'
import AppButton from './AppButton'
import FunctionButtonIcon from '../assets/function-button'
import {translateForImport} from '../utils/translate'


export default function PhotoScan(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        const parsed = Linking.parse(data)
        console.log(parsed)
        console.log('data', data)

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

    return (
        <View style={{padding: 50}}>
            <View>
                <AppText>Scan</AppText>
            </View>
            <View>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{height: 300, width: 300}}
                />
                {/* {scanned && <AppButton title={'Tap to Scan Again'} press={() => setScanned(false)}>Scan Again</AppButton>} */}
                <ScanText fill={props.ui.current_theme.color} scanned={scanned} setScanned={()=>setScanned(false)} />
                <View style={{marginTop: 100}}>
                    <AppButton press={props.hideModal}>Cancel</AppButton>
                </View>
            </View>
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
                <AppText style={{textAlign: 'center'}}>Scanning...</AppText>
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
                            backgroundColor: '#fff',
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