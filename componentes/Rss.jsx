import React, { useState, useEffect } from "react";
import { FlatList, Button, View, Text, ScrollView, StyleSheet, Image } from 'react-native'
import Constants from 'expo-constants'
import axios from "axios";

import * as WebBrowser from 'expo-web-browser';

const Rss = () => {
    const [title, setTitle] = useState("")
    const [descrip, setDescrip] = useState("")
    const [items, setItems] = useState([])
    const [notas, setNotas] = useState([])

    const [isloading, setIsloading] = useState(false)
    const [result, setResult] = useState(null);

    const getNotas = async () => {

        try {
            const recipeData = await axios.get('https://server8.km210.com/webhooks/rssbtv');
            console.log(recipeData);
            /*             const parseado =  JSON.stringify(recipeData.data.items) ; 
                        
                        console.log("Parseado" + parseado) */
            setItems(recipeData.data);
            setNotas(recipeData.data.items)
            setIsloading(false);
        } catch (err) {
            console.log(`Error occurred fetching recipes ${err}`)
        }

/*         const { res } = await axios.get('https://server8.km210.com/webhooks/rssbtv')
        .then((res) => {
            setItems(res.data)
            console.log("Response= "+JSON.stringify(res.data));
            setIsloading(false)
          })
          .catch(error => {
            console.log("Error: " + error);
          });
 */    }

    useEffect(() => {
        // console.log("Nota seleccionada", id);
        setIsloading(true);
        // setLoadingimg(true);
        getNotas();
    }, []);


    return (
        <View style={{ padding: 20 }}>

            {isloading ?
                <Text>Loading...</Text> :
                <>
                    <Text> {items.title} </Text>
                    <Text> {items.link} </Text>
                    <ScrollView>

                        {notas.map((item) =>
                            <View key={item.id}>
                                <Text> {item.title} </Text>
                            </View>
                        )}
                    </ScrollView>
                </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        height: "90%"
    },
    diario: {
        alignSelf: "center",
        width: "90%"
    },
    diariotit: {
        fontSize: 30,
        fontWeight: "bold"
    },
    diariosub: {
        fontSize: 20,
        fontWeight: "bold"
    },
    titulo: {
        fontSize: 25,
        fontWeight: "bold"
    },
    contimg: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagen: {
        width: 400,
        height: 300
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25
    }
})

export default Rss