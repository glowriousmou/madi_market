import React from 'react';
import { View,Image,TouchableHighlight,Text } from 'react-native';

import styles from './styles';

const Footer=()=>{
    return(
        <View style={[styles.viewCopyright,{backgroundColor:"white",marginTop:50}]}>       
       <View style={styles.rowContainer}>
         <Image source={require('../../../assets/innovrim.png')}  style={styles.imageCopyright2} resizeMode="contain"/>         
       </View>
       <View style={styles.rowContainer}>
         <Image source={require('../../../assets/icons/copyright.png')} style={styles.icon} />
         <Text style={styles.buttonText}>2021</Text>
       </View>
   </View>
    )
}

export default Footer