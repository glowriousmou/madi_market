import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import MenuButton from '../../components/MenuButton/MenuButton';

export default class DrawerContainer extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.content}>
        <View style={styles.container}>
          <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/list.png')}
            onPress={() => {
              navigation.navigate('Categorie');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="ARTICLES"
            source={require('../../../assets/icons/item.png')}
            onPress={() => {
              navigation.navigate('AllArticle');
              navigation.closeDrawer();
            }}
          />
          <MenuButton
            title="AUTHENTIFICATION"
            source={require('../../../assets/icons/user.png')}
            onPress={() => {
              navigation.navigate('SignIn');
              navigation.closeDrawer();
            }}
          />
          {/* <MenuButton
            title="HOME"
            source={require('../../../assets/icons/home.png')}
            onPress={() => {
              navigation.navigate('Home');
              navigation.closeDrawer();
            }}
          /> */}
          {/* <MenuButton
            title="CATEGORIES"
            source={require('../../../assets/icons/category.png')}
            onPress={() => {
              navigation.navigate('Categories');
              navigation.closeDrawer();
            }}
          /> */}
         {/* <MenuButton
            title="SEARCH"
            source={require('../../../assets/icons/search.png')}
            onPress={() => {
              navigation.navigate('Search');
              navigation.closeDrawer();
            }}
          /> */}
        </View>
      </View>
    );
  }
}

DrawerContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  })
};
