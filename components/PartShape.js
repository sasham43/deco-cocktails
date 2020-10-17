import React from 'react'
import { View, StyleSheet } from 'react-native'
import Svg, {
    Circle,
    Ellipse,
    G,
    Text,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Image,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';


export default class PartShape extends React.Component {

    render(){
        return (
            <View style={[
                StyleSheet.absoluteFill,
                { alignItems: 'center', justifyContent: 'center' },
            ]}>
                <Svg height="50%" width="50%" viewBox="0 0 100 100">
                    <Circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="blue"
                        strokeWidth="2.5"
                        fill="green"
                    />
                    <Rect
                        x="15"
                        y="15"
                        width="70"
                        height="70"
                        stroke="red"
                        strokeWidth="2"
                        fill="yellow"
                    />
                    <Defs>
                        <G id="quarter_pies">
                            <Path d="M0,0 L0,-200  A200,200 0 0,1  200,000  z"
                                style="fill:#ff0000;fill-opacity: 1;stroke:black;stroke-width: 1" />
                            <Path d="M0,0 L-200,0  A200,200 0 0,1    0,-200 z"
                                style="fill:green;fill-opacity: 1;stroke:black;stroke-width: 1" />
                            <Path d="M0,0 L0,200   A200,200 0 0,1 -200,0    z"
                                style="fill:blue;fill-opacity: 1;stroke:black;stroke-width: 1" />
                            <Path d="M0,0 L200,0   A200,200 0 0,1    0,200  z"
                                style="fill:pink;fill-opacity: 1;stroke:black;stroke-width: 1" />
                        </G>
                    </Defs>
                    <Use transform="translate(60,100) scale(0.25,0.25)" xlinkhref="#quarter_pies"></Use>
                </Svg>
            </View>
        )
    }
}