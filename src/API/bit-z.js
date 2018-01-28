const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = (p1 + '_' + p2)
    const options = {
      method: 'GET',
      url: 'https://www.bit-z.com/api_v1/ticker?coin=' + pair,
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response}))) || undefined
    price = price && price.data
    price = price && price.last
    return price || undefined
  }
}