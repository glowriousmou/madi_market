import React,{Component,useRef,useState} from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  Pressable, SafeAreaView,
  Dimensions,
  ScrollView
} from 'react-native'
import Carousel ,{ ParallaxImage,Pagination  } from 'react-native-snap-carousel';
import RNFS from 'react-native-fs'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

import styles,{styles_carousel} from './styles'
import MenuImage from '../../components/MenuImage/MenuImage';
import MenuOrder from '../../components/MenuOrder/MenuOrder';
import MenuInfo from '../../components/MenuInfo/MenuInfo';
import MenuRight from "../../components/MenuButton/MenuRight"
import DrawerActions from 'react-navigation';

import {api_url,backend_url,php_api,slide_url,categories_key,image_key,products_key} from "../api_url"
const { width } = Dimensions.get("window");
//const carouselRef = useRef(null);
class Categories extends Component {
    static navigationOptions = ({ navigation })=> ({
     // title: 'Categories',
      title: 'Madi Market',
      headerLeft:()=> (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight:()=> (
        <MenuRight
        go_to_order={() => { navigation.navigate("Panier")}}
        go_to_Info={ () => {navigation.navigate("Info")}}
        />  
        
      ),
    });
  
    constructor(props) {
      super(props);
      this.state={
          arrdata:[],
          arrdatas:[],
          carousel_data:[],
          list_ID:[],
          isLoading:false,
          msg:"",
      }
    }
    componentDidMount=()=>{
        this._get_List_()
        this._get_carousel_data()
        this.interval = setInterval(() =>  {
          this._get_List_()
        this._get_carousel_data()
        } , 300000);

    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }
    _get_carousel_data=async()=>{
      try{
    // return fetch(`${php_api}/carousel_data.php`,{
    return fetch(`${backend_url}/Carousel_data.php`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
   
    })
       .then((response) => response.json())
       //.then((response) => response.text())
        .then((responseJson) => {
        //  console.log("rsult is xx",responseJson)
          var result=[]
         if(responseJson.length>0){
            responseJson.map((i,idx,array)=>{
             // console.log("_get_carousel_data is",i)
             if(i!="gray_next.png" && i!="gray_pager.png" && i!="gray_prev.png" && i!="index.php" && i!="sample-1.jpg" && i!="sample-2.jpg" && i!="sample-3.jpg" ){
              result.push({
                source:`${slide_url}/${i}?${new Date()}`,
              })
            }
              if(idx==array.length-1){
                this.setState({
                  carousel_data:[]
                },()=>{
                this.setState({
                  
                   carousel_data: result,
                  
                 })
                })
              }
            })
           
          }
        
        })
        .catch((error) => {
          console.error("_get_carousel_data fetch error",error);
        });
      
  
}
catch(error){
  
  console.log("_get_carousel_data error",error)

}
}
    _get_carousel_dataOLD=()=>{
      this.setState({isLoading:true})
      //console.log("_get_carousel_datastartd")
    try{
    //  return fetch('http://192.168.1.242/madi_market/ArticleList.php',
    return fetch(`${api_url}/products?ws_key=${products_key}&output_format=JSON&display=[id,name,id_default_image,active,meta_description,date_upd]&filter[condition]=new`,
      {header: {
       'Content-Type': 'application/json'
      }})
       .then((response) => response.json())
        .then((responseJson) => {
        if(Object.keys(responseJson).length){
        var data=responseJson.products
        var result=[]
        var last_item=data[data.length-1].id 
        data.map(i=>{
        
      
      result.push({
      // title:i.name[0].value,
        source:`${api_url}/images/products/${i.id}/${i.id_default_image}?ws_key=${image_key}`,
        //description:i.meta_description[0].value,
        date_upd:i.date_upd,
      })
       
      
       
      
         if(i.id==last_item){
          // console.log("i'm in last item",last_item,data.length)
          var y= result.sort((a,b) => (a.date_upd > b.date_upd) ? 1 : ((b.date_upd >a.date_upd) ? -1 : 0))
          if(result.length>3){
            this.setState({
              // isLoading: false,
               carousel_data:y.slice((y.length - 3), y.length),
              
             })

          }
          else{
            this.setState({
              // isLoading: false,
               carousel_data: y,
              
             })
          }
          
         }
        
        })
      }
      else{
        this.setState({
          isLoading: false,
          msg:"Aucun Résultat"
        })
      }
      
        })
        .catch((error) => {
          console.error("get list product error",error);
          this.setState({
            isLoading: false,
            msg:"Impossible de se connecter au serveur"
          })
        });
      }
      catch(error){
        this.setState({
          msg:"Une erreur s'est produite",
          isLoading:false
        })
     
      console.log("_getList_ error",error)
      }
    }

    _get_List_=()=>{
        this.setState({isLoading:true})
       //console.log("get id categorie start")
        try{
       // return fetch('http://192.168.1.242/madi_market/CategorieList.php',
      //  return fetch(`${api_url}/categories?ws_key=${categories_key}&output_format=JSON`,
        return fetch(`${api_url}/categories?ws_key=${categories_key}&output_format=JSON&filter[active]=1&display=[id,name]&filter[level_depth]=2`,
        {header: {
         'Content-Type': 'application/json'
        }})
      .then((response) => response.json())
          //.then((response) => response.text())
          .then(async (responseJson) => {
         // console.log("*****get id categorie finish******",responseJson.categories)
         // console.log("*****get id categorie finish******",responseJson.categories)
         if(Object.keys(responseJson).length){
         var data=responseJson.categories
         var result=[]
         var last_item=data[data.length-1].id
         data.map(i=>{
          // console.log("result",i.id,i.name[0].value)
           result.push({
            id:i.id,
            name:i.name[0].value,
            //img:`${api_url}/images/categories/${i.id}?ws_key=${image_key}?${new Date()}`,
            img:`${api_url}/images/categories/${i.id}?ws_key=${image_key}&${new Date()}`,
          })
          if(i.id==last_item){
            //console.log("i'm in last item",last_item,data.length)
            this.setState({
              arrdata:[],
            },()=>{
            this.setState({
              isLoading: false,
              arrdata: result,
             
            })
          })
          }
         })
        }
         else{
          this.setState({
            isLoading: false,
            msg:"Aucun Résultat"
          })
        }

     /*   var id_list=[]
        var last_item=responseJson.categories[responseJson.categories.length-1]
      
        id_list= await responseJson.categories.filter(i=> {return i.id!=1}).filter(i=> {return i.id!=2})
        if(id_list.length>0){
         // this._get_List_(id_list)
        }
        else{
          console.log("*****Aucune Categorie******")
          this.setState({
            isLoading: false,
            msg:"Aucun Categorie"
          }, function() {
            // In this block you can do something with new state.
          //  console.log("*****get list categorie finish******",this.state.arrdata)
          });

        }*/
       
         /*if(responseJson=="No Results Found"){
          console.log("*****Aucun Article******")
          this.setState({
            isLoading: false,
            msg:"Aucun Article"
          }, function() {
            // In this block you can do something with new state.
          //  console.log("*****get list categorie finish******",this.state.arrdata)
          });
        }
        else{
         this.setState({
              isLoading: false,
              arrdata: responseJson
            }, function() {
              // In this block you can do something with new state.
              //console.log("*****get list categorie finish******",this.state.arrdata)
            });
          }*/
          })
          .catch((error) => {
            console.error("_getID_ categorie fetch error",error);
            this.setState({
              isLoading: false,
              msg:"Impossible de se connecter au serveur"
            }, function() {
              
            });
          });
        }
        catch(error){
          this.setState({
            msg:"Une erreur s'est produite",
            isLoading:false
          })
       
        console.log("_getID_ error",error)
        }
      }
  
    
    onPressItem = item => {
        //console.log("onpress categorie",item.designation,item.id_categorie)
         const designation = item.name;
         const id_categorie = item.id;
         this.props.navigation.navigate('Article_Categorie', {designation,id_categorie});
        // this.props.navigation.replace('Article_Categorie', {designation,id_categorie});
      }
    onPressCarousel= () => {
        //console.log("onpress categorie",item.designation,item.id_categorie)
         
         this.props.navigation.navigate('AllArticle');
      }
      renderCategory = ({ item }) => {
        //  console.log("***my render***",item.img)
          return(
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressItem(item)}>
          <View style={styles.categoriesItemContainer}>
            {item.img!=null ?
            <Image key={new Date()} style={styles.categoriesPhoto} source={{ uri: item.img, method: 'POST',headers: {Pragma: 'no-cache'}, }} resizeMode="contain" />
            :
            <Image style={styles.categoriesPhoto} source={require("../../../assets/no_img.png")} resizeMode="contain" />
          }
            <Text style={styles.categoriesName}>{item.name}</Text>
            {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
          </View>
        </TouchableHighlight>
          )
          };

    render() {
      
/*const carousel_data = [
  {
    title: "Coral Reef",
    description: "Location: Red Sea",
    source:
      "https://images.unsplash.com/photo-1633205719979-e47958ff6d93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },
  {
    title: "Phone",
    description: "iPhone 6 on the table",
    source:
      "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },

  {
    title: "Old building",
    description: "Location: Germany",
    source:
      "https://images.unsplash.com/photo-1623345805780-8f01f714e65f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
  },
];*/
        return (
          <View  style={{paddingBottom:0}}>
             <ScrollView style={{paddingBottom:0}}> 
                 {this.state.msg!="" && 
                  <View style={styles.msgContainer}>
                 <Text style={styles.msg}>{this.state.msg}</Text>
                 </View>
                  } 
                  {this.state.carousel_data.length!=0 ?
                  <CustomSlider
                  data={this.state.carousel_data}
                  onPressCarousel={this.onPressCarousel}
                  />:
                  <ActivityIndicator
                animating={this.state.isLoading}
                // animating={this.props.etat_Boolean.isLoading}
                color="blue"
                size="large"
                style={{margin: 15}}
                />
                      }
                  <View style={{backgroundColor:''}}>
                  <Text style={styles.Titre}>Nos Catégories</Text>
                  </View>
          {this.state.arrdata.length!=0 ?      
            <FlatList
              data={this.state.arrdata}
              renderItem={this.renderCategory}
             keyExtractor={(item, index) => index}
             refreshing={this.state.isLoading}
             onRefresh={this._get_List_}
             contentContainerStyle={{marginTop:50,marginBottom:50}}
            />
            :
                  <ActivityIndicator
                animating={this.state.isLoading}
                // animating={this.props.etat_Boolean.isLoading}
                color="blue"
                size="large"
                style={{margin: 15}}
                />
                      }
            </ScrollView>
          </View>

        );
      }

}

function CarouselItem({ item, index}, parallaxProps) {
  return (
    
    <View > 
      <SafeAreaView style={styles_carousel.item}>
        {/* <View style={{backgroundColor:'#1b639c'}}>
          <Text style={{color:'white'}}>Nouveau</Text>
          </View> */}
         {/* <Badge status="primary" value={<Text style={{color:'white',padding:20}}>Nouveau</Text>}    containerStyle={{ margin:10 }} />  */}
        <ParallaxImage
          source={{ uri: item.source }} 
          containerStyle={styles_carousel.imageContainer}
          style={styles_carousel.image}
          {...parallaxProps}  
        />
          
          
        <Text style={styles_carousel.title} numberOfLines={2}>
          {item.title}
        </Text>
      </SafeAreaView>
    </View>
  );
}

function CustomSlider({ data,onPressCarousel }) {
  const [slideIndex, setSlideIndex] = useState(0);
 const settings = {
    sliderWidth: width,
    sliderHeight: width,
    itemWidth: width - 80,
    data: data,
    renderItem: CarouselItem,
    hasParallaxImages: true,
    onSnapToItem: (index) => setSlideIndex(index),
    autoplay:true,
    autoplayDelay:1000,   
    loop:true
  };
  const carouselRef = useRef(null)

  
const settings_ = {
  onSnapToItem: (index) => setSlideIndex(index), //add this in 'settings' variable. 
};
  return (
    <TouchableHighlight onPress={() => onPressCarousel()}>
      {/* <Text>Hello</Text> */}
    <View style={styles_carousel.container}>
       
      <Carousel 
      {...settings} 
      ref={carouselRef}
      />
      <CustomPaging data={data} activeSlide={slideIndex} />
      </View>
     
    
    </TouchableHighlight>
  );
}

function CustomPaging({ data, activeSlide }) {
  const settings = {
    dotsLength: data.length,
    activeDotIndex: activeSlide,
    containerStyle: styles_carousel.dotContainer,
    dotStyle: styles_carousel.dotStyle,
    inactiveDotStyle: styles_carousel.inactiveDotStyle,
    inactiveDotOpacity: 0.4,
    inactiveDotScale: 0.6,
  };
  return <Pagination {...settings} />;
}
export default  Categories