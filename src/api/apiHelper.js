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
  const { headers, ...rest } = options || {}
  return request(url, {
    ...rest,
    headers: {
      ...commonHeaders(requireAuth),
      'Pragma': 'no-cache',
      'Cache-Control': 'no-cache',
      ...headers
    },
    method: 'GET'
  })
}

export const post = (url, options, requireAuth) => {
  const { headers, ...rest } = options || {}
  return request(url, {
    ...rest,
    headers: { ...commonHeaders(requireAuth), ...headers },
    method: 'POST'
  })
}

export const put = (url, options, requireAuth) => {
  const { headers, ...rest } = options || {}
  return request(url, {
    ...rest,
    headers: { ...commonHeaders(requireAuth), ...headers },
    method: 'PUT'
  })
}

export const del = (url, options, requireAuth) => {
  const { headers, ...rest } = options || {}
  return request(url, {
    ...rest,
    headers: { ...commonHeaders(requireAuth), ...headers },
    method: 'DELETE'
  })
}

export const patch = (url, options, requireAuth) => {
  const { headers, ...rest } = options || {}
  return request(url, {
    ...rest,
    headers: { ...commonHeaders(requireAuth), ...headers },
    method: 'PATCH'
  })
}

export const upload = (url, options, requireAuth) => {
  const { headers, ...rest } = options || {}
  const authHeader = requireAuth ? authorizationHeader() : null
  return request(url, {
    ...rest,
    headers: { ...authHeader },
    method: 'POST'
  })
}

export default request
