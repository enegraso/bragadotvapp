import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import Info from "./Info";
import Radio from "./Radio";
import Tele from "./Tele";
import Rss from './Rss';
import Constants from 'expo-constants'
import TestBanner from './TestBanner';
import Contact from './Contact';

const Main = () => {
    return (
        <View style={styles.appbar}>
            <AppBar />
            <Routes>
                <Route path="/" element={<Info />} />
                <Route path="/radio" element={<Radio />} />
                <Route path="/tele" element={<Tele />} />
                <Route path="/news" element={<Rss />} />
                <Route path="/contact" element={<Contact/>} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
            <TestBanner />
        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        marginTop: Constants.statusBarHeight,
    }

})

export default Main