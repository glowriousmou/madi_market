export const GET_ITEMS = 'GET_ITEMS'
export const CLEAN_ITEMS= 'CLEAN_ITEMS'

export const getItems = item => {    
    return {
        type: GET_ITEMS,
        item: item,
    }
  }
  export const cleanItems = () => ({
    type: CLEAN_ITEMS,
    
  })
  export const addItem=(item)=> (dispatch)=>
  new Promise(async function(resolve, reject) {
   
    dispatch(getItems(item))
    
    resolve()
  })