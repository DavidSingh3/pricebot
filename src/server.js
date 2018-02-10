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
  shapeshift: require('./API/shapeshift'),
  quadrigacx: require('./API/quadrigacx'),
  lakebtc: require('./API/lakebtc'),
  hitbtc: require('./API/hitbtc'),
  bisq: require('./API/bisq'),
  bitz: require('./API/bit-z'),
  localbitcoins: require('./API/localbitcoins')
}

// routes will go here
app.get('/price/:pair1/:pair2', async function (req, res) {
  try {
    const p1 = req.params.pair1
    const p2 = req.params.pair2

    const [
      poloniex,
      binance,
      kucoin,
      kraken,
      gdax,
      bitfinex,
      shapeshift,
      quadrigacx,
      lakebtc,
      hitbtc,
      bisq,
      bitz,
      localbitcoins
    ] = await Promise.all([
      externals.poloniex.call(p1, p2),
      externals.binance.call(p1, p2),
      externals.kucoin.call(p1, p2),
      externals.kraken.call(p1, p2),
      externals.gdax.call(p1, p2),
      externals.bitfinex.call(p1, p2),
      externals.shapeshift.call(p1, p2),
      externals.quadrigacx.call(p1, p2),
      externals.lakebtc.call(p1, p2),
      externals.hitbtc.call(p1, p2),
      externals.bisq.call(p1, p2),
      externals.bitz.call(p1, p2),
      externals.localbitcoins.call(p1, p2)
    ])

    const result = [
      poloniex,
      binance,
      kucoin,
      kraken,
      gdax,
      bitfinex,
      shapeshift,
      quadrigacx,
      lakebtc,
      hitbtc,
      bisq,
      bitz,
      localbitcoins
    ].reduce((accumulator, current) => {
      if (current) {
        while (current.p[current.p.length - 1] === '0' || current.p[current.p.length - 1] === '.') {
          current.p = [...current.p]
          current.p.pop()
          current.p = current.p.join('')
        }
        accumulator.push(current)
      }
      return accumulator
    }, []).sort((a, b) => {
      if (parseFloat(a.v) > parseFloat(b.v))
        return -1
      if (parseFloat(a.v) < parseFloat(b.v))
        return 1
      return 0
    })

    res.json(result)
  } catch (e) {
    console.log(e)
    res.json([])
  }
})

// start the server
app.listen(port)
console.log('Server started! At http://localhost:' + port)