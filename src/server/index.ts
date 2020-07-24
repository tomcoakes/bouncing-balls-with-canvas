import express from 'express'
import path from 'path'

const port = 3000
const app = express()

app.use(express.static('dist'))

app.get('/', (_, res) => {
  res.sendFile('index.html', {
    root: path.join(process.cwd(), 'public'),
  })
})

app.listen(port, () => {
  console.log('App is now listening on port', port)
})
