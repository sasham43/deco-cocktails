import React, { useState, useEffect } from 'react'
import { View, StyleSheet} from 'react-native'
import { BarCodeScanner } from 'expo-barcode-scanner'
import * as Linking from 'expo-linking'

import AppText from './AppText'

export default function Scanner(props){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false)

    function handleBarCodeScanned(data){
        console.log('scan', data)
        var url = Linking.parse(data.data)
        console.log('url', url)
    }

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);


    return (
        <View style={styles.container}>
            <AppText>Scanner</AppText>
            <BarCodeScanner style={styles.scanner} onBarCodeScanned={handleBarCodeScanned}></BarCodeScanner>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2
    },
    scanner: {
        flex: 1,
        // width: 250,
        // height: 250
    }
})