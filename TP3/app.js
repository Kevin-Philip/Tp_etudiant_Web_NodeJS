
const express = require('express')
const app = express()
const port = 3000

var users =  {Users : [{id : 1, "infos" : {firstName : "Kévin", lastName : "PHILIP"}}, {id :2 , "infos" : {firstName : "Clément", lastName : "BAUDET"}}]}

app.get('/', function (req, res) {
  res.send('Hi !')
})

app.get('/users', function(req, res){
  res.json(users)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port} !`)
})

