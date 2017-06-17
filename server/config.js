module.exports = {
  jwtSecret: 'somesecretkeyforjsonwebtoken',
  databaseUrl: 'mongodb://localhost/chatdb',
  serverPort: 3000,
  url: {
    logout: '/logout',
    login: '/login',
    exists: '/exists',
    success: '/',
    failure: '/login',
    signup: '/signup',
    authenticated: '/auth'
  }
}
