const axios = require('axios')
const querystring = require('querystring');

const createRequest = async ({ method, url, data, cookies = {} }) => {
  const answer = { status: 500, body: {} }
  const settings = {
    method: method,
    url: url,
    headers: {
      'Cookie': cookies,
    },
  }
  if (method === 'post') {
    settings.data = querystring.stringify(data)
  } else if (method === 'get') {
    settings.data = data
  }

  // console.log(data)
  console.log(settings)

  await axios(settings)
    .then(res => {
      answer.body = res.data
      answer.status = res.status
      answer.headers = res.headers

      console.log(res.status)
    })
    .catch(err => {
      answer.body = err
    })
  // console.log(answer)
  return answer
}


module.exports = createRequest

