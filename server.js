const express = require('express')
const app = express()
var bdParser = require('body-parser')
//const port = process.env.PORT || 3000
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

app.use(bdParser.urlencoded({extended : false}))
app.use(bdParser.json())

app.post('/login', function(req, res) {
    console.log('Entered here !!!')
    if(req.body.username == "admin" && req.body.password == "admin1")
        res.json({'message' : 'success'});
    else
        res.json({'message': 'failure'});    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))