import React,{Component} from 'react'
import {View,TouchableHighlight,FlatList,Text,Image,TextInput,PermissionsAndroid,ActivityIndicator,Dimensions, ScrollView} from "react-native"

import Toast from 'react-native-simple-toast'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

import styles,{styles_adress} from './stylesPanier'
import styles2 from './styles'
import styles3 from './stylesDetail'
import BackButton from '../../components/BackButton/BackButton'
import { Overlay,PricingCard ,Card,Input } from 'react-native-elements';
import Geolocation from 'react-native-geolocation-service'
import * as Progress from 'react-native-progress';

import {removeItems,updateItems} from "../../store/action/authActions"
import colors from '../../colors'
import {Pop} from '../../AppStyles'

import {api_url,backend_url,_url,php_api,adress_key} from "../api_url"

class Panier extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
         // headerTransparent: 'true',
          title: 'Panier',
          headerLeft:()=> (
            <BackButton
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        };
    }
    constructor(props){
        super(props)
        this.state={
          date : new Date().getDate(),
            month : months[new Date().getMonth()],
            year : new Date().getFullYear(),


            isAuth:false,
            isEmpty:false,
           montant_total:0,
           total_shipping:0,
            isPop:false,
            isPopComment:false,
            showDescription:"",
            comment:"",
            adresse:"",
            longitude:0,
            latitude:0,

            isPop_Adress:false,


           // progress:this.props.item.length
            progress:0,
            x:0,
            i:0,
            isLoading:false,
            isTraitement:false,

            titre_adresse:'',
            adresse1:'',
            adresse2:"",
            telephone:"",
            error_msg:'',
            id_adress:0,
            id_card:0,
            
        }
    }
    componentDidMount=()=>{
      //  console.log(" my item ///**",this.props.user)
        this._user_State()
       this._check_Panier()
       this._montant_total()
       //this._getLocation_()
    }
    componentDidUpdate=(prevProps,prevState)=>{
      if(prevProps.item!=this.props.item){
        this._check_Panier()
        this._montant_total()
        //this.setState({ progress:this.props.item.length})

      }
      if(prevProps.user.email!=this.props.user.email){
        this._user_State()
      }
if(prevState.i!=this.state.i){
      if(this.state.i==this.state.x){
        var that=this
       setTimeout(() => {
          console.log("item is empty")
          that.toggleOverlayComment()
        Toast.showWithGravity("Commande envoyée avec succès", Toast.LONG, Toast.BOTTOM);
        that.props.navigation.replace("Categorie")
        }, 200);
        
      }
    }

    }

    _getLocation_=async ()=>{
      try {
        this.setState({isLoading:true,isTraitement:true})
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Madi Market ',
            'message': 'Accès à la géolocalisation',
            buttonNegative: 'Refuser',
          buttonPositive: 'Accepter',

          }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         // console.log("You can use the location")
          //alert("You can use the location");
          //if (hasLocationPermission) {
            Geolocation.getCurrentPosition(
                (position) => {
               //   console.log("Position latitude is",position.coords.latitude);
                //  console.log("Position longitude is",position.coords.longitude);
                  this.setState({
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude,
                    isLoading:false,
                    isTraitement:false,
                  })
                },
                (error) => {
                  // See error code charts below.
                  console.log("get Location error",error.code, error.message);
                  this.setState({ 
                    isLoading:false,
                    isTraitement:false,
                  })
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
         // }
        } else {
          console.log("location permission denied")
          alert("Sans géolocalisation la commande ne pourra être effectuée");
          this.setState({ 
            isLoading:false,
            isTraitement:false,
          })
         // this._getLocation_()
        }
      } catch (err) {
        console.warn("geolocation permission error",err)
        this.setState({ 
          isLoading:false,
          isTraitement:false,
        })
      }
     
    }
    _check_Panier=()=>{
        if(this.props.item.length==0){
            this.setState({isEmpty:true})
        }
        else{
          this._getLocation_()
        }
    }
   _user_State=()=>{
        if(this.props.user.email){
         //console.log(" user exist**")
         this.setState({isAuth:true})
        
        }
        else{
         //console.log(" user doesn't exist")
         alert("Votre panier  est vide")
        }
         
         
        }
        _Showdescription=(description)=>{
          console.log("my description is",description)
          this.setState({showDescription:description})
          this.toggleOverlay()
         

        }
        toggleOverlay=()=>{
          this.setState({isPop:!this.state.isPop})
        }
        
        toggleOverlayComment=()=>{
          if(!this.state.ispopComment){
            console.log("change progress")

          }
          this.setState({isPopComment:!this.state.isPopComment})
          
        }
  _montant_total=()=>{
    var montant=0
    var my_total_shipping=0
    var last_item=this.props.user.item[this.props.user.item.length-1]
    {this.props.item.map(i=>{
      montant=montant+i.prix_t
      if(last_item.id_article==i.id_article){
        if(montant<1000){
          
          my_total_shipping=100
        }
      }
    })}
    this.setState({
      montant_total:montant+my_total_shipping,
      total_shipping:my_total_shipping
    })
  }  
  renderItem=({item})=>{
     //console.log("my item",item)
    return(
        <View style={styles.ItemContainerView}>
            <View style={{width:"20%"}}>
             <Image style={styles.itemPhoto} source={{ uri: item.img }}resizeMode="contain" />
             <Text style={styles.itemText}>{item.unit}</Text>
             </View>
             <View style={{width:"60%"}}>
        <PricingCard
        color={colors.dark}
        titleStyle={styles.itemDesignation}
        containerStyle={{backgroundColor:"",marginTop:15, height:215}}
        title={`${item.designation}`}
        price={`${item. prix_u} MRU/unit`}
        pricingStyle={{fontSize:20}}
        info={[ "Prix Total"]}
        button={{ title: `${item.prix_t}`,buttonStyle: styles3.pricingButtonStyle }}
        //onButtonPress={this.remove_article}
       
      />
      </View>
      <View style={{alignItems:"center",justifyContent:"center",backgroundColor:"",flex:1}}>
      <Text style={styles.itemText}>Quantité:</Text>
      <View style={styles.rowContainerView}>
      <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.buttonAction} onPress={this.edit_quant.bind(this,item,"less")}>
       
         <Image style={styles.infoPhoto} source={require('../../../assets/icons/minus.png')} resizeMode="contain"/>
      </TouchableHighlight>
      <TextInput
        style={styles.inputText}
       // onChangeText={quant => this.setState({ quant })}
        value={`${item.quant}`}
        keyboardType='numeric'
        editable={false}
        //value={1}
                                    
        />
        {item.quant<item.stock_quant ?
         <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.buttonAction} onPress={this.edit_quant.bind(this,item,"more")}>
        
         <Image style={styles.infoPhoto} source={require('../../../assets/icons/add.png')} resizeMode="contain"/>
      </TouchableHighlight>
      :
         <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.buttonAction} onPress={this.edit_quant.bind(this,item,"no_more")}>
        
         <Image style={styles.infoPhoto} source={require('../../../assets/icons/add.png')} resizeMode="contain"/>
      </TouchableHighlight>
  }

        </View>
         <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.buttonAction} onPress={this._Showdescription.bind(this,item.description)}>
         {/* <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={styles.buttonAction} onPress={this.toggleOverlay}> */}
         <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} resizeMode="contain"/>
         </TouchableHighlight>
         <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' style={[styles.buttonAction,{marginLeft:5}]} onPress={this.remove_article.bind(this,item)}>
         <Image style={styles.infoPhoto} source={require('../../../assets/icons/delete.png')}  resizeMode="contain" />
         </TouchableHighlight>
        </View>
        <Overlay isVisible={this.state.isPop} onBackdropPress={this.toggleOverlay}>
                <View style={Pop.popContent}>
                <View style={Pop.popContainer}>
                    <Text  style={Pop.popTitre}>{this.state.showDescription}</Text>
                  
              </View>
              </View>
              </Overlay>
      </View>
    )
  }
  remove_article=(item)=>{
     this.props.removeItems(item)
     Toast.showWithGravity("Le produit a été supprimé du panier", Toast.LONG, Toast.BOTTOM);
  }
  edit_quant=(myitem,action)=>{
    var quant=myitem.quant
    //console.log("my item",myitem.quant)
    if(quant>1){
      if(action=="more"){
        console.log("more and more")
        quant=quant+1
      }
      if(action=="less"){
        console.log("less and less")
        quant=quant-1
      }
      if(action=="no_more"){
       /// console.log("less and less")
       Toast.show("Impossible de commander plus", Toast.LONG) 
      }
      
    }
   else if(quant==1){
      if(action=="more"){
        console.log("more and more")
        quant=quant+1
      }
    }
    // else if(quant==myitem.stock_quant){
    //   if(action=="more"){
        
    //     Toast.show("Impossible de commander plus", Toast.LONG) 
    //   }

    // }
   var prix_t=myitem.prix_u*quant
  
   
    let newarrdata = [...this.props.item];
let index = newarrdata.findIndex(el => el.id_article === myitem.id_article);
//newarrdata[index] = {...newarrdata[index], quant: quant};
newarrdata[index]={
  "id_article":myitem.id_article,
 "id_categorie":myitem.id_categorie,
  "prix_u":myitem.prix_u,
  "quant":quant,
  "prix_t":prix_t,
  "designation":myitem.designation,
  "description":myitem.description,
  "img":myitem.img,
  "unit":myitem.unit,
  "stock_quant":myitem.stock_quant,
  "reference":myitem.reference,
}
//console.log("my final item",newarrdata)
//console.log("my final item quant ",index,quant,prix_t)
this.props.updateItems(newarrdata)

  }
  _order_=()=>{
   
    if(this.state.longitude==0 || this.state.latitude==0){
      //alert("Veuillez activer la géolocalisation")
      this._getLocation_()
    }
    else{
      this.setState({x:this.props.item.length+1,i:1},function(){
        this.setState({progress:this.state.i/this.state.x},function(){

        //  console.log("my progress 0000",this.state.i,this.state.x,this.state.progress)
    let monJour=this.state.date.toString()
    let monMois=this.state.month.toString()
    let monAnnee=this.state.year.toString()
   // let mydate=monJour.concat('/',monMois,'/',monAnnee);
    let mydate=monAnnee.concat('/',new Date().getMonth()+1,'/',monJour);
    return fetch('http://192.168.1.242/madi_market/Save_Order.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
     body: JSON.stringify({
       telephone : this.props.telephone,
       commentaire : this.state.comment,
       longitude : this.state.longitude,
       latitude : this.state.latitude,
       adresse : this.state.adresse,
       id_utilisateur : 0,
       montant : this.state.montant_total,
       date:mydate,
    })
    })
       .then((response) => response.json())
      // .then((response) => response.text())
        .then(async (responseJson) => {
          console.log("my result",responseJson)
        if(responseJson=="Error"){
          this.setState({
            isLoading: false,
            errorMessage:"Une erreur s'est produite",
            progress:0,
          }, function() {
           // this.setState({})
           //console.log("*****getuser finish******",this.state.arrdata)
          });

        }
        else{
          console.log("save order result",responseJson)
          await this._Save_Item_(responseJson)
         // if(this.state.isEmpty){
           
    
        //  }
        }
        
        })
        .catch((error) => {
          console.error("_order_ error",error);
          this.setState({progress:0})
        });
      })
    })
      }
    
  
  }
  _Save_Item_=(id_commande)=>{
   
    
   {this.props.item.map(i=>{
    console.log("save item start",id_commande,i.designation,i.prix_u)
   this.setState({
     i:this.state.i+1
   },function(){
     this.setState({progress:this.state.i/this.state.x},function(){
      console.log("my progress",this.state.i,this.state.x,this.state.progress)
    
    return fetch('http://192.168.1.242/madi_market/Save_Order_Item.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
     body: JSON.stringify({
      id_commande:id_commande,
      id_article:i.id_article,
      quant:i.quant,
      prix:i.prix_u

    })
    })
       //.then((response) => response.json())
       .then((response) => response.text())
        .then((responseJson) => {
          console.log("my result",responseJson)
        if(responseJson=="Error"){
          this.setState({
            isLoading: false,
            errorMessage:"Une erreur s'est produite",
          }, function() {

           //console.log("*****getuser finish******",this.state.arrdata)
          });

        }
        else{
          console.log("save item order result",responseJson)
          this.props.removeItems(i)

        }
        
        })
        .catch((error) => {
          console.error("_Save_Item_ error",error);
        });
      })
     
    })
      },()=>{
        console.log("save item is over")
        this.toggleOverlayComment()
      })}
      
   
  }
  _how_getLocation_=()=>{
    alert(`Allez dans les paramètres de votre téléphone puis sélectionnez: \n -Applications \n -Madi Market \n Autorisations \n-Localisation \n Choississez le type d'autorisation qui vous conviens`);
  }
  _Handle_Pop_Adress=()=>{
    this.setState({isPop_Adress:!this.state.isPop_Adress})
  }
  _close_pop_up_=()=>{
  
      if(this.state.isTraitement==false){  
      this.setState({isLoading:false})
      }
      else{
          Toast.show("Veuillez attendre la fin dutraitement", Toast.LONG) 
      }
  }
  _onChange_titre_adresse=(value)=>{
    this.setState({
      titre_adresse:value
    })
  }
  _onChange_adresse1=(value)=>{
    this.setState({
      adresse1:value
    })
  }
  _onChange_adresse2=(value)=>{
    this.setState({
      adresse2:value
    })
  }
  _onChange_telephone=(value)=>{
    this.setState({
      telephone:value
    })
  }
  _check_data_adress=()=>{
    this.setState({
      error_msg:""
    })
    if(this.state.titre_adresse==''){
      this.setState({
        error_msg:"Veuillez donner un titre à votre adresse"
      })
    }
    else  if(this.state.adresse1==''){
      this.setState({
        error_msg:"Veuillez saisir votre adresse"
      })
    }
    else  if(this.state.telephone==''){
      this.setState({
        error_msg:"Veuillez saisir votre numéro de téléphone"
      })
    }
    else{
      this._save_adress_()
    }

  }
 
  _save_adress_=()=>{
    this.setState({isLoading:true,isTraitement:true})
    try{
    //  return fetch(`${php_api}/Create_customer.php`,{
      return fetch(`${php_api}/Create_adress.php`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
         
        nom : this.props.user.nom,
        prenom : this.props.user.prenom,
        id : this.props.user.id,
        adresse1:this.state.adresse1,
        adresse2:this.state.adresse2,
        telephone:this.state.telephone,
        titre_adresse:this.state.titre_adresse,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
     
        adresses_key:adress_key,
         _url:_url,
        
      })
      })
       
         .then((response) => response.text())
          .then((responseJson) => {
            console.log("type of rsult is****",typeof(responseJson),isNaN(responseJson))
            console.log("rsult is****",responseJson)
          
            if(isNaN(responseJson)==false){
              
              
              this.setState({
                isLoading: false,
               id_adress:responseJson
              })
  
            }else{
              this.setState({
                isLoading: false,
                error_msg:"Une erreur s'est produite"
              })
            }
          })
          .catch((error) => {
            console.error("_save_adress_ fetch error",error);
            this.setState({
              isLoading: false,
              error_msg:"Une erreur s'est produite au niveau du serveur"
            })
          });
    }
    catch(error){
      this.setState({error_msg:"Une erreur s'est produite"})
      this.setState({isLoading:false})
      console.log("_save_adress_ error",error)
  
    }
  
  }
  _go_to_Command=()=>{
    this.props.navigation.navigate('Commande',{latitude:this.state.latitude,longitude:this.state.longitude,total_shipping:this.state.total_shipping});
  }
    render() {
      console.log("my total shipping",this.state.total_shipping)
        return (
            <ScrollView style={styles.contentView}>
                {this.state.isEmpty ?
                <View style={styles2.msgContainer}>
                <Text style={styles2.msg}>Le Panier est Vide</Text>
                </View>
                :
                 <FlatList
              data={this.props.item}
              renderItem={this.renderItem}
           
             keyExtractor={(item, index) => index}
            />
                }
             {!this.state.isEmpty && 
             (this.state.latitude!=0 ?

               <PricingCard
              color={colors.dark}
              //titleStyle={styles.itemDesignation}
              containerStyle={{backgroundColor:"",marginTop:15,marginBottom:50}}
              title={`Total`}
              price={`${this.state.montant_total} MRU`}
              pricingStyle={{fontSize:20}}
             // info={[ "frais de livraison:","100 MRU"]}
              info={[ "frais de livraison:",`${this.state.total_shipping}MRU`,"Livraison gratuite à partir de 1000 MRU d'achat"]}
              button={{ title: `Commander`,buttonStyle: styles3.pricingButtonStyle }}
             // onButtonPress={this.toggleOverlayComment}
              //onButtonPress={this._Handle_Pop_Adress}
              onButtonPress={this._go_to_Command}
            
            />
            :
            <View style={styles.itemContentView}>
            <TouchableHighlight style={Pop.popButton} onPress={this._how_getLocation_}>
            <Text  style={Pop.popButtonText}>Accepter la géolocalisation</Text>
            </TouchableHighlight>
            </View>
             )
             }
             
            </ScrollView>
        )
    }
}
 const RenderNewAdress=({
   isPop,close_pop,
   titre_adresse,_onChange_titre_adresse,
   adresse1,_onChange_adresse1,
   adresse2,_onChange_adresse2,
   telephone,_onChange_telephone,
   _handle_action,
   error_msg,
  })=>{
  return(
    <Overlay isVisible={isPop} onBackdropPress={close_pop} fullScreen >
      <Icon
              name='times-circle'
              size={25}
            //  color={colors.dark}
              onPress={close_pop}
            />
       <Card.Title style={styles.cell_title}>Adresse de livraison</Card.Title>
  <View style={styles_adress.container}>
      <View style={[styles_adress.container2]}> 
      <View style={[styles_adress.center_view]}> 
      <Text  style={{color:'red'}}>{error_msg}</Text>
      </View>
     <Card containerStyle={styles_adress.card_container}>
        
        <Text style={styles_adress.LabelBox}>Titre de l'Adresse*</Text>
        <Input
        placeholder='Saisir("Ex: Mon domicile")'
        onChangeText={value =>_onChange_titre_adresse(value)}
        leftIcon={
            <Icon
              name='heading'
              size={15}
              //color={colors.dark}
            />
        }
        //maxLength= {10}
       value={titre_adresse}
    />

        <Text style={styles_adress.LabelBox}>Adresse*</Text>
        <Input
        placeholder='Saisir'
        onChangeText={value =>_onChange_adresse1(value)}
        leftIcon={
            <Icon
              name='house-user'
              size={15}
              //color={colors.dark}
            />
        }
        //maxLength= {10}
        multiline
       value={adresse1}
    />
        <Text style={styles_adress.LabelBox}>Adresse Sehdini</Text>
        <Input
        placeholder='Saisir'
        onChangeText={value =>_onChange_adresse2(value)}
        leftIcon={
            <Icon
              name='map'
              size={15}
              //color={colors.dark}
            />
        }
        //maxLength= {10}
        
       value={adresse2}
    />
        <Text style={styles_adress.LabelBox}>Téléphone</Text>
        <Input
        placeholder='Saisir'
        onChangeText={value =>_onChange_telephone(value)}
        leftIcon={
            <Icon
              name='mobile-alt'
              size={15}
              //color={colors.dark}
            />
        }
        maxLength= {8}
        keyboardType='number-pad'
       value={telephone}
    />
    <View style={styles.itemContentView}>
    <TouchableHighlight style={Pop.popButton} onPress={_handle_action}>
            <Text  style={Pop.popButtonText}>Valider</Text>
            </TouchableHighlight>
            </View>
</Card>
        
  </View> 
  </View>
  </Overlay>
  )
 }
 const months    = ['Jan','Fev','Mars','Avr','Mai','Juin','Jui','Aout','Sept','Oct','Nov','Dec'];
const mapStateToProps = state => {
    return {
      telephone: state.authReducer.telephone,
      nom: state.authReducer.nom,
      user: state.authReducer,
  
      item:state.authReducer.item,
      //item:state.authReducer,
      
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      removeItems : (item) => dispatch(removeItems(item)),
      updateItems : (item) => dispatch(updateItems(item)),
      
  }
  }
  
  export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Panier)


