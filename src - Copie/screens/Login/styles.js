import { StyleSheet } from 'react-native'
import colors from '../../colors'
import { RecipeCard } from '../../AppStyles';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#DCDCDC',
      },
   
      inputContainer: {
          //borderBottomColor: colors.dark,
          //borderColor: colors.dark,
          backgroundColor: '#FFFFFF',
          //backgroundColor: 'red',
          borderRadius:10,
         // borderWidth: 1,
          //borderBottomWidth: 1,
         // width:250,
          height:45,
          marginBottom:20,
          flexDirection: 'row',
          alignItems:'center',
          marginLeft:10,
          marginRight:10,
      },
      inputs:{
          height:45,
          marginLeft:16,
          borderBottomColor: '#FFFFFF',
          flex:1,
      },
      inputIcon:{
        width:30,
        height:30,
        marginLeft:15,
        justifyContent: 'center'
      },
      buttonContainer: {
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:20,
      },
      loginButton: {
        backgroundColor: colors.dark,
      },
      loginText: {
        color: 'white',
      },
      errorMessage:RecipeCard.errorMessage,
})

export default styles