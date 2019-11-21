export default {
  apiUrl: process.env.NODE_ENV === 'production' ? 'https://poll-demo-1-api.herokuapp.com/api' : 'http://poll-api.test/api',
}