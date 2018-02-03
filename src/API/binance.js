const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = p1 + '' + p2 || 'nothing'
    const options = {
      method: 'GET',
      url: 'https://api.binance.com/api/v1/ticker/24hr',
      qs: {symbol: pair},
      headers:
        {
          'Postman-Token': '4b34c77a-36ab-fe17-d25d-b91fb07bc022',
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    const price = JSON.parse((await request(options, function (response, body) {return response})))
    return price && price.lastPrice && price.volume && {
      n: "Binance",
      p: price.lastPrice,
      v: price.volume
    }
  }
}