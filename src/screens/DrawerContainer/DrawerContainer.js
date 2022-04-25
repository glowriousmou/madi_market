import React from 'react';
import { View,Image,TouchableHighlight,Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { connect } from 'react-redux'
import MenuButton from '../../components/MenuButton/MenuButton';
import {SigOut} from "../../store/action/authActions"
import {cleanItems} from "../../store/action/orderActions"

//export default class DrawerContainer extends React.Component {
 class DrawerContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        RouteTop:[
          {
            title:"CATEGORIES",
            img:`${require('../../../assets/icons/list.png')}`,
            screen:'Categorie'

          },
          {
            title:"PRODUITS",
            img:`${require('../../../assets/icons/item.png')}`,
            screen:'AllArticle'

          },
         
        ],
        RouteBottom1:[
          {
            title:"AUTHENTIFICATION",
            img:`${require('../../../assets/icons/user.png')}`,
            screen:'SignIn'

          },          
         
        ],
        RouteBottom2:[
          {
            title:"HISTORIQUE",
            img:`${require('../../../assets/icons/ingredients.png')}`,
            screen:'Historique_Commande'

          },          
          {
            title:"DECONNEXION",
            img:`${require('../../../assets/icons/sign-out.png')}`,
            //screen:'LOGOUT'

          },          
         
        ],
        isDay:true,
        hour:null,
        
    }
  }
  componentDidMount=()=>{
  //  console.log("my user",this.props.user)
    this._get_hours()
  }
  componentDidUpdate=(prevProps,prevState)=>{
   /* const hours = new Date().getHours()
    if(hours!=this.state.hour){
      this._get_hours()
  }*/
    
  }
  _get_hours=()=>{
    const hours = new Date().getHours()
    //const isDay = hours > 6 && hours < 18
    this.setState({hour:hours})
    if(hours > 6 && hours < 18){
      this.setState({isDay:true})
    }
    else{
      this.setState({isDay:false})
    }
  }
  _user_space=()=>{

  }
  _signout_=()=>{
    console.log("Deconnexion")
 this.props.SigOut()
 this.props.cleanItems()
  }
  _on_press_=(screen)=>{
   // console.log("screen",screen)
    if(screen=="Historique_Commande"){
      this.props.navigation.replace(screen);             
      this.props.navigation.closeDrawer();
    }
    else{
      this._signout_()
      this.props.navigation.navigate("Categorie");  
    }

  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content1}>
        <TouchableHighlight onPress={this._user_space} style={styles.logoContainer}>
          <View style={styles.viewCenter}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
          {this.props.user.email !='' &&
        <View style={styles.viewName}> 
          <Text style={styles.username}>{this.state.isDay ? "Bonjour" : "Bonsoir"} {this.props.user.prenom} </Text> 
          </View>
         }
          </View>

        </TouchableHighlight>

        <View style={styles.content}>
          <View style={styles.container}>
          {this.state.RouteTop.map((i)=>{
            return(
              <MenuButton
                  title={i.title}
                  source={i.img}
                  onPress={() => {
                    navigation.navigate(i.screen);
                    //navigation.replace(i.screen);
                    navigation.closeDrawer();
                  }}
                /> 
           )
          })}
          {this.props.user.email !=""? 
            (  this.state.RouteBottom2.map((i)=>{
                return(
                  <MenuButton
                      title={i.title}
                      source={i.img}
                    //  onPress={this._signout_}
                      onPress={()=>this._on_press_(i.screen)}
                    /> 
                )
                })
            ) 
            :
            (this.state.RouteBottom1.map((i)=>{
             return(
                <MenuButton
                    title={i.title}
                    source={i.img}
                    onPress={() => {
                      navigation.navigate(i.screen);
                      //navigation.replace(i.screen);
                      navigation.closeDrawer();
                    }}
                  /> 
               )
              })
            ) }
          </View>
        </View>

        <View style={styles.viewCopyright}>       
           {/* <Text style={styles.buttonText}>Powered by</Text> */}
     
          <View style={styles.rowContainer}>
            <Image source={require('../../../assets/innovrim.png')}  style={styles.imageCopyright2} resizeMode="contain"/>         
          </View>
          <View style={styles.rowContainer}>
            <Image source={require('../../../assets/icons/copyright.png')} style={styles.icon} />
            <Text style={styles.buttonText}>2021</Text>
          </View>
      </View>
        
      </View>
    );
  }
}

// DrawerContainer.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func.isRequired
//   })
// };

const mapStateToProps = state => {
  return {
    telephone: state.authReducer.telephone,
    nom: state.authReducer.nom,
    user: state.authReducer,
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
  
  SigOut : ()  => dispatch(SigOut()),
  cleanItems : ()  => dispatch(cleanItems()),
 
}
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(DrawerContainer)
