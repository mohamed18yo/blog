var express = require('express');
var router = express.Router();
const db = require("../models/index")

/* GET users listing. */
router.get('/', async function (req, res, next) {
    res.render('admin/posts', {
        posts: await db.Post.findAll(
            { include: [db.User, db.Cutegory, db.Tag] })
    });
});

router.get('/create', async function (req, res) {
    res.render('admin/createPost', {
        cut: await db.Cutegory.findAll(),
        tag: await db.Tag.findAll(),
        user: await db.User.findAll()   
    });
})

router.post('/create', async function (req, res) {
    let post = await db.Post.create(req.body)
    post.addTag(req.body.tagId)
    res.redirect('/posts');

})

router.get('/delete/:id', async function (req, res) {
    await db.Post.destroy({ where: { id: req.params.id } })
    res.redirect("/posts")
})


router.get('/show/:id', async function (req, res) {
    res.render('admin/showPost', { post: await db.Post.findByPk(req.params.id, { include: [db.Cutegory, db.User,db.Tag] }) });
})
// res.render('admin/showPost', {
//     posts: await db.Post.findByPk(req.params.id),
//     cuts: await db.Cutegory.findAll()
// })})

router.get('/edit/:id', async function (req, res) {

    res.render('admin/editPost', {
        post: await db.Post.findByPk(req.params.id),
        cut: await db.Cutegory.findAll()
    })
})

router.post('/update', async function (req, res) {
    await db.Post.update(req.body, { where: { id: req.body.id } })


})


module.exports = router;
