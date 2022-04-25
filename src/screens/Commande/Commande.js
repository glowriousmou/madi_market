import React,{Component} from 'react'
import {View,TouchableHighlight,FlatList,Text,Image,TextInput,PermissionsAndroid,ActivityIndicator,Dimensions,ScrollView} from "react-native"

import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Overlay,PricingCard ,Card,Input } from 'react-native-elements';
import Toast from 'react-native-simple-toast'
import {Dropdown} from 'react-native-element-dropdown';

import BackButton from '../../components/BackButton/BackButton'
import styles,{styles_dropdown} from '../Article/styles'
import {styles_adress} from '../Article/stylesPanier'
import colors from '../../colors'
import {api_url,backend_url,_url,php_api,adress_key,carts_key,orders_key} from "../api_url"

import {updateItems} from "../../store/action/authActions"

import {Pop} from '../../AppStyles'
//import { ScrollView } from 'react-native-gesture-handler';

class Commande extends Component {
    
        static navigationOptions = ({ navigation }) => {
            return {
            //  headerTransparent: 'false',
              title: 'Commande',
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
                isLoading:false,
                isTraitement:false,
                showForm:false,
                isNewAdress:false,
    
                titre_adresse:'',
                adresse1:'',
                adresse2:"",
                telephone:"",
                error_msg:'',
                id_address:0,
                id_cart:0,
                List_Adress:[],

            }
        }
        componentDidMount=()=>{
           // console.log(this.props.navigation.getParam('latitude'))
          // console.log("commande interface",this.props.user.id)
           this._get_adresses_()
          // console.log("hemllo")
        }

        _get_adresses_=async()=>{
           // console.log("out//")
            try{
                this.setState({isLoading:true,isTraitement:true,error_msg:""})
               // console.log("out")
               var autr_=[{id:"madi",alias:"Créer une adresse"}]
                return fetch(`${api_url}/addresses?ws_key=${adress_key}&output_format=JSON&display=[id,alias,address1,address2,phone_mobile]&filter[id_customer]=${this.props.user.id}`,
                {header: {
                 'Content-Type': 'application/json'
                }})
                 .then((response) => response.json())
                  .then((responseJson) => {
                 //  console.log("my start",responseJson)
                  if(Object.keys(responseJson).length){
                  var data=responseJson.addresses
                  var result=[]
                  var last_item=data[data.length-1].id
              
                // console.log("my adresses",data)
                  //data.map(i=>{
                    this.setState({
                        List_Adress:[...data,...autr_],
                        isLoading:false,
                        isTraitement:false,
                        titre_adresse:data[data.length-1].alias,
                        adresse1:data[data.length-1].address1,
                        adresse2:data[data.length-1].address2,
                        telephone:data[data.length-1].phone_mobile,
                        id_address:data[data.length-1].id,
                        showForm:true,
                        isNewAdress:false
                    })
                 // })
                }
                else{
                    
                        this.setState({
                            List_Adress:autr_,
                          isLoading: false,
                          isTraitement:false,
                         // error_msg:"Aucun Résultat",
                          showForm:true,
                          isNewAdress:true
                        })
                }
            })

            .catch((error) => {
                console.error("_get_adress_ error",error);
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
           
            console.log("_get_adress_ error",error)
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
          _onChange_adress_=(item)=>{
          //  console.log('selected', item);
          this.setState({
              showForm:true
            })
          if(item.id=="madi"){
              this.setState({
                isNewAdress:true,
                titre_adresse:"",
                adresse1:"",
                adresse2:"",
                telephone:"",
                id_address:0,
              })

          }
          else{
              this.setState({
                isNewAdress:false,
                  titre_adresse:item.alias,
                  adresse1:item.address1,
                  adresse2:item.address2,
                  telephone:item.phone_mobile,
                  id_address:item.id,
              })
            }
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
                if(this.state.isNewAdress==true){
              this._save_adress_()
                }
                else{
                    this._save_carts_()
                }
            }
        
          }
         
          _save_adress_=()=>{
            this.setState({isLoading:true,isTraitement:true})
            var latitude=this.props.navigation.getParam('latitude')
            var longitude=this.props.navigation.getParam('longitude')
            try{
           // return fetch(`${php_api}/Create_customer.php`,{
              //return fetch(`${php_api}/Create_adress.php`,{
              return fetch(`${backend_url}/Create_adress.php`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
               body: JSON.stringify({
                 
                nom : this.props.user.nom,
                prenom : this.props.user.prenom,
                id_customer :parseInt(this.props.user.id),
                adresse1:this.state.adresse1,
                adresse2:this.state.adresse2,
                telephone:this.state.telephone,
                titre_adresse:this.state.titre_adresse,
               // id : this.props.user.id,
               // latitude:this.state.latitude,
                //longitude:this.state.longitude,
               latitude:latitude,
                longitude:longitude,
             
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
                       id_address:parseInt(responseJson)
                      },()=>{
                        this._save_carts_()

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
                        isTraitement: false,
                      error_msg:"Une erreur s'est produite au niveau du serveur"
                    })
                  });
            }
            catch(error){
              this.setState({error_msg:"Une erreur s'est produite"})
              this.setState({ isLoading: false,
                isTraitement: false,})
              console.log("_save_adress_ error",error)
          
            }
          
          }
          _save_carts_=()=>{
            this.setState({isLoading:true,isTraitement:true})
            console.log("_save_carts_ start")
            try{
           //return fetch(`${php_api}/Create_cart.php`,{
              return fetch(`${backend_url}/Create_cart.php`,{
            //  return fetch(`http://192.168.1.189/madi_market/Create_cart.php`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
               body: JSON.stringify({
                 
              
                id_address : this.state.id_address,
                id_customer : parseInt(this.props.user.id),
                
                products:this.props.user.item,
               
             
                carts_key:carts_key,
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
                        isTraitement: false,
                        id_cart:parseInt(responseJson)
                      },()=>{
                        this._save_orders_()
                      })
          
                    }else{
                      this.setState({
                        isLoading: false,
                        error_msg:"Une erreur s'est produite"
                      })
                    }
                  })
                  .catch((error) => {
                    console.error("_save_carts_ fetch error",error);
                    this.setState({
                      isLoading: false,
                      isTraitement: false,
                      error_msg:"Une erreur s'est produite au niveau du serveur"
                    })
                  });
            }
            catch(error){
              this.setState({error_msg:"Une erreur s'est produite"})
              this.setState({ isLoading: false,
                isTraitement: false,})
              console.log("_save_carts_ error",error)
          
            }
          
          }
          _save_orders_=()=>{
            this.setState({isLoading:true,isTraitement:true})
          //console.log("_save_orders_ start",typeof(this.state.id_cart))
            var montant=0
            var total_shipping=this.props.navigation.getParam('total_shipping')
            //var total_shipping=0
            var last_item=this.props.user.item[this.props.user.item.length-1]
            {this.props.user.item.map(i=>{
              montant=montant+i.prix_t
              if(last_item.id_article==i.id_article){
                // if(montant<1000){
                //   total_shipping=100
                // }
              }
            })}
            
           try{
           
           //   return fetch(`${php_api}/Create_order.php`,{
              return fetch(`${backend_url}/Create_order.php`,{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
               body: JSON.stringify({
                 
                id_address : this.state.id_address,
                id_cart :this.state.id_cart,
                id_customer : parseInt(this.props.user.id),
                total_paid:montant,
                total_shipping:total_shipping,
                products:this.props.user.item,
               // latitude:this.state.latitude,
                //longitude:this.state.longitude,
              
             
                orders_key:orders_key,
                 _url:_url,
                
              })
              })
               
                 .then((response) => response.text())
                  .then((responseJson) => {
                  ///  console.log("type of rsult is****",typeof(responseJson),isNaN(responseJson))
                   // console.log("rsult is****",responseJson)
                  
                    if(isNaN(responseJson)==false){
                      
                      
                      this.setState({
                        isLoading: false,
                        isTraitement: false,
                        //id_o:responseJson
                      },()=>{
                        this.props.updateItems([])
                        this.props.navigation.navigate('Historique_Commande');
                        Toast.show("Commande effectuée avec succès", Toast.LONG) 
                      })
          
                    }else{
                      this.setState({
                        isLoading: false,
                        isTraitement: false,
                        error_msg:"Une erreur s'est produite"
                      })
                    }
                  })
                  .catch((error) => {
                    console.error("_save_orders_ fetch error",error);
                    this.setState({
                      isLoading: false,
                      isTraitement: false,
                      error_msg:"Une erreur s'est produite au niveau du serveur"
                    })
                  });
            }
            catch(error){
              this.setState({error_msg:"Une erreur s'est produite"})
              this.setState({ isLoading: false,
                isTraitement: false,})
              console.log("_save_orders_ error",error)
          
            }
          
          }

         
          _close_pop_up_=()=>{
  
            if(this.state.isTraitement==false){  
            this.setState({isLoading:false})
            }
            else{
                Toast.show("Veuillez attendre la fin du traitement", Toast.LONG) 
            }
        }

        render() {
            return (
                <View style={styles.contentView}>
                    <Card.Title style={styles.cell_title}>Adresse de livraison</Card.Title>
                    <ScrollView>
                    {this.state.List_Adress &&
                     <Dropdown
                    style={styles_dropdown.dropdown}
                    data={this.state.List_Adress}
                    searchPlaceholder="Search"
                    labelField="alias"
                    valueField="id"
                    placeholder= {"Selection"} 
                    value={this.state.titre_adresse}
                    onChange={item => {
                      
                      this._onChange_adress_(item)
                       // console.log('selected', item);
                    }}
                    
                    renderItem={item => _renderItem(item.alias)}
                />
                }
                {this.state.showForm &&
                    <RenderAdress
                   
                    titre_adresse={this.state.titre_adresse}
                    _onChange_titre_adresse={this._onChange_titre_adresse}
                    adresse1={this.state.adresse1}
                    _onChange_adresse1={this._onChange_adresse1} 
                    adresse2={this.state.adresse2}
                    _onChange_adresse2={this._onChange_adresse2}
                    telephone={this.state.telephone}
                    _onChange_telephone={this._onChange_telephone}
                    _handle_action={this._check_data_adress}
                    error_msg={this.state.error_msg}
                    isNewAdress={this.state.isNewAdress}
                    />
                }
                    <RenderLoading
                    isLoading={this.state.isLoading}
                    _close_pop_up_={this._close_pop_up_}
                    />
                

                </ScrollView>
                </View>
            )
        }
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

          const RenderAdress=({
          //  isPop,close_pop,
            titre_adresse,_onChange_titre_adresse,
            adresse1,_onChange_adresse1,
            adresse2,_onChange_adresse2,
            telephone,_onChange_telephone,
            _handle_action,
            error_msg,isNewAdress
           })=>{
           return(
               <View>
            {/* <Overlay isVisible={isPop} onBackdropPress={close_pop} fullScreen > */}
            {/*    <Icon
                        name='times-circle'
                            size={25}
                      //  color={colors.dark}
                       onPress={close_pop}
                      /> */}
                
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
                 <Text style={styles_adress.LabelBox}>Téléphone*</Text>
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
             <View style={[styles.itemContentView,{justifyContent:'center',alignItems:'center'}]}>
             <TouchableHighlight style={Pop.popButton} onPress={_handle_action}>
                     <Text  style={Pop.popButtonText}>Valider</Text>
                     </TouchableHighlight>
                     </View>
         </Card>
                 
           </View> 
           </View>
           {/* </Overlay> */}
           </View>
           )
          }
          
          const RenderLoading=({
            isLoading,_close_pop_up_
          })=>{
              return(
                <Overlay isVisible={isLoading} onBackdropPress={_close_pop_up_}>
                <Card.Title style={styles.cell_title}>_______</Card.Title>
                        {isLoading &&
                                <ActivityIndicator
                                animating={isLoading}      
                                color={colors.clear}
                                size="large"
                                style={{margin: 15}}
                                />}
                      </Overlay>
              )
          }

          const _renderItem = label => {
            return (
            <View style={styles_dropdown.item}>
                <Text style={styles_dropdown.textItem}>{label}</Text>
            </View>
            );
        };
          export default connect(
          mapStateToProps,
          mapDispatchToProps
          )(Commande)
        
        