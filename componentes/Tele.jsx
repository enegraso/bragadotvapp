import React, { useState } from "react";
import { View, StyleSheet, Button } from 'react-native'
import Constants from 'expo-constants'
import { Video, ResizeMode } from "expo-av"
import * as ScreenOrientation from "expo-screen-orientation"

const Tele = ({link, tipo}) => {
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
        console.log(orientationIsLandscape)
    }

    const toggleorientation = () => {
        setOrientation(!orientationIsLandscape)
        changeOrientation()
        setPressgirar(true)
        console.log("boton")
    }

/*     if (orientationIsLandscape && !pressgirar)
    toggleorientation() */

    return (
        <View style={styles.container} >
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: 'https://inliveserver.com:1936/12000/12000/playlist.m3u8',
                }}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
            <View style={styles.button} >
                <Button
                    title={status.isPlaying ? 'Pause' : 'Play'}
                    onPress={() =>
                        status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                    }
                />
                <Button
                    title="Girar"
                    onPress={() => {toggleorientation()}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight + 10,
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
        margin: 10
    }
})

export default Tele