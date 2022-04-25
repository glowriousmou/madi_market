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

export default styles;
