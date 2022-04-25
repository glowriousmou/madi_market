import React,{Component} from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
import {SearchBar } from 'react-native-elements';
import styles from './styles'
import BackButton from '../../components/BackButton/BackButton';
import DrawerActions from 'react-navigation';
export default class AllArticle extends Component {
    static navigationOptions = ({ navigation })=> {
      const { params = {} } = navigation.state;
      return{
      title:navigation.getParam("designation"),
      headerLeft:()=> (
        <BackButton
        onPress={() => {
          navigation.goBack();
        }}
      />
      ),
      headerTitle:()=> (
        <View style={styles.rowContainer}>
          <Text style={styles.navigationTitle}>{navigation.getParam("designation")}</Text>
        <SearchBar
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
          placeholder="Rechercher un article"
          value={params.data}
        />
        </View>
      )
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
    _getList_=async()=>{
        this.setState({isLoading:true})
        let id_cat=this.props.navigation.getParam("id_categorie")
        //console.log("get list categorie startd",id_cat)
        return fetch('http://192.168.1.46/madi_market/Article_Categorie_List.php',{
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
         console.error("my search text is",text)
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
       _getListSearch_=async (text)=>{
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
         // console.log("***my render***",item)
          return(
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressItem(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.img }} />
        <Text style={styles.title}>{item.designation}</Text>
        <Text style={styles.prix}>{item.prix} MRU / {item.unit}</Text>
        <Text style={styles.category}>{item.categorie}</Text>
      </View>
    </TouchableHighlight>
          )
          };

    render() {
        return (
          <View>
              {this.state.isLoading ?
                <ActivityIndicator
                animating={this.state.isLoading}
                // animating={this.props.etat_Boolean.isLoading}
                color="blue"
                size="large"
                style={{margin: 15}}
                />:null}
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
            />
          </View>
        );
      }

}