module.exports = {
  call: async (p2, p1) => {
    const pair = p1 + '_' + p2
    const prices = JSON.parse(await poloniex.call())
    return prices[pair] && prices[pair].last
  }
}

const request = require('../requests').request
const poloniex = {
  call:
    async function () {
      const options = {
        method: 'GET',
        url: 'https://poloniex.com/public',
        qs: {command: 'returnTicker'},
        headers:
          {
            'Postman-Token': '805e67f3-6a5a-c452-c1ee-43c91c4afa1e',
            'Cache-Control': 'no-cache'
          }
      }

      return await request(options, function(response, body){return body})
    }
}