import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './componentes/Main';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
  <NativeRouter>
    <Main />
    <StatusBar backgroundColor='black' style='light' />
  </NativeRouter>
  );
}