import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors'
// screen sizing
const { width, height } = Dimensions.get('window');
// orientation must fixed
const SCREEN_WIDTH = width < height ? width : height;

const recipeNumColums = 2;
// item size
const RECIPE_ITEM_HEIGHT = 150;
const RECIPE_ITEM_MARGIN = 20;

// 2 photos per width
export const RecipeCard = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RECIPE_ITEM_MARGIN,
    marginTop: 20,
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT + 100,
    borderColor: '#cccccc',
    borderWidth: 0.5,
    borderRadius: 15
  },
  photo: {
    width: (SCREEN_WIDTH - (recipeNumColums + 1) * RECIPE_ITEM_MARGIN) / recipeNumColums,
    height: RECIPE_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  },
  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#444444',
    marginTop: 3,
    marginRight: 5,
    marginLeft: 5,
  },
  category: {
    marginTop: 5,
    marginBottom: 5
  },
  errorMessage:{
    fontSize: 14,
    fontWeight: 'bold',
    alignItems:'center',
   color:"red",
   marginBottom:10,
  },
  msgContainer:{
    justifyContent:'center',
    //backgroundColor:'red',
    alignItems:'center',
    marginTop:30
  },
 
});
export const Pop = StyleSheet.create({
popButton: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  marginTop:20,
  width:250,
  borderRadius:20,
  backgroundColor: colors.dark,
},

popContent:{
  alignItems:"center",
  justifyContent:"center",
  //borderWidth:1,
 // borderColor:colors.dark,
 // borderRadius:20,
  //backgroundColor:"gray",
  padding:15,


},
popContainer:{
  alignItems:"center",
  justifyContent:"center",
  marginLeft:5,
  marginRight:5,
  //backgroundColor:"red",
},
popTitre:{

},
popTitreRight:{
  textAlign:"right",
  color:colors.dark,
  fontSize:20,
  fontWeight:"bold"
},
popTitreLeft:{
  textAlign:"left",
  color:colors.grayIcon,
  fontSize:15,
},
popButtonText:{
  color:"white"
},
popRowContainer:{
  //alignItems:"center",
  justifyContent:"space-between",
  flexDirection:"row",
  borderBottomColor:colors.gray,
  borderBottomWidth:1,
  marginTop:2,
  marginBottom:2,
  width:250,
 // backgroundColor:'green',
},
popInputBox:{
  //height:150,
  height:150,
  width:250,
  margin: 2,
  padding: 15,
  fontSize: 18,
borderRadius:5,
  borderColor: colors.gray,
  borderWidth: 1,
  textAlign: 'left',
  color:colors.dark,
  backgroundColor: "white",
  marginTop:2,
marginBottom:2,
},
})
