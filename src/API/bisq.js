const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = (p1 + '_' + p2).toLowerCase()
    const options = {
      method: 'GET',
      url: 'https://markets.bisq.network/api/ticker?market=' + pair,
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response}))) || undefined
    price = price && price[0]
    price = price && price.last
    return price
  }
}