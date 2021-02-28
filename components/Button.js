import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

export default function Button({ icon, value, onClick, color }) {
    
    const handleClick = () => {
        onClick(value);
    }

    const styles = StyleSheet.create({
        btn: {
            flex:1,
            backgroundColor: color,
            borderRadius: 5,
            alignItems: "center",
            margin: 4,
            paddingVertical: 15
        },
    
        btnText: {
            fontFamily: 'sans-serif-thin',
            fontSize: 38,
            color: 'white'
        }
    })

    return (
        <TouchableOpacity style={styles.btn} onPress={() => handleClick()}>
            <Text style={styles.btnText}>{icon}</Text>
        </TouchableOpacity>
    );
}


