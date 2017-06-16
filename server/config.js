module.exports = {
  jwtSecret: 'somesecretkeyforjsonwebtoken',
  databaseUrl: 'mongodb://localhost/chatdb',
  developmentDrop: true,
  url:{
	  logout: '/logout',
	  login: '/login',
	  exists: '/exists',
	  success: '/',
	  failure: '/login',
	  signup: '/signup',
	  authenticated: '/auth'
  }
}
