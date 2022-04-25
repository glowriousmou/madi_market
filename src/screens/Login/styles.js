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
        //width:250,
        borderRadius:20,
      },
      loginButton: {
        backgroundColor: colors.dark,
      },
      loginText: {
        color: 'white',
      },
      errorMessage:RecipeCard.errorMessage,
      logo: {
        //  ...StyleSheet.absoluteFillObject,
         // width: '100%',
          width: 350,
          height: 350,
          //marginTop:10,
          //alignItems: 'center',
        },
        logoContainer: {
          //flex: 1,
          justifyContent: 'center',
         alignItems: 'center',
         // width: viewportWidth,
          width:"100%",
         // borderBottomColor: colors.gray,
         // borderBottomWidth:1,
          marginBottom:10,
         // height: 50,
          //backgroundColor:'blue'
        },
        LabelBox: {
          fontSize: 12,
          textAlign: 'left',
     // color:colors.clear,
       fontWeight: 'bold',
      // marginLeft:10,
       marginTop:10,
      },
      container:{
        flex:1,
        justifyContent:'center',
      
       // backgroundColor:"red",
        
    },
    center_view:{
        justifyContent:'center',
         alignItems:'center',
    },
    card_container:{
        borderRadius:20,
        
       
    },
})

export default styles