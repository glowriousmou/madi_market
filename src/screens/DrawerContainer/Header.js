import React, {Component, useState} from 'react';
import { View,Image,TouchableHighlight,Text,StyleSheet } from 'react-native';

//import styles from './styles';
import  {backend_url} from '../api_url'

class Header extends Component{
    state={
       // img:`${backend_url}/img/header_img.jpg`
        img:null

    }
    componentDidMount=()=>{
        this._get_img()
   
     this.interval = setInterval(() =>  this._get_img() , 300000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    _get_img=()=>{
      console.log("get img start")
      this.setState({
        img:null
      },()=>{
        this.setState({
          img:`${backend_url}/img/header_img.jpg?${new Date()}`
        })
      })
     
    }
     get_url=async()=>{

        try{
            // return fetch(`${php_api}/carousel_data.php`,{
            return fetch(`${backend_url}/Header_img.php`,{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
           
            })
               .then((response) => response.json())
               //.then((response) => response.text())
                .then((responseJson) => {
                //  console.log("rsult is xx",responseJson)
                  var result=[]
                 if(responseJson.length>0){
                    console.log("rsult is xxiiii",responseJson)
                     this.setState({
                       // img: `uri:${responseJson}`
                        img: `responseJson?${new Date()}`
                     })
                    
                  }
                
                })
                .catch((error) => {
                  console.error("get_url fetch error",error);
                });
              
          
        }
        catch(error){
          
          console.log("get_url error",error)
        
        }
        

    }

    checkImageURL() {
      fetch(`${backend_url}/img/header_img.jpg`)
        .then((res) => {
          if (res.status == 404) {
           console.log("no image")
          } else {
            console.log(" image exist")
            this.setState({
              img:`${backend_url}/img/header_img.jpg?${new Date()}`
            })
          }
        })
        .catch((err) => {
          console.log("error image",err)
        });
    }
render(){
    console.log("my render xxiiiiheader ",this.state.img)
    return(
        <View style={[styles.container]}>       
       {/* <Image source={require('../../../assets/innovrim.png')}  style={styles.imageCopyright2} resizeMode="contain"/>       */}
       {/*this.state.img!=null &&
         <Image   key={new Date()} source={{uri:`${backend_url}/img/header_img.jpg`}}  style={styles.header_img} resizeMode="contain"/>  
       */}    
     {this.state.img!=null &&
         <Image   
        // key={this.state.img}
        //  source={{uri:`${backend_url}/img/header_img.jpg`}}  
          style={styles.header_img} resizeMode="contain" 
          source={{
           // uri: `${backend_url}/img/header_img.jpg?${new Date().getTime()}`,
            uri: this.state.img,
            //CACHE: 'reload',
            method: 'POST',
            headers: {  
              Pragma: 'no-cache'
            },
            body: 'Your Body goes here'
          }}
       //   onError={this._get_img}
          />    
        }  
       {/* <Image source={{uri:"http://madis-madimarket.com/img/madimarket-logo-1638920507.jpg"}}  style={styles.header_img} resizeMode="contain"/>       */}
                 
      
      
   </View>
    )
}
}

export default Header

const styles = StyleSheet.create({
    container:{
        
      //  backgroundColor:'red',
       // flexDirection: "column",
        height:100,
    },
    header_img: {
       /* width: '100%',
        height:'60%',
        //height: 155,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        shadowColor: 'blue',
     shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 3,*/
        //resizeMode:'stretch',

        height: '100%',
    width: '100%', 
	alignItems: "center",
	   resizeMode:'stretch',  
      },
  });