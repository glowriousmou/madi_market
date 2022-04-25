import React,{Component} from 'react'
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native'
import styles from './styles'
import MenuImage from '../../components/MenuImage/MenuImage';
import DrawerActions from 'react-navigation';
export default class Categories extends Component {
    static navigationOptions = ({ navigation })=> ({
      title: 'Categories',
      headerLeft:()=> (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      )
    });
  
    constructor(props) {
      super(props);
      this.state={
          arrdata:[],
          arrdatas:[],
          isLoading:false,
          msg:"",
      }
    }
    componentDidMount=()=>{
        this._getList_()

    }
    _getList_=()=>{
        this.setState({isLoading:true})
        console.log("get list categorie startd")
        return fetch('http://192.168.1.46/madi_market/CategorieList.php',
        {header: {
         'Content-Type': 'application/json'
        }})
         .then((response) => response.json())
          //.then((response) => response.text())
          .then((responseJson) => {
         // console.log("*****get list categorie finish******",responseJson)
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
              arrdata: responseJson
            }, function() {
              // In this block you can do something with new state.
              //console.log("*****get list categorie finish******",this.state.arrdata)
            });
          }
          })
          .catch((error) => {
            console.error("get list categorie error",error);
          });
      }
     
    
    onPressItem = item => {
        console.log("onpress categorie",item.designation)
         const designation = item.designation;
         const id_categorie = item.id_categorie;
         this.props.navigation.navigate('Article_Categorie', {designation,id_categorie});
      }
      renderCategory = ({ item }) => {
         // console.log("***my render***",item)
          return(
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => this.onPressItem(item)}>
          <View style={styles.categoriesItemContainer}>
            <Image style={styles.categoriesPhoto} source={{ uri: item.img }} />
            <Text style={styles.categoriesName}>{item.designation}</Text>
            {/* <Text style={styles.categoriesInfo}>{getNumberOfRecipes(item.id)} recipes</Text> */}
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
              data={this.state.arrdata}
              renderItem={this.renderCategory}
            //   renderItem={({item}) =>(
                //   <this.renderCategory item={item}/>
                // <Text style={styles.categoriesName}>wxxx</Text>
                // <Text style={styles.categoriesName}>{item.designation}</Text>
            //   )}
            //  renderItem={({item}) =>(this.renderCategory.bind(item))}
             // keyExtractor={item => `${item.id_categorie}`}
             keyExtractor={(item, index) => index}
            />
          </View>
        );
      }

}