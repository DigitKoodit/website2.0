import urlTemplate from 'url-template'
import { get, post, put, del } from '../api/apiHelper'

const userBaseUrl = '/api/user/{userId}'
const userTemplate = urlTemplate.parse(userBaseUrl)

const loginUrl = '/api/login'
const registrationUrl = '/api/registration'

const addBodyPayload = data => ({
  body: JSON.stringify(data)
})

const login = user =>
  post(loginUrl, addBodyPayload(user))
    .then(({ user, token }) => {
      if(user && token) {
        localStorage.setItem('jwtToken', token)
      }
      return user
    })

const logout = () => Promise.resolve(localStorage.removeItem('jwtToken'))

const register = user =>
  post(registrationUrl, addBodyPayload(user))

const confirmRegistration = (email, registrationToken) =>
  put(registrationUrl, addBodyPayload({ email, registrationToken }))

const fetchAll = () =>
  get(userBaseUrl)

const fetchById = id =>
  get(userTemplate.expand({ userId: id }))

const update = user =>
  put(userTemplate.expand({ userId: user.id }), addBodyPayload(user))

const performDelete = user =>
  del(userTemplate.expand({ userId: user.id }))

export {
  login,
  logout,
  register,
  confirmRegistration,
  fetchAll,
  fetchById,
  update,
  performDelete
}
