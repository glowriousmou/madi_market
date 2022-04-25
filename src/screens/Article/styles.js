import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  photo: RecipeCard.photo,
  title: RecipeCard.title,
  category: RecipeCard.category,
  navigationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    
  },
  prix: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  msg:{
    fontSize: 14,
    fontWeight: 'bold',
    alignItems:'center'
   // marginLeft: 5,
  },
  msgContainer:{
    justifyContent:'center',
    //backgroundColor:'red',
    alignItems:'center',
    marginTop:30
  },
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export const styles_dropdown = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      padding: 40,
      //marginLeft:10,
  },
  dropdown: {
      backgroundColor: 'white',
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      marginTop: 10,
      marginLeft:20,
      marginRight:20,
  },
  dropdown2: {
      backgroundColor: 'white',
      borderColor: 'gray',
      borderWidth: 0.5,
      marginTop: 10,
      padding: 8,
  },
  icon: {
      marginRight: 5,
      width: 18,
      height: 18,
  },
  item: {
      paddingVertical: 17,
      paddingHorizontal: 4,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  textItem: {
      flex: 1,
      fontSize: 14,
  },
  placeholderStyle:{
    color:'gray',
    fontSize: 18,
  }
});


export default styles;
