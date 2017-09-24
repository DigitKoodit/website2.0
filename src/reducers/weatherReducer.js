import * as types from '../actions/actionTypes';

const initialState = {
  conditionCode: 0, // TODO check actual codes from weather api
  temperature: 15,
  weatherIcon: '/images/aurinko.png'
}

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_WEATHER_SUCCESS:
      const{ code, temp } = action.weather.item.condition;
      return {
        ...state, 
        conditionCode: Number.parseInt(code),
        temperature: Number.parseInt(temp)
      };
    default:
      return state;
  }
}

export default weatherReducer;