import React,{Component} from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  ScrollView
} from 'react-native'
import {SearchBar } from 'react-native-elements';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import styles from './styles'
import BackButton from '../../components/BackButton/BackButton';
import MenuOrder from '../../components/MenuOrder/MenuOrder';
import DrawerActions from 'react-navigation';
import MenuRight from "../../components/MenuButton/MenuRight"
import {api_url,products_key,image_key,categories_key} from "../api_url"
export default class AllArticle extends Component {
    static navigationOptions = ({ navigation })=> {
      const { params = {} } = navigation.state;
      return{
      title:navigation.getParam("designation"),
      headerLeft:()=> (
        <BackButton
        onPress={() => {
          navigation.goBack();
          //navigation.goBack();
        }}
      />
      ),
      headerTitle:()=> (
        <View style={styles.rowContainer}>
          <Text style={styles.navigationTitle}>{navigation.getParam("designation")}</Text>
        {/* <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: '#EDEDED'
          }}
          inputStyle={{
            backgroundColor: '#EDEDED',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => params.handleSearch(text)}
          //onClear={() => params.handleSearch('')}
          placeholder="Rechercher un Produit"
          value={params.data}
        /> */}
        </View>
      ),
      headerRight:()=> (
        
        <MenuRight
        go_to_order={() => { navigation.navigate("Panier")}}
        go_to_Info={ () => {navigation.navigate("Info")}}
        /> 
        
      ),
      }
    };

    constructor(props) {
      super(props);
      this.state={
          arrdata:[],
          arrdatas:[],
          isLoading:false,
          msg:"",
          search_text:"",
      }
    }
    componentDidMount=()=>{
        this._getList_()
        const { navigation } = this.props;
        navigation.setParams({
          handleSearch: this.handleSearch,
          data: this.getSearchText
         // data: this.state.search_text
        });

    }


    _getList_=()=>{
      this.setState({isLoading:true})
      let id_cat=this.props.navigation.getParam("id_categorie")
      let name_cat=this.props.navigation.getParam("designation")
     // console.log("get list categorie startd",id_cat)
    try{
    //  return fetch('http://192.168.1.242/madi_market/ArticleList.php',
    return fetch(`${api_url}/products?ws_key=${products_key}&output_format=JSON&display=[id,price,name,reference,unity,id_default_image,quantity,minimal_quantity,meta_description,id_default_combination,categories[id],active,available_for_order,date_upd,condition]`,
      {header: {
       'Content-Type': 'application/json'
      }})
       .then((response) => response.json())
        //.then((response) => response.text())
        .then((responseJson) => {
       // console.log("*****get list product finish******",responseJson)
      // if(responseJson.length>0){
        if(Object.keys(responseJson).length){
        var data=responseJson.products
        var result=[]
        var last_item=data[data.length-1].id
       //if(data.length>0){
        data.map(i=>{
      
         //var name_cate=`${api_url}/categories?ws_key=${categories_key}&output_format=JSON&filter[active]=1&display=[name]&filter[level_depth]=2&filter[id]=${id_cat}`
        //    console.log("result",name_cate)
        if(i.active!=0){
        var id_categorie=null
        if(i.associations.categories.length!=0){
        if(i.associations.categories.length==1){
          // console.log("result indefined***",i.id,i.name[0].value)
           id_categorie=i.associations.categories[0].id
         }
         else{
         //console.log("result***",i.id,i.name[0].value)
        id_categorie=i.associations.categories[1].id
         }
        }

         // if(id_cat==i.associations.categories[1].id){
          if(id_cat==id_categorie){
          result.push({
           id:i.id,
           name:i.name[0].value,
           price:trimStringAfter(i.price,'.'),
           unit:i.unity,
           reference:i.reference,
           id_image:i.id_default_image,
           date_upd:i.date_upd,
           condition:i.condition,
           img:`${api_url}/images/products/${i.id}/${i.id_default_image}?ws_key=${image_key}`,
           description:i.meta_description[0].value,
           categorie:name_cat,
          // id_categorie:i.associations.categories[1].id
          id_categorie:id_categorie,
         })
        }
      }
         if(i.id==last_item){
          // console.log("i'm in last item",last_item,data.length)
          var y= result.sort((a,b) => (a.date_upd < b.date_upd) ? 1 : ((b.date_upd < a.date_upd) ? -1 : 0))
          if(result.length>0){
           this.setState({
             isLoading: false,
             arrdata: y,
            
           })
          }
          else{
          
              this.setState({
                isLoading: false,
                msg:"Aucun produit associé à cette catégorie"
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
   
    _getList_OLD=async()=>{
        this.setState({isLoading:true})
        let id_cat=this.props.navigation.getParam("id_categorie")
        //console.log("get list categorie startd",id_cat)
        return fetch('http://192.168.1.242/madi_market/Article_Categorie_List.php',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
         id_categorie : id_cat,
      })
      })
         .then((response) => response.json())
          //.then((response) => response.text())
          .then((responseJson) => {
          //console.log("*****get list categorie finish******",responseJson)
          if(responseJson=="No Results Found"){
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
              arrdata: responseJson,
              msg:'',
            }, function() {
              // In this block you can do something with new state.
            //  console.log("*****get list categorie finish******",this.state.arrdata)
            });
          }
          })
          .catch((error) => {
            console.error("get list categorie error",error);
          });
      }
      handleSearch=text=>{
         //console.error("my search text is",text)
         this.setState({search_text: text})
         if (text == '') {
             this.setState({
               msg:'',
           //    search_text: text,
           //   // data: []
             });
          this._getList_()
         } else {
           //  this.setState({
           //    search_text: text,
           // //  // data: recipeArray
           // // });
           this._getListSearch_(text)
         }

       }
       _getListSearch_OLD=async (text)=>{
        // this.setState({isLoading:true})
        // console.log("get list search categorie startd",text)
       let id_cat=this.props.navigation.getParam("id_categorie")
         return await fetch('http://192.168.1.46/madi_market/Article_Categorie_Search.php',{
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json',
         },
        body: JSON.stringify({
        // search_text : this.state.search_text,
         search_text : text,
         id_categorie : id_cat,
       })
       })
          .then((response) => response.json())
           //.then((response) => response.text())
           .then((responseJson) => {
          // console.log("*****get list categorie finish******",responseJson)
          if(responseJson=="No Results Found"){
           console.log("*****Aucun Article******")
           this.setState({
             isLoading: false,
             msg:`Aucun Resultat pour ${this.state.search_text}`,
             arrdata:[]
           }, function() {
             // In this block you can do something with new state.
           //  console.log("*****get list categorie finish******",this.state.arrdata)
           });
         }
         else{
          this.setState({
               isLoading: false,
               arrdata: responseJson,
               msg:'',
             }, function() {
               // In this block you can do something with new state.
             //  console.log("*****get list categorie finish******",this.state.arrdata)
             });
           }
           })
           .catch((error) => {
             console.error("get list categorie error",error);
           });
       }
       _getListSearch_=(text)=>{
        this.setState({isLoading:true})
      //  console.log("get list categorie startd")
      let id_cat=this.props.navigation.getParam("id_categorie")
      let name_cat=this.props.navigation.getParam("designation")
      try{
       // return fetch('http://192.168.1.46/madi_market/Article_Search.php',{
return fetch(`${api_url}/products?ws_key=${products_key}&output_format=JSON&display=[id,price,name,reference,unity,id_default_image,quantity,minimal_quantity,meta_description,id_default_combination,categories[id],active,available_for_order,date_upd,condition]&filter[name]=%[${text}]%`,
        /*{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({ 
        search_text :text,
      })
      })*/
      {header: {
        'Content-Type': 'application/json'
       }})
         .then((response) => response.json())
          //.then((response) => response.text())
          .then((responseJson) => {
       //  console.log("*****_getListSearch_ finish 0000******",responseJson)
         if(Object.keys(responseJson).length){
         var data=responseJson.products
          var result=[]
          var last_item=data[data.length-1].id
          //console.log("result",data.length)
         
          data.map(i=>{
           // console.log("result",i.id,i.name[0].value)
           if(i.active!=0){
           var id_categorie=null
           if(i.associations.categories.length!=0){
           if(i.associations.categories.length==1){
              //console.log("result indefined***",i.id,i.name[0].value)
              id_categorie=i.associations.categories[0].id
            }
            else{
           // console.log("result***",i.id,i.name[0].value)
           id_categorie=i.associations.categories[1].id
            }
          }

           //if(id_cat==i.associations.categories[1].id){
            if(id_cat==id_categorie){
            result.push({
             id:i.id,
             name:i.name[0].value,
             price:trimStringAfter(i.price,'.'),
             unit:i.unity,
             reference:i.reference,
             id_image:i.id_default_image,
             date_upd:i.date_upd,
             condition:i.condition,
             img:`${api_url}/images/products/${i.id}/${i.id_default_image}?ws_key=${image_key}`,
             description:i.meta_description[0].value,
             categorie:name_cat,
            // id_categorie:i.associations.categories[1].id
            id_categorie:id_categorie,
           })
          }
        }
           if(i.id==last_item){
            // console.log("i'm in last item",last_item,data.length)
             this.setState({
               isLoading: false,
               arrdata: result,
              
             })
           }
          })
        }
        else{
          this.setState({
            isLoading: false,
            msg:"Aucun Résultat",
            arrdata:[]
          })
        }
        
          })
          .catch((error) => {
            console.error("_getListSearch_ error",error);
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
       
        console.log("_getListSearch_ error",error)
        }
      }
       getSearchText = () => {
         return this.state.search_text;
       };
      //  componentDidUpdate=(prevProps,prevState)=>{
      //   if(prevState.search_text!==this.state.search_text){
      //     console.log("search text change",this.state.search_text)
      //     const { navigation } = this.props;
      //     navigation.setParams({
      //       handleSearch: this.handleSearch,
      //       data: this.getSearchText
      //      // data: this.state.search_text
      //     });
      // }
      // }
    onPressItem = item => {
        this.props.navigation.navigate('DetailArticle', { item });
       // console.log("onpress categorie",item.designation)
        // const title = item.name;
        // const category = item;
        // this.props.navigation.navigate('RecipesList', { category, title });
      }
      renderItem = ({ item }) => {
        //  console.log("***my render***",item)
          return(
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressItem(item)} style={{marginBottom:10}}>
      <View style={styles.container}>
      {item.condition=="new" &&
         <Badge status="primary" value={<Text style={{color:'white',padding:20}}>Nouveau</Text>}    containerStyle={{ margin:10 }} /> 
        }
        <Image style={styles.photo} source={{ uri: item.img }}  resizeMode="contain"/>
        {item.name.length<22 ?
        <Text style={[styles.title,{textTransform: 'capitalize'}]}>{item.name}</Text>
        :
        <Text style={[styles.title,{textTransform: 'capitalize'}]}>{item.name.substring(0, 21)}...</Text>
      }
        <Text style={styles.prix}>{item.price} MRU / {item.unit}</Text>
        <Text style={styles.category}>{item.categorie}</Text>
      </View>
    </TouchableHighlight>
          )
          };

    render() {
        return (
          <View  style={{paddingBottom:0}}>
              {/*this.state.isLoading ?
                <ActivityIndicator
                animating={this.state.isLoading}
                // animating={this.props.etat_Boolean.isLoading}
                color="blue"
                size="large"
                style={{margin: 15}}
              />:null*/}
              <ScrollView style={{paddingBottom:0}}> 
               <SearchBar
          containerStyle={{
            backgroundColor: 'transparent',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            //margin:15,marginBottom:50,
            //flex: 1
          }}
          inputContainerStyle={{
            backgroundColor: 'white'
          }}
          inputStyle={{
            backgroundColor: 'white',
            borderRadius: 10,
            color: 'black'
          }}
          searchIcond
          clearIcon
          //lightTheme
          round
          onChangeText={text => this.handleSearch(text)}
          //onClear={() => params.handleSearch('')}
          placeholder="Rechercher un produit"
          value={this.state.search_text}
        />
                {this.state.msg!="" &&
                  <View style={styles.msgContainer}>
                 <Text style={styles.msg}>{this.state.msg}</Text>
                 </View>
                  }
                   
            <FlatList
             vertical
              data={this.state.arrdata}
              renderItem={this.renderItem}
              numColumns={2}
             keyExtractor={(item, index) => index}
             refreshing={this.state.isLoading}
             onRefresh={this._getList_}
             contentContainerStyle={{marginTop:50,marginBottom:50}}
            />
            </ScrollView>
          </View>
        );
      }

}

function trimStringAfter(haystack, needle) {
  const lastIndex = haystack.lastIndexOf(needle)
  return haystack.substring(0, lastIndex === -1 ? haystack.length : lastIndex + 0)
}
