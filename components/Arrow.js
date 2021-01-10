import React from 'react'
import { View, StyleSheet } from 'react-native'

export default function CurvedTailArrow (props) {
    return (
        <View style={[styles.curvedTailArrow, props.style]}>
            <View style={styles.curvedTailArrowTail} />
            <View style={styles.curvedTailArrowTriangle} />
        </View>
    );
};

const styles = StyleSheet.create({
    curvedTailArrow: {
        backgroundColor: "transparent",
        overflow: "visible",
        width: 30,
        height: 25,
        transform: [{ scale: 1.4 }]
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
});