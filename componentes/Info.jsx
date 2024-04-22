import { View, Text, StyleSheet, Dimensions, Pressable, Linking, Platform } from 'react-native'
import { useEffect, useState } from 'react';
import * as ScreenOrientation from "expo-screen-orientation"
import { AntDesign, Entypo, FontAwesome6, MaterialIcons, Feather } from '@expo/vector-icons';
import { Link } from 'react-router-native';
import VersionCheck from 'react-native-version-check-expo';
import * as WebBrowser from 'expo-web-browser';

const Info = () => {
    // setear orientacion de pantalla para elegir estilos lo mejor posible
    const [orient, setOrient] = useState(null);

    const urlapp = "https://play.google.com/store/apps/details?id=com.enegraso.radiomasvidaapp&hl=es_AR&gl=US"

    // usar funcion para ver si es porttrait
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };

    // funcion para ver red social en navegador
    const _handlePressButtonAsync = async (web) => {
        let result = await WebBrowser.openBrowserAsync(web);
        setResult(result);
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

    // compartir app
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: ("Compartir Nuestra App: \n" + urlapp)
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                    console.log("share whith activity type of: ", result.activityType)
                } else {
                    // shared
                    console.log("shared")
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
                console.log("dismissed")
            }
        } catch (error) {
            alert(error.message);
        }
    }

    const handleOpenEmailboxAsync = () => {
        console.log("trying open mail app")
        Linking.openURL("mailto:somethingemail@gmail.com&subject=abcdefg&body=body")
    };

    const handleOpenPhoneCallAsync = () => {
        const phoneNumber = "+5492342513085"
        console.log("call:+542342513085")
        Linking.openURL(`tel:${phoneNumber}`)
    };

    //      <Button onPress={handleOpenEmailboxAsync}>Open email app</Button>

    /*       VersionCheck.needUpdate()
          .then(async res => {
            if (res.isNeeded) {
              Alert.alert(
                'Actualizar App',
                'Por favor actualice para continuar usando la app...',
                [
                  {
                    text: 'Actualizar', onPress: () => {
                      if (Platform.OS === 'android') {
                        Linking.openURL(res.storeUrl); // Open Play Store for Android
                      } else {
                        Linking.openURL('your-ios-app-url-in-app-store'); // Open App Store for iOS
                      }
                    }
                  },
                  {
                    text: 'Luego', onPress: () => {
                      // You can do some action here if needed
                    }
                  }
                ]
              );
            }
          }); */

    return (
        // Elijo estilo segun ancho de pantalla
        <View style={isPortrait() ? styles.container : styles.landcontainer}>
            <View style={styles.headerbox}>
                <View>
                    <Text style={styles.textheader}>Las 24 hs del día</Text>
                </View>
                <View>
                    <Link to="/tele">
                        <Text style={styles.titulo}>Tele En Vivo</Text>
                    </Link>
                </View>
            </View>
            <View style={styles.midle}>
                <View>
                    <Text style={styles.textmidle}>Las últimas noticias Bragado y la zona, en la palma de tu mano</Text></View>
                <View>
                    <Link to="/news">
                        <Text style={styles.textbtn}>Ver Noticias</Text>
                    </Link>
                </View>
            </View>
            <View style={styles.contentbox}>
                <Pressable style={styles.box} onPress={() => { handleOpenPhoneCallAsync() }}><Feather name="phone-call" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => { _handlePressButtonAsync("https://www.instagram.com/bragadotvok/?hl=es") }}><AntDesign name="instagram" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => { _handlePressButtonAsync("https://www.facebook.com/BragadoTv/?locale=es_LA") }}><Entypo name="facebook" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => { _handlePressButtonAsync("https://www.youtube.com/channel/UCv-riSYQMoPWx1dCc1KdhEQ") }}><Entypo name="youtube" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => onShare()} disabled><AntDesign name="sharealt" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => { _handlePressButtonAsync("https://www.youtube.com/channel/UCv-riSYQMoPWx1dCc1KdhEQ") }} disabled><MaterialIcons name="rate-review" size={32} color="white" /></Pressable>
                <Pressable style={styles.box} onPress={() => { handleOpenEmailboxAsync() }}><AntDesign name="mail" size={32} color="white" /></Pressable>
            </View>
            <Text style={styles.textfoot}>Bragado TV® - Todos los derechos reservados.</Text>
            <Text style={styles.textfoot}>Version: Version: {VersionCheck.getCurrentVersion()} - Powered by SIB 2000 </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '80%',
    },
    landcontainer: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '75%',
    },
    text: {
        color: '#ffffff',
        fontWeight: 'normal',
        fontSize: 20
    },
    textbtnlive: {
        fontWeight: 'normal',
        fontSize: 20,
        padding: 10,
        borderRadius: 10
    },
    textfoot: {
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 12
    },
    textbtn: {
        backgroundColor: "blue",
        color: 'lightgrey',
        fontWeight: 'normal',
        fontSize: 20,
        padding: 10,
        borderRadius: 10
    },
    headerbox: {
        flex: .75,
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 20
    },
    textheader: {
        color: 'grey',
        fontWeight: 'normal',
        fontSize: 20
    },
    midle: {
        flex: 1.25,
        // width: "100%",
        flexDirection: "columm",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgrey",
        borderRadius: 20,
    },
    textmidle: {
        color: 'green',
        fontWeight: 'normal',
        fontSize: 20
    },
    contentbox: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        height: 200,
        alignContent: "center",
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    box: {
        flexDirection: 'column',
        height: 60,
        width: 60,
        backgroundColor: 'red',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    titulo: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 24,
        color: "white",
        backgroundColor: "red",
        borderRadius: 15,
        padding: 5
    },
})

export default Info