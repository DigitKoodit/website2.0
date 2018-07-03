import 'whatwg-fetch'

const authorizationHeader = () => {
  let jwtToken = localStorage.getItem('jwtToken')
  return jwtToken ? { Authorization: `Bearer ${jwtToken}` } : {}
}

const commonHeaders = requireAuth => {
  const authHeader = requireAuth ? authorizationHeader() : null
  return {
    'Content-Type': 'application/json',
    ...authHeader
  }
}

const parseJSON = response => {
  if(response.status === 204 || response.status === 205) {
    return null
  }
  return response.json()
}

const checkStatus = response => {
  if(response.status >= 200 && response.status < 300) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

const request = (url, options) => {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
}

export const get = (url, options, requireAuth) => {
  return request(url, {
    ...options,
    method: 'GET',
    headers: {
      ...commonHeaders(requireAuth),
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache'
    }
  })
}

export const post = (url, options, requireAuth) => {
  return request(url, {
    ...options,
    method: 'POST',
    headers: commonHeaders(requireAuth)
  })
}

export const put = (url, options, requireAuth) => {
  return request(url, {
    ...options,
    method: 'PUT',
    headers: commonHeaders(requireAuth)
  })
}

export const del = (url, options, requireAuth) => {
  return request(url, {
    ...options,
    method: 'DELETE',
    headers: commonHeaders(requireAuth)
  })
}

export const patch = (url, options, requireAuth) => {
  return request(url, {
    ...options,
    method: 'PATCH',
    headers: commonHeaders(requireAuth)
  })
}

export default request
