const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = p1 + '-' + p2
    const options = {
      method: 'GET',
      url: 'https://api.kucoin.com/v1/open/tick',
      qs: {symbol: pair},
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    const price = JSON.parse((await request(options, function (response, body) {return response})))
    return price && price.data && price.data.vol && {
      p: price.data.lastDealPrice,
      v: price.data.vol
    }
  }
}