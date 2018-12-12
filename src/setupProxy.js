const proxy = require('http-proxy-middleware')

module.exports = app => {
  app.use(proxy('/api', { target: 'http://localhost:3001/' }))
  app.use(proxy('/uploads', { target: 'http://localhost:3001/' }))
}
