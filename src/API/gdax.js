const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    const pair = p1 + '-' + p2
    const options = {
      method: 'GET',
      url: 'https://api.gdax.com/products/' + pair + '/ticker',
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache',
          'User-Agent': 'none'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response}))) || undefined
    const volume = price && price.volume || 0
    price = price && price.price
    return price && {
      n: "GDAX",
      p: price,
      v: volume
    }
  }
}