import { StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { getFont } from '../helper';

const GOOGLE_MAPS_APIKEY = 'AIzaSyBJqbxRoFBbpmwDrHOtVM26s9R1Fh5UWp0';

export const SearchLocation = ({ placeholder, setLatLng, setAddress }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      textInputProps={{
        placeholderTextColor: '#c9c9c9',
        returnKeyType: 'search',
        multiline: true,
        height: 55,
      }}
      enablePoweredByContainer={false}
      listViewDisplayed={'auto'}
      styles={styles.searchbar}
      onPress={(data, details = null) => {
        setLatLng({
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng,
        });
        setAddress(data?.description);
      }}
      GooglePlacesDetailsQuery={{
        fields: 'geometry',
      }}
      fetchDetails={true}
      query={{
        key: GOOGLE_MAPS_APIKEY,
        language: 'en',
      }}
    />
  )
}
const styles = StyleSheet.create({
  searchbar: {
    description: {
      fontWeight: 'bold',
    },
    predefinedPlacesDescription: {
      color: '#1faadb',
    },
    textInputContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      // top: 50,
      // width: width - 10,
      borderWidth: 0,
      marginTop: 5,
    },
    textInput: {
      marginLeft: 0,
      marginRight: 0,
      height: 100,
      color: 'black',
      fontSize: 14,
      borderWidth: 0,
      elevation: 2,
      fontFamily: getFont('B'),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
    },
    listView: {
      // backgroundColor: 'rgba(192,192,192,0.9)',
      // top: 23,
    },
  },
})