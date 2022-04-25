import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../colors'

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  carouselContainer: {
    //minHeight: 250,
    minHeight: 150,
   // backgroundColor:"gray"
  },
  carousel: {},

  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: 250
  },
  image2: {
    ...StyleSheet.absoluteFillObject,
   // width: '100%',
   // height: 250,
   // marginTop:60,
   // backgroundColor:"red"
   // marginBottom:60,
  },

  imageContainer: {
    //flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 200,
   // backgroundColor:"green"
  },
  imageContainer1: {
    flex: 1,
    justifyContent: 'center',
    width: viewportWidth,
    height: 250
  },
  paginationContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    paddingVertical: 8,
    marginTop: 200
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 0
  },
  infoRecipeContainer: {
    flex: 1,
    margin: 25,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoRecipeContainer2: {
    flex: 1,
    margin: 25,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  infoPhoto: {
    height: 20,
    width: 20,
    marginRight: 0
  },
  infoRecipe: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  category: {
    fontSize: 14,
    fontWeight: 'bold',
    margin: 10,
    color: '#2cd18a'
  },
  infoDescriptionRecipe: {
    textAlign: 'left',
    fontSize: 16,
    marginTop: 30,
    margin: 15
  },
  infoRecipeName: {
    fontSize: 28,
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  },
  pricingButtonStyle: {
    //flex: 1,
    height: 50,
    //width: 270,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100,
    //borderColor: '#2cd18a',
    //backgroundColor: '#2cd18a',
   // borderWidth: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    // backgroundColor: '#2cd18a'
  },
  
});

export default styles;
