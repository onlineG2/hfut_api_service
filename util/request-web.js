const axios = require('axios')
const querystring = require('querystring');
axios.defaults.withCredentials = true

const createRequest = async ({ method, url, data, cookies = '', redirect = true, contentType = '' }) => {
  const answer = { status: 500, body: {} }
  const settings = {
    method: method,
    url: url,
    headers: {
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36'
    },
  }
  redirect ? settings.maxRedirects = 5 : settings.maxRedirects = 0
  if (method === 'post') {
    contentType ? settings.data = querystring.stringify(data) : settings.data = data
  } else if (method === 'get') {
    settings.params = data
  }

  // console.log('哈------------')
  // console.log(settings)
  await axios(settings)
    .then(res => {
      // console.log(res.status)
      // console.log(res.headers)
      // console.log(res.data)
      answer.body = res.data
      answer.status = res.status
      answer.headers = res.headers
      if (cookies) {
        answer.key = cookies.split(';')[0].split('=')[1]
      }
    })
    .catch(err => {
      console.log('axios出错')
      // console.log(err)
      answer.body = err
    })

  return answer
}


module.exports = createRequest

