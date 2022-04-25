import React, {Component} from 'react'
import {Button, View, TextInput, Modal, Text, Image,TouchableHighlight,ActivityIndicator} from 'react-native'
 import BackButton from '../../components/BackButton/BackButton'
//import MenuImage from '../../components/MenuImage/MenuImage'
import styles from './styles'
import colors from '../../colors'

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
    try{
      if(this.state.phone.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre numéro de telephone'})
				this.setState({isLoading:false})
      }
      else if(this.state.nom.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre nom'})
				this.setState({isLoading:false})
      }
      else{
          this._getUser_()

      }
    }
    catch(error){
        this.setState({errorMessage:"Une erreur s'est produite"})
        this.setState({isLoading:false})
        console.log("_Handle_SignIn error",error)
  
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
            this.props.navigation.navigate('Categorie')
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
                 {this.state.errorMessage!="" && 
                  <View style={styles.msgContainer}>
                 <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
                 </View>
                  } 
        <View style={styles.inputContainer}>
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
        </View>
        
        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/password.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._Handle_SignIn}>
          <Text style={styles.loginText}>Créer le compte</Text>
        </TouchableHighlight>

       
        {this.state.isLoading &&
        <ActivityIndicator
                      animating={this.state.isLoading}
                      color={colors.clear}
                      size="large"
                      style={{margin: 15}}
                    />
        }
      </View>
        )
    }
}
export default SignUp