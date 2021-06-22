const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded())

const port = 8080

app.get('/', (req, res) =>
{
  res.render('index.ejs')
})

app.post('/', (req, res) =>
    {
        const username = req.body.username
        res.render('hello.ejs', {username: username})
    }
)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
