const connectToMongo = require('./db')
connectToMongo();

const cors = require('cors')
const express = require('express')
const app = express()
const port = 5000

app.use(cors({
  origin: 'http://localhost:3000' // change this for production
}))


// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/login', (req, res) => {
//     res.send('Welcome to login')
//   })

app.use(express.json())
  
app.use('/api/auth',require('./routes/auth'))
app.use('/api/expense',require('./routes/expense'))

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})

