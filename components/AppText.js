import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import {
    useFonts,
    PoiretOne_400Regular
} from '@expo-google-fonts/poiret-one'

// export default props => {
//     let [fontsLoaded] = useFonts({
//         PoiretOne_400Regular,
//     })

//     if (!fontsLoaded) {
//         return (<Text></Text>)
//     } else {
//         return (
//             <Text style={{ fontFamily: 'PoiretOne_400Regular' }}>
//                 {this.props.children}
//             </Text>
//         );
//     }
// }

class AppText extends React.Component {
   
    render() {

       
        return (
            <Text style={{ fontFamily: 'PoiretOne_400Regular' }}>
                {this.props.children}
            </Text>
        );
        
    }
}

export default AppText
