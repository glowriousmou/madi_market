import React, {Component} from 'react'
import { View, TextInput, Modal, Text, Image,TouchableHighlight,ActivityIndicator} from 'react-native'
import { Card,Button,Input,Header,Overlay,Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
 import BackButton from '../../components/BackButton/BackButton'
//import MenuImage from '../../components/MenuImage/MenuImage'
import styles from './styles'
import colors from '../../colors'

import { connect } from 'react-redux'
import {currentUser} from "../../store/action/authActions"
import {php_api,api_url,customers_key,_url,backend_url} from "../api_url"
class SignUp extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          headerTransparent: 'true',
          title: 'Créer un compte',
          headerLeft:()=> (
            <BackButton
            onPress={() => {
              navigation.goBack();
            }}
          />
          )
        };
      };
    constructor() {
        super();
        this.state = {
          phone: '',
          nom:'',
          prenom:"",
          psw:"",
          email:"",
          code: '',
          codeRequestSent: false,
          LogginIn: false,
          isLoggedin: false,
          accessToken: '',
          idToken: '',
          isLoading: false,
          errorMessage:'',
          arrdata:[],
          message_traitement:"",
        }
    }
    componentDidMount=()=> {
    }
    _Check_data=()=>{
        this.setState({isLoading:true,errorMessage:'',message_traitement:"Vérification des Champs"})
        let isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        var hasNumber = /\d/
    try{
      if(this.state.email.trim()==='' || isEmail.test(this.state.email)==false){
				this.setState({errorMessage:'Veuillez saisir une adresse email correcte'})
				this.setState({isLoading:false,message_traitement:''})
      }
      
      else if(this.state.prenom.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre prenom'})
				this.setState({isLoading:false,message_traitement:''})
      }
      else if(hasNumber.test(this.state.prenom)==true){
        this.setState({errorMessage:'Le prenom ne peut contenir des caractères numériques '})
				this.setState({isLoading:false,message_traitement:''})
      }
      else if(this.state.nom.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre nom'})
				this.setState({isLoading:false,message_traitement:''})
      }
      else if(hasNumber.test(this.state.nom)==true){
        this.setState({errorMessage:'Le nom ne peut contenir des caractères numériques '})
				this.setState({isLoading:false,message_traitement:''})
      }
      else if(this.state.psw.trim()==='' ||this.state.psw.length<6){
				this.setState({errorMessage:'Veuillez saisir votre mot de passe avec au moins 6 caractères'})
				this.setState({isLoading:false,message_traitement:''})
      }
      else{
          this._check_email()

      }
    }
    catch(error){
        this.setState({errorMessage:"Une erreur s'est produite"})
        this.setState({isLoading:false,message_traitement:''})
        console.log("_Handle_SignIn error",error)
  
      }


    }
_check_email=()=>{
  this.setState({message_traitement:""})
  try{
    return fetch(`${api_url}/customers?filter[email]=${this.state.email}&display=[passwd,email,firstname,lastname,id]&ws_key=${customers_key}&output_format=JSON`,
          {header: {
            'Content-Type': 'application/json'
           }})
         .then((response) => response.json())
          .then((responseJson) => {
         // console.log("*****get user finish out******",responseJson)
          if(Object.keys(responseJson).length){
            var data=responseJson.customers            
           // this._check_password(data)
           this.setState({
            isLoading: false,
            errorMessage:"Compte déjà existant, Connectez vous"
          })
          }
          else{
            this._save_user()
          }
          
          })
          .catch((error) => {
            console.error("getuser fetch  error",error);
          });


  }
  catch(error){
    this.setState({errorMessage:"Une erreur s'est produite"})
    this.setState({isLoading:false})
    console.log("_check_email error",error)

  }
}

_save_user=()=>{
  this.setState({message_traitement:"Création du compte"})
  try{
  //  return fetch(`${php_api}/Create_customer.php`,{
    return fetch(`${backend_url}/Create_customer.php`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
     body: JSON.stringify({
       
      nom : this.state.nom,
      prenom : this.state.prenom,
      email : this.state.email,
       psw : this.state.psw,
       customers_key:customers_key,
       _url:_url,
      
    })
    })
      // .then((response) => response.json())
       .then((response) => response.text())
        .then((responseJson) => {
          console.log("type of rsult is****",typeof(responseJson),isNaN(responseJson))
          console.log("rsult is****",responseJson)
         // console.log("msg is",responseJson.msg)
       //  console.log(isNaN(responseJson))
          //if(typeof(responseJson)=='string'){
          if(isNaN(responseJson)==false){
            //this.props.currentUser(data[0].id,data[0].lastname,data[0].email)
            //var x_=responseJson.id
            //console.log("id is",x_)
            //var id_=x_.0
            this.props.currentUser(responseJson,this.state.nom,this.state.prenom,this.state.email)
            this.props.navigation.goBack()
            this.setState({
              isLoading: false,
             //errorMessage:"Compte inexistant. Vérifiez vos identifiants"
            })

          }else{
            this.setState({
              isLoading: false,
              errorMessage:"Une erreur s'est produite"
            })
          }
        })
        .catch((error) => {
          console.error("_save_user fetch error",error);
          this.setState({
            isLoading: false,
            errorMessage:"Une erreur s'est produite au niveau du serveur"
          })
        });
  }
  catch(error){
    this.setState({errorMessage:"Une erreur s'est produite"})
    this.setState({isLoading:false})
    console.log("_save_user error",error)

  }

}

    _getUser_=async()=>{
        this.setState({isLoading:true})
      
        //console.log("get user startd", this.state.phone, this.state.password)
        return fetch('http://192.168.1.46/madi_market/Sign_in.php',{
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
              //isLoading: false,
              errorMessage:""
            }, function() {
              // In this block you can do something with new state.
            // console.log("****getuser  finish******",this.state.arrdata)
            });
            this._Handle_SignUp()
          }
          else{
            console.log("*****utilisateur exist******",)
            this.setState({
              isLoading: false,
              //arrdata: responseJson,
              errorMessage:'Compte existant, Connectez vous',
            }, function() {
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
      return fetch('http://192.168.1.46/madi_market/Sign_up.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
         telephone : this.state.phone,
         nom : this.state.nom,
      })
      })
         .then((response) => response.json())
        // .then((response) => response.text())
          .then((responseJson) => {
          //console.log("*****get user finish out******",responseJson)
          if(responseJson=="Success"){
            console.log("*****Successr******")
             this.setState({
               isLoading: false,
               errorMessage:""
            }, function() {
              // In this block you can do something with new state.
            // console.log("****getuser  finish******",this.state.arrdata)
            });

            alert("Compte  créer avec succès")
            //this.props.navigation.navigate('Categorie')
            this.props.currentUser(this.state.id,this.state.nom,this.state.phone)
            this.props.navigation.goBack()
          }
          else{
            this.setState({
              isLoading: false,
              //arrdata: responseJson,
              errorMessage:"Une erreur s'est produite",
            }, function() {
              // In this block you can do something with new state.
             //console.log("*****getuser finish******",this.state.arrdata)
            });
          }
          })
          .catch((error) => {
            console.error("signup error",error);
          });

    }
    _Handle_Password_Forgotten=()=>{

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
        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/phone.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Telephone"
              //keyboardType="email-address"
              keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(phone) => this.setState({phone})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/user2.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Nom"
              autoCapitalize = 'words'
              //keyboardType="email-address"
             // keyboardType="phone-pad"
              underlineColorAndroid='transparent'
              onChangeText={(nom) => this.setState({nom})}/>
        </View> */}
        <Card containerStyle={styles.card_container}>
        <Text style={styles.LabelBox}> Adresse Email  *</Text>
        <Input
                      placeholder="email"
                     
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
        <Text style={styles.LabelBox}> Prenom *</Text>
        <Input
                      placeholder="Prenom"
                     
                      onChangeText={value =>this.setState({prenom:value})}
                     
                      leftIcon={
                          <Icon
                            name="user"
                            size={15}
                            color={colors.dark}
                          />
                      }
                  
                      value={this.state.prenom}
                      
                      />
        <Text style={styles.LabelBox}> Nom *</Text>
        <Input
                      placeholder="Nom"
                     
                      onChangeText={value =>this.setState({nom:value})}
                     
                      leftIcon={
                          <Icon
                            name="user"
                            size={15}
                            color={colors.dark}
                          />
                      }
                  
                      value={this.state.nom}
                      
                      />
        <Text style={styles.LabelBox}> Mot de passe  *</Text>
        <Input
                      placeholder="Mot de passe"
                     
                      onChangeText={value =>this.setState({psw:value})}
                     
                      leftIcon={
                          <Icon
                            name="lock"
                            size={15}
                            color={colors.dark}
                          />
                      }
                  
                      value={this.state.psw}
                      secureTextEntry
                      
                      />
                      <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._Check_data}>
                      <Text style={styles.loginText}>Créer le compte</Text>
                    </TouchableHighlight>
            </Card>
        
        

        
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
       
        {/*this.state.isLoading &&
        <ActivityIndicator
                      animating={this.state.isLoading}
                      color={colors.clear}
                      size="large"
                      style={{margin: 15}}
                    />
        */ }
      </View>
        )
    }
}
//export default SignUp

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
)(SignUp)