import React,{Component} from 'react'
import { Text,Card,Input ,Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
    FlatList,
   
    View,
    Image,
    TouchableHighlight,
    ActivityIndicator,
    TouchableOpacity,
    Linking,

  } from 'react-native'

  import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

import colors from '../../colors'

export default class Categories extends Component {
    constructor(props) {
        super(props);
        this.state={
            //phone:"42587584",
            phone:"49434962",
           url:"www.madis-madimarket.com",
           msg:"Bonjour"
        }
      }

      _action_=(action)=>{
          if(action=="url"){
            Linking
            .openURL(`http://${this.state.url}`)
            .catch(err => console.error('Error', err));
          }
          else{
          /*  Linking.openURL('whatsapp://send?text=' + this.state.msg+ '&phone=+222' + this.state.phone)
            .then((data) => {
                console.log('WhatsApp Opened');
              }).catch(() => {
                alert('Make sure WhatsApp installed on your device');
              });*/
              Linking.openURL(`tel:${this.state.phone}`)

          }
      }
    render(){
        var description= "Le projet « Madi Market » est né d’une volonté de promouvoir les produits locaux mauritaniens (fruits, légumes …) par la mise en œuvre d’un circuit de distribution à Nouakchott.\n Pour cela, nous travaillons avec des coopératives féminines d’agricultrices à Nouakchott et Sélibaby.\nLes producteurs locaux disposeront, ainsi, d’un meilleur environnement pour écouler leurs produits ."
        return(
            <Card containerStyle={styles.card_container} >
                <ScrollView>
                <View style={styles.center_view}>  
                    <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                </View>
                <Card containerStyle={styles.card_container} >
               < TouchableOpacity onPress={()=>{this._action_("url")}}>
                <Input
                    value={this.state.url}
                    disabled
                    multiline
                    
                    leftIcon={
                        <Icon
                          name='globe'
                          size={15}
                          color={colors.dark}
                        />
                    }
                />
                </TouchableOpacity>
                < TouchableOpacity onPress={()=>{this._action_("phone")}}>
                <Input
                    value={this.state.phone}
                    disabled
                    multiline
                    
                    leftIcon={
                        <Icon
                          name='mobile-alt'
                          size={15}
                          color={colors.dark}
                        />
                    }
                />
                </TouchableOpacity>
                </Card>
                <Card containerStyle={styles.card_container} >
                <Text style={styles.LabelBox}> </Text>
                <Input
                    value={description}
                    disabled
                    multiline
                    style={{alignItems:"center"}}
                />
                </Card>
               
                </ScrollView>
            </Card>
        )
    }
}