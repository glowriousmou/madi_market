import React, {Component} from 'react'
import {Button, View, TextInput, Modal, Text, Image,TouchableHighlight,ActivityIndicator} from 'react-native'

// import BackButton from '../../components/BackButton/BackButton'
import MenuImage from '../../components/MenuImage/MenuImage'
import styles from './styles'
import colors from '../../colors'

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
    try{
      if(this.state.phone.trim()===''){
				this.setState({errorMessage:'Veuillez saisir votre numéro de telephone'})
				this.setState({isLoading:false})
      }
      // else if(this.state.password.trim()===''){
			// 	this.setState({errorMessage:'Veuillez saisir votre mot de passe'})
			// 	this.setState({isLoading:false})
      // }
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
              alert("Succès")
              this.props.navigation.navigate('Categorie')
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
      this.props.navigation.navigate('SignUp');
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
        
        {/* <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../../../assets/icons/password.png')}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View> */}

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._Handle_SignIn}>
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={ this._Handle_Password_Forgotten}>
            <Text>Mot de passe oublié?</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={this._Handle_SignUp}>
            <Text>Créer un compte</Text>
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
export default SignIn