import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { useEffect, useState } from 'react';
import * as ScreenOrientation from "expo-screen-orientation"

const Info = () => {

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
        const orient = await ScreenOrientation.getOrientationAsync();
        setOrient(orient);
    };

    // atento a cualquier giro de pantalla
    const handleOrientationChange = (o) => {
        setOrient(isPortrait());
    };

    return (
        // Elijo estilo segun ancho de pantalla
        <View style={isPortrait() ? styles.container : styles.landcontainer}>
            <Text style={styles.titulo}>Bragado TV App</Text>
            <Text style={styles.text}>Toda la info de la zona, en la palma de tu mano</Text>
            <View style={styles.contentbox}>
                <View style={styles.box}><Text>Llamanos</Text></View>
                <View style={styles.box}><Text>Instagram</Text></View>
                <View style={styles.box}><Text>Facebook</Text></View>
                <View style={styles.box}><Text>Youtube</Text></View>
            </View>
            <Text style={styles.text}>Todos los derechos reservados</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#6804CD',
        width: '100%',
        height: '87%',
    },
    landcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#6804CD',
        width: '100%',
        height: '81%',
    },

    text: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    contentbox: {
        flexDirection: 'row',
        width: '100%',
        height: 200,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    box: {
        flexDirection: 'column',
        height: 100,
        width: 100,
        backgroundColor: 'orange',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 22
    },
})

export default Info