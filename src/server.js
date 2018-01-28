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
  binance: require('./API/binance')
}

// routes will go here
app.post('/price/:pair1/:pair2', async function (req, res) {
  const p = req.params

  const poloniex = await externals.poloniex.call(p.pair1, p.pair2)
  const binance = await externals.binance.call(p.pair1, p.pair2)
  const result = {
    poloniex,
    binance
  }
  res.json(result)
})

// start the server
app.listen(port)
console.log('Server started! At http://localhost:' + port)