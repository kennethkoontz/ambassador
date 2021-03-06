var url = require('url')
  , qry = require('querystring')
  , Db = require('dwingo')
  , db = new Db('ambassador', process.env.MONGOLAB_URI);

exports.manage = function(req, res) {
  res.render('referrals/manage')
}

exports.landing = function(req, res) {
  var linkTitle = qry.parse(url.parse(req.url).query).title
    , query = { title: linkTitle }
    , update = { $inc: { clicks: 1 } }

  db.update('referrals', query, update, function(error, result) {
    if (error) return res.send(404)

    res.render('referrals/landing', { linkTitle: linkTitle })
  })
}

// client side endpoints
exports.show = function(req, res) {
  db.read('referrals', {}, function(error, result) {
    if (error) return res.send(404)

    res.send(result)
  })
}

exports.delete = function(req, res) {
  var remove = req.body
 
  db.remove('referrals', remove, function(error, result) {
    if (error) return res.send(404)

    res.send(200)
  })
}

exports.update = function(req, res) {
  var query = { title: req.body.old.title }
    , update = { $set: { title: req.body.updated.title }}

  db.update('referrals', query, update, function(error, result) {
    if (error) return res.send(404)

    res.send(200)
  })
}

exports.create = function(req, res) {
  var create = req.body
 
  db.create('referrals', create, function(error, result) {
    if (error) return res.send(404)

    res.send(200)
  })
}
