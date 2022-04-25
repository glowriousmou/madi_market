import React, {Component} from 'react'
import { View, TextInput, Modal, Text, Image,TouchableHighlight,ActivityIndicator,Linking} from 'react-native'
import { Card,Button,Input,Header,Overlay,Avatar } from 'react-native-elements'

import Icon from 'react-native-vector-icons/FontAwesome5'
// import BackButton from '../../components/BackButton/BackButton'
import MenuImage from '../../components/MenuImage/MenuImage'
import styles from './styles'
import colors from '../../colors'
import { connect } from 'react-redux'
import {currentUser} from "../../store/action/authActions"

import {php_api,api_url,customers_key,_url,backend_url} from "../api_url"

class SignIn extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTransparent: 'true',
          title: 'Se Connecter',
          headerLeft:()=> (
            <MenuImage
              onPress={() => {
                navigation.openDrawer();
              }}
            />
          )
        };
      };
    constructor() {
        super();
        this.state = {
          phone: '',
          email: '',
          password:'',
          code: '',
          codeRequestSent: false,
          LogginIn: false,
          isLoggedin: false,
          accessToken: '',
          idToken: '',
          isLoading: false,
          errorMessage:'',
          arrdata:[]
        }
    }
    componentDidMount=()=> {
    }
    _Handle_SignIn=()=>{
        this.setState({isLoading:true,errorMessage:''})
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    try{
     /* if(this.state.phone.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre numéro de telephone'})
				this.setState({isLoading:false})
      }*/
      if(this.state.email.trim()==='' || reg.test(this.state.email)==false){
				this.setState({errorMessage:'Veuillez saisir une adresse email correcte'})
				this.setState({isLoading:false})
      }
      else if(this.state.password.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre mot de passe'})
				this.setState({isLoading:false})
      }
      else{
          this._getUser_()
console.log("email",this.state.email)
      }
    }
    catch(error){
        this.setState({errorMessage:"Une erreur s'est produite"})
        this.setState({isLoading:false})
        console.log("_Handle_SignIn error",error)
  
      }


    }
    _getUser_=async ()=>{
      try{

        return fetch(`${api_url}/customers?filter[email]=${this.state.email}&display=[passwd,email,firstname,lastname,id]&ws_key=${customers_key}&output_format=JSON`,
          {header: {
            'Content-Type': 'application/json'
           }})
         .then((response) => response.json())
         //.then((response) => response.text())
          .then((responseJson) => {
       //   console.log("*****get user finish out******",responseJson)
          if(Object.keys(responseJson).length){
            var data=responseJson.customers
           
             
            this._check_password(data)
          }
          else{
            this.setState({
              isLoading: false,
              errorMessage:"Compte inexistant. Vérifiez votre email"
            })
          }
          
          })
          .catch((error) => {
            console.error("getuser fetch  error",error);
          });

      }
      catch(error){
        this.setState({errorMessage:"Une erreur s'est produite"})
        this.setState({isLoading:false})
        console.log("_getUser_ error",error)
  
      }
    }
    _check_password=(data)=>{
      try{
        //console.log("data is",data[0].passwd) 
        //return fetch(`${php_api}/Check_psw.php`,{
       return fetch(`${backend_url}/Check_psw.php`,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
         body: JSON.stringify({
           //telephone : this.state.phone,
           psw_input : this.state.password,
           my_psw_ps:data[0].passwd,
        })
        })
           .then((response) => response.json())
           //.then((response) => response.text())
            .then((responseJson) => {
              console.log("rsult is",responseJson)
              if(responseJson=="ok"){
                this.props.currentUser(data[0].id,data[0].lastname,data[0].firstname,data[0].email)
                this.props.navigation.goBack()
                this.setState({
                  isLoading: false,
                 //errorMessage:"Compte inexistant. Vérifiez vos identifiants"
                })

              }else{
                this.setState({
                  isLoading: false,
                  errorMessage:"Mot de passe incorrect"
                })
              }
            })
            .catch((error) => {
              console.error("_check_password error",error);
            });
          
      
    }
    catch(error){
      this.setState({errorMessage:"Une erreur s'est produite"})
      this.setState({isLoading:false})
      console.log("_check_password error",error)

    }
    }
    _getUser_Old=async()=>{
        this.setState({isLoading:true})
      
        //console.log("get user startd", this.state.phone, this.state.password)
        return fetch('http://192.168.1.242/madi_market/Sign_in.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
         telephone : this.state.phone,
        // psw : this.state.password,
      })
      })
         .then((response) => response.json())
         //.then((response) => response.text())
          .then((responseJson) => {
          //console.log("*****get user finish out******",responseJson)
          if(responseJson=="No Results Found"){
            console.log("*****Aucun utilisateur******")
            this.setState({
              isLoading: false,
              errorMessage:"Compte inexistant. Vérifiez vos identifiants"
            }, function() {
              // In this block you can do something with new state.
            // console.log("****getuser  finish******",this.state.arrdata)
            });
          }
          else{
            this.setState({
              isLoading: false,
              arrdata: responseJson,
              errorMessage:'',
            }, function() {
              //alert("Succès" +this.state.arrdata[0].nom)
              //this.props.navigation.navigate('Categorie')
              this.props.currentUser(this.state.arrdata[0].id,this.state.arrdata[0].nom,this.state.arrdata[0].telephone)
              this.props.navigation.goBack()
              // In this block you can do something with new state.
             //console.log("*****getuser finish******",this.state.arrdata)
            });
          }
          })
          .catch((error) => {
            console.error("getuser error",error);
          });
      }
    _Handle_SignUp=()=>{
      this.props.navigation.replace('SignUp');
    }
    _Handle_Password_Forgotten=()=>{
      Linking
      .openURL(`http://madis-madimarket.com/index.php?controller=password`)
      .catch(err => console.error('Error', err));
    }
    render(){
        return (
            <View style={styles.container}>
               {/* <View  style={styles.logoContainer}>
                  <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                </View> */}
                 {this.state.errorMessage!="" && 
                  <View style={styles.center_view}>
                 <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                 </View>
                  } 
        {/*<View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/phone.png')}/>
          <TextInput style={styles.inputs}
              placeholder="email"
              //keyboardType="email-address"
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({phone})}/>
                </View>*/}
        
        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/password.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View> */}
        <Card containerStyle={styles.card_container}>
       
<Text style={styles.LabelBox}> Adresse Email  *</Text>
                  <Input
                      placeholder="email"
                      //errorMessage={error_message}
                     // renderErrorMessage={isError_message}
                      onChangeText={value =>this.setState({email:value})}
                      keyboardType="email-address"
                      leftIcon={
                          <Icon
                            name="at"
                            size={15}
                            color={colors.dark}
                          />
                      }
                     // maxLength= {maxLength}
                      value={this.state.email}
                      //secureTextEntry={secureTextEntry}
                      />
<Text style={styles.LabelBox}> Mot de Passe *</Text>
                  <Input
                      placeholder="Mot de passe"
                      //errorMessage={error_message}
                     // renderErrorMessage={isError_message}
                      onChangeText={value =>this.setState({password:value})}
                     // keyboardType="email-address"
                      leftIcon={
                          <Icon
                            name="lock"
                            size={15}
                            color={colors.dark}
                          />
                      }
                     // maxLength= {maxLength}
                      value={this.state.password}
                      secureTextEntry
                      />

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._Handle_SignIn}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableHighlight>
        </Card>

         <TouchableHighlight style={styles.buttonContainer} onPress={ this._Handle_Password_Forgotten}>
            <Text>Mot de passe oublié?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this._Handle_SignUp}>
            <Text>Créer un compte</Text>
        </TouchableHighlight>
        {/* {this.state.isLoading &&
        <ActivityIndicator
                      animating={this.state.isLoading}
                      color={colors.clear}
                      size="large"
                      style={{margin: 15}}
                    />
        } */}
         <Overlay isVisible={this.state.isLoading} onBackdropPress={this._close_pop_up_}>
              <Card.Title style={styles.cell_title}>___{this.state.message_traitement}___</Card.Title>
                      {this.state.isLoading &&
                              <ActivityIndicator
                              animating={this.state.isLoading}      
                              color={colors.clear}
                              size="large"
                              style={{margin: 15}}
                              />}
              </Overlay>
      </View>
        )
    }
}
//export default SignIn
const mapStateToProps = state => {
  return {
    telephone: state.authReducer.telephone,
    nom: state.authReducer.nom,
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
  
    currentUser : (id,nom,prenom,email) => dispatch(currentUser(id,nom,prenom,email)),
 
}
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(SignIn)