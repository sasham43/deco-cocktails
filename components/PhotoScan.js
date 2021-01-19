import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Linking from 'expo-linking'


import AppText from './AppText'
import AppButton from './AppButton'
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
                    // style={StyleSheet.absoluteFillObject}
                    style={{height: 300, width: 300}}
                />
                {scanned && <AppButton title={'Tap to Scan Again'} press={() => setScanned(false)}>Scan Again</AppButton>}
            </View>
        </View>
    )
}