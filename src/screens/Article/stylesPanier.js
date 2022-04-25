import { StyleSheet, Dimensions } from 'react-native';
import colors from '../../colors'

const { width: viewportWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
    contentView:{
        flex:1,
        marginTop:40,
        backgroundColor:"white",
    },
 ItemContainerView: {
       // flex: 1,
        margin: 10,
        //justifyContent: 'center',
        alignItems: 'center',
        height: 215,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 20,
        flexDirection:"row",
        //backgroundColor:"pink",
      },
      itemPhoto:{

     // width: '30%',
      height:'60%',
      //height: 155,
      borderRadius: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      shadowColor: 'blue',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      elevation: 3,
      resizeMode:'contain',
      //backgroundColor:"red",
    }, 
    rowContainerView:{
        flexDirection:"row",
        justifyContent:"space-between",
        //backgroundColor:"gray",
    },
    ColContainerView:{
        flexDirection:"column",
        justifyContent:"space-between",
        backgroundColor:"red",
    },
    itemDesignation: {
      //  flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
        marginTop: 8
      },
    itemText: {
      //  flex: 1,
        fontSize: 15,
       // fontWeight: 'bold',
        textAlign: 'center',
        color: '#333333',
        marginTop: 8
      },
      inputText:{
        height: 40,
        marginTop: 8,
      //  alignItems:"center",
         //marginBottom: 5,
          color: colors.dark ,
         // backgroundColor:"purple",
          borderWidth:1,
          borderColor:colors.dark,
          borderRadius:10,
          textAlign:"center",
         
      },
      inputText1:{
        height: 40,
        width:"100%",
        marginTop: 8,
        alignItems:"center",
         //marginBottom: 5,
          color: colors.dark ,
         // backgroundColor:"purple",
          borderWidth:1,
          borderColor:colors.dark,
          borderRadius:10,
         
      },
      itemContentView:{
          alignItems:"center",
          justifyContent:"center",
         // backgroundColor:"blue",
      },
      buttonAction:{
        alignItems:"center",
        justifyContent:"center",
        marginTop:15 ,
        width:30,
        height:30,
      }
});

export const styles_adress=StyleSheet.create({
  container:{
  //  flex:1,
  //  justifyContent:'center',
  
    //backgroundColor:"red",
   //width:"100%"
  // margin:100
    
},
  container2:{
   // flex:1,
  //  justifyContent:'center',
  
    //backgroundColor:"blue",
   //width:"100%"
  // padding:100
  //margin:200
    
},
card_container:{
  borderRadius:20,
  
 
},
card_title:{
   color:colors.orange,
  fontSize:20,
  fontWeight:'bold'
},
center_view:{
    justifyContent:'center',
     alignItems:'center',
},
LabelBox: {
  fontSize: 12,
  textAlign: 'left',
color:colors.clear,
fontWeight: 'bold',
marginLeft:10,
marginTop:10,
},
})
export default styles;
