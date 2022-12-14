import { SHOW_DOGS, DETAIL_DOG, ALL_TEMPERAMENTS, FILTER_TEMPERAMENTS, FILTER_ORDER, FILTER_DATA, CLEAR_STATE, GET_COMMENTS } from "./actions";

const initialState = {
  dogs: [],
  dogsCopy: [],
  detailDog: [],
  temperaments: [],
  comments: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SHOW_DOGS: {
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload
      }
    }
    case DETAIL_DOG: {
      return {
        ...state,
        detailDog: payload
      }
    }
    case ALL_TEMPERAMENTS: {
      return {
        ...state,
        temperaments: payload
      }
    }
    case FILTER_TEMPERAMENTS: {
      const container = payload === 'all' ? state.dogsCopy : state.dogsCopy.filter(t => t.temperament.includes(payload))
      return {
        ...state,
        dogs: container
      }
    }
    case FILTER_ORDER: {
      const container = payload === 'az' ? state.dogsCopy.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        }
        if (b.name > a.name) {
          return -1
        }
        return 0
      }) : state.dogsCopy.sort((a, b) => {
        if (a.name > b.name) {
          return -1
        }
        if (b.name > a.name) {
          return 1
        }
        return 0
      })
      return {
        ...state,
        dogs: container
      }
    }
    case FILTER_DATA: {
      const container = payload === 'api' ? state.dogsCopy.filter(d => !d.createdInDb) : state.dogsCopy.filter(d => d.createdInDb)
      return {
        ...state,
        dogs: container
      }
    }
    case CLEAR_STATE: {
      return {
        ...state,
        detailDog: [],
        comments: []
      }
    }
    case GET_COMMENTS: {
      return {
        ...state,
        comments: payload
      }
    }
    default: return state;
  }
}

export default reducer;
