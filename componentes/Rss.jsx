import React, { useState, useEffect } from "react";
import { Dimensions, Button, View, Text, ScrollView, StyleSheet, Image, ActivityIndicator } from 'react-native'
import axios from "axios";
import * as WebBrowser from 'expo-web-browser';
import * as ScreenOrientation from "expo-screen-orientation"

const Rss = () => {
    // Dimensiones para imagenes
    const dimensions = Dimensions.get('window');
    const imageHeight = Math.round(dimensions.width * 9 / 16);
    const imageWidth = dimensions.width * 90 / 100;
    // set de variables a cargar para mostrar notas
    const [items, setItems] = useState([])
    const [notas, setNotas] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState(null)
    // array de las primeras 10 notas obtenidas
    var firstten = []
    // setear orientacion de pantalla para elegir estilos lo mejor posible
    const [orient, setOrient] = useState(null);

    // usar funcion para ver si es porttrait
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    // función para obtener notas
    const getNotas = async () => {
        try {
            // convierto el rss a objeto con backend propio
            const recipeData = await axios.get('https://server8.km210.com/webhooks/rssbtv');
            // y cargo las variables
            setItems(recipeData.data);
            setNotas(recipeData.data.items)
            setIsloading(false);
        } catch (err) {
            setError(err)
            console.log(`Error al obtener la url ${err}`)
        }
    }

    useEffect(() => {
        // Conseguir las notas
        // console.log("Nota seleccionada", id);
        setIsloading(true);
        // setLoadingimg(true);
        getNotas();
        //Pantalla
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


    // funcion para ver nota completa en el navegador
    const _handlePressButtonAsync = async (web) => {
        let result = await WebBrowser.openBrowserAsync(web);
        setResult(result);
    };

    // si la item media thumbnail no existe tomo la imagen del content y la retorno con esta funcion
    const obtenImg = (texto) => {
        let origen, fin, foto
        let imagen = texto.includes("img")
        if (imagen) {
            origen = texto.indexOf("src=")
            fin = texto.indexOf(" ", origen + 4)
            foto = texto.substring(origen + 4, fin)
            foto = foto.replaceAll('"', "")
        }
        return foto
    }

    if (error) {
        // Muestro si falla la carga
        return (<View style={styles.containernews}><Text>{error.message}</Text></View>)
    } else {
        // aqui tomo las primeras 15 notas 
        firstten = notas.slice(0, 14);

    }

    return (
        <View>
            {isloading ?
                <View style={styles.loading}><ActivityIndicator size="large" color='midnightred' /></View> :
                <View style={styles.areanotas}>
                    <Text style={styles.diariotit}>Últimas noticias</Text>
                    <Text style={styles.diariosub}> {items.title} </Text>
                    <View>
                        <ScrollView style={[styles.diario]}>
                            {firstten.map((item) =>
                                <View key={item.id} style={{ paddingTop: 3, paddingBottom: 15 }}>
                                    <Text style={styles.titulo}> {item.title} </Text>
                                    <View style={styles.contimg}>
                                        <Image style={{ height: imageHeight, width: imageWidth }} resizeMode={"cover"} source={{ uri: !item.media.thumbnail ? obtenImg(item.content) : item.media.thumbnail.url }}></Image>
                                    </View>
                                    <Text > {item.description}</Text>
                                    <View style={styles.boton}>
                                        <Button title="Leer más..." onPress={() => { _handlePressButtonAsync(item.link) }} />
                                    </View>
                                </View>
                            )}
                        </ScrollView>
                    </View>
                </View>
            }
        </View>
    );
}

// mi humilde y triste CSS
const styles = StyleSheet.create({
    containernews: {
        height: "90%"
    },
    landcontainernews: {
        height: "90%"
    },
    areanotas: {
        backgroundColor: "pink"
    },
    diario: {
        alignSelf: "center",
        height: "89%",
        backgroundColor: "lightgrey"
    },
    diariotit: {
        fontSize: 22,
        fontWeight: "bold",
        color: "black",
    },
    diariosub: {
        fontSize: 18,
        fontWeight: "bold",
        color: "blue"
    },
    titulo: {
        justifyContent: "space-between",
        alignItems: "stretch",
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "Roboto"
    },
    contimg: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    imagen: {
        width: "350",
        height: "250",
        borderRadius: 15
    },
    loading: {
        flexDirection: 'column',
        alignContent: 'space-between',
        alignItems: 'center',
        height: '89%'
    },
    boton: {
        alignSelf: "center",
        width: "75%"
    }
})

export default Rss