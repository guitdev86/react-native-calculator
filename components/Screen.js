import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

export default function Screen({ value }) {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#262626',
        padding: 10,
        borderRadius: 5,
        alignSelf: "stretch",
        alignItems: "flex-end"
    },

    text: {
        fontFamily: 'sans-serif-light',
        fontSize: 60,
        color: 'white'
    }
})