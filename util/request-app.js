const axios = require('axios')
const querystring = require('querystring');

const createRequest = async (method, url, data) => {
  const answer = { status: 500, body: {} }
  const settings = {
    method: method,
    url: url,
  }
  if (method === 'post') {
    settings.data = querystring.stringify(data)
  } else if (method === 'get') {
    settings.data = data
  }

  // console.log(data)

  await axios(settings)
  .then(res => {
    answer.body = res.data
    answer.status = res.status
    answer.headers = res.headers
  })
  .catch(err =>{
    answer.body = err
  })
  console.log(answer)
  return answer
}


module.exports = createRequest

