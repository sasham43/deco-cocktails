import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';


import AppText from './AppText'
import AppButton from './AppButton'
import CornerIcon from '../assets/corner'
// import {translateForImport} from '../utils/translate'


export default function PhotoScan(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    // const [currentIndex, setCurrentIndex] = useState(0)

    const [qrStatus, setQrStatus] = useState('scanning')

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, [])

    const handleBarCodeScanned = async ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        // const parsed = Linking.parse(data)
        // console.log(parsed)
        // console.log('data', data)

        // props.addCocktail(parsed)
        // props.showImportModal(parsed)
        if(data){
            setQrStatus('found')
            await wait(400)
            props.handleUrl({url: data})
            props.hideModal()
        } else {
            setQrStatus('not_found')
        }
    }

    if (hasPermission === null) {
        return <AppText>Requesting for camera permission</AppText>;
    }
    if (hasPermission === false) {
        return <AppText>No access to camera</AppText>;
    }

    return (
        <SafeAreaView style={[{padding: 50, flex: 1}, props.ui.current_theme]}>
            <View style={{padding:40, flex: 1, justifyContent: 'space-between'}}>
                <View style={styles.header}>
                    <AppText style={{fontSize: 25, textAlign: 'center'}}>Scan</AppText>
                </View>
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right]} width={60} height={60} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left]} width={60} height={60} />

                <View style={{ flex: 5, border: props.ui.current_theme.color, borderWidth:1, marginBottom: 10}}>
                    <CornerIcon fill={'#fff'} style={[styles.corner_icon, styles.top_right_scanner]} width={30} height={30} />
                    <CornerIcon fill={'#fff'} style={[styles.corner_icon, styles.top_left_scanner]} width={30} height={30} />
                    <CornerIcon fill={'#fff'} style={[styles.corner_icon, styles.bottom_right_scanner]} width={30} height={30} />
                    <CornerIcon fill={'#fff'} style={[styles.corner_icon, styles.bottom_left_scanner]} width={30} height={30} />
                    <BarCodeScanner
                        onBarCodeScanned={props.scanned ? undefined : handleBarCodeScanned}
                        style={{flex: 1,border: props.ui.current_theme.color }}
                    />
                </View>
                <View style={{flex:2}}>

                    <ImportImage status={qrStatus} ui={props.ui} handleBarCodeScanned={handleBarCodeScanned} />
                </View>
                <View style={{position: 'relative', bottom: 0, flex: 1}}>
                    <AppButton press={props.hideModal}>Cancel</AppButton>
                </View>
            </View>
        </SafeAreaView>
    )
}

function ImportImage(props){
    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                // says this function is undefined, not sure why it doesn't exist
                //
                // const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                const { status } = await Permissions.getAsync(Permissions.MEDIA_LIBRARY)
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
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

        if (!result.cancelled) {
            setImage(result.uri);
            console.log('image:', image)
            const qr = await BarCodeScanner.scanFromURLAsync(result.uri)

            if(qr.length > 0){
                console.log('finished wait')
                props.handleBarCodeScanned(qr[0])
            } else {
                props.handleBarCodeScanned({})
            }
        }
    };

    return (
        <View style={{flex:1}}>
            <View style={{ flex:2, position: 'relative', padding: 10, borderWidth: 1, borderColor: props.ui.current_theme.color, justifyContent: 'center'}}>
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_right_small]} width={15} height={15} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.top_left_small]} width={15} height={15} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_right_small]} width={15} height={15} />
                <CornerIcon fill={props.ui.current_theme.color} style={[styles.corner_icon, styles.bottom_left_small]} width={15} height={15} />

                <View style={{margin:5, borderWidth:0}}>
                <ScanMsg status={props.status} />
                </View>
            </View>
            <AppButton style={{flex:1}} press={pickImage}>Select Photo</AppButton>
        </View>
    )
}

function wait(time){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },time)
    })
}

function ScanMsg(props){
    if(props.status == 'found'){
        return (
            <AppText style={styles.scan_msg}>
                QR code found!  Importing recipe...
            </AppText>
        )
    } else if(props.status == 'not_found'){
        return (
            <AppText style={styles.scan_msg}>
                No QR code found.  Try another photo or scan a QR code!
            </AppText>
        )
    } else if (props.status == 'scanning'){
        return (
            <AppText style={styles.scan_msg}>Scanning...</AppText>
        )
    } else {
        return (
            <AppText>Scanning...</AppText>
        )
    }
}


const styles = StyleSheet.create({
    scan_msg: {
        textAlign: 'center',
        fontSize: 18,
        // position: 'absolute',
        // flexDirection: 'row',
        // flex: 1
    },
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
    bottom_left: { bottom: 10, left: 10, transform: [{ rotate: '180deg' }] },
    top_right_small: { top: 2, right: 2 },
    top_left_small: { top: 2, left: 2, transform: [{ rotate: '-90deg' }] },
    bottom_right_small: { bottom: 2, right: 2, transform: [{ rotate: '90deg' }] },
    bottom_left_small: { bottom: 2, left: 2, transform: [{ rotate: '180deg' }] },
    top_right_scanner: { top: 12, right: 12 },
    top_left_scanner: { top: 12, left: 12, transform: [{ rotate: '-90deg' }] },
    bottom_right_scanner: { bottom: 12, right: 12, transform: [{ rotate: '90deg' }] },
    bottom_left_scanner: { bottom: 12, left: 12, transform: [{ rotate: '180deg' }] },
})