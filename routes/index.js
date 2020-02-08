var express = require('express');
var router = express.Router();
const db = require("../models/index.js")
const bkfd2Password = require("pbkdf2-password");
const hasher = bkfd2Password();
const salt = "mohamed";

const transporter=require('../helper/emil')



/* GET home page. */
router.get('/', function (req, res, next) {
  db.Post.findAll().then((data) => {
    res.render('home', { posts: data });
  })
  //  res.render('index', { title: 'Express' });
})

router.get('/register', async function (req, res, next) {
  res.render('register');
})
router.post('/register', async function (req, res, next) {
  hasher({ password: req.body.password, salt: salt }, async (err, password, salt, hash) => {
    req.body.password = hash;
    let user = await db.User.create(req.body)
    req.session.user = user;
    var mailOptions = {
      from: 'nodejsps@gmail.com',
      to: "nouhm135@gmail.com",
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.redirect('/');

  })

})

router.get('/login', function (req, res, next) {
  res.render('login');
})

router.post('/login', async function (req, res, next) {
  let user = await db.User
    .findOne({ where: { email: req.body.email } })

  hasher({ password: req.body.password, salt: salt }, (err, password, salt, hash) => {
    // console.log("user.password " , user.password );
    // console.log("hash" , hash );

    if (user.password === hash) {
      req.session.user = user;
      res.redirect('/');
    }
    else {
      res.redirect('/login');
    }
  })
})


router.get('/show/:id', async function (req, res) {

  res.render('post', {
    post: await db.Post.findByPk(req.params.id, {
      include: [db.Cutegory, db.User]
    })
  });
})


router.get('/logout', function (req, res, next) {
  req.session.destroy((err) => { })
  res.redirect('/login')
})


module.exports = router;
