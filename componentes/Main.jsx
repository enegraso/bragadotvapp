import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppBar from "./AppBar";
import { Navigate, Route, Routes } from "react-router-native";
import Info from "./Info";
import Radio from "./Radio";
import Tele from "./Tele";
import Rss from './Rss';


const Main = () => {
    return (
        <View>
            <AppBar />
            <Routes>
                <Route path="/" element={<Info />} />
                <Route path="/radio" element={<Radio />} />
                <Route path="/tele" element={<Tele />} />
                <Route path="/news" element={<Rss />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </View>
    )
}

const styles = StyleSheet.create({
    barra: {
        backgroundColor: 'red',
        color: 'white'
    }

})

export default Main