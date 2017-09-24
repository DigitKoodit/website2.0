import Axios from 'axios';

const API_URL = 'https://digit.niemisami.com/api/';

export const makeAPIRequest = parameter => {
  return new Promise((resolve, reject) => {
    Axios.get(API_URL + parameter)
      .then(response => {
        resolve(response.data);
      })
      .catch(reason => {
        reject(reason.response);
      });
  })
}
