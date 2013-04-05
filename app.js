var express = require('express')
  , http = require('http')
  , path = require('path')
  , referrals = require('./routes/referrals')
  , app = express() 

app.configure(function(){
  app.set('port', process.env.PORT || 3000)
  app.set('views', __dirname + '/views')
  app.set('view engine', 'jade')
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser())
  app.use(express.methodOverride())
  app.use(app.router)
  app.use(express.static(path.join(__dirname, 'public')))
})

app.get('/', referrals.manage)
app.get('/landing', referrals.landing)

// client side endpoints
app.get('/referrals', referrals.show)
app.post('/referrals', referrals.create)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'))
})
