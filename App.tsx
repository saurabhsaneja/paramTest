//import : react components
import React, { useEffect } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Text,
  LogBox
} from 'react-native';
import Map from './src/screens/Map';
const App = () => {

  //UI
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'black'} />
      <Map />
    </SafeAreaView>
  );
};

export default App;