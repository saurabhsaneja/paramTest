import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SearchLocation } from "../components/SearchLocation";
import { getFont } from "../helper";
import Toast from 'react-native-simple-toast'
const GOOGLE_MAPS_APIKEY = 'AIzaSyAk2zPbXv_tjRhyLSf4AxDW9QGx55tfyas';

const Map = () => {
  const [coordinates] = useState([])
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [startLatLong, setStartLatLong] = useState({})
  const [startAddress, setStartAddress] = useState('')
  const [endLatLong, setEndLatLong] = useState({})
  const [endAddress, setEndAddress] = useState('')
  const [isLocationSet, setIsLocationSet] = useState(false)

  const ifStartAndEndData = () => {
    if (Object.keys(startLatLong)?.length === 2 && Object.keys(endLatLong)?.length === 2) {
      return true
    }
    return false
  }
  // useEffect(() => {
  //   if(ifStartAndEndData()){
  //     setIsLocationSet(true)
  //   }
  // }, [startLatLong, endLatLong])
  const ChangeLocationButton = () => {
    return (
      <TouchableOpacity onPress={() => {
        setIsLocationSet(false)
        setStartLatLong({})
        setEndLatLong({})
        setStartAddress('')
        setEndAddress('')
      }} style={styles.button} >
        <Text style={styles.text} >Change Location</Text>
      </TouchableOpacity>
    )
  }
  const SubmitLocation = () => {
    return (
      <TouchableOpacity onPress={() => {
        if (ifStartAndEndData()) {
          setIsLocationSet(true)
        } else {
          if (Object.keys(startLatLong)?.length !== 2) {
            Toast.show(`Please add start location`)
          } else if (Object.keys(endLatLong)?.length !== 2) {
            Toast.show(`Please add end location`)
          }
        }
      }
      } style={styles.button} >
        <Text style={styles.text} >Submit Location</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      {isLocationSet ?
        <>
          <ChangeLocationButton />
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={{
              ...startLatLong,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <MapViewDirections
              origin={startLatLong}
              destination={endLatLong}
              waypoints={
                [startLatLong, endLatLong].length > 2 ? [startLatLong, endLatLong].slice(1, -1) : undefined
              }
              splitWaypoints={true}
              precision="high"
              timePrecision="now"
              mode="DRIVING"
              apikey={GOOGLE_MAPS_APIKEY} // insert your API Key here
              strokeWidth={6}
              strokeColor={'green'}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                setTotalDistance(result.distance);
                setTotalDuration(result.duration);
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
              }}
              optimizeWaypoints={true}
            />
          </MapView>
        </>
        :
        <View style={{ flex: 1 }} >
          <SearchLocation
            placeholder='Enter Start Location'
            setLatLng={setStartLatLong}
            setAddress={setStartAddress}
            address={startAddress}
          />
          <SearchLocation
            placeholder='Enter End Location'
            setLatLng={setEndLatLong}
            setAddress={setEndAddress}
            address={endAddress}
          />
          <SubmitLocation />
        </View>
      }
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  mapStyle: {
    flex: 1,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 20,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center",
    marginVertical: 10
  },
  text: {
    color: "white",
    fontSize: 20,
    fontFamily: getFont("M")
  }
})