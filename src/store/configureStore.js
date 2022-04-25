import AsyncStorage from '@react-native-community/async-storage'
import { createStore,applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';
const middleware = applyMiddleware(thunk,logger)
const persistConfig = {
  key: 'authReducer',
   storage: AsyncStorage,
  
  whitelist: ['authReducer'] // which reducer want to store
  
};
const pReducer = persistReducer(persistConfig, rootReducer);

 const  store = createStore(pReducer, middleware);
const persistor=persistStore(store)



export { persistor, store }
