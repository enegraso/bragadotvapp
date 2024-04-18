import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { Link } from "react-router-native";
import { Constants } from 'expo-constants';
import { useState, useEffect } from 'react';
import * as ScreenOrientation from "expo-screen-orientation"

const AppBarTab = ({ active, children, to }) => {
    return (
        <Link to={to}>
            <Text style={styles.textnav}>{children}</Text>
        </Link>
    )
}

const AppBar = () => {

    // setear orientacion de pantalla para elegir estilos lo mejor posible
    const [orient, setOrient] = useState(null);

    // usar funcion para ver si es porttrait
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    // cuando se dibuje la pantalla
    useEffect(() => {
        checkOrient();
        const subscription = ScreenOrientation.addOrientationChangeListener(
            handleOrientationChange
        );
        return () => {
            ScreenOrientation.removeOrientationChangeListeners(subscription);
        };
    }, []);

    // chequeo la orientation
    const checkOrient = async () => {
        // const orient = await ScreenOrientation.getOrientationAsync();
        setOrient(await ScreenOrientation.getOrientationAsync());
    };

    // atento a cualquier giro de pantalla
    const handleOrientationChange = (o) => {
        setOrient(isPortrait());
    };

    return (
        // Elijo estilo segun ancho de pantalla
        <View style={isPortrait() ? styles.contenedor : styles.conteland}>
            <View style={styles.tituloapp}>
                <Text style={styles.textotit}>Bragado TV App</Text>
            </View>
            <View style={styles.vistascr}>
                <ScrollView horizontal>
                    <AppBarTab active to='/'> Home </AppBarTab>
                    <AppBarTab to='/tele'> TV en VIVO </AppBarTab>
                    <AppBarTab to='/news'> Noticias </AppBarTab>
                    {/* <AppBarTab to='/ads'> Banner </AppBarTab> */}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: "blue",
        height: '12%',
    },
    conteland: {
        backgroundColor: "blue",
        height: '22%',
    },
    tituloapp: {
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: '#16D5EF',
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