var express = require('express');
var router = express.Router();
const db = require("../models/index")


/* GET users listing. */
router.get('/', async function (req, res, next) {
  res.render('admin/categories', { cutegories: await db.Cutegory.findAll() });
});
router.get('/create', async function (req, res, next) {
  res.render('admin/createCategory')
})
router.post('/create', async function (req, res, next) {
  await db.Cutegory.create(req.body)
  res.redirect('/cutegories');

})

router.get('/delete/:id', async function (req, res) {
  await db.Cutegory.destroy({ where: { id: req.params.id } })
  res.redirect("/cutegories")
})

router.get('/edit/:id', async function (req, res) {

  res.render('admin/editCategory', {
    cut: await db.Cutegory.findByPk(req.params.id),

  })
})

router.post('/update', async function (req, res) {
  await db.Cutegory.update(req.body, { where: { id: req.body.id } })


})

module.exports = router;
