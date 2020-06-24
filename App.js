
import React, { useState, useEffect } from 'react';
import { Image,StyleSheet, Text, View, Dimensions,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Expo from 'expo';
import { Camera } from 'expo-camera';
import { Marker,Circle,Callout } from 'react-native-maps';
import centerPic from './assets/dog2.png';
import * as Location from 'expo-location';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id"
};

//firebase.initializeApp(firebaseConfig);


// Suppose to be a place where you can view your own photos 
function GalleryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Gallery!</Text>
    </View>
  );
}

function MapScreen() {
  // Coordinates of the Empire State Building
  let regionCoor = {
    latitude: 40.748441,
    longitude: -73.985664,
    latitudeDelta: 0.0150,
    longitudeDelta: 0.009,
  };

  
  return (
    
     //<View style={styles.container}>
      <MapView 
        initialRegion={{
          latitude: regionCoor.latitude,
          longitude: regionCoor.longitude,
          latitudeDelta: regionCoor.latitudeDelta,
          longitudeDelta: regionCoor.longitudeDelta
          }}
        style={styles.mapStyle} >

      <Circle 
        center = {{latitude: regionCoor.latitude,longitude: regionCoor.longitude}}
        radius = {300}
        fillColor={'rgba(191,191,191,0.5)'} 
      />

      {/* CENTER PIN */}
      <Marker
          coordinate = {{latitude: regionCoor.latitude,longitude: regionCoor.longitude}} 
          //onPress={e => console.log(e.nativeEvent)}
          //<Image source={logo} style={{ width: 305, height: 159 }} /> 
          //onPress={e => <View> <Image source={'..\assets\petempire.jpg'} style={{ width: 305, height: 159 }} /> </View>}
      >
        {/* <View style ={styles.container}> 
            <Image source={{centerPic}} style={{ width: 200, height: 200 }} /> 
           
           </View> */}
        <Callout>
          <Text style={{width:500,height:800,alignItems:'center',justifyContent:'center'}}>  
          <Image source={{ uri: "https://i.postimg.cc/PqCdxBwk/marumaru.jpg" }} 
            style={{ width: 419, height: 533,alignItems: 'center',flex:1,resizeMode:"cover" }} />  
            </Text>
            
        </Callout>
      </Marker>

      {/* https://i.postimg.cc/tgNNsMQ2/arthus.jpg */}
      <Marker
          coordinate = {{latitude: regionCoor.latitude+.0005,longitude: regionCoor.longitude+.0005}} 
          pinColor = {'#0000ff'}
        >
        {/* CALLOUT STYLE NOT CONTAINER */}
        <Callout style={{width:1000,height:2000}}> 
          <Text style={{width:1000,height:1000}}>  <Image source={{ uri: "https://i.postimg.cc/tgNNsMQ2/arthus.jpg" }} 
            style={{ width: 200, height: 300,alignItems: 'center',flex:1 }} />  </Text>
        </Callout>
        </Marker>


      {/*  */}
      <Marker
          coordinate = {{latitude: regionCoor.latitude-.001,longitude: regionCoor.longitude-.001}} 
          pinColor = {'#0000ff'}
      > 
      <Callout style={{width:400,height:300}}>
          <Text>  <Image source={{ uri: "https://i.postimg.cc/hhWbmHX2/sharoncats.jpg" }} 
            style={{ width: 200, height: 300,alignItems: 'center',flex:1 }} />  </Text>
      </Callout>
      </Marker>
      
          {/* https://i.postimg.cc/tTHjrzs7/hearldsquare.jpg 
            */}
      <Marker
         coordinate = {{latitude: regionCoor.latitude+.002,longitude: regionCoor.longitude-.002}}
          pinColor = {'#0000ff'}
      > 
      <Callout style={{width:500,height:500}}>
          <Text>  <Image source={{ uri: "https://i.postimg.cc/tTHjrzs7/hearldsquare.jpg " }} 
            style={{ width: 600, height: 400,alignItems: 'center',flex:1 }} />  </Text>
      </Callout>
      </Marker>

      </MapView>

     
  );
  
}

function CameraScreen() {
  //Camera
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  // Location
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
        }

        //Asks permission, gets and sets location
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location.coords.latitude);
      })();
    });

    if (hasPermission === null) {
      return <View />;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

      let text = 'Waiting..';
        if (errorMsg) {
          text = errorMsg;
        } else if (location) {
          text = JSON.stringify(location);
          // console.log(location.coords.latitude);
          // console.log(location.coords.longitude);

       }
    return (
      <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }} type={type} ref={ref => {
          setCameraRef(ref) ;
    }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end'
          }}>
        
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={async() => {
            if(cameraRef){
              let photo = await cameraRef.takePictureAsync();
              console.log('photo', photo);
            }
          }}>
            <View style={{ 
               borderWidth: 2,
               borderRadius:15,
               borderColor: 'white',
               height: 50,
               width:50,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center'}}
            >
              <View style={{
                 borderWidth: 2,
                 borderRadius:15,
                 borderColor: 'white',
                 height: 40,
                 width:40,
                 backgroundColor: 'white'}} >
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* Prints Location Coordinates to Screen */}
      {/* <Text> {text} </Text>  // this prints the whole json data */}
      {/* THIS IS CONSANTLY UPDATING */}
      <Text>Latitude: {location.coords.latitude}</Text>
      <Text>Longitude: {location.coords.longitude}</Text>
    </View>          
  );

  

  }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            // if (route.name === 'My Gallery') {
            //   iconName = focused ? 'md-grid' : 'md-grid';
            // } else 
            if(route.name === 'Camera') {
              iconName = focused ? 'md-camera' : 'md-camera';
            } else if(route.name === 'Map') {
              iconName = focused ? 'md-map' : 'md-map'; 
            }
          
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        {/* <Tab.Screen name="My Gallery" component={GalleryScreen} /> */}
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  container2: {
    width: 200,
    height: 200,

  }
});