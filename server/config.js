module.exports = {
  jwtSecret: 'somesecretkeyforjsonwebtoken',
  databaseUrl: 'mongodb://localhost/chatdb',
  serverPort: 3000,
  chatLimit: 5,
  url: {
    logout: '/logout',
    login: '/login',
    exists: '/exists',
    success: '/',
    failure: '/login',
    signup: '/signup',
    authenticated: '/auth',
    avatarUrl: '/avatar'
  }
}
