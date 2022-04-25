import {GET_ITEMS,CLEAN_ITEMS} from '../action/orderActions'

const initialState = {
 item:[]
}

const orderReducer=(state = initialState, action) => {
    let nextState
    switch (action.type) {
        case GET_ITEMS:
          nextState = {
            ...state,
            //item: action.item,
           // item: state.item.concat(action.item)
           item: [...state.item, action.item]
        }
        return nextState || state
        case CLEAN_ITEMS: {
            return {
              ...initialState
            }
          }
        default: {
            return state;
        }
    }
}
export default orderReducer
