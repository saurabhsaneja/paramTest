import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { SearchLocation } from "../components/SearchLocation";

const Map = () => {
  const [coordinates] = useState([])
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);

  const [startLatLong, setStartLatLong] = useState({})
  const [startAddress, setStartAddress] = useState('')
  const [endLatLong, setEndLatLong] = useState({})
  const [endAddress, setEndAddress] = useState('')

  return (
    <View style={styles.container}>
      {coordinates?.length === 2 ?
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <MapViewDirections
            origin={coordinates[0]}
            destination={coordinates[1]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
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
        :
        <View>
          <SearchLocation
            placeholder='Enter Start Location'
            setLatLng={setStartLatLong}
            setAddress={setStartAddress}
          />
          <SearchLocation
            placeholder='Enter End Location'
            setLatLng={setEndLatLong}
            setAddress={setEndAddress}
          />
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
})