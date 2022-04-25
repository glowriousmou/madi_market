import { StyleSheet,Dimensions } from 'react-native';
const { width: viewportWidth } = Dimensions.get('window');
import colors from '../../colors'
const styles = StyleSheet.create({
  content1: {
    flex: 1,
   // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'orange'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
   // alignItems: 'center',
    justifyContent: 'center',
  // backgroundColor:'gray'
  },
  container: {
    flex: 1,
   // alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomColor: colors.gray,
    borderBottomWidth:1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor:'red'
  },
  container1: {
    flex: 1,
   // alignItems: 'flex-start',
    paddingHorizontal: 20,
    borderBottomColor: colors.gray,
    borderBottomWidth:1,
    //alignItems: 'center',
   // justifyContent: 'center',
    //backgroundColor:'red'
  },
  logo: {
  //  ...StyleSheet.absoluteFillObject,
   // width: '100%',
    width: 150,
    height: 150,
    marginTop:10,
    //alignItems: 'center',
  },
  logoContainer: {
    //flex: 1,
    justifyContent: 'center',
   alignItems: 'center',
   // width: viewportWidth,
    width:"100%",
    paddingBottom:50,
    paddingTop:50,
    borderBottomColor: colors.gray,
    borderBottomWidth:1,
   // height: 50,
    //backgroundColor:'blue'
  },
  username:{
    alignItems:"center",
    color:colors.dark,
    fontSize:20,
  },
  viewName:{
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    //backgroundColor:"red",
    //width:200
  },
  icon: {
    
      width: 10,
      height: 10,
     // marginRight:10
     // marginTop:10,
   
    },
    viewCopyright:{
      alignItems:'center',
      //padding:10,
      //marginTop:40
      position:'absolute',
      bottom:0,
       left:0,
      right:0
  
    },
    imageCopyright:{
  
    },
    imageCopyright2:{
       width:100,
       height:50,
      //marginTop:-10,
     // marginRight:10
  
    },
    rowContainer: {
      flexDirection: "row",
      //marginTop:5
      },
      center_view:{
        justifyContent:'center',
         alignItems:'center',
    },
    card_container:{
      borderRadius:20,
      
     
  },
  LabelBox: {
    fontSize: 12,
    textAlign: 'left',
color:colors.clear,
 fontWeight: 'bold',
 marginLeft:10,
 marginTop:10,
},

});

export default styles;
