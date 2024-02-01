import react from "react";
import { View, Text, StyleSheet } from 'react-native'
/* import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6541245434978705~6536028698'; */

const Info = () => {
    return (
        <View style={styles.container} >
            <Text style={styles.titulo}>Home de la App</Text>
            {/*             <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
    },
    titulo: {
        justifyContent: "center",
        alignItems: "center",
        color: "green"
    }
})

export default Info