import axios from 'axios';

export const SHOW_DOGS = "SHOW_DOGS"
export const DETAIL_DOG = "DETAIL_DOG"
export const ALL_TEMPERAMENTS = "ALL_TEMPERAMENTS"
export const FILTER_TEMPERAMENTS = "FILTER_TEMPERAMENTS"
export const FILTER_ORDER = "FILTER_ORDER"
export const CLEAR_STATE = "CLEAR_STATE"
export const GET_COMMENTS = "GET_COMMENTS"

export const showDogs = () => {
  return (dispatch) => {
    return axios.get('http://localhost:3001/dogs')
      .then(res => dispatch({ type: SHOW_DOGS, payload: res.data }))
      .catch(err => console.log(err))
  }
}

export const detailDogs = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/dogs/${id}`)
      .then(res => dispatch({ type: DETAIL_DOG, payload: res.data }))
      .catch(err => console.log(err))
  }
}

export const allTemperaments = () => {
  return (dispatch) => {
    return axios('http://localhost:3001/temperaments')
      .then(res => dispatch({ type: ALL_TEMPERAMENTS, payload: res.data }))
      .catch(err => console.log(err))
  };
}

export const createDog = (payload) => {
  console.log(payload)
  return async () => {
    const creation = await axios.post('http://localhost:3001/dogs', payload);
    return creation;
  };
}

export const filterByTemperaments = (payload) => {
  return {
    type: FILTER_TEMPERAMENTS,
    payload
  }
}

export const filterByOrder = (payload) => {
  return {
    type: FILTER_ORDER,
    payload
  }
}

export const clearState = () => {
  return {
    type: CLEAR_STATE
  }
}

export const createComment = (payload) => {
  return async () => {
    let comment = await axios.post('http://localhost:3001/comments', payload)
    return comment;
  }
}

export const getComments = (payload) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3001/comments/${payload}`)
      .then(res => dispatch({ type: GET_COMMENTS, payload: res.data }))
      .catch(err => console.log(err))
  }
}

export const userRegister = (payload) => {
  console.log(payload)
  return async () => {
    let user = await axios.post('http://localhost:3001/auth/register', payload)
    return user
  }
}

