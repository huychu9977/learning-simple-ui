const PROXY_CONFIG = [{
  context: [
      '/api',
      '/auth'
  ],
  target: `http://localhost:8080`,
  secure: false
}]
module.exports = PROXY_CONFIG;