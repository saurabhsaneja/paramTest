//import : react components
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Text,
  LogBox,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import Map from './src/screens/Map';
import Pagination from './src/screens/Pagination';
import { getFont } from './src/helper';
const App = () => {
  const [whichScreen, setWhichScreen] = useState(1)
  const changeTab = (type) => {
    if (type === whichScreen) {
      return
    }
    setWhichScreen(type)
  }
  const BottomTab = () => {
    return (
      <View style={styles.bottomTab} >
        <TouchableOpacity onPress={() => changeTab(1)} style={[styles.button, whichScreen === 2 ? { backgroundColor: 'white' } : null]} >
          <Text style={[styles.text, whichScreen === 2 ? { color: 'black' } : null]} >Map</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changeTab(2)} style={[styles.button, whichScreen === 1 ? { backgroundColor: 'white' } : null]}>
          <Text style={[styles.text, whichScreen === 1 ? { color: 'black' } : null]} >Pagination</Text>
        </TouchableOpacity>
      </View>
    )
  }
  //UI
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor={'black'} />
      {whichScreen === 1 ?
        <Map />
        :
        <Pagination />
      }
      <BottomTab />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  bottomTab: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    width: '50%',
    height: '100%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: 'black',
    borderTopWidth: 1
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: getFont('M')
  }
})