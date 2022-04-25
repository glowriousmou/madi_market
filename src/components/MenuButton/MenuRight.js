import React,{Component} from 'react';
import {  Image,View,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import MenuOrder  from "../MenuOrder/MenuOrder"
import MenuInfo from "../MenuInfo/MenuInfo"
class MenuRight extends Component {
    render() {
        return (
            <View style={{flexDirection: "row",}}>
       
        <MenuInfo
           onPress={this.props.go_to_Info}
        />
         <MenuOrder
           onPress={this.props.go_to_order}
        />
        </View>
        )
    }
}
MenuRight.propTypes = {
    go_to_order: PropTypes.func,
    go_to_Info: PropTypes.func,

 };
export default MenuRight