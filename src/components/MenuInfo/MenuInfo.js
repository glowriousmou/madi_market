import React,{Component} from 'react';
import {  Image,View,TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';

class MenuInfo extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.headerButtonContainer} onPress={this.props.onPress}>
        <Image
          style={styles.headerButtonImage}
          source={require('../../../assets/icons/info.png')}
        />
        </TouchableOpacity>
        )
    }
}
MenuInfo.propTypes = { 
    onPress: PropTypes.func,

 };
export default MenuInfo