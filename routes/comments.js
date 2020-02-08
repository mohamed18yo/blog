var express = require('express');
var router = express.Router();
const db = require("../models/index")


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('admin/comments');
});

router.get('/create', async function (req, res) {
    res.render('admin/createComment', { cut: await db.Cutegory.findAll() });
})

router.post('/create', async function (req, res) {
    await db.Post.create(req.body)
    res.redirect('/posts');

})
module.exports = router;
