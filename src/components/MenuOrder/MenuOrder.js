import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Badge } from 'react-native-elements'
import styles from './style';

//export default class MenuOrder extends React.Component {
class MenuOrder extends React.Component {
  _go_To_Order=()=>{
   if(this.props.telephone){
    console.log(" user exist**")
    this.props.myNavigation()
    //this.props.navigation.navigate("Panier")
   }
   else{
    //console.log(" user doesn't exist")
    alert("Votre panier de commande est vide")
   }
    
    
   }
  render() {
    return (
      // <TouchableOpacity style={styles.headerButtonContainer} onPress={this._go_To_Order}>
      <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/order.png')}
        />
        {/* {this.props.badge ? */}
        {this.props.user.email!="" ?
        <Badge
        status="success"
       // value={1}
        value={this.props.item.length}
         containerStyle={{ position: 'absolute',bottom:8,left:5 }}
         // containerStyle={{ right: -7 }}
        />
    :null}
        
      </TouchableOpacity>
    );
  }
}

 MenuOrder.propTypes = {
   onPress: PropTypes.func,
//   badge: PropTypes.number,
};
const mapStateToProps = state => {
  return {
    telephone: state.authReducer.telephone,
    nom: state.authReducer.nom,
    user: state.authReducer,

    item:state.authReducer.item,
    
  }
}
const mapDispatchToProps = dispatch => {
  return {
  
    currentUser : (id,nom,telephone) => dispatch(currentUser(id,nom,telephone)),
 
}
}

export default connect(
mapStateToProps,
mapDispatchToProps
 )(MenuOrder)