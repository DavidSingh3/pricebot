// express config
const express = require('express')
const app = express()
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
const port = process.env.PORT || 3000

// external APIs
const externals = {
  poloniex: require('./API/poloniex'),
  binance: require('./API/binance'),
  kucoin: require('./API/kucoin'),
  kraken: require('./API/kraken'),
  gdax: require('./API/gdax'),
  bitfinex: require('./API/bitfinex'),
  shapeshift: require('./API/shapeshift')
}

// routes will go here
app.post('/price/:pair1/:pair2', async function (req, res) {
  const p = req.params

  const [
    poloniex,
    binance,
    kucoin,
    kraken,
    gdax,
    bitfinex,
    shapeshift
  ] = await Promise.all([
    externals.poloniex.call(p.pair1, p.pair2),
    externals.binance.call(p.pair1, p.pair2),
    externals.kucoin.call(p.pair1, p.pair2),
    externals.kraken.call(p.pair1, p.pair2),
    externals.gdax.call(p.pair1, p.pair2),
    externals.bitfinex.call(p.pair1, p.pair2),
    externals.shapeshift.call(p.pair1, p.pair2)
  ])

  const result = {
    poloniex,
    binance,
    kucoin,
    kraken,
    gdax,
    bitfinex,
    shapeshift
  }
  res.json(result)
})

// start the server
app.listen(port)
console.log('Server started! At http://localhost:' + port)