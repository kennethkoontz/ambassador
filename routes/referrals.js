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
    if (error) return cb(error)

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
