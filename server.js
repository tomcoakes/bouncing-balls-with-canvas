const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1'
const port = 3001

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.writeHead(200, { 'Content-Type': 'text/html' })
  fs.readFile(__dirname + req.url, function (error, data) {
    if (error) {
      res.writeHead(404)
      res.end(JSON.stringify(error))
    } else {
      res.end(data)
    }
  })
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
