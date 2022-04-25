import {UPDATE_ID,UPDATE_NOM,UPDATE_TELEPHONE,LOGOUT,UPDATE_PRENOM,UPDATE_EMAIL,
  GET_ITEMS,REMOVE_ITEMS,UPDATE_ITEMS} from '../action/authActions'

const initialState = {
 
    id:'',
    nom:'',
    prenom:"",
    email:"",
    telephone:'',
    item:[],
}
const authReducer=(state = initialState, action) => {
    let nextState
    switch (action.type) {
      case UPDATE_ID:
        nextState = {
          ...state,
          id: action.id,
        }
      return nextState || state
      case UPDATE_NOM:
        nextState = {
          ...state,
          nom: action.nom,
        }
        return nextState || state 
      case UPDATE_PRENOM:
        nextState = {
          ...state,
          prenom: action.prenom,
        }
        return nextState || state 
      case UPDATE_EMAIL:
        nextState = {
          ...state,
          email: action.email,
        }
        return nextState || state 
      case UPDATE_TELEPHONE:
        nextState = {
          ...state,
          telephone: action.telephone,
        }
      return nextState || state
      case GET_ITEMS:
          nextState = {
            ...state,
           item: [...state.item, action.item]
        }
        return nextState || state
      case REMOVE_ITEMS:
          nextState = {
            ...state,
           item: [...state.item.filter(item => item !== action.item)]
            
        }
        return nextState || state
      case UPDATE_ITEMS:
          nextState = {
            ...state,
           item: action.item
            
        }
        return nextState || state
      case LOGOUT: {
        return {
          ...initialState
        }
      }
      default: {
        return state;
      }
    }
}
export default authReducer

