import React,{useEffect} from 'react';
import { StyleSheet, Text, View,Alert,Linking,BackHandler,ScrollView } from 'react-native';
import AppContainer from './src/navigations/AppNavigation';
import {Provider} from 'react-redux'
import VersionCheck from 'react-native-version-check'

import {store}  from './src/store/configureStore'

import Footer from './src/screens/DrawerContainer/Footer'
import Header from './src/screens/DrawerContainer/Header'

export default function App() {
  useEffect(()=>{
    checkVersion()
  },[])

  const checkVersion=async()=>{
    try{
      let updateNeeded= await VersionCheck.needUpdate()
      if(updateNeeded && updateNeeded.isNeeded){
        Alert.alert(
          'Mise à jour Disponible',
          'Veuillez mettre votre application à jour afin de profiter de la dernière version',
          [
            {
              text:'Mise à jour',
              onPress:()=>{
                BackHandler.exitApp();
                Linking.openURL(updateNeeded.storeUrl);
              },
            },
          ],
          {cancelable:false}
        );

      }
     
    }
    catch(error){
      console.log("checkVersion error",error)
    }
  }

  return (
    <Provider store={store}>
      <Header/>
      
     <AppContainer />
     {/* <Footer/> */}
      
     </Provider>
  );
}



