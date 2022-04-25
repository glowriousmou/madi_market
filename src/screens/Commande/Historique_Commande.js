import React,{Component} from 'react'
import {View,TouchableHighlight,FlatList,Image,TextInput,PermissionsAndroid,ActivityIndicator,Dimensions} from "react-native"

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
//import { Overlay,PricingCard ,Card,Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast'
import {Dropdown} from 'react-native-element-dropdown';

import BackButton from '../../components/BackButton/BackButton'
import styles,{styles_dropdown} from '../Article/styles'
import {styles_adress} from '../Article/stylesPanier'
import colors from '../../colors'
import {api_url,backend_url,_url,php_api,adress_key,carts_key,orders_key} from "../api_url"
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuOrder from '../../components/MenuOrder/MenuOrder';
import { createSwitchNavigator } from 'react-navigation';
import { Text ,Card,Button,Input,Header,CheckBox,Overlay,Tooltip,ListItem,Badge } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
class Historique_Commande extends Component {
    
    static navigationOptions = ({ navigation }) => {
        return {
        //  headerTransparent: 'false',
          title: 'Historique Commande',
        headerLeft:()=> (
            <MenuImage
              onPress={() => { 
                navigation.openDrawer();
              }}
            />
          ),
          headerRight:()=> (
        
            <MenuOrder
              onPress={() => {
                navigation.navigate("Panier")
                //console.log("i'm onPress")
              }}
             
            />
            
          ),
            }
    }
    constructor(props){
        super(props)
        this.state={
            arrData:[],
            error_msg:'',
            isLoading:false
        }
    }
    componentDidMount=()=>{
        this._get_List()
    }
    _get_List=()=>{
        this.setState({
            isLoading:true,
            error_msg:""
        })
        try{
            // return fetch(`${api_url}/orders?ws_key=${orders_key}&output_format=JSON&display=[id,reference,date_add,total_paid,id_cart]&filter[id_customer]=${this.props.user.id}`,
            return fetch(`${api_url}/orders?ws_key=${orders_key}&output_format=JSON&display=full&filter[id_customer]=${this.props.user.id}&sort=[invoice_date_DESC]`,
            {header: {
             'Content-Type': 'application/json'
            }})
             .then((response) => response.json())
              .then((responseJson) => {
             //  console.log("my start",responseJson)
              if(Object.keys(responseJson).length){
              var data=responseJson.orders
              var result=[]
              var last_item=data[data.length-1].id
          
        //console.log("my adresses",data.id)
             // data.map(i=>{
               // console.log("my adresses xx",i.invoice_date)
                this.setState({
                    arrData:data,
                    isLoading:false
                    
                })
            // })
            }
            else{
                
                    this.setState({
                      
                      error_msg:"Aucun Résultat",
                      isLoading:false
                      
                    })
            }
        })

        .catch((error) => {
            console.error("_get_List error",error);
            this.setState({
              isLoading: false,
              error_msg:"Impossible de se connecter au serveur"
            })
          });

        }
        catch(error){
            this.setState({
              error_msg:"Une erreur s'est produite",
              isLoading:false
            })
         
          console.log("_get_List error",error)
          }
    }

    renderItem = ({ item}) => {
        var date_add=""
     
    // console.log(typeof(item.date_add))
        try{
      if(item.date_add.trim()!= ""){
              var _date_=new Date(item.date_add)
              //var _date_=item.date_add
              
              var date=_date_.getDate().toString()
             // var month=monthNames[_date_.getMonth()].toString()
            //  var month=_date_.getMonth().toString()
              var year=_date_.getFullYear().toString()
             
           
              //date_add=date.concat(' ',month,' ',year)
             // console.log("date is ",date)
        }
      }
      catch(error){
        console.log("render item list get date modif error",error)  
      }
     // console.log("item list",item.nom,item.etat)
              return(
               
              <ListItem 
              bottomDivider
             // containerStyle={{backgroundColor:`${item.eta==2? "#175411" : "#52C436" }`,marginBottom:10,borderRadius:20}}
              containerStyle={{margin:15,borderRadius:20,backgroundColor:'white'}}
              onPress={()=>this._go_to_details(item)}
              >
                {/* <Avatar source={{uri: item.avatar_url}} /> */}
                <Badge
                      //value={3}
                      //textStyle={{ color: 'orange' }}
                      containerStyle={{ marginTop: -20 }}
                      status={`${item.current_state==5?"success":(item.current_state==6 ?"error":"warning")}`}
                      //badgeStyle={{backgroundColor:`${item.etat==2? "#175411" : "#52C436" }`}}
                      size="large"
                  />
                <ListItem.Content>
                  <ListItem.Title>Montant:{trimStringAfter(item.total_paid,'.')} MRU </ListItem.Title>
                  <ListItem.Subtitle>Référence:{item.reference}</ListItem.Subtitle>
                 <ListItem.Subtitle> {"Date de Création"} : {item.date_add}</ListItem.Subtitle> 
                </ListItem.Content>
                <ListItem.Chevron />
                {/* <Icon name={item.statut==0 ? 'check' :'check-double'} color={item.statut==0 ? 'gray' :colors.medium} /> */}
              </ListItem>
             
              )
              }

              _go_to_details = item => {
                this.props.navigation.navigate('Details_Commande', { item });
              
              }
    render() {
        return (
            <View style={[styles.contentView,{marginBottom:50}]}>
              <View style={[styles_adress.center_view]}> 
               <Text  style={{color:'red'}}>{this.state.error_msg}</Text>
               </View>
              {/* <ScrollView style={{backgroundColor:'',margin:15}}> */}
                    <FlatList
                    
                  //  keyExtractor={(item) => item.id_dossier}
                    data={this.state.arrData}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    refreshing={this.state.isLoading}
                    onRefresh={this._get_List}
                    contentContainerStyle={{marginTop:10,marginBottom:50}}
                    />
                    {/* </ScrollView> */}
            </View>
            )
        }
    
}


function trimStringAfter(haystack, needle) {
    const lastIndex = haystack.lastIndexOf(needle)
    return haystack.substring(0, lastIndex === -1 ? haystack.length : lastIndex + 0)
  }

const mapStateToProps = state => {
    return {
      
      user: state.authReducer,

    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      updateItems : (item) => dispatch(updateItems(item))
     
      
  }
  }

  
  const monthNames = ["Janvier", "Fevrier", "MArs", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Decembre"
];
  export default connect(
    mapStateToProps,
    mapDispatchToProps
    )(Historique_Commande)
  
  