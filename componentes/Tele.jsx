import React, { useState } from "react";
import { Dimensions, View, StyleSheet, Button } from 'react-native'
import Constants from 'expo-constants'
import { Video, ResizeMode } from "expo-av"
import * as ScreenOrientation from "expo-screen-orientation"

const Tele = ({ link, tipo }) => {

    // dimensiones para ventanita de video, serán var ya que cambian al girar pantalla
    var dimensions = Dimensions.get('window');
    var imageHeight = Math.round(dimensions.width * 9 / 16);
    var imageWidth = dimensions.width * 90 / 100;
    var imagetop 

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [orientationIsLandscape, setOrientation] = React.useState(true)
    const [pressgirar, setPressgirar] = useState(false)

    async function changeOrientation() {
        if (orientationIsLandscape == true) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        }
        else if (orientationIsLandscape == false) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }

    const toggleorientation = () => {
        setOrientation(!orientationIsLandscape)
        changeOrientation()
        setPressgirar(true)
        // intento adaptar el alto y ancho al girar
        dimensions = Dimensions.get('window');
        if (dimensions.width > dimensions.height) {
            imageHeight = Math.round(dimensions.height * 25 / 100);
            imageWidth = dimensions.width * 90 / 100;
            imagetop = imageHeight - 40
        } else {
            imageHeight = Math.round(dimensions.height * 70 / 100);
            imageWidth = dimensions.width * 90 / 100;
            imagetop = imageHeight - 40    
        }
        console.log("Ancho: " + dimensions.width + " - Alto: " + dimensions.height)
        console.log("new ancho: " + imageWidth + " - new alto: "+ imageHeight)
        console.log("boton")
    }

    /*     if (orientationIsLandscape && !pressgirar)
        toggleorientation() */


    return (
        <View style={styles.container} >
            <View style={styles.button} >
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
                <Button
                    title="Girar"
                    onPress={() => { toggleorientation() }}
                />
            </View>
            <Video
                ref={video}
                /* style={styles.video} */
                style={{ height: imageHeight, width: imageWidth, alignSelf: "center", top: imagetop }}
                source={{
                    uri: 'https://inliveserver.com:1936/12000/12000/playlist.m3u8',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5,
    },
    video: {
        alignSelf: 'center',
        width: 320,
        height: 220
    },
    button: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 2
    }
})

export default Tele