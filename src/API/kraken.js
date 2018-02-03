const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    p1 = p1 === 'BTC' ? 'XBT' : p1
    p2 = p2 === 'BTC' ? 'XBT' : p2
    const pair = p1 + '' + p2
    const options = {
      method: 'GET',
      url: 'https://api.kraken.com/0/public/Ticker',
      qs: {pair: pair},
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response})))
    price = price.result && price.result[Object.keys(price.result)[0]]
    const volume = price && price.v && price.v[0] || 0
    price = price && price.c
    price = price && price[0]
    return price && {
      p: price,
      v: volume
    }
  }
}