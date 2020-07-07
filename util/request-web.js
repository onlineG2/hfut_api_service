const axios = require('axios')
const querystring = require('querystring');
axios.defaults.withCredentials = true

const createRequest = async ({method, url, data, cookies='', redirect=true, contentType=''}) => {
  const answer = { status: 500, body: {} }
  const settings = {
    method: method,
    url: url,
    headers: {
      'Cookie': cookies
    },
  }
  redirect ? settings.maxRedirects = 5 : settings.maxRedirects = 0
  if (method === 'post') {
    contentType ? settings.data = querystring.stringify(data) : settings.data = data
  } else if (method === 'get') {
    settings.params = data
  }

  console.log(settings)
  await axios(settings)
  .then(res => {
    answer.body = res.data
    answer.status = res.status
    answer.headers = res.headers
    if (cookies) {
      answer.key = cookies.split(';')[0].split('=')[1]
    }
  })
  .catch(err =>{
    answer.body = err
  })

  return answer
}


module.exports = createRequest

