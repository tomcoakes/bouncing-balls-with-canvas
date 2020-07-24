const express = require('express')
const port = 3000

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('/ endpoint hit')
  res.sendFile(__dirname + '/index.html')
})

app.listen(port, () => {
  console.log('app is now listening on port', port)
})
