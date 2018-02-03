const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = p1 + '' + p2
    const options = {
      method: 'GET',
      url: 'https://api.bitfinex.com/v1/pubticker/' + pair,
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response}))) || undefined
    const volume = price && price.volume || 0
    price = price && price.last_price
    return price && {
      p: price,
      v: volume
    }
  }
}