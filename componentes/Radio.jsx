import React from "react";
import { StyleSheet, View, Text } from 'react-native'
import Constants from 'expo-constants'


const Radio = () => {
    return (
        <View style={{ paddingTop: 100 }} >
            <Text>Seccion Radio de la App</Text>
            <Text>Aquí va a ir el player</Text>


        </View>
    )
}

const styles = StyleSheet.create({
    video: {
        height: 150,
    }
})

export default Radio