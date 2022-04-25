
export const UPDATE_ID = 'UPDATE_ID'  
export const UPDATE_NOM = 'UPDATE_NOM'  
export const UPDATE_PRENOM = 'UPDATE_PRENOM'  
export const UPDATE_EMAIL = 'UPDATE_EMAIL'  
 
export const UPDATE_TELEPHONE= 'UPDATE_TELEPHONE'  

export const LOGOUT= 'LOGOUT'

export const GET_ITEMS = 'GET_ITEMS'
export const REMOVE_ITEMS = 'REMOVE_ITEMS'
export const UPDATE_ITEMS = 'UPDATE_ITEMS'
//export const CLEAN_ITEMS= 'CLEAN_ITEMS'

export const updateId= id => {
    return {
        type: UPDATE_ID,
        id: id
    }
  }
export const updateNom = nom => {
    return {
        type: UPDATE_NOM,
        nom: nom
    }
  }
export const updatePrenom = prenom => {
    return {
        type: UPDATE_PRENOM,
        prenom: prenom
    }
  }
export const updateEmail = email => {
    return {
        type: UPDATE_EMAIL,
        email: email
    }
  }

export const updateTelephone = telephone => {
    return {
        type: UPDATE_TELEPHONE,
        telephone: telephone
    }
  }

export const SigOut = () => ({
    type: LOGOUT,
    
  })

  
export const getItems = item => {    
  return {
      type: GET_ITEMS,
      item: item,
  }
}
export const removeItems = item => {    
  return {
      type: REMOVE_ITEMS,
      item: item,
  }
}
 
export const updateItems = item => {    
  return {
      type: UPDATE_ITEMS,
      item: item,
  }
}
 
  export const currentUser=(id,nom,prenom,email)=> (dispatch)=>
  new Promise(async function(resolve, reject) {
   
    dispatch(updateId(id))
    dispatch(updateNom(nom))
    dispatch(updatePrenom(prenom))
    dispatch(updateEmail(email))
    //dispatch(updateTelephone(telephone))
    resolve()
  })

  export const addItem=(item)=> (dispatch)=>
  new Promise(async function(resolve, reject) {
   
    dispatch(getItems(item))
    
    resolve()
  })

