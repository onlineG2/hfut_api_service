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

  // console.log(settings)

  await axios(settings)
    .then(res => {
      console.log(res)
      answer.body = res.data
      answer.status = res.status
      answer.headers = res.headers
      if (cookies.indexOf('SESSION') !== -1) {
        answer.key = cookies.split('SESSION=')[1].split(';')[0]
      } else if (cookies.indexOf('wengine_vpn_ticketwebvpn_hfut_edu_cn') !== -1) {
        answer.key = cookies.split('wengine_vpn_ticketwebvpn_hfut_edu_cn=')[1].split(';')[0]
      }
      console.log(res.status)
    })
    .catch(err => {
      if (err.response.status !== 302) {
        console.log('出错：' + url)
        // console.log(err)
      }
      answer.body = err
    })

  return answer
}


module.exports = createRequest

