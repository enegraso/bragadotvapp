import React, { useState } from 'react';
import * as Device from 'expo-device';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { View } from 'react-native';

// const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-6541245434978705/4261181156';

const iosAdmobBanner = "ca-app-pub-6541245434978705/3247524916";
const androidAdmobBanner = "ca-app-pub-6541245434978705/4261181156";
const productionID = Device.osName === 'Android' ? androidAdmobBanner : iosAdmobBanner;

const TestBanner = () => {
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  return (
    <View style={{ height: isAdLoaded ? 'auto' : 0 }}>
      <BannerAd
        // It is extremely important to use test IDs as you can be banned/restricted by Google AdMob for inappropriately using real ad banners during testing
        unitId={__DEV__ ? TestIds.BANNER : productionID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
          // You can change this setting depending on whether you want to use the permissions tracking we set up in the initializing
        }}
        onAdLoaded={() => {
          setIsAdLoaded(true);
        }}
      />
      {/*     <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    /> */}
    </View>
  );
}

export default TestBanner