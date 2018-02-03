const request = require('../requests').request

module.exports = {
  call: async (p1, p2) => {
    if(p1 !== 'BTC')
      return
    const options = {
      method: 'GET',
      url: 'https://localbitcoins.com/bitcoinaverage/ticker-all-currencies',
      headers:
        {
          'Postman-Token': '382ad5c3-1310-1cd1-9d31-298f44ee115e',
          'Cache-Control': 'no-cache'
        }
    }
    let price = JSON.parse((await request(options, function (response, body) {return response}))) || undefined
    price = price && price[p2]
    const volume = price && price.volume_btc || 0
    price = price && price.rates
    price = price && price.last
    return price && {
      n: "LocalBitcoins",
      p: price,
      v: volume
    } || undefined
  }
}