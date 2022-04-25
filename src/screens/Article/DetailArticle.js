import React from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';


import { Overlay,PricingCard  } from 'react-native-elements';
import styles from './stylesDetail';
import styles2 from './styles';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';

import BackButton from '../../components/BackButton/BackButton';
import MenuOrder from '../../components/MenuOrder/MenuOrder';
import MenuRight from "../../components/MenuButton/MenuRight"
import ViewIngredientsButton from '../../components/ViewIngredientsButton/ViewIngredientsButton';
import {Pop} from '../../AppStyles'
import colors from '../../colors'
import {addItem} from "../../store/action/authActions"
import {api_url,stock_availables_key} from "../api_url"

const { width: viewportWidth } = Dimensions.get('window');

class DetailsArticle extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTransparent: 'true',
      title: 'Détails',
      headerLeft:()=> (
        <BackButton
          onPress={() => {
            navigation.goBack();
          }}
        />
      ),
      headerRight:()=> (
        
        <MenuRight
        go_to_order={() => { navigation.navigate("Panier")}}
        go_to_Info={ () => {navigation.navigate("Info")}}
        /> 
        
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
      isPop:false,
      isLoading:false,
      msg:"",
      stock_quant:0,
    };
  }
  componentDidMount=()=>{
      
this._get_info_stock()


 }

 _get_info_stock=()=>{
  const { navigation } = this.props;
  const item = navigation.getParam('item');
  //console.log("item",item.id)
  this.setState({
    isLoading: true,
    msg:""
  })
   try{

    return fetch(`${api_url}/stock_availables/?ws_key=${stock_availables_key}&filter[id_product]=${item.id}&display=full&output_format=JSON`,
    {header: {
     'Content-Type': 'application/json'
    }})
     .then((response) => response.json())
      .then((responseJson) => {
    //  console.log("*****_get_info_stock finish******",responseJson)
   
      if(Object.keys(responseJson).length){
      var data=responseJson.stock_availables
      var result=[]
      var last_item=data[data.length-1].id
     // console.log("data is",data[0].quantity)
      this.setState({
        isLoading: false,
        stock_quant:data[0].quantity
      })
      if(data[0].quantity<1){
        this.setState({
          msg:"Ce produit n'est plus en stock"
        })
      }
      
    }
    else{
      this.setState({
        isLoading: false,
        msg:"Aucun Résultat"
      })
    }
   })
    .catch((error) => {
      console.error("_get_info_stock error",error);
      this.setState({
        isLoading: false,
        msg:"Impossible de se connecter au serveur"
      })
    });
   }
   catch{
    this.setState({
      msg:"Une erreur s'est produite",
      isLoading:false
    })
 
  console.log("_get_info_stock error",error)

   }
 }
  renderImage = ({ item }) => (
    <TouchableHighlight>
      <View style={styles.imageContainer}>
        <Image style={styles.photo} source={{ uri: item.img }} />
      </View>
    </TouchableHighlight>
  );

  onPressIngredient = item => {
    var name = getIngredientName(item);
    let ingredient = item;
    this.props.navigation.navigate('Ingredient', { ingredient, name });
  };
  add_article=()=>{
    if(this.props.user.email!=""){

      

      const item = this.props.navigation.getParam('item');
      const data = this.props.item.filter(items =>{
        const {id_article} = items
        return  id_article==item.id
    })
    //console.log("item is",data)
    if(this.state.stock_quant>0){
   if(data.length>0){
      //console.log(" data already exist",data)
      Toast.showWithGravity("Le produit existe déja dans  votre panier", Toast.LONG, Toast.BOTTOM);
    }
    else{
     
      var quant=1
      var prix_t=item.price*quant
      var myItem=[]
      myItem.push({
        id_article:item.id,
        id_categorie:item.id_categorie,
        prix_u:item.price,
        quant:quant,
        prix_t:prix_t,
        designation:item.name,
        description:item.description,
        img:item.img,
        unit:item.unit,
        stock_quant:this.state.stock_quant,
      // ix:"bbb"

      })
     // console.log(" my item from detail",myItem[0])
      this.props.addItem(myItem[0])
     Toast.showWithGravity("Le produit  a été ajouté à votre panier", Toast.LONG, Toast.BOTTOM);
    }
  }
  else{
    Toast.showWithGravity("Ce produit n'est plus en stock", Toast.LONG, Toast.BOTTOM);

  }
     }
     else{
      //console.log(" user doesn't exist")
     // alert("Veuillez vous authentifier avant d'ajouter un article au panier")
     this.toggleOverlay()
    
     }
  }
  toggleOverlay=()=>{
    this.setState({isPop:!this.state.isPop})
  }
  _go_To_SignIn=()=>{
    this.toggleOverlay()
    this.props.navigation.navigate('SignIn')
    
  }

  render() {
    const { activeSlide } = this.state;
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    // const category = getCategoryById(item.categoryId);
    // const title = getCategoryName(category.id);
    const category=item.categorie
    const title=item.name
  //  const image='"'.concat(item.img,'"')
    //const photosArray=[item.img,item.img,item.img]
    //const photosArray=[image]
    

    return (
      <ScrollView style={styles.containers}>
        <View style={styles.carouselContainer}>
          <View style={styles.carousel}>
         
          </View>
        </View>
        <View style={styles.imageContainer}>
        <Image style={styles.image2} source={{ uri: item.img }} resizeMode="contain" />
        </View>
       
         <Overlay isVisible={this.state.isPop} onBackdropPress={this.toggleOverlay}>
          <View style={Pop.popContent}>
          <View style={Pop.popContainer}>
              <Text  style={Pop.popTitre}>Veuillez vous authentifier avant d'ajouter un produit au panier</Text>
              <TouchableHighlight
               style={Pop.popButton}
              onPress={this._go_To_SignIn}
            >
               <Text  style={Pop.popButtonText}>Connexion</Text>
               </TouchableHighlight>
        </View>
        </View>
        </Overlay>
        {this.state.msg!="" &&
                  <View style={[styles2.msgContainer,{backgroundColor:"red",padding:10,margin:10}]}>
                 <Text style={styles2.msg}>{this.state.msg}</Text>
                 </View>
                  }
        {this.state.isLoading ?
                <ActivityIndicator
                animating={this.state.isLoading}
                // animating={this.props.etat_Boolean.isLoading}
                color="blue"
                size="large"
                style={{margin: 15}}
                />
                :
               
        <View style={{}}>
        <PricingCard
            color={colors.dark}
            titleStyle={{ color:"#1b639c"}}
            containerStyle={{backgroundColor:"",marginTop:50}}
            title={item.name}
            price={`${item.price} MRU / ${item.unit}`}
            info={[`Catégorie:${category}`, item.description]}
            button={{ title: 'Ajouter au Panier',buttonStyle: styles.pricingButtonStyle }}
            onButtonPress={this.add_article}
           
          />
          </View>
  }
       
      </ScrollView>
    );
  }
}

/*cooking steps
<View style={styles.infoContainer}>
  <Image style={styles.infoPhoto} source={require('../../../assets/icons/info.png')} />
  <Text style={styles.infoRecipe}>Cooking Steps</Text>
</View>
<Text style={styles.infoDescriptionRecipe}>{item.description}</Text>
*/
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
    addItem : (item) => dispatch(addItem(item)),
    
}
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(DetailsArticle)