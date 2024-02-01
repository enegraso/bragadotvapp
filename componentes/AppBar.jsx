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
        <View>
            <View style={styles.tituloapp}>
                <Text style={styles.textotit}>Bragado TV</Text>
            </View>
            <ScrollView horizontal style={styles.vistascr}>
                <AppBarTab active to='/'> Home </AppBarTab>
                {/*             <AppBarTab to='/radio'>Radio + </AppBarTab> */}
                <AppBarTab to='/tele'> TV en VIVO </AppBarTab>
                <AppBarTab to='/news'> Noticias </AppBarTab>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    tituloapp: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#16D5EF',
        marginTop: Constants.statusBarHeight,
        height: 45
    },
    textotit: {
        color: "white",
        fontWeight: "900",
        fontSize: 20,
        fontWeight: "bold",
    },
    vistascr: {
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "red",
    },
    textnav: {
        color: "white",
        fontSize: 18
    }
})

export default AppBar