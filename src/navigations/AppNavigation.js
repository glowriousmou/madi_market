import { createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
/* import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator} from '@react-navigation/drawer' */

// import HomeScreen from '../screens/Home/HomeScreen';
// import CategoriesScreen from '../screens/Categories/CategoriesScreen';
// import RecipeScreen from '../screens/Recipe/RecipeScreen';
// import RecipesListScreen from '../screens/RecipesList/RecipesListScreen';
 import DrawerContainer from '../screens/DrawerContainer/DrawerContainer';
// import IngredientScreen from '../screens/Ingredient/IngredientScreen';
// import SearchScreen from '../screens/Search/SearchScreen';
// import IngredientsDetailsScreen from '../screens/IngredientsDetails/IngredientsDetailsScreen';

import Categorie from '../screens/Categories/Categorie'

import SignIn from '../screens/Login/SignIn'
import SignUp from '../screens/Login/SignUp'

import AllArticle from '../screens/Article/AllArticle'
import DetailArticle from '../screens/Article/DetailArticle'
import Article_Categorie from '../screens/Article/Article_Categorie'
import Panier from '../screens/Article/Panier'

import Commande from '../screens/Commande/Commande'
import Historique_Commande from '../screens/Commande/Historique_Commande'
import Details_Commande from '../screens/Commande/Details_Commande'
import { LogBox } from 'react-native';

import Info from '../screens/DrawerContainer/Info';

/* const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Categories' component={CategoriesScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} */

const MainNavigator = createStackNavigator(
  {
    // Home: HomeScreen,
    // Categories: CategoriesScreen,
    // Recipe: RecipeScreen,
    // RecipesList: RecipesListScreen,
    // Ingredient: IngredientScreen,
    // Search: SearchScreen,
    // IngredientsDetails: IngredientsDetailsScreen,

    Categorie:Categorie,

   SignIn:SignIn,
    SignUp:SignUp,

    AllArticle:AllArticle,
    DetailArticle:DetailArticle,
   Article_Categorie:Article_Categorie,
   Panier:Panier,
   Commande:Commande,
   Historique_Commande:Historique_Commande,
   Details_Commande:Details_Commande,

   Info:Info,
  },
  {
    // initialRouteName: 'Home',
    initialRouteName: 'Categorie',
    // headerMode: 'float',
    defaulfNavigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      }
    })
  }
); 

/* const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      drawerContent={props=> DrawerContainer}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} */

const DrawerStack = createDrawerNavigator(
  {
    Main: MainNavigator
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'Main',
    drawerWidth: 250,
    contentComponent: DrawerContainer
  }
);

/* export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} */
 
export default   AppContainer = createAppContainer(DrawerStack);

//console.disableYellowBox = true;
LogBox.ignoreAllLogs()