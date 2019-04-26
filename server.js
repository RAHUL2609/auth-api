const express = require('express')
const app = express()
var bdParser = require('body-parser')
var mongoose = require('mongoose')

const port = process.env.PORT || 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.use(bdParser.urlencoded({extended : false}))
app.use(bdParser.json())

mongoose.connect('mongodb+srv://rahul:rahul@cluster0-gxkds.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connection Done !!!!!')
});

var userSchema = new mongoose.Schema({
    username: String,
    password : String
});

var User = mongoose.model('User', userSchema);

app.post('/register', function(req, res){
    var user = new User({'username' : req.body.username, 'password': req.body.password}) 
    
    user.save(function(err, savedUser){
        if(err)
            res.json({message : 'failures'})
        else
            res.json({message : 'successs'})
    });
})


app.get('/users', function(req, res){
    User.find({}, function(err, users){
        res.json(users);
    })
})

app.post('/logins', function(req, res){
    User.findOne({'username' : req.body.username}, function(err, userObj){
        res.json(userObj);
    })
})

app.post('/login', function(req, res) {
    console.log('Entered here !!!')
    if(req.body.username == "admin" && req.body.password == "admin1")
        res.json({'message' : 'success'});
    else
        res.json({'message': 'failure'});    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))