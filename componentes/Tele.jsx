import React, { useState, useEffect } from "react";
import { Dimensions, View, StyleSheet, Button, ScrollView } from 'react-native'
import Constants from 'expo-constants'
import { Video, ResizeMode } from "expo-av"
import * as ScreenOrientation from "expo-screen-orientation"

const Tele = ({ link, tipo }) => {

    // dimensiones para ventanita de video, serán var ya que cambian al girar pantalla
    var dimensions = Dimensions.get('window');

    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    
    //obtener rotacion de pantalla
    const [orient, setOrient] = useState(null);

    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
      };

    useEffect(() => {
        checkOrient();
        const subscription = ScreenOrientation.addOrientationChangeListener(
            handleOrientationChange
        );
        return () => {
            ScreenOrientation.removeOrientationChangeListeners(subscription);
        };
    }, []);

    const checkOrient = async () => {
        const orient = await ScreenOrientation.getOrientationAsync();
        setOrient(orient);
        console.log("girada: " + orient)
    };

    const handleOrientationChange = (o) => {
        setOrient(o.orientationInfo.orientation);
    };

    return (
        <View style={ isPortrait() ? styles.container : styles.landcontainer } >
            <View style={styles.button} >
                {isPortrait() ?
                    <Button
                        title={status.isPlaying ? 'Pause' : 'Play'}
                        onPress={() =>
                            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
                        }
                    /> : <View style="none"></View>
                }
            </View>
            <ScrollView>
                <Video
                    ref={video}
                    style={{ height: 200, width: 300, alignSelf: "center" }}
                    source={{
                        uri: 'https://inliveserver.com:1936/12000/12000/playlist.m3u8',
                    }}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                />
            </ScrollView>
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
        height: '89%',
    },
    landcontainer: {
        top: '10%',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#6804CD',
        width: '100%',
        height: '70%',
    },
    button: {
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 2
    }
})

export default Tele