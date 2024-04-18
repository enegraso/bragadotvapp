import React, { useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './componentes/Main';
import { StatusBar } from 'expo-status-bar';
import mobileAds from 'react-native-google-mobile-ads';

export default function App() {
  useEffect(() => {
    (async () => {
      // Google AdMob will show any messages here that you just set up on the AdMob Privacy & Messaging page
      const { status: trackingStatus } = await requestTrackingPermissionsAsync();
      if (trackingStatus !== 'granted') {
        // Do something here such as turn off Sentry tracking, store in context/redux to allow for personalized ads, etc.
      }

      // Initialize the ads
      await mobileAds().initialize();
    })();
  }, [])

  return (
    <NativeRouter>
      <Main />
      <StatusBar backgroundColor='blue' style='light' />
    </NativeRouter>
  );
}