import react from "react";
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Link } from "react-router-native";

const AppBarTab = ({ active, children, to }) => {
    return (
        <Link to={to}>
            <Text style={styles.textnav}>{children}</Text>
        </Link>
    )
}

const AppBar = () => {
    return (
        <View style={styles.contenedor}>
            <View style={styles.tituloapp}>
                <Text style={styles.textotit}>Bragado TV</Text>
            </View>
            <View style={styles.vistascr}>
            <ScrollView horizontal>
                <AppBarTab active to='/'> Home </AppBarTab>
                <AppBarTab to='/tele'> TV en VIVO </AppBarTab>
                <AppBarTab to='/news'> Noticias </AppBarTab>
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        // marginTop: Constants.statusBarHeight,
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: "'#16D5EF'",
        height: '11%'
    },
    tituloapp: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#16D5EF',
        height: '55%'
    },
    vistascr: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "red",
        height: '45%'
    },
    textotit: {
        color: "white",
        fontWeight: "900",
        fontSize: 22,
        fontWeight: "bold",
    },
    textnav: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default AppBar